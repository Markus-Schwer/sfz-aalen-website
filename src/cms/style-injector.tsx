import React, { useState, useEffect, FunctionComponent } from 'react';
import { StyleSheetManager } from 'styled-components';

const StyleInjector: FunctionComponent = ({ children }) => {
  const [iframeRef, setIframeRef] = useState<HTMLHeadElement | null>(null);

  useEffect(() => {
    const iframe = document.getElementsByTagName('iframe')[0];
    const iframeHeadElem = iframe.contentDocument?.head || null;
    setIframeRef(iframeHeadElem);
  }, []);

  return (
    iframeRef && (
      <StyleSheetManager target={iframeRef}>{children}</StyleSheetManager>
    )
  );
};

export function withStyledComponentsRendered(Comp: FunctionComponent<any>) {
  return (props: any) => (
    <StyleInjector>
      <Comp {...props} />
    </StyleInjector>
  );
}
