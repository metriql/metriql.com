---
title: "OLAP in modern data stack"
author: Burak Kabakci
author_title: Core Team
author_url: https://github.com/buremba
author_image_url: https://avatars.githubusercontent.com/u/82745
tags: [vision]
hide_table_of_contents: false
---

OLAP is almost 30 years old and has often been used in different contexts over the last 10 years. It's a huge market, and there are many enterprise software in the space. OLAP is simply pre-aggregated data from your raw data, and it's not for everyone. If you're working for a startup that doesn't have petabytes of data, you probably don't need OLAP because you can efficiently run ad-hoc queries on your raw data (also known as [fact tables](https://en.wikipedia.org/wiki/Fact_table)). However, when you have petabytes of data and have tens of people who rely on it to make decisions, you don't want to make them wait 10 minutes for a simple query. Let's breakdown the OLAP into two categories:

<!--truncate-->

## Multidimensional OLAP (MOLAP)

Most of them have their proprietary storage and compute engines and provide fast access to data across different dimensions. You store your data in your data lake or warehouse, duplicate it into their system, and slice/dice the data using their query engine. We call this type of OLAP Multidimensional OLAP (MOLAP) because they have their storage/compute engine to run the queries. [Apache Kylin](http://kylin.apache.org/), [Druid](https://druid.apache.org/), and [Pinot](https://pinot.apache.org/) are the open-source products in this space and well-known enterprise alternatives are [Arcadia Data](https://www.arcadiadata.com/), [Atscale](https://www.atscale.com/), [Kyligence](https://kyligence.io/).

The good part is that they can guarantee to run ad-hoc queries in less than a few hundred milliseconds, so they're pretty helpful in speeding up your BI tools or building a customer-facing application. On the other hand, it's not easy to set up and maintain the open-source alternatives; enterprise solutions are expensive, considering you can access the data from your data warehouse as well. You need to duplicate your data from your database, which causes a data silo. They sit in between the data tools (BI tools in general) and your data warehouse and cache the data to speed up the queries.

## Relational OLAP (ROLAP)

With the new modern data stack, companies usually start collecting all their data into a modern data warehouse. Essentially, the data warehouse becomes their [single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth#Data_warehouse_(DW)). Duplicating the data from the single source of truth usually leads to data inconsistency issues, and copying massive datasets is slow and expensive in most cloud providers. Luckily, modern data warehouses are efficient enough to answer ad-hoc queries; you don't need to run Hadoop jobs that take hours/days to finish anymore. However, they also can't guarantee performance for ad-hoc queries. You need to leverage their advanced features to be able to cover OLAP use-cases affordably. Here are some of these techniques:

#### 1. BigQuery: [BI Engine](https://cloud.google.com/bi-engine/docs)

BigQuery is a fully-managed data warehouse solution from Google. You pay for the data processing for each query that you're running. If you're running ad-hoc queries on raw data, it becomes expensive, and you can't guarantee to run the queries in less than a few seconds. Luckily, you can create dimensional tables from your raw data under a schema and buy BI Engine slots that store all the data in your dimensional tables in memory and let you run OLAP queries efficiently for a fixed price.

#### 2. ClickHouse: [Aggregating Merge Tree](https://clickhouse.tech/docs/en/engines/table-engines/mergetree-family/aggregatingmergetree/)

ClickHouse is an open-source OLAP database from Yandex. It supports SQL, and the performance is [mind-blowing](https://clickhouse.tech/benchmark/dbms/) given that it doesn't use GPUs. It also offers some exciting table layouts for pre-aggregating the data storing the intermediate state inside database tables. AggregatingmMergeTree lets you create views and update them transparently when you insert data into the raw tables. It's suitable for immutable time-series data such as customer event data, and it makes sense given that Yandex initially developed ClickHouse for their Google Analytics alternative, [Yandex Metrica](https://clickhouse.tech/docs/en/introduction/history/).

#### 3. Snowflake: [Search Optimization Service](https://docs.snowflake.com/en/user-guide/search-optimization-service.html)

If you heard about the term modern data stack before, you probably know about Snowflake. While they're not the first to come up with the concept of separating the compute and storage layer in the data warehouse industry (looking at you, Trino!), they proved that the approach scales well. It's usually cheaper than the alternatives if you have petabytes of data and want to run ad-hoc analytics queries on your raw data. However, you need too many compute resources to run ad-hoc queries concurrently, so it's still better to transform the data and create dimensional tables from the raw data. If you enable the search optimization service that enables fast access to random rows, the latency matches the MOLAP engines.

#### 4. Postgresql: [Grouping sets](https://www.postgresql.org/docs/devel/queries-table-expressions.html#QUERIES-GROUPING-SETS) & [B-tree Indexing](https://www.postgresql.org/docs/11/btree-intro.html)

Our old friend, Postgresql is an excellent solution for serving the pre-aggregated data. For raw data, you can leverage advanced techniques such as partitioning and BRIN indexes. Still, since Postgresql stores the data in a row-oriented format and doesn't have vectorized execution, the latency will not be comparable to cloud data warehouses. If you pre-aggregate your data with grouping sets and index the dimension columns, you can access the pre-aggregated metrics efficiently.

#### 5. Redshift's [Autorefreshing Materialized views](https://docs.aws.amazon.com/redshift/latest/dg/materialized-view-refresh.html) and Snowflake's [Materialized views](https://docs.snowflake.com/en/user-guide/views-materialized.html#advantages-of-materialized-views)

Redshift recently added support for materialized views that are up-to-date all the time. I didn't try it yet, but Snowflake's materialized views don't work reliably for my use case. They're usually not transparent, and they can't guarantee the low-latency ad-hoc queries to materialized views because they need to update the materialized tables every time you insert data. It is usually a better approach to use a transformation tool such as dbt or Airflow to transform the data and update the tables manually and transparently and use [lambda views](https://discourse.getdbt.com/t/how-to-create-near-real-time-models-with-just-dbt-sql/1457) for more deterministic and reliable workloads. Most data analysts that I talked to don't like black-boxes nowadays.

#### 6. Materialize: [Streaming Materialized Views](https://materialize.com/docs/sql/create-materialized-view/)

Materialize is not a database; it's a streaming engine. In the OLAP world, near-real-time workloads are usually enough to cover most of the use-cases but if you have real-time use-cases (< 1 min), Materialize's materialized views are always up-to-date and suitable for low-latency workloads. The downside is that it doesn't work inside your data warehouse; you need to set up and maintain it separately. 

#### 7. [New] Firebolt: [Aggregating and Join Indexes](https://www.google.com/search?{google:acceptedSuggestion}oq=firebolt+aggregate+index&sourceid=chrome&ie=UTF-8&q=firebolt+aggregate+index)

Firebolt is a next-generation data warehouse that claims to be orders of magnitude faster than Snowflake. Their real power is to be able to create aggregating, join, and partial indexing on data. While the performance will probably be comparable to Snowflake for ad-hoc queries, if you create relevant indexes in your tables, it should be much faster as the partial computation is done before you run the query. It looks great on paper, but I didn't try the product yet. (I'd love to, though!) If these new indexing types don't really affect the insert/update/delete performance, I believe that it's the next big thing in the data warehouse industry.

## Where does the metrics layer fit in OLAP?

The metrics layer is just a proxy layer for your single source of truth, it should not duplicate the data, so we fit in the ROLAP engines. Except for 5 and 6, you need to transform and pre-aggregate the data separately. The transformation tools in the modern data stack such as dbt and Airflow help a lot. Still, you need to maintain all the roll-up models manually and deal with non-additive aggregates separately. Claire from Analytics Engineers Club recently wrote a [great article](https://analyticsengineers.club/whats-an-olap-cube/) about the problem. There is also Tristan's [LookML vs dbt article](https://blog.getdbt.com/how-do-you-decide-what-to-model-in-dbt-vs-lookml/) that you should read about this topic. 

Once you define your metrics in metriql, you can create [Aggregates](https://metriql.com/introduction/aggregates) transparently; it creates the dbt models automatically inside your dbt project and uses them for the ad-hoc queries wherever they're applicable. Therefore we believe that if you use Metriql in combination with the technologies explained under the ROLAP section, the end-solution gets the best of the two worlds of MOLAP and ROLAP:

* Low-latency but affordable.
* Tight integration with the existing BI tools.
* Doesn't suffer from the data silo issue.
* Lightweight proxy to your single source of truth. 
 
We will write tutorials about all these products and share the benchmarks, stay tuned. 🤞
