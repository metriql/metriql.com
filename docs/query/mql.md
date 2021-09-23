---
sidebar_position: 6
---

# MQL

MQL is a SQL syntax that only supports a subset of the ANSI SQL standard. It lets us query the models directly using SQL interface. Let's say that you have [source here](/query/segmentation). You can run the following query:

```yml
query: >
    select plan_type, avg(nps) from "source('first_dataset', 'customer')" group by 1
query_options:
  limit: 1000
```

metriql parses the SQL query and converts it to the following [segmentation query](/query/segmentation):

```yml
dataset: source('first_dataset', 'users')
measures: [total_users]
dimensions: [plan_type]
```

MQL is a SQL dialect for querying semantic datasets in metriql. It makes it possible to integrate metriql to the BI tools that use SQL. If your BI tool supports [Trino](https://trino.io) (formerly Prestodb), you can use the metriql URL and connect to your data warehouse and use metriql as an analytics backend for your data. Note that the syntax doesn't support Jinja expressions, unlike the [SQL query](/query/sql), and the advanced SQL syntax such WINDOW operations and JOINs as they need to be implemented in the data modeling.

If you have a join relation from the `customer` dataset to an `orders` dataset, you can reference the dimensions from `orders` dataset as follows:

```
query: >
    select "customer.c_mktsegment", "customer.total_customers", total_orders FROM "source('orders')"
query_options:
  limit: 1000
```

metriql parses your query, finds out measure & dimension pairs, and compiles it to a native SQL query with joins and projections as follows:

```
SELECT customer_c_mktsegment AS "customer.c_mktsegment", "customer_total_customers" AS "customer.total_customers", "total_orders" AS "total_orders" FROM (
SELECT 
    "model_my_new_project_customer"."c_mktsegment" AS "customer_c_mktsegment",
    count(*) AS "customer_total_customers",
    count(*) AS "total_orders"
FROM "orders" AS "model_my_new_project_orders"
 LEFT JOIN "customer" AS "model_my_new_project_customer" ON ("model_my_new_project_orders"."o_custkey" = "model_my_new_project_customer"."c_custkey") 
    GROUP BY
    1 

) AS "model_my_new_project_orders"
```

:::tip
metriql's JDBC driver makes use of MQL under the hood. While your BI tool thinks that it's connecting to a Trino cluster, metriql doesn't have an execution engine. It just understands the SQL syntax and re-writes it to be executed on your database.
:::