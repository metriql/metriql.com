import React from 'react';
import Layout from '@theme/Layout';
import Redoc from '@theme/Redoc';
import useBaseUrl from '@docusaurus/useBaseUrl';

// const STATIC_SPEC = 'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v2.0/json/petstore-simple.json';
const STATIC_SPEC = 'openapi.json';

function CustomPage() {
  return (
    <Layout title="Open API Docs" description="Open API Reference Docs for API">
      <Redoc specUrl={useBaseUrl(STATIC_SPEC)} />
    </Layout> 
  );
}

export default CustomPage;