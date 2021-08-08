// DO NOT MODIFY THIS FILE. This file is automatically generated by Tina
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** References another document, used as a foreign key */
  Reference: any;
  JSON: any;
};



export type SystemInfo = {
  __typename?: 'SystemInfo';
  filename: Scalars['String'];
  basename: Scalars['String'];
  breadcrumbs: Array<Scalars['String']>;
  path: Scalars['String'];
  relativePath: Scalars['String'];
  extension: Scalars['String'];
  template: Scalars['String'];
  collection: Collection;
};


export type SystemInfoBreadcrumbsArgs = {
  excludeExtension?: Maybe<Scalars['Boolean']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasPreviousPage: Scalars['Boolean'];
  hasNextPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
  endCursor: Scalars['String'];
};

export type Node = {
  id: Scalars['ID'];
};

export type Document = {
  sys?: Maybe<SystemInfo>;
  id: Scalars['ID'];
};

/** A relay-compliant pagination connection */
export type Connection = {
  totalCount: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  getCollection: Collection;
  getCollections: Array<Collection>;
  node: Node;
  getDocument: DocumentNode;
  getDocumentList: DocumentConnection;
  getPagesDocument: PagesDocument;
  getPagesList: PagesConnection;
};


export type QueryGetCollectionArgs = {
  collection?: Maybe<Scalars['String']>;
};


export type QueryNodeArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryGetDocumentArgs = {
  collection?: Maybe<Scalars['String']>;
  relativePath?: Maybe<Scalars['String']>;
};


export type QueryGetDocumentListArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryGetPagesDocumentArgs = {
  relativePath?: Maybe<Scalars['String']>;
};


export type QueryGetPagesListArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type DocumentConnectionEdges = {
  __typename?: 'DocumentConnectionEdges';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<DocumentNode>;
};

export type DocumentConnection = Connection & {
  __typename?: 'DocumentConnection';
  pageInfo?: Maybe<PageInfo>;
  totalCount: Scalars['Int'];
  edges?: Maybe<Array<Maybe<DocumentConnectionEdges>>>;
};

export type Collection = {
  __typename?: 'Collection';
  name: Scalars['String'];
  slug: Scalars['String'];
  label: Scalars['String'];
  path: Scalars['String'];
  format?: Maybe<Scalars['String']>;
  matches?: Maybe<Scalars['String']>;
  templates?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  fields?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  documents: DocumentConnection;
};


export type CollectionDocumentsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type DocumentNode = PagesDocument;

export type PagesMotto = {
  __typename?: 'PagesMotto';
  mottoText?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['String']>;
};

export type PagesPageSectionsBigHeader = {
  __typename?: 'PagesPageSectionsBigHeader';
  headerText?: Maybe<Scalars['String']>;
};

export type PagesPageSectionsHeaderOnlySectionHeader = {
  __typename?: 'PagesPageSectionsHeaderOnlySectionHeader';
  mainHeader?: Maybe<Scalars['String']>;
  subHeader?: Maybe<Scalars['String']>;
  divider?: Maybe<Scalars['Boolean']>;
};

export type PagesPageSectionsHeaderOnlySection = {
  __typename?: 'PagesPageSectionsHeaderOnlySection';
  header: PagesPageSectionsHeaderOnlySectionHeader;
};

export type PagesPageSectionsTwoColumnSectionHeader = {
  __typename?: 'PagesPageSectionsTwoColumnSectionHeader';
  mainHeader?: Maybe<Scalars['String']>;
  subHeader?: Maybe<Scalars['String']>;
  divider?: Maybe<Scalars['Boolean']>;
};

export type PagesPageSectionsTwoColumnSectionColumnsPicture = {
  __typename?: 'PagesPageSectionsTwoColumnSectionColumnsPicture';
  picture: Scalars['String'];
  altText?: Maybe<Scalars['String']>;
  width: Scalars['Int'];
  height: Scalars['Int'];
};

export type PagesPageSectionsTwoColumnSectionColumnsParagraph = {
  __typename?: 'PagesPageSectionsTwoColumnSectionColumnsParagraph';
  paragraph: Scalars['String'];
};

export type PagesPageSectionsTwoColumnSectionColumns = PagesPageSectionsTwoColumnSectionColumnsPicture | PagesPageSectionsTwoColumnSectionColumnsParagraph;

export type PagesPageSectionsTwoColumnSection = {
  __typename?: 'PagesPageSectionsTwoColumnSection';
  header: PagesPageSectionsTwoColumnSectionHeader;
  backgroundColor?: Maybe<Scalars['String']>;
  columns: Array<PagesPageSectionsTwoColumnSectionColumns>;
};

export type PagesPageSectionsIconBubbleSectionBubbles = {
  __typename?: 'PagesPageSectionsIconBubbleSectionBubbles';
  text?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  backgroundColor: Scalars['String'];
  href?: Maybe<Scalars['String']>;
};

export type PagesPageSectionsIconBubbleSection = {
  __typename?: 'PagesPageSectionsIconBubbleSection';
  numberColumns?: Maybe<Scalars['Int']>;
  bubbles: Array<PagesPageSectionsIconBubbleSectionBubbles>;
};

