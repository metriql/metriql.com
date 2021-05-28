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