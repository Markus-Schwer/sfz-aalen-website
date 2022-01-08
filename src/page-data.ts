import { ImageDataLike } from "gatsby-plugin-image";

export interface BigHeaderSection {
  type: "bigHeaderSection";
  text: string;
}

export interface BigTextSection {
  type: "bigTextSection";
  text: string;
}

export interface HeaderOnlySection {
  type: "headerOnlySection";
  sectionId?: string;
  mainHeader: string;
  subHeader: string;
  divider: boolean;
}

export interface ImageColumn {
  type: "image";
  image?: ImageDataLike;
  imageUrl?: string;
  previewImage?: string;
  altText: string;
  width?: number;
}

export interface ParagraphColumn {
  type: "paragraph";
  text: string;
  width?: number;
}

export interface DividerColumn {
  type: "divider";
  divider: boolean;
}

export interface CardColumn {
  type: "card";
  header: {
    header: string;
    anchorId?: string;
    image?: ImageDataLike;
    imageUrl?: string;
    previewImage?: string;
    altText: string;
  };
  width?: number;
  numberColumns: number;
  columns: ImageColumn[] | ParagraphColumn[] | DividerColumn[];
}

export interface ColumnSection {
  type: "columnSection";
  backgroundColor?: string;
  header: {
    divider: boolean;
    sectionId?: string;
    mainHeader: string;
    subHeader: string;
  };
  numberColumns: number;
  columns: ImageColumn[] | ParagraphColumn[] | DividerColumn[] | CardColumn[];
}

export type BubbleSection = {
  type: "bubbleSection";
  numberColumns: number;
  backgroundColor?: string;
  bubbles: {
    text: string;
    image?: { publicURL: string; extension: string } & ImageDataLike;
    imageUrl?: string;
    previewImage?: string;
    color: "primary" | "secondary" | "tertiary";
    href?: string;
  }[];
};

export interface GridSection {
  type: "gridSection";
  items: {
    image?: ImageDataLike;
    imageUrl?: string;
    previewImage?: string;
    altText: string;
    description: string;
  }[];
}

export interface BannerSection {
  type: "bannerSection";
  color: "primary" | "secondary" | "tertiary";
  mainText: string;
  subText: string;
  href?: string;
}

export interface WorkshopsSection {
  type: "workshopsSection";
  backgroundColor?: string;
  workshopOrder: string[];
  workshops: {
    title: string;
    thumbnail: {
      image?: ImageDataLike;
      imageUrl?: string;
      previewImage?: string;
      altText: string;
    };
    header: string;
    numberColumns: number;
    columns: {
      type: "image" | "paragraph";
      altText: string;
      image?: ImageDataLike;
      imageUrl?: string;
      previewImage?: string;
      text: string;
    }[];
    footer: string;
    fields: {
      slug: string;
    };
  }[];
}

export interface SpacerSection {
  type: "spacerSection";
  spacer: boolean;
}

export interface AccordionSection {
  type: "accordionSection";
  items: {
    header: string;
    text: string;
  }[];
}

export interface PageData {
  id?: string;
  title: string;
  path: string;
  thumbnails?: ImageDataLike[];
  thumbnailUrls?: string[];
  previewThumbnails?: string[];
  breadcrumbs: string[];
  motto: {
    text: string;
    size: string;
    color: string;
  }[];
  pageSections:
    | BigHeaderSection[]
    | BigTextSection[]
    | HeaderOnlySection[]
    | ColumnSection[]
    | BubbleSection[]
    | GridSection[]
    | BannerSection[]
    | WorkshopsSection[]
    | SpacerSection[]
    | AccordionSection[];
}

export interface ArticleData {
  id: string;
  title: string;
  thumbnail: {
    image?: ImageDataLike;
    previewImage?: string;
    altText: string;
  };
  mainHeader: string;
  subHeader?: string;
  introduction?: string;
  creationDate: string; // YYYY-MM-DD
  text: string;
  fields: {
    slug: string;
  };
}
