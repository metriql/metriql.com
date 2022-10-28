---
sidebar_position: 4
---

# Retention

The retention reporting type is built for customer event data. If you have your user behavior data in your data warehouse, you can understand *if your users are churning or sticking in your app* using retention report type. If you're an e-commerce store and record all the orders in your data warehouse, you can see how often your users are ordering from your app, compare different user segments in a better way with retention reporting type. 

Most of the BI tools let you ask [Segmentation](/query/segmentation) questions but it's not easy to build retention metrics since it doesn't play well with the customer behavioral data. If you're familiar with SQL, you can write a complex SQL query that calculates the cohorts and share it with your product people. While you can parametrize the SQL query in your BI tool, the product people won't have much flexibility to compare the different user segments, define different retention actions, or filter by an event property.

That's why Metriql provides different reporting types for different use-cases. Let's see a typical retention query:

```yml
first_step:
  [dataset](/query/introduction#dataset): orders
  [filters](/query/introduction#filter): 
      - {dimension: campaign, operator: 'equals', 'winter_sale'}
returning_step:
  dataset: orders
date_unit: month
```

The retention query above calculates the cohort for people who ordered an item from your app for the first time when you had the `winter_sale` campaign and continued to order from your store every month. Metriql compiles the funnel query above to an SQL query if you're using PostgreSQL as follows:

<Collapsible header="Click to see SQL">

```sql 
WITH first_action AS
  (SELECT "user_id" AS connector,
          min(date_trunc('day', "received_at__timestamp_day")) AS date
   FROM
     (SELECT "user_id" AS "user_id",
             CAST(DATE_TRUNC('day', "received_at") AS DATE) AS "received_at__timestamp_day"
      FROM "orders"
      WHERE "received_at" >= CAST(CAST(DATE_TRUNC('week', CURRENT_TIMESTAMP) AS DATE) + INTERVAL '-2 WEEK' AS TIMESTAMP)
        AND "received_at" < CAST(CAST(DATE_TRUNC('day', CURRENT_TIMESTAMP) AS DATE) + INTERVAL '1 DAY' AS TIMESTAMP)
      GROUP BY 1,
               2)
   GROUP BY 1),
     returning_action AS
  (SELECT DISTINCT "user_id" AS connector,
                   date_trunc('day', "received_at__timestamp_day") AS date
   FROM
     (SELECT "user_id" AS "user_id",
             CAST(DATE_TRUNC('day', "received_at") AS DATE) AS "received_at__timestamp_day"
      FROM "orders" 
      WHERE "received_at" >= CAST(CAST(DATE_TRUNC('week', CURRENT_TIMESTAMP) AS DATE) + INTERVAL '-2 WEEK' AS TIMESTAMP)
        AND "received_at" < CAST(CAST(DATE_TRUNC('day', CURRENT_TIMESTAMP) AS DATE) + INTERVAL '1 DAY' AS TIMESTAMP)
      GROUP BY 1,
               2))
SELECT first_action.date,
       NULL AS next_period,
       COUNT(DISTINCT first_action.connector) AS users
FROM first_action
GROUP BY 1
UNION ALL
SELECT first_action.date,
       cast(extract('day'
                    FROM returning_action.date - first_action.date) AS integer),
       COUNT(DISTINCT returning_action.connector) AS users
FROM first_action
JOIN returning_action ON returning_action.date - first_action.date BETWEEN '0 month'::interval AND '10 month'::interval
AND first_action.connector = returning_action.connector
GROUP BY 1,
         2
ORDER BY 1,
         2
```

</Collapsible>

The compiled SQL queries use advanced SQL features such as window functions that are not that easy to read. It's primarily because behavioral analytics doesn't fit in SQL linear algebra. However; product people often need to run ad-hoc funnel queries and Metriql tries to reduce the time data analysts need to deal with report requests. Most of the companies that have modern data stacks have their customer event data in the data warehouse.  The new generation data warehouses are able to run these queries efficiently.

### `first_step:`

The dataset and filter pair that defines the initial step of the cohort. The cohort will only be calculated for users who did the first_step.

### `returning_step:`

For all users who did first_step, Metriql will check if the users did the `returning_step` in the next 10 `date_unit`.

Note that if you use a huge dataset as the `returning_step`, the query will get more expensive.

### `date_unit:`

It can be either `day`, `week`, `month`, or `year`. If you set `day`, Metriql will look at the next 10 days of each user and see if `returning_step` is performed. 

### `dimension:`

You can break down cohorts into different groups using a dimension in the `first_step`. It's useful if you're comparing different user segments. Here is an example:

```yml
first_step:
  dataset: orders
returning_step:
  dataset: orders
dimension: campaign
```

### `approximate:`

If the data warehouse supports approximation, you can enable the approximation using this parameter. Currently, BigQuery and Snowflake support it.

### `connector:`

By default, Metriql uses [user_id mapping](/reference/mapping#user_id) constructing retention queries, if you want to use another connector that buckets the data into individual segments and see if the buckets are performing the steps, use `connector`. It usually makes sense if you're analyzing the user events within a single device id across multiple users.
