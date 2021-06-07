---
sidebar_position: 6
---

MQL is a SQL syntax that only supports a subset of the ANSI SQL standard. It lets us query the models directly using SQL interface. Let's say that you have [source here](/query/segmentation). You can run the following query:

```yml
query: >
    select plan_type, avg(nps) from "source('first_dataset', 'customer')" group by 1
query_options:
  limit: 1000
```

metriql parse the SQL query, convert it to [Segmentation query](/query/segmentation) and rewrite the query for your underlying database.

MQL is intended to be used as an integration with BI tools. If your BI tool supports [Trino](https://trino.io) (formerly Prestodb), you can use the metriql URL and connect to your data-warehouse. Note that the syntax doesn't support Jinja expressions unlike the [SQL query](/query/sql).

:::tip
While your BI tool thinks that it's connecting to a Trino cluster, metriql doesn't have an execution engine. It just understand the SQL syntax and re-write it to be executed on your database.
:::