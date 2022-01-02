import CMS from 'netlify-cms-app';

import PageTemplatePreview from './preview-templates/page-template-preview';
import NavigationPreview from './preview-templates/navigation-preview';
import withStyledComponentsRendered from './style-injector';
import withApollo from './apollo-injector';
import WorkshopPreview from './preview-templates/workshop-preview';
import ArticlePreview from './preview-templates/article-preview';

CMS.registerPreviewTemplate('page', withApollo(withStyledComponentsRendered(PageTemplatePreview)));
CMS.registerPreviewTemplate('workshop', withStyledComponentsRendered(WorkshopPreview));
CMS.registerPreviewTemplate('article', withStyledComponentsRendered(ArticlePreview));
CMS.registerPreviewTemplate('navigation', withStyledComponentsRendered(NavigationPreview));
