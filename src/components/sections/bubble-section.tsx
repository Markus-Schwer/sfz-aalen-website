import React, { FunctionComponent } from "react";
import { BubbleSection as BubbleSectionData } from "../../page-data";

import Bubble from "../bubble";
import ConditionalWrapper from "../conditional-wrapper";

import FullWidthSection from "../full-width-section";
import { Row, Column } from "../grid";

type BubbleSectionProps = {
  data: BubbleSectionData;
};

const BubbleSection: FunctionComponent<BubbleSectionProps> = ({ data }) => {
  return (
    <ConditionalWrapper
      condition={!!data.backgroundColor}
      wrapper={(children) => (
        <FullWidthSection style={{ backgroundColor: data.backgroundColor }}>
          {children}
        </FullWidthSection>
      )}
    >
      <section>
        <Row>
          {data.bubbles?.map((bubble, index) => (
            <Column sm={12} md={6} lg={(12/data.numberColumns) as any} key={index}>
              <Bubble
                icon={
                  bubble.image?.extension === "svg"
                    ? bubble.image?.publicURL
                    : undefined
                }
                iconPreview={
                  bubble.imageUrl?.endsWith("svg")
                    ? bubble.previewImage
                    : undefined
                }
                image={bubble.image}
                previewImage={
                  !bubble.imageUrl?.endsWith("svg")
                    ? bubble.previewImage
                    : undefined
                }
                text={bubble.text}
                color={bubble.color}
                href={bubble.href}
              />
            </Column>
          ))}
        </Row>
      </section>
    </ConditionalWrapper>
  );
};

export default BubbleSection;
