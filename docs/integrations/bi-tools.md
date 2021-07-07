---
sidebar_position: 1
---

# BI Tools

While metriql is a relatively new project, we're working on integrating BI tools using our low-level integrations such as [REST API](rest-api) and [JDBC driver](jdbc-driver). If your BI tool already integrates with Trino (formerly Presto), you can use the metriql URL and port `5656` to connect your metriql server. Note that metriql doesn't embed Trino, it acts as Trino for the BI tools. However, it actually rewrites the query and directly runs it on your database.

Let us know if you would like to suggest a new integration on [Github](https://github.com/metriql/metriql/issues/new) or if you're a BI vendor looking to integrate metriql, join our community on [Slack](https://join.slack.com/t/metriql/shared_invite/zt-qp9ds5te-EqzlN79caX76uH~2yqygpA).


| BI Tool            | Status             | Source  |
|--------------------|--------------------|---------------------|
| rakam              | Completed  ✅    |  Native                                          
| Google Data Studio | Completed  ✅  | [Google Marketplace](https://datastudio.google.com/datasources/create?connectorId=AKfycbw8o0F6LEr0epNSNVWqNzlqo7R-6jRYxxSxBspzyg2Xi6SDFItLN_aM3l_U56Z0obwS) |
| Looker             | Completed  ✅  | [Github](https://github.com/metriql/metriql-lookml)
| Tableau            | Completed  ✅  | [Github](https://github.com/metriql/metriql-tableau)      |
| Metabase           | [🚧 In Progress](https://github.com/metriql/metriql/issues/6)  | Trino  |
| Superset           | [🚧 In Progress](https://github.com/metriql/metriql/issues/10) | Trino |
| Redash           | [🙋 Needs testing](https://github.com/metriql/metriql/issues/10) | [Trino](https://redash.io/data-sources/presto) |
| Mode Analytics           | [🙋 Needs testing](https://github.com/metriql/metriql/issues/10) | [Trino](https://mode.com/help/articles/supported-databases/#trino) |
| Qlik           | [🙋 Needs testing](https://github.com/metriql/metriql/issues/7)  | [Presto](https://help.qlik.com/en-US/connectors/Subsystems/ODBC_connector_help/Content/Connectors_ODBC/Presto/Create-Presto-connection.htm)  |   
| Sisense           | [🙋 Needs testing](https://github.com/metriql/metriql/issues/7)  | [Presto](https://www.sisense.com/data-connectors/presto/)  |   
| MicroStrategy           | [🙋 Needs testing](https://github.com/metriql/metriql/issues/7)  | [Presto](https://community.microstrategy.com/s/article/How-to-Connect-to-Presto?language=en_US)  |   
| Power BI           | [Queued](https://github.com/metriql/metriql/issues/7)  | XMLA or Trino-ODBC bridge  |   


Please note that all the integrations are in alpha stage at the moment.

You can also see our roadmap for the integrations [here](https://github.com/metriql/metriql/projects/1).
