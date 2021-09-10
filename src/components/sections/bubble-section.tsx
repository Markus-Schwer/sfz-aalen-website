import React, { FunctionComponent } from "react";
import { BubbleSection as BubbleSectionData } from "../../../gatsby-node";

import Bubble from "../bubble";

import FullWidthSection from "../full-width-section";
import Grid from "../grid";

type BubbleSectionProps = {
  data: BubbleSectionData
};

const BubbleSection: FunctionComponent<BubbleSectionProps> = ({data}) => {
  const numberOfColumns = data.numberColumns || 2;
  const sectionChildren = (
    <Grid columns={numberOfColumns} gap={0}>
      {data.bubbles?.map((bubble, index) => (
        <Bubble
          icon={bubble.image?.extension === "svg" ? bubble.image?.publicURL : undefined}
          iconPreview={bubble.imageUrl?.endsWith("svg") ? bubble.previewImage : undefined}
          image={bubble.image}
          previewImage={!bubble.imageUrl?.endsWith("svg") ?bubble.previewImage : undefined}
          text={bubble.text}
          color={bubble.color}
          href={bubble.href}
          key={index}
        />
      ))}
    </Grid>
  );

  if (!!data.backgroundColor) {
    return (
      <FullWidthSection style={{ backgroundColor: data.backgroundColor }}>
        {sectionChildren}
      </FullWidthSection>
    );
  } else {
    return <section>{sectionChildren}</section>;
  }
}

export default BubbleSection;
