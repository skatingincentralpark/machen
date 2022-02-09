import { StyledCloseButton } from "../styles/Button.styled";

const CloseButton = ({ onClick }) => {
  return (
    <StyledCloseButton onClick={onClick}>
      <img src="/svg/closeButton.svg" alt="" />
    </StyledCloseButton>
  );
};

export default CloseButton;
