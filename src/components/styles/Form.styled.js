import styled from "styled-components";

export const StyledTextArea = styled.textarea`
  background: #f7f7f7;
  width: 100%;
  height: 100%;
  text-align: center;
  resize: none;
  border: none;
  outline: none;

  // Make these use global values
  font-family: ${({ theme }) => theme.font.serif};
  color: #999999;
`;