export type PagesPageSections = PagesPageSectionsBigHeader | PagesPageSectionsHeaderOnlySection | PagesPageSectionsTwoColumnSection | PagesPageSectionsIconBubbleSection;

export type Pages = {
  __typename?: 'Pages';
  breadcrumbs?: Maybe<Array<Maybe<Scalars['String']>>>;
  logoScrollEffect?: Maybe<Scalars['Boolean']>;
  coverImages?: Maybe<Array<Maybe<Scalars['String']>>>;
  motto?: Maybe<Array<Maybe<PagesMotto>>>;
  pageSections?: Maybe<Array<Maybe<PagesPageSections>>>;
};

export type PagesDocument = Node & Document & {
  __typename?: 'PagesDocument';
  id: Scalars['ID'];
  sys: SystemInfo;
  data: Pages;
  form: Scalars['JSON'];
  values: Scalars['JSON'];
  dataJSON: Scalars['JSON'];
};

export type PagesConnectionEdges = {
  __typename?: 'PagesConnectionEdges';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<PagesDocument>;
};

export type PagesConnection = Connection & {
  __typename?: 'PagesConnection';
  pageInfo?: Maybe<PageInfo>;
  totalCount: Scalars['Int'];
  edges?: Maybe<Array<Maybe<PagesConnectionEdges>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPendingDocument: DocumentNode;
  updateDocument: DocumentNode;
  updatePagesDocument: PagesDocument;
};


export type MutationAddPendingDocumentArgs = {
  collection: Scalars['String'];
  relativePath: Scalars['String'];
  template?: Maybe<Scalars['String']>;
};


export type MutationUpdateDocumentArgs = {
  collection: Scalars['String'];
  relativePath: Scalars['String'];
  params: DocumentMutation;
};


export type MutationUpdatePagesDocumentArgs = {
  relativePath: Scalars['String'];
  params: PagesMutation;
};

export type DocumentMutation = {
  pages?: Maybe<PagesMutation>;
};

export type PagesMottoMutation = {
  mottoText?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['String']>;
};

export type PagesPageSectionsBigHeaderMutation = {
  headerText?: Maybe<Scalars['String']>;
};

export type PagesPageSectionsHeaderOnlySectionHeaderMutation = {
  mainHeader?: Maybe<Scalars['String']>;
  subHeader?: Maybe<Scalars['String']>;
  divider?: Maybe<Scalars['Boolean']>;
};

export type PagesPageSectionsHeaderOnlySectionMutation = {
  header?: Maybe<PagesPageSectionsHeaderOnlySectionHeaderMutation>;
};

export type PagesPageSectionsTwoColumnSectionHeaderMutation = {
  mainHeader?: Maybe<Scalars['String']>;
  subHeader?: Maybe<Scalars['String']>;
  divider?: Maybe<Scalars['Boolean']>;
};

export type PagesPageSectionsTwoColumnSectionColumnsPictureMutation = {
  picture?: Maybe<Scalars['String']>;
  altText?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
};

export type PagesPageSectionsTwoColumnSectionColumnsParagraphMutation = {
  paragraph?: Maybe<Scalars['String']>;
};

export type PagesPageSectionsTwoColumnSectionColumnsMutation = {
  picture?: Maybe<PagesPageSectionsTwoColumnSectionColumnsPictureMutation>;
  paragraph?: Maybe<PagesPageSectionsTwoColumnSectionColumnsParagraphMutation>;
};

export type PagesPageSectionsTwoColumnSectionMutation = {
  header?: Maybe<PagesPageSectionsTwoColumnSectionHeaderMutation>;
  backgroundColor?: Maybe<Scalars['String']>;
  columns?: Maybe<Array<Maybe<PagesPageSectionsTwoColumnSectionColumnsMutation>>>;
};

export type PagesPageSectionsIconBubbleSectionBubblesMutation = {
  text?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  backgroundColor?: Maybe<Scalars['String']>;
  href?: Maybe<Scalars['String']>;
};

export type PagesPageSectionsIconBubbleSectionMutation = {
  numberColumns?: Maybe<Scalars['Int']>;
  bubbles?: Maybe<Array<Maybe<PagesPageSectionsIconBubbleSectionBubblesMutation>>>;
};

export type PagesPageSectionsMutation = {
  bigHeader?: Maybe<PagesPageSectionsBigHeaderMutation>;
  headerOnlySection?: Maybe<PagesPageSectionsHeaderOnlySectionMutation>;
  twoColumnSection?: Maybe<PagesPageSectionsTwoColumnSectionMutation>;
  iconBubbleSection?: Maybe<PagesPageSectionsIconBubbleSectionMutation>;
};

export type PagesMutation = {
  breadcrumbs?: Maybe<Array<Maybe<Scalars['String']>>>;
  logoScrollEffect?: Maybe<Scalars['Boolean']>;
  coverImages?: Maybe<Array<Maybe<Scalars['String']>>>;
  motto?: Maybe<Array<Maybe<PagesMottoMutation>>>;
  pageSections?: Maybe<Array<Maybe<PagesPageSectionsMutation>>>;
};

