import React, { FunctionComponent } from 'react';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: "/__graphql" })
});

export function withApollo(Comp: FunctionComponent<any>) {
  return (props: any) => (
    <ApolloProvider client={client}>
      <Comp {...props} />
    </ApolloProvider>
  );
}
