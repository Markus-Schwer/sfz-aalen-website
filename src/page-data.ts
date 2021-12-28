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
}

export interface ParagraphColumn {
  type: "paragraph";
  text: string;
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
  numberColumns: number;
  columns: ImageColumn[] | ParagraphColumn[] | DividerColumn[];
}

export interface ColumnSection {
  type: "columnSection";
  backgroundColor?: string;
  textColor: string;
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
    image?: { publicURL: string; extension: string; } & ImageDataLike;
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
  pageSections: BigHeaderSection[] |
  BigTextSection[] |
  HeaderOnlySection[] |
  ColumnSection[] |
  BubbleSection[] |
  GridSection[] |
  BannerSection[];
}
