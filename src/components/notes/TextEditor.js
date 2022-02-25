import { useEffect, useState, useRef } from "react";
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
import { CSSTransition } from "react-transition-group";

import {
  EditorButtons,
  EditorWrapper,
  EditorBtn,
  NoteFormRight,
} from "./Notes.styled";
import { NoteFormButton } from "../styles/Button.styled";

import Dropdown, { DropdownBtn } from "../ui/Dropdown";

const TextEditor = ({
  onSave = () => {},
  onClose = () => {},
  selectedDate = new Date(2022, 0, 1),
  isLanding = false,
  initialFocus = true,
  currNote,
}) => {
  const [editorState, setEditorState] = useState(() => {
    if (!currNote) return EditorState.createEmpty();
    const converted = convertFromRaw(currNote?.rawContent);
    return EditorState.createWithContent(converted);
  });

  const newDateString = `${selectedDate.toLocaleString("en-us", {
    weekday: "short",
  })} ${selectedDate.getDate()} ${selectedDate.toLocaleString("default", {
    month: "long",
  })}`;

  // Color Dropdown
  const [showColors, setShowColors] = useState(false);
  const nodeRef1 = useRef(null);

  const COLORS = [
    { label: "Red", style: "red" },
    { label: "Orange", style: "orange" },
    { label: "Yellow", style: "yellow" },
    { label: "Green", style: "green" },
    { label: "Blue", style: "blue" },
    { label: "Indigo", style: "indigo" },
    { label: "Violet", style: "violet" },
  ];

  // Focus Editor
  const editor = useRef();

  function focusEditor() {
    editor.current.focus();
  }

  useEffect(() => {
    if (!initialFocus) return;
    focusEditor();
  }, []);

  // Handle Key Command
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (!newState && command === "strikethrough") {
      setEditorState(RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH"));
    }

    if (!newState && command === "unordered-list") {
      setEditorState(
        RichUtils.toggleBlockType(editorState, "unordered-list-item")
      );
    }
    if (!newState && command === "highlight") {
      setEditorState(RichUtils.toggleInlineStyle(editorState, "HIGHLIGHT"));
    }

    if (newState) {
      setEditorState(newState);
      return "handled";
    }

    return "not-handled";
  };

  // Key Binding Function
  function keyBindingFunction(event) {
    if (
      KeyBindingUtil.hasCommandModifier(event) &&
      event.shiftKey &&
      event.key === "x"
    ) {
      return "strikethrough";
    }
    if (
      KeyBindingUtil.hasCommandModifier(event) &&
      event.shiftKey &&
      event.key === "8"
    ) {
      return "unordered-list";
    }
    if (
      KeyBindingUtil.hasCommandModifier(event) &&
      event.shiftKey &&
      event.key === "h"
    ) {
      return "highlight";
    }

    return getDefaultKeyBinding(event);
  }

  const toggleStyle = (e) => {
    e.preventDefault();

    const dataStyle = e.currentTarget.dataset.style;

    if (
      dataStyle === "BOLD" ||
      dataStyle === "ITALIC" ||
      dataStyle === "UNDERLINE"
    ) {
      setEditorState(RichUtils.toggleInlineStyle(editorState, dataStyle));

      return;
    }

    // Let's just allow one color at a time. Turn off all active colors.
    const selection = editorState.getSelection();

    const nextContentState = Object.keys(styleMap).reduce(
      (contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color);
      },
      editorState.getCurrentContent()
    );

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      "change-inline-style"
    );

    const currentStyle = editorState.getCurrentInlineStyle();

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(dataStyle)) {
      nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, dataStyle);
    }

    setEditorState(nextEditorState);
  };

  const toggleBlockType = (e) => {
    e.preventDefault();

    setEditorState(
      RichUtils.toggleBlockType(editorState, e.currentTarget.dataset.blocktype)
    );
  };

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

  const saveText = () => {
    // Preventing save while site is still being developed
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);

    onSave(rawContentState);
  };

  const hasStyle = (style) => editorState.getCurrentInlineStyle().has(style);
  const hasBlockType = (blocktype) =>
    RichUtils.getCurrentBlockType(editorState) === blocktype;

  return (
    <>
      <EditorButtons>
        <EditorBtn
          onMouseDown={toggleStyle}
          data-style="BOLD"
          active={hasStyle("BOLD")}
        >
          <span>Bold</span>
        </EditorBtn>
        <EditorBtn
          onMouseDown={toggleStyle}
          data-style="ITALIC"
          active={hasStyle("ITALIC")}
        >
          <span>Italic</span>
        </EditorBtn>
        <EditorBtn
          onMouseDown={toggleStyle}
          data-style="UNDERLINE"
          active={hasStyle("UNDERLINE")}
        >
          <span>Underline</span>
        </EditorBtn>
        <EditorBtn
          onMouseDown={toggleBlockType}
          data-blocktype="unordered-list-item"
          active={hasBlockType("unordered-list-item")}
        >
          <span>UL</span>
        </EditorBtn>
        <EditorBtn
          onMouseDown={toggleBlockType}
          data-blocktype="ordered-list-item"
          active={hasBlockType("ordered-list-item")}
        >
          <span>OL</span>
        </EditorBtn>
        <div>
          <EditorBtn onClick={() => setShowColors((prev) => !prev)}>
            <span>Color</span>
          </EditorBtn>

          <CSSTransition
            in={showColors}
            timeout={200}
            classNames="fadeSlideDown"
            unmountOnExit
            nodeRef={nodeRef1}
          >
            <Dropdown ref={nodeRef1}>
              {COLORS.map((c) => (
                <EditorBtn
                  key={c.style}
                  data-style={c.style}
                  light
                  horizontal
                  onMouseDown={toggleStyle}
                  active={hasStyle(c.style)}
                >
                  <span>{c.label}</span>
                </EditorBtn>
              ))}
            </Dropdown>
          </CSSTransition>
        </div>
        <EditorBtn onMouseDown={toggleStyle} data-style="HIGHLIGHT">
          <span>Highlight</span>
        </EditorBtn>
      </EditorButtons>

      <EditorWrapper>
        <div>
          <h2>{newDateString}</h2>
        </div>
        <Editor
          ref={editor}
          customStyleMap={styleMap}
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={keyBindingFunction}
          placeholder="Enter something here"
        />
        <img src="/svg/machenLogoAlt.svg" alt="" />
      </EditorWrapper>

      {!isLanding && (
        <NoteFormRight>
          <NoteFormButton onClick={saveText}>
            <img src="/svg/tick.svg" alt="" />
          </NoteFormButton>
          <NoteFormButton onClick={onClose}>
            <img src="/svg/closeButton.svg" alt="" />
          </NoteFormButton>
        </NoteFormRight>
      )}
    </>
  );
};

export default TextEditor;
