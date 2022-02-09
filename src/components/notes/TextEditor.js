import { useEffect, useState, useRef } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertToRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";

import {
  EditorButtons,
  EditorWrapper,
  EditorBtn,
  NoteFormRight,
} from "./Notes.styled";
import { NoteFormButton } from "../styles/Button.styled";

const TextEditor = ({ onSave, onClose, selectedDate }) => {
  const newDateString = `${selectedDate.toLocaleString("en-us", {
    weekday: "short",
  })} ${selectedDate.getDate()} ${selectedDate.toLocaleString("default", {
    month: "long",
  })}`;

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const editor = useRef();

  function focusEditor() {
    editor.current.focus();
  }

  useEffect(() => {
    focusEditor();
  }, []);

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return "handled";
    }

    return "not-handled";
  };

  const myKeyBindingFn = (e) => {
    if (e.keyCode === 9) {
      return "text-indent";
    }
    return getDefaultKeyBinding(e);
  };

  const toggleStyle = (e) => {
    e.preventDefault();
    setEditorState(
      RichUtils.toggleInlineStyle(editorState, e.currentTarget.dataset.style)
    );
  };

  const toggleBlockType = (e) => {
    e.preventDefault();

    setEditorState(
      RichUtils.toggleBlockType(editorState, e.currentTarget.dataset.blocktype)
    );
  };

  const saveText = () => {
    // convertToRaw()
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);

    onSave(rawContentState);
  };

  return (
    <>
      <EditorButtons>
        <EditorBtn onMouseDown={toggleStyle} data-style="BOLD">
          <span>Bold</span>
        </EditorBtn>
        <EditorBtn onMouseDown={toggleStyle} data-style="ITALIC">
          <span>Italic</span>
        </EditorBtn>
        <EditorBtn onMouseDown={toggleStyle} data-style="UNDERLINE">
          <span>Underline</span>
        </EditorBtn>
        <EditorBtn
          onMouseDown={toggleBlockType}
          data-blocktype="unordered-list-item"
        >
          <span>UL</span>
        </EditorBtn>
        <EditorBtn
          onMouseDown={toggleBlockType}
          data-blocktype="ordered-list-item"
        >
          <span>OL</span>
        </EditorBtn>
        <EditorBtn onMouseDown={toggleStyle} data-blocktype="COLOR">
          <span>Color</span>
        </EditorBtn>
        <EditorBtn onMouseDown={toggleStyle} data-blocktype="HIGHLIGHT">
          <span>Highlight</span>
        </EditorBtn>
      </EditorButtons>

      <EditorWrapper>
        <div>
          <h2>{newDateString}</h2>
        </div>
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={myKeyBindingFn}
          placeholder="Enter something here"
        />
      </EditorWrapper>

      <NoteFormRight>
        <NoteFormButton onClick={saveText}>
          <img src="/svg/tick.svg" alt="" />
        </NoteFormButton>
        <NoteFormButton onClick={onClose}>
          <img src="/svg/closeButton.svg" alt="" />
        </NoteFormButton>
      </NoteFormRight>
    </>
  );
};

export default TextEditor;
