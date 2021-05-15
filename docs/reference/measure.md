---
title: "Measure properties"
sidebar_position: 4
---

Measures are the business metrics that calculate a value for a model. Here are a few examples of measures: 

* `total_rows` compiles to `count(*)`,
* `unique_users` compiles `count(distinct user_id)` in SQL. 
[block:api-header]
{
  "title": "Measure Fields"
}
[/block]
### `dimension: | column: | sql:`

One of `dimension`, `column`, and `sql` should be set in order to define the measures under `model.meta.rakam.measures`. If it's not set, the measure simply counts the all rows (i.e. `count(*)`). Here are a few examples:


```yml title="models/events.yml"
models:
   - name: events
     meta:
        rakam:
          measures:
				total_rows:
				   aggregation: count
				unique_users:
				   aggregation: count_unique
				   dimension: user_id
				unique_users_total_rows_ratio:
				   sql: {{measure.total_rows}}/{{measure.unique_users}}
```

Please note that these fields are not required under `column.meta` as they point to the relevant `column`.

**`column:`** references the column in the model target. 

**`dimension:`** references the dimensions within the same model.

**`sql:`** lets you define complex expression, where column type measure is not capable of. 
For referencing other entities inside a measure checkout the [SQL Context](sql-context).

### `aggregation:`

The aggregation function that will be applied to to the measure value `dimension | column | sql`.

Here are the valid values:

`count`, `count_unique`, `sum`, `minimum`, `maximum`, `average`, `approximate_unique`

```yml
total_users:
  dimension: 'user_id'
  aggregation: approximate_unique
```

`aggregation` is not required if the `sql` is defined. Here is an example:

```
total_events_user_ratio:
	sql: {{measure.total_rows}} / {{measure.total_users}} 
```

### `filters:`

You can restrict a measure to aggregate only certain dimension values, without applying a filter to an entire query. Here is an example:

```yml
event_last_week:
   aggregation: count
   filters: [{dimension: occurred_at, value: 1 week, operator: between}]
```

The measure above compiles to the following SQL expression:

```sql
COUNT(CASE WHEN WEEK(now(), occurred_at) < 1 THEN NULL ELSE 1)
```