import React, { FunctionComponent } from "react";

type ConditionalWrapperProps = {
  condition: boolean;
  wrapper: (children: React.ReactElement) => JSX.Element;
  children: React.ReactElement;
};

const ConditionalWrapper: FunctionComponent<ConditionalWrapperProps> = ({
  condition,
  wrapper,
  children,
}) => (condition ? wrapper(children) : <>{children}</>);

export default ConditionalWrapper;
