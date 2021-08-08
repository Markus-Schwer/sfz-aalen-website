import { FunctionComponent } from "react";
import ReactMarkdown from 'react-markdown';
import FullWidthSection from "../full-width-section";
import Image from "next/image";
import { Block, BlockComponentProps, BlocksControls, InlineBlocks, InlineGroup } from "react-tinacms-inline";
import InlineWysiwyg from "../inline-wysiwyg";
import InlineHeader from "../inline-header";

const ParagraphColumn: FunctionComponent<BlockComponentProps> = ({data, index}) => (
  <div className="col-6" style={{lineHeight: "1.5625"}}>
    <BlocksControls index={index}>
      <InlineWysiwyg name="paragraph" format="markdown">
        <ReactMarkdown>{data.paragraph}</ReactMarkdown>
      </InlineWysiwyg>
    </BlocksControls>
  </div>
);

const PictureColumn: FunctionComponent<BlockComponentProps> = ({data, index}) => (
  <div className="col-6" style={{position: "relative"}}>
    <BlocksControls index={index}>
      <Image src={data.picture}
             alt={data.altText}
             layout="responsive"
             objectFit="fill"
             width={data.width}
             height={data.height}/>
    </BlocksControls>
  </div>
);

const TwoColumnSection: FunctionComponent<BlockComponentProps> = ({data, index}) => {
  const sectionContent = (
    <>
      {data.header !== undefined ? (
        <InlineHeader data={data}/>
      ) : null}
      <InlineBlocks className="row" name="columns" blocks={ColumnsBlocks} direction="horizontal"/>
    </>
  );

  if (data.backgroundColor != undefined) {
    return (
      <BlocksControls index={index}>
        <InlineGroup name="" fields={TwoColumnFields}>
          <FullWidthSection style={{backgroundColor: data.backgroundColor}}>
            {sectionContent}
          </FullWidthSection>
        </InlineGroup>
      </BlocksControls>
    );
  } else {
    return (
      <BlocksControls index={index}>
        <InlineGroup name="" fields={TwoColumnFields}>
          <section>
            {sectionContent}
          </section>
        </InlineGroup>
      </BlocksControls>
    );
  }
}

const TwoColumnFields = [
  {
    name: "backgroundColor",
    label: "Hintergrund Farbe",
    component: "color",
    colorFormat: "hex"
  }
];

const ColumnsBlocks: { [key: string]: Block } = {
  picture: {
    Component: PictureColumn,
    template: {
      label: "Bild"
    }
  },
  paragraph: {
    Component: ParagraphColumn,
    template: {
      label: "Paragraph"
    }
  }
};

export default TwoColumnSection;
