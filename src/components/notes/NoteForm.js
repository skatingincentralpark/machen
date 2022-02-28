import {
  doc,
  arrayUnion,
  arrayRemove,
  writeBatch,
  updateDoc,
  getDocs,
  addDoc,
  collection,
  Timestamp,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import useAuth from "../../hooks/auth";

import TextEditor from "./TextEditor";
import { StyledNoteForm } from "./Notes.styled";

const NoteForm = ({
  onClose,
  date,
  selectedDate,
  currNote,
  setAllMonthNotes,
}) => {
  const { user } = useAuth();

  // Save Note
  // @@   TO-DO: have to return monthnotes to ensure fresh state
  const onSave = async (rawContentState) => {
    const firstDayOfMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    );

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    try {
      // 1) Create new note (single)
      const newNote = {
        rawContent: rawContentState,
        date: Timestamp.fromDate(selectedDate).toDate(),
        created: Timestamp.fromDate(today).toDate(),
      };

      // 2) Check if monthNotes exists for selected month
      const q = query(
        collection(db, "monthNotes"),
        where("created", "==", firstDayOfMonth)
      );
      const querySnapshot = await getDocs(q);
      const ids = querySnapshot.docs.map((doc) => doc.id);
      const docs = querySnapshot.docs.map((doc) => doc.data());

      // 2.1) If note for that date exists => update that note (remove and add)
      const existingNote = docs[0]?.notes?.find(
        (note) => +note.date === +Timestamp.fromDate(selectedDate)
      );

      if (existingNote) {
        const monthNotesRef = doc(db, "monthNotes", ids[0]);
        const batch = writeBatch(db);

        batch.update(monthNotesRef, { notes: arrayRemove(existingNote) });
        batch.update(monthNotesRef, { notes: arrayUnion(newNote) });

        await batch.commit();

        setAllMonthNotes((prevAllMonthNotes) => {
          let noteIndex;
          let allMonthNotes = prevAllMonthNotes.map((monthNote) => {
            if (+monthNote.created === +firstDayOfMonth) {
              noteIndex = monthNote.notes.findIndex(
                (note) => +note.date === +selectedDate
              );
            }
            return monthNote;
          });

          const monthNoteIndex = allMonthNotes.findIndex(
            (monthNote) =>
              monthNote.created.toString() === firstDayOfMonth.toString()
          );

          allMonthNotes[monthNoteIndex].notes[noteIndex] = newNote;

          return allMonthNotes;
        });

        return;
      }

      // 2.2) If monthNotes exists => push new note to array
      if (!!ids.length && !existingNote) {
        const monthNotesRef = doc(db, "monthNotes", ids[0]);

        await updateDoc(monthNotesRef, {
          notes: arrayUnion(newNote),
        });

        return;
      }

      // 3) Create new month note (group of notes)
      const newMonthNotes = {
        user: user.uid,
        notes: [newNote],
        created: Timestamp.fromDate(firstDayOfMonth).toDate(),
      };

      const docRef = await addDoc(collection(db, "monthNotes"), newMonthNotes);
      console.log(`Success, doc id is ${docRef.id}`);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <StyledNoteForm>
        <TextEditor
          currNote={currNote}
          onClose={onClose}
          onSave={onSave}
          date={date}
          selectedDate={selectedDate}
        />
      </StyledNoteForm>
    </>
  );
};

export default NoteForm;
