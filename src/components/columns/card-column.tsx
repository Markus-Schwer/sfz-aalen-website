import React, { FunctionComponent } from "react";
import styled from "styled-components";

import { CardColumn as CardColumnData } from "../../page-data";
import Card from "../card";

import { Column, GridSizes } from "../grid";

const StyledColumn = styled(Column)`
  padding-top: 0;
  padding-bottom: 0;
`;

type CardColumnProps = {
  columnData: CardColumnData;
  columnWidth: GridSizes;
};

const CardColumn: FunctionComponent<CardColumnProps> = ({
  columnData,
  columnWidth,
  children
}) => {
  return (
    <StyledColumn sm={12} md={12} lg={columnWidth}>
      <Card
        header={columnData.header.header}
        anchorId={columnData.header.anchorId}
        imageData={columnData.header.image}
        previewImage={columnData.header.previewImage}
        imageAlt={columnData.header.altText}
      >
        {children}
      </Card>
    </StyledColumn>
  );
};

export default CardColumn;
