---
title: "Measure properties"
sidebar_position: 4
---

Measures are the business metrics that calculate a value for a model. Here are a few examples of measures: 

* `total_rows` compiles to `count(*)`,
* `unique_users` compiles `count(distinct user_id)` in SQL. 

### `dimension: | column: | sql:`

You should set either `dimension`, `column`, or `sql` to define the measures under `meta.metriql.measures`. If not set, the measure counts all rows (i.e. `count(*)`). Here are a few examples:


```yml title="models/events.yml"
models:
  - name: events
    meta:
      metriql:
        measures:
          total_rows:
            aggregation: count
          unique_users:
            aggregation: count_unique
            dimension: user_id
          sql_example:
            sql: "sum(distinct {TABLE}.col1)"
          unique_users_total_rows_ratio:
            sql: "{measure.total_rows}/{measure.unique_users}"
```

Please note that these fields are not required under `column.meta` as they point to the relevant `column`.

**`column:`** references the column in the model target. 

**`dimension:`** references the dimensions within the same model.

**`sql:`** lets you define complex expressions that column type measure is not capable of. 

For referencing other entities inside a measure checkout the [SQL Context](/reference/sql-context).

### `aggregation:`

The aggregation function of the measure value `dimension | column | sql`.

Here are the valid values:

`count`, `count_unique`, `sum`, `minimum`, `maximum`, `average`, `approximate_unique`

```yml
total_users:
  dimension: 'user_id'
  aggregation: approximate_unique
```

`aggregation` is not required if the `sql` is defined. Here is an example:

```yml
total_events_user_ratio:
	sql: "{measure.total_rows} / {measure.total_users}"
```

### `filters:`

You can restrict a measure to aggregate only specific dimension values without applying a filter to an entire query. Here is an example:

```yml
event_last_week:
   aggregation: count
   filters: [{dimension: occurred_at, operator: between, value: '1 week'}]
```

The measure above compiles to the following SQL expression:

```sql
COUNT(CASE WHEN WEEK(now(), occurred_at) < 1 THEN NULL ELSE 1)
```

Learn more about the filter operators [here](/query/introduction/#filter).


### `window:`

If you use [WINDOW operations](https://en.wikipedia.org/wiki/Window_function_(SQL)) in your `sql` expressions, you must set this property to `true` so that Metriql constructs the SQL queries using a subquery. 

```yml
revenue_increase:
  sql: '{measure.revenue} - LAG({measure.revenue}) OVER ({TABLE}.month)'
  window: true
```

Please note that you need to use the referenced measures in your query, otherwise the queries will complain that the measures not available.