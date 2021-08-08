import { FunctionComponent } from "react";
import { InlineTextarea } from "react-tinacms-inline";
import mainContentStyles from "./main-content.module.scss";

type InlineHeaderProps = {
  data: {
    header: {
      mainHeader: string,
      subHeader: string,
      divider: boolean
    },
    backgroundColor?: string
  }
}

const InlineHeader: FunctionComponent<InlineHeaderProps> = ({data}) => {
  return (
    <>
      <h1>
        <InlineTextarea name="header.mainHeader">
          {data.header.mainHeader}
        </InlineTextarea>
      </h1>
      <h2>
        <InlineTextarea name="header.subHeader">
          {data.header.subHeader}
        </InlineTextarea>
      </h2>
      {data.header.divider ? <hr
        className={data.backgroundColor ? mainContentStyles.inverted : null}/> : null}
    </>
  );
};

export default InlineHeader;
