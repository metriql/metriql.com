---
label: FAQs
sidebar_position: 8
---

# List of FAQs

#### 1. Why would I need Metriql if I'm already using dbt Core?

[dbt Core](https://www.getdbt.com) lets you transform, test, and document your data, but its output is still the database tables. You can analyze these modeled tables in your BI tool, use them as the data source for your analytical applications, but you need to define metrics in each tool that you're using. Most of the BI tools provide ways to define metrics either using their GUI or programmatically. However, it can't be shared with the other tools that you're using. Metriql standardizes the metric definitions and serves as the metadata layer for all your company data. 

A more comparable alternative would be LookML, Looker's data modeling language. Tristan, one of the dbt Labs founders, has [a blog post](https://blog.getdbt.com/-how-do-you-decide-what-to-model-in-dbt-vs-lookml--/) explaining the differences between LookML and dbt Core. Typically, if you need to perform complex transformations, you can use dbt Core materializations. Otherwise, you can use Metriql [Aggregates](/introduction/aggregates) for roll-up tables, define your metrics in dbt Core resource files without learning a brand new data modeling tool, such as LookML.

#### 2. Why Kotlin when we already have Python?

Most of the data people feel comfortable with Python, and some even hate the JVM world; we get it. That being said, Metriql has fundamental differences compared to dbt Core. It runs on schedule to transform your data, whereas Metriql is usually used as [an HTTP server](/rest-api). Also, Metriql needs to understand the SQL dialect to be able to generate ad-hoc queries. Therefore we need battle-tested database drivers. We use [JDBC](https://en.wikipedia.org/wiki/Java_Database_Connectivity), the technology behind many other BI tools, such as Looker, Tableau, and Metabase. While we agree that Java is verbose, [Kotlin is worth learning](https://github.com/Khan/kotlin-for-python-developers).

#### 3. How is this different from [x]?
[<b>dbt metrics layer</b>](https://docs.getdbt.com/docs/dbt-cloud/using-dbt-cloud/cloud-metrics-layer) is a managed metrics store solution by dbt Labs. It's not released yet so we're not able to provide a full comparison but according to [their introduction post](https://blog.getdbt.com/licensing-dbt/), it includes the following 3 components:

1. Metrics definitions in dbt Core
> We [support dbt Metric definitions](/introduction/creating-datasets#create-datasets-from-dbt-metrics) already so you don't need to invest time to learn Metriql separately. It has [a permissive license](https://github.com/dbt-labs/dbt-core/blob/main/License.md) and its primary goal is to centralize the definitions in one place. You can either use Metriql on top of your dbt metrics or dbt Cloud as a managed solution.

2. dbt Server
> While dbt Server is not released yet, it's stated [in Slack channel](https://getdbt.slack.com/archives/C02CCBBBR1D) and also [in the announcement blog post](https://blog.getdbt.com/licensing-dbt/) that dbt Server will let you run SQL on top of your metrics in ad-hoc way. dbt Server [will have BSL license](https://blog.getdbt.com/licensing-dbt/) so you can internally use it but you need an additional license from dbt Labs if you're looking for a way to expose it to your customers unlike Metriql which is open-source. The similar interface of Metriql is the [SQL query type](https://metriql.com/query/sql). You can connect Metriql from your SQL client, run native SQL queries with Jinja expressions and we will compile the query before running it on your data-warehouse. If your SQL client already supports [JDBC or Trino/Presto](https://metriql.com/integrations/jdbc-driver), you don't need to build integration separetely unlike dbt Server.

3. dbt Metrics Layer on dbt Cloud
> dbt Cloud's metrics feature is not released yet so while we don't have enough information, their intention in the introduction post seems to be that this is the piece that is required to make the BI / analytics tools work with dbt metrics layer. It's likely that they will introduce a query layer similar to Metriql's [MQL](https://metriql.com/query/mql) and an API similar to [Metriql's RESTful API](https://metriql.com/integrations/rest-api) for BI tools to integrate with dbt Cloud. The key part is that *dbt's metrics layer won't be open-source* according to their introduction post, instead a managed service run by dbt Cloud. This makes it hard for vendors to adopt the metrics layer as part of their offering and you need to subscribe to one of dbt Labs's paid plans to use this feature also for your own company. Metriql is open-source and you can either use it for your own company in your infrastructure or serve it to your own customers. We also want to keep Metriql as a vendor neutral solution so we're working on integration with the metadata tools as an alternative to dbt's Metadata API.

[<b>Minerva</b>](https://medium.com/airbnb-engineering/how-airbnb-achieved-metric-consistency-at-scale-f23cc53dea70) is Airbnb's internal metrics platform. We only know quite a little information as there is only one blog post about it, and it's not open-source yet. It's an end-to-end tool, from data ingestion to serving layer, and people interact with the metrics via an API. While it looks like a great idea, not all companies have the luxury to implement an architecture like Airbnb. Metriql works on top of your data warehouse, and it makes use of [Aggregates](/introduction/aggregates) for rollup tables that don't move the data out of your data warehouse. It's just the metadata layer for your data, not an end-to-end tool. 

[<b>Cube.js</b>](http://cube.dev) is a backend for embedded applications. It lets data people define the metrics in Javascript and build an API for their data. Cube has integrations with most of the front-end frameworks so that you can build custom user interfaces for your internal applications. They also have a two-level caching mechanism similar to Metriql's [Aggregates](/introduction/aggregates), but they ingest the data into its own storage, built with Rust. Cube is more suitable if your data is already modeled and you're building a high concurrency analytical application as it doesn't provide data lineage and ingest the data through its own storage. 

[<b>Metricflow</b>](https://github.com/transform-data/metricflow) is Transform Data's open-source metrics store. While Metriql and Metricflow targets similar use-cases, there are some fundamental differences in between them:

1. Metricflow has its own transformation engine and uses its own developer experience (setting up new connections, defining metrics etc.) whereas Metriql uses dbt for both transformation and developer experience. As a result, Metricflow is able to offer different materializations like [Fast Cache](https://docs.transform.co/docs/metricflow/reference/materializations/fast-cache-overview) whereas Metriql uses dbt models thus only support data-warehouse materialization.
2. Metriflow has a different approach for the integration with the downstream tools. It has its own syntax and it integrates with [a number of limited downstream tools](https://docs.transform.co/docs/deployment/integrations/downstream/downstream-integrations) one by one whereas Metriql uses a subset of ANSI SQL features and utilizes [Trino's query interface](https://metriql.com/query/mql) to the downstream tools. At the time of writing, Metricflow supports 4 downstream tools whereas Metriql supports 19. In addition to the the integration with the downstream tools, Metricflow has its standalone CLI whereas Metriql uses Trino's CLI. While Metriflow offers React components and GraphQL as API, Metriql offers REST API that you can use for the same use-cases.
3. Transform Data's SaaS offering works on top of Metriflow so you can get its cloud solution if you subscribe to one if their paid plans. Metriql embraces a decentralized model where dbt is [the data OS](https://benn.substack.com/p/the-data-os?s=r) as only focuses on serving the metrics to the downstream tools and APIs and utilizing dbt for transformations whereas Transform offers an end-to-end suite that you can use as a metrics store that even includes a BI tool. Metriql tries to enable to you to your favourite analytics tools with less friction so that you can have the option to switch in between tools and use specific products for specific needs that includes data obversability tools that integrate to dbt metrics, BI tools that integrate with Metriql, and has Apache 2 license which is more permissive than Metriflow's AGPL license.

#### 4. What's LiveRamp, and how is it related to metriql?

LiveRamp (NYSE: RAMP) is a San Francisco based SaaS company that offers a data enablement platform that connects offline and online data and turns them into actionable insights for many Fortune 500 companies. LiveRamp acquired Rakam and Metriql in December 2021 and since then, Metriql has been developed and maintained by the LiveRamp teams.

#### 5. Do I need to use dbt Core for metriql?

If your data is already modeled, you can use dbt's [sources](https://docs.getdbt.com/docs/building-a-dbt-project/using-sources) to create datasets in metriql. [Here is an example project](https://github.com/rakam-recipes/tenjin) that doesn't need any transformation.

#### 6. Does Metriql run my dbt Core models?

No, it does not. If you have `table` or `incremental` models, you need to run dbt yourself. We suggest using [dbt Cloud](https://cloud.getdbt.com/) from Fishtown Analytics, but you can also run dbt locally or use a CI system such as Github Actions or Gitlab CI if you don't want to use a Cloud IDE.

#### 7. Is there any performance hit using Metriql versus directly executing the queries on target database?

Metriql acts as a proxy for the queries and doesn't do any processing itself. It maintains a connection pool for different credentials to the target data warehouse so ideally there is no performance hit using Metriql.

#### If you have other questions, join the conversation on [Slack](https://join.slack.com/t/metriql/shared_invite/zt-tz1nzvyd-ker8LGcBQmzrwvfAkFO1qQ).
