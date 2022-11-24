import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import "rapidoc";

// const STATIC_SPEC = 'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v2.0/json/petstore-simple.json';
const STATIC_SPEC = 'schema/openapi.json';

function CustomPage() {
  return (
    <Layout title="Open API Docs" description="Open API Reference Docs for API">
      <rapi-doc
      style={{ height: "100vh", width: "100%" }}
      spec-url="http://localhost:3000/schema/openapi.json"
      render-style="focused"
    />
    </Layout> 
  );
}

export default CustomPage;