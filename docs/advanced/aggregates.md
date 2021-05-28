---
title: "Aggregates"
sidebar_position: 2
---

Aggregates speeds up your reports by creating roll-up models as part of your dbt project. You can use them in your dbt's `source`, `model`, or `seed`. While the data analysts can create roll-up models in their dbt project, metriql can automate the work by creating dbt models automatically when you define `aggregates` in your dbt resource files. The roll-up tables are hidden from the end users. Instead, they are being used by our query engine if the users run `segmentation` queries that can be answered by the roll-up tables. They're particularly useful for the following cases:

1. If you're dealing with time-series data and looking for a way to give access to non-technical people to analyze the data. (i.e. customer event data)
2. If you're building consumer-facing applications that need to run queries in low latency. (i.e. embedded analytics)
3. If you don't want to spend time writing basic roll-up models in your dbt project.

In order to make use of aggregates, you can use `aggregates`  property under `source | model | seed.meta.metriql`. Here is an example:

```yml
sources:
  - name: events
    tables:
      - name: pageview
        meta:
          - metriql:
              mappings:
                - event_timestamp: occurred_at
              aggregates:
                - event_counts:
                    measures: [total_events, total_users]
                    dimensions: ["occurred_at::day"]
                    filters:
                       - {dimension: platform, operator: equals, value: Android}
        columns:
          - name: platform
          - name: occurred_at
            meta:
              metriql.dimension:
                type: timestamp
          - name: user_id
            meta:
              metriql.measure:
                name: unique_users
                aggregation: approximate_unique
```

When you create the model above, metriql will create a dbt model called `events_pageview_event_counts` with the following SQL:

```sql
{{ config(materialized='incremental') }}

SELECT timestamp_trunc('day', occurred_at) as occurred_at_day, count(*) as total_events, [HLL_ACCUMULATE](https://docs.snowflake.com/en/sql-reference/functions/hll_accumulate.html)(user_id) as unique_users pageview 
GROUP BY 1
WHERE platform = 'Android'

{% if is_incremental() %}
   AND occurred_at > (select max(occurred_at) from {{ this }})
{% endif %}
```

We automatically create an `incremental` model because you have `event_timestamp` mapping as we know that the dataset represents a time-series data. If you don't have the `event_timestamp` mapping, we use `table` materialization. 

If the users run a segmentation query with as follows:

```yml
  dataset: pageview
  measures: [total_events, unique_users]
  dimensions: ["occurred_at::week"]
  filters: 
    - {dimension: occurred_at, operator: between, value: '2 weeks'}
    - {dimension: platform, operator: equals, value: Android}
```

The system figures out that this data is available in `events_pageview_event_counts` model and makes use of this aggregated table instead of the `pageview` table by re-writing the SQL query as follows:

```sql
SELECT date_trunc('week', occourred_at_day), 
       sum(total_events), 
       cardinality([HLL_COMBINE](https://docs.snowflake.com/en/sql-reference/functions/hll_combine.html)(unique_users))
FROM metriql_aggregates.events_pageview_event_counts
GROUP BY 1
WHERE platform = 'Android' and 
  occurred_at >= DATEADD(WEEK, -2, to_date(date_trunc('week', CURRENT_TIMESTAMP))) AND 
  occurred_at < DATEADD(DAY, 1, to_date(date_trunc('day', CURRENT_TIMESTAMP)))
```


It can speed up the reports dramatically based on the number of rows in the `events` table because  `events_pageview_event_counts` model has only a few thousand rows whereas `events` table potentially has billions of rows. metriql 

If your model has an `event_timestamp` mapping, we require the dimension to be included in the `aggregate.dimensions` in order to be able to use in our `segmentation` reports because we require a date filter in the user interface. If you have `day` timeframe for a timestamp dimension reference, metriql can also make use of the aggregated table for other timeframes such as `week`, 'month', or `year` automatically.