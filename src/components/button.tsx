import styled from "styled-components";

export default styled.button`
  padding: 0.75em 2.5em;
  border: 3px solid var(--tertiary);
  border-radius: 10px;
  background-color: var(--tertiary);
  color: var(--text-color-light);
  font-weight: bold;
  font-size: 1em;
  cursor: pointer;
  text-decoration: none;

  &:focus {
    border-color: var(--secondary);
  }

  &:hover {
    background-color: var(--secondary);
    border-color: var(--secondary);
  }
`;
