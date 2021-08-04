import { FunctionComponent } from "react";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { TinaEditProvider } from "tinacms/dist/edit-state";
import "normalize.css";
import "@fontsource/open-sans";
import "@fontsource/open-sans/700.css";
import "../styles/typography.scss"
import "../styles/global.scss";

const TinaCMS = dynamic(() => import("tinacms"), {ssr: false});

const App: FunctionComponent<AppProps> = ({Component, pageProps}) => {
  return (
    <>
      <TinaEditProvider
        editMode={
          <TinaCMS
            clientId={process.env.NEXT_PUBLIC_TINA_CLIENT_ID}
            branch={process.env.NEXT_PUBLIC_EDIT_BRANCH}
            organization={process.env.NEXT_PUBLIC_ORGANIZATION_NAME}
            isLocalClient={Boolean(
              Number(process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT ?? true)
            )}
            {...pageProps}
          >
            {(livePageProps: any) => <Component {...livePageProps} />}
          </TinaCMS>
        }
      >
        <Component {...pageProps} />
      </TinaEditProvider>
    </>
  )
}

export default App
