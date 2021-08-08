import React, { FunctionComponent, useEffect, useState } from 'react'
import { useCMS } from 'tinacms'

const InlineWysiwyg: FunctionComponent<any> = (props) => {
  const cms = useCMS()
  const [{InlineWysiwyg}, setEditor] = useState({} as any);

  useEffect(() => {
    let canceled = false;
    if (!InlineWysiwyg && cms.enabled) {
      import('react-tinacms-inline')
        .then((result: any) => {
          if (!canceled) {
            setEditor(result);
          }
        });
    }
    return () => {
      canceled = true;
      if (InlineWysiwyg) {
        setEditor({});
      }
    };
  }, [cms.enabled]);

  if (InlineWysiwyg) {
    return (
      <InlineWysiwyg {...props}/>
    )
  }

  return props.children
}

export default InlineWysiwyg;
