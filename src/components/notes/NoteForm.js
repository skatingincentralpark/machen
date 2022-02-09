import React from "react";

import {
  doc,
  arrayUnion,
  updateDoc,
  getDocs,
  addDoc,
  collection,
  Timestamp,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../utils/firebase";

import TextEditor from "./TextEditor";
import { StyledNoteForm } from "./Notes.styled";

const NoteForm = ({ onClose, date, selectedDate }) => {
  // Save Note
  // @@   TO-DO: have to return monthnotes to ensure fresh state
  const onSave = async (rawContentState) => {
    const date = new Date();
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    try {
      // 1) Create new note
      const newNote = {
        rawContent: rawContentState,
        created: Timestamp.fromDate(today).toDate(),
      };

      // 2) Check if monthNotes exists for selected month
      const q = query(
        collection(db, "monthNotes"),
        where("created", "==", firstDayOfMonth)
      );
      const querySnapshot = await getDocs(q);
      const ids = querySnapshot.docs.map((doc) => doc.id);

      // 2.1) If exists => push new note to array
      if (!!ids.length) {
        const monthNotesRef = doc(db, "monthNotes", ids[0]);

        await updateDoc(monthNotesRef, {
          notes: arrayUnion(newNote),
        });

        return;
      }

      // 3) Create new month note
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
