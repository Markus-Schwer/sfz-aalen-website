import styled from "styled-components";

const Grid = styled.div.attrs((props: { columns: number; gap: number }) => props)`
  display: grid;
  gap: ${props => props.gap}px;
  grid-template-columns: repeat(
    auto-fill,
    minmax(
      calc(
        calc(1108px - ${(props) => (props.columns - 1) * props.gap}px) /
          ${(props) => props.columns}
      ),
      1fr
    )
  );
`;

export default Grid;
