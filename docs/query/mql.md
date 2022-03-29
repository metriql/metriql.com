---
sidebar_position: 6
---

# MQL

MQL is a SQL syntax that only supports a subset of the ANSI SQL standard. It lets us query the models directly using SQL interface. Let's say that you have [models here](https://github.com/metriql/metriql-public-demo/blob/main/models/ecommerce/seeds.yml) and you can run the following query:

```sql
select o_clerk, total_orders FROM "ref('orders')"
```

metriql parses the SQL query and converts it to the following [segmentation query](/query/segmentation):

```yml
dataset: ref('orders')
measures: [total_orders]
dimensions: [o_clerk]
```

And then, compile it to the SQL query that will be executed on your data warehouse:

```sql
SELECT o_clerk, "total_orders" AS "total_orders" FROM (
SELECT 
    "model_my_new_project_orders"."o_clerk" AS "o_clerk",
    count(*) AS "total_orders"
FROM "orders" AS "model_my_new_project_orders"

    GROUP BY
    1 
) AS "model_my_new_project_orders"
```

MQL is a SQL dialect for querying semantic datasets in metriql. It makes it possible to integrate metriql to the BI tools that use SQL. If your BI tool supports [Trino](https://trino.io) (formerly Prestodb), you can use the metriql URL and connect to your data warehouse and use metriql as an analytics backend for your data. Note that the syntax doesn't support Jinja expressions, unlike the [SQL query](/query/sql), and the advanced SQL syntax such as WINDOW operations and JOINs need to be implemented in the data modeling.

If you have a join relation from the `customer` dataset to an `orders` dataset, you can reference the dimensions from `orders` dataset as follows:

```sql
select "customer.c_mktsegment", "customer.total_customers", total_orders 
FROM "ref('orders')"
```

metriql parses your query, finds out measure & dimension pairs, and compiles it to a native SQL query with joins and projections as follows:

```sql
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

If you're using [Aggregates](/introduction/aggregates), Metriql automatically utilizes them and reference the roll-up tables in the compiled SQL query.

:::tip
Metriql's JDBC driver makes use of MQL under the hood. While your BI tool thinks it's connecting to a Trino cluster, metriql doesn't have an execution engine. It just understands the SQL syntax and re-writes it to be executed on your database.
:::


## Sample queries:

#### Return datasets:

```sql
SHOW TABLES
```

#### Return fields in a dataset
```sql
SHOW COLUMNS FROM metriql.dataset_name
```

#### Access timeframes in a dimension field:
```sql
SELECT "dimension_name::month" FROM dataset_name
```

## Data flow:

On the left side, Metriql doesn't utilize aggregates, instead compile the query that uses fact table. On the right side, since we have `aggregates` in our dataset, Metriql utilize the dimensional table.

<img src="/img/metriql-mql-diagram.png" alt="Metriql MQL Diagram"/>
