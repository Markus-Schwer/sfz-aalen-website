import CMS from 'netlify-cms-app';

import PageTemplatePreview from './preview-templates/page-template-preview';
import withStyledComponentsRendered from './style-injector';

CMS.registerPreviewTemplate('page', withStyledComponentsRendered(PageTemplatePreview));
