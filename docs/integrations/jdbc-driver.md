---
sidebar_position: 4
---

# JDBC Driver

Metriql supports [Trino](http://trino.io) (formerly Prestodb) JDBC driver. If your data tool already supports Trino or Prestodb out of the box, you can use metriql URL instead of Trino cluster URL and connect to metriql. While metriql uses Trino protocol, it doesn't actually process any data. Instead, it returns your semantic data models as data tables and the fields (dimension and measures) as columns and run the queries directly on your database by re-writing your query for the underlying data warehouse. 

By default, JDBC connector uses [MQL](/query/mql) reporting type. That enables BI tools to use [Aggregates](/introduction/aggregates) without any extra step but MQL syntax is limited by design. If you want to run ad-hoc SQL queries via the JDBC connector, you can switch mode as follows:

```sql
-- @mode:sql
with nps_by_customer AS (
    {{sql('segmentation', dataset = 'source('first_dataset', 'users')', measures=['nps'], dimensions=['plan_type'], )}}
)
select * from nps_by_customer
```

If you want to use metriql's JDBC connector, you can [download the driver](https://trino.io/docs/current/installation/jdbc.html) on Trino.io and use the following JDBC URL:

```
jdbc:trino:YOUR_METRIQL_URL
```