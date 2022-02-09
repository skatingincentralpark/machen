import styled from "styled-components";

export const StyledHabitList = styled.ul`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  text-align: right;

  // Make these use global values
  font-family: ${({ theme }) => theme.font.serif};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  color: #999999;

  & li {
    text-align: right;
    list-style: none;
  }
`;
