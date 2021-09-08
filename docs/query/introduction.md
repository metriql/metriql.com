Metriql---
title: Introduction
sidebar_position: 1
---

# Querying datasets

When you model the data and create datasets, you can analyze the data using the REST API or JDBC Adapter. metriql provides different reporting features for different use-cases and lets you interact with the data in different ways.

You can use the `measure` and `dimension` references of your datasets, filter the data using them and calculate different metrics depending on the report type. See the available report types:

| Name | Description | Mappings <br /><sub>(* is required)</sub> |
|-------------|-------------|-------------|
| [Segmentation](segmentation) | Filter, drilldown and calculate the metrics within one dataset | <sub>[event_timestamp](/reference/mapping#event_timestamp)</sub> |
| [SQL](sql) | Run SQL queries with additional Jinja syntax | - | 
| [Funnel](funnel) | Analyze customer event data and understand the user journey |  <sub>[user_id*](/reference/mapping#user_id), [event_timestamp*](/reference/mapping#event_timestamp)</sub> |
| [Retention](retention) | Analyze customer event data and build cohort tables | <sub>[user_id*](/reference/mapping#user_id), [event_timestamp*](/reference/mapping#event_timestamp) </sub> |


:::tip
If you're using metriql in a BI tool, you will most likely be executing [Segmentation](segmentation) queries.
:::

---

Here are the common properties of the available report types:

## `dataset`

You can reference datasets using the `ref` or `source` functions in your dbt project as follows:

```yml
dataset: source('events', 'pageview')
```

Alternatively, you can override the dataset name using `meta.metriql.name` property as follows:

```yml
models:
  - events
    meta:
      metriql:
        name: events
```

and reference the `events` model as follows:

```yml
dataset: events # alternative to ref('events')
```

## `measure`
You can reference the measures by their name. If you're using `column.meta.metriql.measure`, you need to specify the name of the measure explicity as follows:

```yml
models:
  - events
    meta:
      metriql:
        measures:
          total_events:
            aggregation: count
    columns:
      - name: revenue
        meta:
          metriql.measure:
            aggregation: sum
            name: total_revenue
```

For the `events` dataset here, `total_events` and `total_revenue` are the available measures that you can reference in the queries.

## `dimension`

metriql automatically maps all your columns as dimensions. If the column name has non-ascii characters, you should define `name` of the dimension explicitly to be able to reference as follows:

```yml
columns:
    - name: "test column"
    meta:
        metriql.dimension:
        name: test_column
```

If you're referencing a `date`, `timestamp`, `time` dimension, you can use the timeframes as follows:

```yml
dimension_name::[month_of_year](/reference/dimension#timeframes)
```


## `filter`

You can filter datasets by their dimensions and measures. There are different operators available for different types.

You can reference dimensions in the filter as shown below. You can also reference mappings with `:` prefix. For example, use [`:user_id`](/reference/mapping#user_id) in dimension if you want to filter by user_id.
```yml
filters: 
 - dimensions: country # adds a WHERE condition to the query.
   [operator](#operator): equals
   value: value_for_operator
```

or, you can reference a measure in the filter:
```yml
filters: 
 - measure: total_revenue # adds a HAVING condition to the query
   [operator](#operator): equals
   value: value_for_operator
```

### Operator

For different [field types](/reference/field#type), metriql offers different operators to filter the data.

#### For all types:

`is_set` and `is_not_set` can be used for NULL checks. The `value` must not be set.

```yml
filters: [{measure: vendor_type, operator: is_set}]
```

---
#### For `integer`, `decimal`, `double`, `long`:

`not_equals` , `less_than`, `equals`, `greater_than`. The `value` must be a numeric value

```yml
filters: [{measure: time_spent_on_page, operator: greater_than, value: 10}]
```

---
#### For `boolean`:

`is` can be used for boolean equity checks. The `value` can be either `true` or `false`

```yml
filters: [{dimension: is_upgraded, operator: is, value: true}]
```

---
#### For `timestamp`:

`equals`, `less_than`, `greater_than`, `between`. The `value` can be defined as absolute or relative values.

##### Relative values

You can add timestamp filters relative to the current timestamp as follows:

```yml
filters: [{dimension: created_at, operator: between, value: '1 day'}]
```

The filter above compiles to the following SQL:

```sql
WHERE 
    created_at >= CAST(DATEADD(DAY, -1, to_date(date_trunc('day', CURRENT_TIMESTAMP)) AS TIMESTAMP)) 
    AND created_at < CAST(DATEADD(DAY, 1, to_date(date_trunc('day', CURRENT_TIMESTAMP)) AS TIMESTAMP))
```

metriql filters the data from the beginning of the previous day to the end of the current day for `1 day`.

The date period can be either `minute`, `hour`, `day`, `week`, `month`, or `year`. metriql also supports the plural versions such as `minutes`.

##### Absolute values

If you want to select based on absolute date intervals, the value must be an object as follows:

```yml
filters: [{dimension: created_at, operator: between, value: {start: '2020-01-10', end: '2020-01-20'}}]
```

The filter above compiles to the following SQL:

```sql
created_at >= CAST('2020-01-10' AS TIMESTAMP) AND created_at < CAST('2020-01-20' AS TIMESTAMP)
```

:::tip
If you set the timezone defined in your config file, all the timestamp references are wrapped with timezone conversion function. For example, in Snowflake it's `CONVERT_TIMEZONE('UTC', CAST('2020-01-20' AS TIMESTAMP))`
:::

 ---

#### For `date`:

`equals`, `less_than`, `greater_than`, `between`. The `value` can be defined as absolute or relative values similar to timestamp type.

---
#### For `time`:

`equals`, `less_than`, `greater_than`. The `value` should be a string as follows:

```yml
filters: [{dimension: occurred_at_time, operator: equals, value: '16:00'}]
```

If you set the timezone defined in your config file, the time value will be shifted for your timezone.

---
#### For `array_string`:

`includes`, `not_includes`. You can use the filters as follows:

```yml
filters: [{dimension: items, operator: includes, value: 'array_item'}]
```

metriql actually has types `array_*` for all primitive types and the value can be set based on the primitive type as follows:

```yml
filters: [{dimension: array_integer_dimension, operator: includes, value: 4}]
```

### Referencing fields from other datasets through relations

If you define a relation between multiple datasets, you can also access the measures and dimensions in the target datasets.


```yml
seeds:
  - name: countries
    meta:
      metriql:
        measures:
          total_countries:
            aggregation: count
models:
  - name: pageviews
    meta:
      metriql:
        relations:
          country:
            to: ref('countries')
            sql: "{TABLE}.country = {TARGET}.iso_code"
            type: left_join 
            relationship: many_to_many
```

In this case, the reference `countries.total_countries` from the dataset `pageviews` automatically creates a join in your SQL query. Learn more about the relations [here](/reference/relation).