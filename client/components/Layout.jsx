import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';

export default props => (
  <Container>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css" />
    </Head>

    {props.children}
  </Container>
);
