import { useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
  convertToRaw,
  convertFromRaw,
  Modifier,
} from "draft-js";
import "draft-js/dist/Draft.css";

import { StyledNote } from "./Notes.styled";
import { Button } from "../styles/Button.styled";

const NoteItem = ({ note, onEdit }) => {
  const newDateString = `${note.date.toLocaleString("en-us", {
    weekday: "short",
  })} ${note.date.getDate()} ${note.date.toLocaleString("default", {
    month: "long",
  })}`;

  const styleMap = {
    HIGHLIGHT: {
      backgroundColor: "#faed27",
    },
    red: {
      color: "red",
    },
    orange: {
      color: "orange",
    },
    yellow: {
      color: "yellow",
    },
    green: {
      color: "green",
    },
    blue: {
      color: "blue",
    },
    indigo: {
      color: "indigo",
    },
    violet: {
      color: "violet",
    },
  };

  const editHandler = () => {
    // year, month, day, note
    const y = note.date.getFullYear();
    const m = note.date.getMonth();
    const d = note.date.getDate();
    onEdit(y, m, d, note);
  };

  return (
    <StyledNote>
      <div>
        <h2>{newDateString}</h2>
        <Button onClick={editHandler}>Edit</Button>
      </div>
      <div>
        <Editor
          readOnly={true}
          customStyleMap={styleMap}
          editorState={EditorState.createWithContent(
            convertFromRaw(note.rawContent)
          )}
        />
      </div>
    </StyledNote>
  );
};

export default NoteItem;
