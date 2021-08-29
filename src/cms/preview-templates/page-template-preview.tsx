import React, { FunctionComponent } from 'react';
import { PreviewTemplateComponentProps } from 'netlify-cms-core';

import Layout from '../../components/layout';
import { PageData } from '../../../gatsby-node';

const PageTemplatePreview: FunctionComponent<PreviewTemplateComponentProps> = ({ entry, getAsset }) => {
  const data: PageData = entry.getIn(['data']).toJS();
  const location: any = {href: "/home"};
  
  data.previewThumbnails = data.thumbnailUrls?.map(path => getAsset(path).url) || [];

  return (
    <Layout location={location} pageData={data}>
    </Layout>
  );
};

export default PageTemplatePreview;
