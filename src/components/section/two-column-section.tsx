import { FunctionComponent } from "react";
import mainContentStyles from "../main-content.module.scss";
import FullWidthSection from "../full-width-section";
import Image from "next/image";
import { TwoColumnSectionType } from "../../pages/[filename]";

type TwoColumnSectionProps = {
  pageSection: TwoColumnSectionType
}

const TwoColumnSection: FunctionComponent<TwoColumnSectionProps> = ({pageSection}) => {
  let columns = [];
  for (const index in pageSection.columns) {
    const column = pageSection.columns[index];
    switch (column.__typename) {
      case "PagesPageSectionsTwoColumnSectionColumnsPicture":
        columns.push((
          <div className="col-6" style={{position: "relative"}} key={index}>
            <Image src={column.picture}
                   alt={column.altText}
                   layout="responsive"
                   objectFit="fill"
                   width={column.width}
                   height={column.height}/>
          </div>
        ));
        break;
      case "PagesPageSectionsTwoColumnSectionColumnsParagraph":
        columns.push((
          <p className="col-6" style={{margin: 0, lineHeight: "1.5625"}} key={index}>
            {column.paragraph}
          </p>
        ));
        break;
    }
  }

  const sectionChildren = (
    <>
      {pageSection.twoColumnHeader !== undefined ? (
        <>
          <h1>{pageSection.twoColumnHeader.mainHeader}</h1>
          <h2>{pageSection.twoColumnHeader.subHeader}</h2>
          {pageSection.twoColumnHeader.divider ? <hr
            className={pageSection.backgroundColor ? mainContentStyles.inverted : null}/> : null}
        </>
      ) : null}
      {pageSection.columns.length == 2 ? (
        <div className="row">
          {columns}
        </div>
      ) : null}
    </>
  );

  if (pageSection.backgroundColor != undefined) {
    return (
      <FullWidthSection style={{backgroundColor: pageSection.backgroundColor}}>
        {sectionChildren}
      </FullWidthSection>
    );
  } else {
    return (
      <section>
        {sectionChildren}
      </section>
    );
  }
}

export default TwoColumnSection;
