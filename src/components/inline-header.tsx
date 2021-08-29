import { FunctionComponent } from "react";
import * as layoutStyles from "./layout.module.scss";

type InlineHeaderProps = {
  data: {
    header: {
      mainHeader: string;
      subHeader: string;
      divider: boolean;
    };
    backgroundColor?: string;
  };
};

const InlineHeader: FunctionComponent<InlineHeaderProps> = ({ data }) => {
  return (
    <>
      <h1>{data.header.mainHeader}</h1>
      <h2>{data.header.subHeader}</h2>
      {data.header.divider ? (
        <hr className={data.backgroundColor ? layoutStyles.inverted : null} />
      ) : null}
    </>
  );
};

export default InlineHeader;
