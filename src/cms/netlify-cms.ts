import CMS from 'netlify-cms-app';

import PageTemplatePreview from './preview-templates/page-template-preview';
import NavigationPreview from './preview-templates/navigation-preview';
import WorkshopPreview from './preview-templates/workshops-preview';
import withStyledComponentsRendered from './style-injector';

CMS.registerPreviewTemplate('page', withStyledComponentsRendered(PageTemplatePreview));
CMS.registerPreviewTemplate('workshop', withStyledComponentsRendered(WorkshopPreview));
CMS.registerPreviewTemplate('navigation', withStyledComponentsRendered(NavigationPreview));
