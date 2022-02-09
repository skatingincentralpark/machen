import { useState, useRef } from "react";
import Link from "next/link";

import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  Timestamp,
} from "firebase/firestore";

import TextEditor from "../src/components/notes/TextEditor";

import { db } from "../src/utils/firebase";
import useAuth from "../src/hooks/auth";
import { withProtected } from "../src/hooks/route";

const FirestoreTestPage = ({ data }) => {
  const notesRef = useRef();
  const { user, logout } = useAuth();
  const [text, setText] = useState();

  console.log(data);

  const addMonthNotes = async (note) => {
    const date = new Date();
    const firstday = new Date(date.getFullYear(), date.getMonth(), 1);

    const monthNotes = {
      user: user.uid,
      notes: [note],
      created: Timestamp.fromDate(firstday).toDate(),
    };

    setText(note);

    console.log(monthNotes);

    // try {
    //   const docRef = await addDoc(collection(db, "users"), monthNotes);
    //   console.log("Document written with ID: ", docRef.id);
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    // }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addMonthNotes(notesRef.current.value);
  };

  return (
    <div style={{ marginTop: "10rem" }}>
      <h1>Testing Firestore</h1>
      <hr />
      {/* <form onSubmit={onSubmit}>
        <textarea ref={notesRef} cols="30" rows="10" />
        <button>Submit</button>
      </form> */}
      <TextEditor />
      <hr />
      <p>Current User: {user.email}</p>
      <button onClick={logout}>Log out</button>
      <br />
      <Link href="/auth">Page 1</Link>
    </div>
  );
};

export async function getServerSideProps(context) {
  const q = query(collection(db, "monthNotes"), where("created", "==", true));
  const querySnapshot = await getDocs(q);

  const data = querySnapshot.docs.map((doc) => doc.data());

  return {
    props: { data: data || undefined },
  };
}

export default withProtected(FirestoreTestPage);
