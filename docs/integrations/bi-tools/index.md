---
sidebar_position: 1
---

# Introduction

While metriql is a relatively new project, we're working on integrating BI tools using our low-level integrations such as [REST API](rest-api) and [JDBC driver](jdbc-driver). If your BI tool already integrates with Trino (formerly Presto), you can use the metriql URL and port `5656` to connect your metriql server. Note that metriql doesn't embed Trino, it acts as Trino for the BI tools. However, it actually rewrites the query and directly runs it on your database.

Let us know if you would like to suggest a new integration on [Github](https://github.com/metriql/metriql/issues/new) or if you're a BI vendor looking to integrate metriql, join our community on [Slack](https://join.slack.com/t/metriql/shared_invite/zt-tz1nzvyd-ker8LGcBQmzrwvfAkFO1qQ).


| BI Tool            | Status             | Integration Method  |
|--------------------|--------------------|---------------------|
| rakam              | Completed  ✅    |  Native                                          
| [Google Data Studio](google-data-studio) | Completed  ✅  | Community Connector |
| [Looker](looker)             | Completed  ✅  | Trino + LookML project |
| [Tableau](tableau)            | Completed  ✅  |  Presto  |
| Redash           | Completed  ✅ | [Trino / Presto](https://redash.io/data-sources/presto) |
| Metabase           | [🚧 In Progress](https://github.com/metriql/metriql/issues/6)  | Trino  |
| Superset           | [🚧 In Progress](https://github.com/metriql/metriql/issues/10) | Trino |
| Mode Analytics           | [🙋 Needs testing](https://github.com/metriql/metriql/issues/10) | [Trino](https://mode.com/help/articles/supported-databases/#trino) |
| Qlik           | [🙋 Needs testing](https://github.com/metriql/metriql/issues/7)  | [Presto](https://help.qlik.com/en-US/connectors/Subsystems/ODBC_connector_help/Content/Connectors_ODBC/Presto/Create-Presto-connection.htm)  |   
| Sisense           | [🙋 Needs testing](https://github.com/metriql/metriql/issues/7)  | [Presto](https://www.sisense.com/data-connectors/presto/)  |   
| MicroStrategy           | [🙋 Needs testing](https://github.com/metriql/metriql/issues/7)  | [Presto](https://community.microstrategy.com/s/article/How-to-Connect-to-Presto?language=en_US)  |   
| Power BI           | [Queued](https://github.com/metriql/metriql/issues/7)  | XMLA or Trino-ODBC bridge  |   


Please note that all the integrations are in alpha stage at the moment.

You can also see our roadmap for the integrations [here](https://github.com/metriql/metriql/projects/1).
