# Building new integrations

metriql has two low-level APIs: [JDBC Driver](jdbc-driver) and [REST API](/rest-api). We plan to implement BI tools using these low level APIs. If you're looking to implement metriql to your preferred BI tool, look for the relevant issue on Github and open one if it doesn't exist. Any contribution is welcomed at this point becase metriql is relavitely new project and we're aware that integrations will make it powerful!

:::tip Implementation for programming languages
We do not plan to develop native API clients for different programming languages because of the maintaince issues. While we're using Open API, the code generation tools introduce too much verbose code so we prefer keeping the REST API clean as possible so that you can pick your favourite HTTP Client and send JSON data to metriql API internally.
:::