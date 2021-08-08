import { FunctionComponent } from "react";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { TinaProvider, TinaCMS as StaticTinaCMS } from "tinacms";
import { TinaEditProvider } from "tinacms/dist/edit-state";
import { TinaCloudCloudinaryMediaStore } from "next-tinacms-cloudinary";
import "normalize.css";
import "@fontsource/open-sans";
import "@fontsource/open-sans/700.css";
import "../styles/typography.scss"
import "../styles/global.scss";

const TinaCMS = dynamic(() => import("tinacms"), {ssr: false});

const NEXT_PUBLIC_USE_LOCAL_CLIENT = process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT || 0;

const App: FunctionComponent<AppProps> = ({Component, pageProps}) => {
  const cms = new StaticTinaCMS({enabled: false});
  return (
    <>
      <TinaEditProvider
        editMode={
          <TinaCMS
            clientId={process.env.NEXT_PUBLIC_TINA_CLIENT_ID}
            branch={process.env.NEXT_PUBLIC_EDIT_BRANCH}
            organization={process.env.NEXT_PUBLIC_ORGANIZATION_NAME}
            isLocalClient={Boolean(
              Number(NEXT_PUBLIC_USE_LOCAL_CLIENT)
            )}
            mediaStore={TinaCloudCloudinaryMediaStore}
            cmsCallback={(cms) => {
              import("react-tinacms-editor")
                .then(({MarkdownFieldPlugin, HtmlFieldPlugin}) => {
                  cms.plugins.add(MarkdownFieldPlugin);
                  cms.plugins.add(HtmlFieldPlugin);
                });
            }}
            {...pageProps}
          >
            {(livePageProps: any) => <Component {...livePageProps} />}
          </TinaCMS>
        }
      >
        <TinaProvider cms={cms}>
          <Component {...pageProps} />
        </TinaProvider>
      </TinaEditProvider>
    </>
  )
}

export default App
