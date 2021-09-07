---
sidebar_position: 1
---

# Introduction

While metriql is a relatively new project, we're working on integrating BI tools using our low-level integrations such as [REST API](rest-api) and [JDBC driver](jdbc-driver). If your BI tool already integrates with Trino (formerly Presto), you can use the metriql URL and port `5656` to connect your metriql server. Note that metriql doesn't embed Trino, it acts as Trino for the BI tools. However, it actually rewrites the query and directly runs it on your database.


| BI Tool            | Status             | Integration Method  |
|--------------------|--------------------|---------------------|
| rakam              | Ready  ✅    |  Native                                          
| [Google Data Studio](/integrations/bi-tools/google-data-studio) | Ready  ✅  | [Community Connector](https://datastudio.google.com/datasources/create?connectorId=AKfycbw8o0F6LEr0epNSNVWqNzlqo7R-6jRYxxSxBspzyg2Xi6SDFItLN_aM3l_U56Z0obwS) |
| [Looker](/integrations/bi-tools/looker)             | Ready  ✅  | [Trino + LookML project](https://docs.looker.com/setup-and-management/database-config/prestodb) |
| [Tableau](/integrations/bi-tools/tableau)            | Ready  ✅  |  [Presto](https://help.tableau.com/current/pro/desktop/en-us/examples_presto.htm)  |
| Redash           | Ready  ✅ | [Trino / Presto](https://redash.io/data-sources/presto) |
| [Superset](/integrations/bi-tools/superset)           | Ready  ✅ | [Trino](https://superset.apache.org/docs/databases/trino) |
| Metabase           | [🚧 In Progress](https://github.com/metriql/metriql/issues/13)  | [Trino / Presto](https://www.metabase.com/docs/latest/administration-guide/01-managing-databases.html#officially-supported-databases)  |
| Power BI           | [🚧 In Progress](https://github.com/metriql/metriql/issues/7)  | XMLA server |   
| Mode Analytics           | [🙋 Needs testing](#needs-testing) | [Trino](https://mode.com/help/articles/supported-databases/#trino) |
| Qlik           | [🙋 Needs testing](#needs-testing)  | [Presto](https://help.qlik.com/en-US/connectors/Subsystems/ODBC_connector_help/Content/Connectors_ODBC/Presto/Create-Presto-connection.htm)  |   
| Sisense / Periscope           | [🙋 Needs testing](#needs-testing)  | [Presto](https://www.sisense.com/data-connectors/presto/)  |   
| MicroStrategy           | [🙋 Needs testing](#needs-testing) | [Presto](https://community.microstrategy.com/s/article/How-to-Connect-to-Presto?language=en_US)  |   
| Thoughtspot           | [🙋 Needs testing](#needs-testing)  | [Presto](https://docs.thoughtspot.com/6.2/data-integrate/dataflow/dataflow-presto.html)  |   


## Needs testing?

If the BI tool already supports Trino or Presto, you can connect to Metriql using that interface. You should use Metriql URL and port and all your datasets will be exposed to your BI tools as database tables & columns. You can reference your measures & dimensions using [MQL reporting type](/query/mql), metriql will parse the query and compile to SQL for the target data warehouse. For the BI tools that don't have a free trial, we're not able to test and verify if metriql is working fine. I appreciate if you would like to test and share a short demo video in that case!

Also, let us know if you would like to suggest a new integration on [Github](https://github.com/metriql/metriql/issues/new) or if you're a BI vendor looking to integrate metriql, join our community on [Slack](https://join.slack.com/t/metriql/shared_invite/zt-tz1nzvyd-ker8LGcBQmzrwvfAkFO1qQ).

Please note that all the integrations are in alpha stage at the moment. You can also see our roadmap for the integrations [here](https://github.com/metriql/metriql/projects/1).
