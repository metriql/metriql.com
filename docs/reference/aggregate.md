---
title: "Aggregate properties"
sidebar_position: 6
---
Please refer to [Aggregates](/introduction/aggregates) to learn about the aggregate property. It supports the following properties:

### `measures:`
It's an array of measure references within the same model. We support measure references that come from relations. Here are a few examples:

- `total_events`
- `session_relation.total_sessions`

### `dimensions:`
It's an array of dimension references within the same model. For `timestamp | date | time` dimensions, you can post-process the data with a timeframe. Here are a few examples:

- `occurred_at` -- we actually strongly advise using a timeframe when dealing with `timestamp` dimensions
- `user_attributes.user_country`
- `occurred_at:week`

### `filters:`
It's an array of query filters. Here is an example:

```
filters:
   - {mapping|dimension: country, operator: 'equals', value: 'USA'}
```
### `model_name`:

Metriql generates the dbt model name automatically with the following convention:

```
{dataset_name}_{report_type}_{aggregate_name}
```

It's because the aggregate name doesn't necessarily need to be unique across all the datasets and report types. If you would like to override the generated model name, you can set the `model_name` for the aggregate explicitly.

:::warning
If you set the `model_name` for the aggregate, make sure that it's unique across all the metrics.
:::