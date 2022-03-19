import CMS from 'netlify-cms-app';

import PageTemplatePreview from './preview-templates/page-template-preview';
import NavigationPreview from './preview-templates/navigation-preview';
import { withStyledComponentsRendered } from './style-injector';
import { withApollo } from './apollo-injector';
import { withRouter } from './router-injector';
import WorkshopPreview from './preview-templates/workshop-preview';
import ArticlePreview from './preview-templates/article-preview';

CMS.registerPreviewTemplate('page', withRouter(withApollo(withStyledComponentsRendered(PageTemplatePreview))));
CMS.registerPreviewTemplate('workshop', withRouter(withStyledComponentsRendered(WorkshopPreview)));
CMS.registerPreviewTemplate('article', withRouter(withStyledComponentsRendered(ArticlePreview)));
CMS.registerPreviewTemplate('navigation', withStyledComponentsRendered(NavigationPreview));

CMS.registerEditorComponent({
  id: "download-link",
  label: "Download Link",
  fields: [
    {
      name: 'text',
      label: 'Text',
      widget: 'string'
    },
    {
      name: 'file',
      label: 'Dateiname',
      widget: 'file'
    }
  ],
  pattern: /<a href="(.*?)" download(?:=".*?")?>(.*?)<\/a>/,
  fromBlock: (match: any) => ({
    file: match[1],
    text: match[2]
  }),
  toBlock: (data) => {
    return `<a href="${data.file || ""}" download>${data.text || ""}</a>`;
  },
  toPreview: (data) => {
    return `<a href="${data.file || ""}" download>${data.text || ""}</a>`;
  }
});
