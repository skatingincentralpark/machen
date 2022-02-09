import React, { useState, useEffect } from "react";

import { StyledNoteForm } from "./Calendar.styled";
import { StyledTextArea } from "../styles/Form.styled";
import { StyledLogoNoteForm } from "../styles/Image.styled";
import { StyledButton, StyledCloseButton } from "../styles/Button.styled";

const NewNoteForm = ({ newFormData, setShowNoteForm }) => {
  const { date, notes } = newFormData;

  // @@    To-Do
  // @@    New Note Form
  //            1) SVG bottom right & corresponding styled component
  //            2) OnChange textarea and submit correct data
  //            3) Close button

  const [formText, setFormText] = useState(notes);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formText);
  };

  return (
    <StyledNoteForm id="new-note-form">
      <h1>Should Say Selected date ({date})</h1>
      <StyledCloseButton onClick={() => setShowNoteForm(false)}>
        <img src="/svg/closeButton.svg" alt="" />
      </StyledCloseButton>
      <hr />
      <form onSubmit={handleSubmit}>
        <StyledTextArea
          name=""
          id=""
          cols="30"
          rows="10"
          value={formText}
          onChange={(e) => setFormText(e.target.value)}
        />
        <StyledButton>Submit</StyledButton>
      </form>
      <StyledLogoNoteForm src="/svg/machenLogoAlt.svg" alt="" />
    </StyledNoteForm>
  );
};

export default NewNoteForm;
