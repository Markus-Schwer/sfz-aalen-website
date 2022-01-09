import React, { FunctionComponent } from "react";
import { LocationProvider } from "@reach/router";

export function withRouter(Comp: FunctionComponent<any>) {
  return (props: any) => (
    <LocationProvider>
      <Comp {...props} />
    </LocationProvider>
  );
}
