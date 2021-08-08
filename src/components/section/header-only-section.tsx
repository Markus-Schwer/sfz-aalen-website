import { FunctionComponent } from "react";
import { BlockComponentProps, BlocksControls } from "react-tinacms-inline";
import InlineHeader from "../inline-header";

const HeaderOnlySection: FunctionComponent<BlockComponentProps> = ({data, index}) => {
  return (
    <BlocksControls index={index}>
      <section>
        <InlineHeader data={data}/>
      </section>
    </BlocksControls>
  );
}

export default HeaderOnlySection;
