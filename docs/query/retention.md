---
sidebar_position: 4
---

# Retention

The retention reporting type is built for customer event data. If you have your user behavior data in your data warehouse, you can understand *if your users are churning or sticking in your app* using retention report type. If you're an e-commerce store and record all the orders in your data warehouse, you can see how often your users are ordering from your app, compare diffferent user segments and under your personas in a better way with retention reporting type. 

Most of the BI tools let you ask [Segmentation](/query/segmentation) questions but it's not easy to build retentuion metrics since it doesn't play well with the customer behavioral data. If you're familiar with SQL, you can write a complex SQL query that calculates the cohorts and share it with your product people. While you can parametrize the SQL query in your BI tool, the product people won't have much flexibility to compare the different user segment, define different retention actions or filter by an event property.

That's why metriql provides different reporting types for different use-cases. Let's see a typical retention query:

```yml
first_step:
  [dataset](/query/introduction#dataset): orders
  [filters](/query/introduction#filter): 
      - {dimension: campaign, operator: 'equals', 'winter_sale'}
returning_step:
  dataset: orders
date_unit: month
```

The retention query above calculates the cohort for people who ordered an item from your app for the first time when you had the `winter_sale` campaign and continued to order from your store every month. metriql compiles the funnel query above to a SQL query if you're using Postgresql as follows:

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

The compiled SQL queries uses advanced SQL features such as window functions and not that easy to read. It's primarily because the behavioral analytics doesn't fit in SQL linear algebra. However; product people often need to run ad-hoc retention and cohort queries and metriql tries reduce the time the data analysts dealing with report requests. Most of the companies that have modern data stack have their customer event data in the data warehouse. The new generation data warehouses are able to run these queries efficiently.

### `first_step:`

The dataset and filter pair that defines the initial step of the cohort. The cohort will be calculated for only the users who did the first_step.

### `returning_step:`

For all the user who did first_step, metriql will check if the users did the returning_step in the next 10 `date_unit`[#date_unit]s.

Note that if you use a huge dataset as the returning_step, the query will get more expensive.

### `date_unit:`

It can be one of `day`, `week`, `month`, and `year`. If you set `day`, metriql will look the next 10 days of each user and see if `returning_step` is performed. 

### `dimension:`

You can breakdown cohorts into different groups using a dimension in the `first_step`. It's useful if you're comparing different user segments. Here is an example:

```yml
first_step:
  dataset: orders
returning_step:
  dataset: orders
dimension: campaign
```

### `approximate:`

If the data warehouse supports approximation, you can enable the approximation using this parameter. Currently, only BigQuery supports it via [HyperLogLog++](https://cloud.google.com/bigquery/docs/reference/standard-sql/hll_functions).

### `connector:`

By default, metriql uses [user_id mapping](/reference/mapping#user_id) constructing retention queries, if you want to use another connector which buckets the data into individual segments and see if the buckets are performing the steps, use `connector`. It's usually makes sense if you're analyzing the user events within a single device id across multiple users.
