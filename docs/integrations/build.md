---
sidebar_position: 3
---

# Building new integrations

metriql has two low-level APIs: [JDBC Driver](jdbc-driver) and [REST API](/rest-api). We plan to implement BI tools using these low-level APIs. If you're looking to implement metriql to your preferred BI tool, look for the relevant issue on Github and open one if it doesn't exist. Any contribution is welcomed at this point. metriql is a relatively new project, and we're aware that integrations make it powerful!

:::tip Implementation for programming languages
We do not plan to develop native API clients for different programming languages because of maintenance issues. While we're using Open API, the code generation tools introduce too much verbose code. We prefer keeping the REST API as clean as possible so that you can pick your favorite HTTP Client and send JSON data to metriql API internally.
:::