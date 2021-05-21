---
sidebar_position: 3
---

# Funnel

The funnel reporting type is built for customer event data. If you have your user behavior data in your data warehouse, you can understand *if your users are performing a series of events* with funnels. For example, let's say that you have `pageview`, `add_to_basket` and `transaction` events stored in a database and you want to calculate metric called cart abandonment rate (i.e. people who added an item to their basket but didn't make any purchase). 

Most of the BI tools let you ask [Segmentation](/query/segmentation) questions but it's not easy to build funnel metrics since it doesn't play well with the customer behavioral data. If you're familiar with SQL, you can write a complex SQL query that calculates the card abandonment rate and share it with your product people. While you can parametrize the SQL query in your BI tool, the product people won't have much flexibility to compare the different user segment, define different funnel steps or filter by an event property.

That's why metriql provides different reporting types for different use-cases. Let's see a typical funnel query:

```yml
steps:
  - [dataset](/query/introduction#dataset): pageview
    [filters](/query/introduction#filter): 
      - {dimension: campaign, operator: 'equals', 'winter_sale'}
  - dataset: add_to_basket
  - dataset: transaction
[dimension](#dimension):
[window](#window): {value: 1, type: hour} # the maximum time period in between the events
[connector](#connector): user_id # optional, the default is [user_id mapping](/reference/manning#user_id)
```

metriql compiles the funnel query above to a SQL query if you're using Postgresql as follows:

<Collapsible header="Click to see SQL">

```sql 
SELECT COUNT(DISTINCT CASE
                          WHEN e1 IS NOT NULL THEN connector
                      END) AS step1,
       COUNT(DISTINCT CASE
                          WHEN e1 IS NOT NULL THEN e1
                      END) AS total_step1 ,
       COUNT(DISTINCT CASE WHEN(e1 IS NOT NULL
                                AND e2 IS NOT NULL)THEN connector
                      END) step2,
       COUNT(DISTINCT CASE WHEN(e1 IS NOT NULL
                                AND e2 IS NOT NULL)THEN e2
                      END) total_step2
FROM
  (SELECT connector,
          COALESCE(ts_event1, first_value(ts_event1) OVER (PARTITION BY connector, grp_1
                                                           ORDER BY event_timestamp)) AS e1,
          COALESCE(ts_event2, first_value(ts_event2) OVER (PARTITION BY connector, grp_2
                                                           ORDER BY event_timestamp)) AS e2
   FROM
     (SELECT connector,
             event_timestamp,
             CASE
                 WHEN (step = 1) THEN event_timestamp
             END ts_event1,
             count(CASE
                       WHEN (step = 1) THEN event_timestamp
                   END) OVER (PARTITION BY connector
                              ORDER BY event_timestamp) AS grp_1 ,
                             CASE
                                 WHEN (step = 2) THEN event_timestamp
                             END ts_event2,
                             count(CASE
                                       WHEN (step = 2) THEN event_timestamp
                                   END) OVER (PARTITION BY connector
                                              ORDER BY event_timestamp) AS grp_2
      FROM
        (SELECT 1 AS step,
                "user_id" AS connector,
                "received_at" AS event_timestamp,
                NULL AS dimension
         FROM
           (SELECT "user_id" AS "user_id",
                   "received_at" AS "received_at"
            FROM "pageview"
            WHERE "received_at" >= CAST(CAST(DATE_TRUNC('week', CURRENT_TIMESTAMP) AS DATE) + INTERVAL '-2 WEEK' AS TIMESTAMP)
              AND "received_at" < CAST(CAST(DATE_TRUNC('day', CURRENT_TIMESTAMP) AS DATE) + INTERVAL '1 DAY' AS TIMESTAMP)
            GROUP BY 1,
                     2) 
         UNION ALL SELECT 2 AS step,
                          "user_id" AS connector,
                          "received_at" AS event_timestamp,
                          NULL AS dimension
         FROM
           (SELECT "user_id" AS "user_id",
                    "received_at" AS "received_at"
            FROM "add_to_basket"
            WHERE "received_at" >= CAST(CAST(DATE_TRUNC('week', CURRENT_TIMESTAMP) AS DATE) + INTERVAL '-2 WEEK' AS TIMESTAMP)
              AND "received_at" < CAST(CAST(DATE_TRUNC('day', CURRENT_TIMESTAMP) AS DATE) + INTERVAL '1 DAY' AS TIMESTAMP)
            GROUP BY 1,
                     2) AS "segment_application_opened") AS events_chunk) AS events_agg) AS events_window
```

</Collapsible>

The compiled SQL queries uses advanced SQL features such as window functions and not that easy to read. It's primarily because the behavioral analytics doesn't fit in SQL linear algebra. However; product people often need to run ad-hoc funnel queries and metriql tries reduce the time the data analysts dealing with report requests. Most of the companies that have modern data stack have their customer event data in the data warehouse.  The new generation data warehouses are able to run these queries efficiently.

metriql makes use of advaned SQL features such as [match_recognize](https://docs.snowflake.com/en/sql-reference/constructs/match_recognize.html) and [HyperLogLog++](https://cloud.google.com/bigquery/docs/reference/standard-sql/hll_functions) depending on your adapter and tries to build the most efficient query for the funnel.

### `window:`

Set the maximum duration in between two steps. `window.type` can be one of `minute`, `hour`, `day`. The default is unbounded.

### `excluded_steps:`

If you want to exclude some of the users who did specific events, you can use this property as follows:

```yml
steps:
- dataset: pageview
- dataset: add_to_basket
excluded_steps:
- step:
    dataset: transaction
  start: 1
```

### `connector:`

By default, metriql uses [user_id mapping](/reference/mapping#user_id) constructing funnel queries, if you want to use another connector which buckets the data into individual segments and see if the buckets are performing the steps, use `connector`. It's usually makes sense if you're analyzing the user events within a single session id or device id.

### `approximate:`

If the data warehouse supports approximation, you can enable the approximation using this parameter. Currently, BigQuery and Snowflake supports it.

### `strictly_ordered:`

If the data warehouse supports strictly ordered funnel queries you can use this parameter. Since the relational SQL model doesn't fit in event data model, most of the data warehouses don't support strictly order funnel queries unless the ones that supports [`match_recognize`](https://docs.snowflake.com/en/sql-reference/constructs/match_recognize.html). Currently, only Snowflake supoorts this parameter.

### `dimension:`

You can breakdown funnels into different groups using a dimension in a funnel step. It's useful if you're comparing different user segments. Here is an example:

```yml
steps:
- dataset: pageview
- dataset: add_to_basket
dimension:
- step:
    step: 1
    dimension: campaign
```

