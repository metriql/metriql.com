---
sidebar_position: 1
---

# Introduction

While metriql is a relatively new project, we're working on integrating BI tools using our low-level integrations such as [REST API](rest-api) and [JDBC driver](jdbc-driver). If your BI tool already integrates with Trino (formerly Presto), you can use the metriql URL and port to connect your metriql server. Note that metriql doesn't embed Trino; it acts as Trino for the BI tools. However, it rewrites the query and directly runs it on your database.


| BI Tool            | Status             | Integration Method  |
|--------------------|--------------------|---------------------|
| rakam              | Ready  ✅    |  [Native](https://rakam.io/product)                                          
| [Google Data Studio](/integrations/bi-tools/google-data-studio) | Ready  ✅  | [Community Connector](https://datastudio.google.com/datasources/create?connectorId=AKfycbw8o0F6LEr0epNSNVWqNzlqo7R-6jRYxxSxBspzyg2Xi6SDFItLN_aM3l_U56Z0obwS) |
| [Looker](/integrations/bi-tools/looker)             | Ready  ✅  | [Trino + LookML project](https://docs.looker.com/setup-and-management/database-config/prestodb) |
| [Tableau](/integrations/bi-tools/tableau)            | Ready  ✅  |  [Presto](https://help.tableau.com/current/pro/desktop/en-us/examples_presto.htm)  |
| [Redash](/integrations/bi-tools/redash)           | Ready  ✅ | [Trino / Presto](https://redash.io/data-sources/presto) |
| [Superset](/integrations/bi-tools/superset)           | Ready  ✅ | [Trino](https://superset.apache.org/docs/databases/trino) |
| [Mode Analytics](/integrations/bi-tools/mode)           | Ready  ✅ | [Trino](https://mode.com/help/articles/supported-databases/#trino) |
| [Sisense Cloud (formerly Periscope)](/integrations/bi-tools/sisense-cloud)           | Ready  ✅  | [Presto](https://www.sisense.com/data-connectors/presto/)  |   
| [Thoughtspot](/integrations/bi-tools/thoughtspot)           | (Partially) Ready  ✅  | [Presto](https://docs.thoughtspot.com/6.2/data-integrate/dataflow/dataflow-presto.html)  |   
| Metabase           | [🚧 In Progress](https://github.com/metriql/metriql/issues/13)  | [Trino / Presto](https://www.metabase.com/docs/latest/administration-guide/01-managing-databases.html#officially-supported-databases)  |
| Power BI           | [🚧 In Progress](https://github.com/metriql/metriql/issues/7)  | XMLA server |   
| Qlik           | [🙋 Needs testing](#needs-testing)  | [Presto](https://help.qlik.com/en-US/connectors/Subsystems/ODBC_connector_help/Content/Connectors_ODBC/Presto/Create-Presto-connection.htm)  |   
| MicroStrategy           | [🙋 Needs testing](#needs-testing) | [Presto](https://community.microstrategy.com/s/article/How-to-Connect-to-Presto?language=en_US)  |   


| Data Application            | Status             | Integration Method  |
|--------------------|--------------------|---------------------|
| [Google Sheets](/integrations/services/google-sheets) | Ready  ✅  | [Marketplace Add-on](https://gsuite.google.com/marketplace/app/metriql/218048854372) |
| Zapier             | Queued  | [Partner Integration](https://platform.zapier.com/partners/lifecycle-planning) |
| Airtable             | Queued  | [Developer App](https://www.airtable.com/developers/apps/guides/building-a-new-app) |
| Slack             | Queued  | [Bolt API](https://api.slack.com/start/building/bolt-python) |


| SQL Client            | Status             | Integration Method  |
|--------------------|--------------------|---------------------|
| [Dbveaver](/integrations/services/dbeaver) | Ready  ✅  | Trino / Presto JDBC |
| [Jetbrains DataGrip](/integrations/services/datagrip) | Ready  ✅  | Trino / Presto JDBC |
| [CLI](/integrations/services/cli) | Ready  ✅  | Trino / Presto CLI |
| [Python](/integrations/services/python) | Ready  ✅  | Trino / Presto Python Package |


Let us know if you would like to suggest a new integration on [Github](https://github.com/metriql/metriql/issues/new) or if you're a BI vendor looking to integrate metriql, join our community on [Slack](https://join.slack.com/t/metriql/shared_invite/zt-tz1nzvyd-ker8LGcBQmzrwvfAkFO1qQ).


## Needs testing?

If the BI tool already supports Trino or Presto, you can connect to Metriql using that interface. If you use Metriql URL and port, Metriql will expose all your datasets inside them as regular database tables & columns. You can reference your measures & dimensions using [MQL reporting type](/query/mql), Metriql will parse the query and compile it to SQL for the target data warehouse. For the BI tools that don't have a free trial, we're not able to test and verify if metriql is working fine. I appreciate it if you would like to test and share a short demo video in that case!

Please note that all the integrations are in the alpha stage at the moment. You can also see our roadmap for the integrations [here](https://github.com/metriql/metriql/projects/1).
