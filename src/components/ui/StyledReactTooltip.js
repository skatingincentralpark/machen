import styled from "styled-components";
import ReactTooltip from "react-tooltip";

export const StyledReactTooltip = styled(ReactTooltip)`
  &.type-dark.place-top {
    background-color: blue;
    padding: 0.3rem 1rem;

    &:after {
      border-top-color: blue;
    }
  }
`;
