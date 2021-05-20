---
title: Introduction
sidebar_position: 1
---

# Querying datasets

When you model the data and create datasets, you can analyze the data using the REST API or JDBC Adapter. metriql provides different reporting features for different use-cases and lets you interact with the data in different ways.

You use the `measure` and `dimension` references of your datasets, filter the data using them and calculate different metrics depending on the report type. See the available report types:

| Name | Description | Mappings <br /><sub>(* is required)</sub> |
|-------------|-------------|-------------|
| [Segmentation](segmentation) | Filter, drilldown and calculate the metrics within one dataset | <sub>[event_timestamp](/reference/mapping#event_timestamp)</sub> |
| [SQL](sql) | Run SQL queries with additional Jinja syntax | - | 
| [Funnel](funnel) | Analyze customer event data and understand the user journey |  <sub>[user_id*](/reference/mapping#user_id), [event_timestamp*](/reference/mapping#event_timestamp)</sub> |
| [Retention](retention) | Analyze customer event data and build cohort tables | <sub>[user_id*](/reference/mapping#user_id), [event_timestamp*](/reference/mapping#event_timestamp) </sub> |


:::tip
If you're using metriql in a BI tool, you're mostly like be executing [Segmentation](segmentation) queries.
:::

---

Here are the common features of the available report types:

## Measure
You can reference the measures by their name. If you're using `column.meta.metriql.measure`, you need to specify the name of the measure explicity as follows:

```yml
models:
  - events
    meta:
      metriql:
        measures:
          *total_events*:
            aggregation: count
    columns:
      - name: revenue
        meta:
          metriql.measure:
            aggregation: sum
            name: *total_revenue*
```

For the `events` dataset here, `total_events` and `total_revenue` are the available measures that you can reference in the queries.

## Dimension

metriql automatically maps all your columns as dimensions. If the column name has non-ascii characters
If you're referencing a `date`, `timestamp`, `time` dimension, you can use the timeframes as follows:

```
dimension_name::time_of_day
```


## Filters

You can filter the datasets by its dimensions and measures. There are different operators avaiable for different types.

```javascript
{
    # one of `dimension` or `measure` is required
    "dimension": "country", # adds a WHERE condition to the query. Use `:name` for referencing a mapping (ex. [`:user_id`](/reference/mapping#user_id))
    "measure": "total_revenue", # adds a HAVING condition to the query

    # see [operators](#operator) for possible values
    "operator": "equals", 
    "value": "value_for_operator"
}
```

### Operator

#### For all types:

`is_set` and `is_not_set` can be used for NULL checks. The value must be not be set.

```yml
filters: [{measure: vendor_type, operator: is_set}]
```

#### For `integer`, `decimal`, `double`, `long`:

`not_equals` , `less_than`, `equals`, `greater_than`. The value must be a numeric value

```yml
filters: [{measure: time_spent_on_page, operator: greater_than, value: 10}]
```

#### For `boolean`:

`is` can be used for boolean equity check. The value can be either `true` or `false`

```yml
filters: [{dimension: is_upgraded, operator: is, value: true}]
```

#### For `timestamp`:

`equals`, `less_than`, `greater_than`, `between`. The value ben be defined as absolute or relative values.

##### Relative values

When you select a

##### Absolute values


#### For `date`:

`equals`, `less_than`, `greater_than`, `between`

#### For `time`:

`equals`, `less_than`, `greater_than`

#### For `array_string`:

`includes`, `not_includes`


### Referencing fields from other datasets through relations

If you define a relation in between multiple datasets, you can also access the measures and dimensions in the target datasets.


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
    columns:
      - name: country
        tests:
          - not_null
          - relationships:
              to: ref('countries')
              field: iso_code
              metriql: # Includes info about the relationship
                   join: left_join 
                   type: many_to_many
```

In this case, the reference `countries.total_countries` from the dataset `pageviews` automatically creates a join in your SQL query. Learn more about the relations from [here](/reference/relation).