import { FunctionComponent } from "react";
import { HeaderOnlySectionType } from "../../pages/[filename]";

type HeaderOnlySectionProps = {
  pageSection: HeaderOnlySectionType
}

const HeaderOnlySection: FunctionComponent<HeaderOnlySectionProps> = ({pageSection}) => {
  return (
    <section>
      <h1>{pageSection.headerOnlyHeader.mainHeader}</h1>
      <h2>{pageSection.headerOnlyHeader.subHeader}</h2>
      {pageSection.headerOnlyHeader.divider ? <hr /> : null}
    </section>
  );
}

export default HeaderOnlySection;
