Metriql---
title: "Dataset properties"
sidebar_position: 1
---

<File name='models/schema.yml'>

```yml
models:
  - name: customers
    description: List of customers
    meta:
     metriql:
      [label](#label): Customers
      [hidden](#hidden): false
      [measures](measure):
        total_rows:
          [aggregation](measure#aggregation) count
          [dimension | column | sql](measure#dimension--column--sql) <reference>
          [filters](measure#filters) <filters>
             // filtered measure
      [dimensions](dimension)
        full_location:
          [column | sql](dimension#column--sql) <reference>
          type: string
      [category](dimension#category) User Segments
      [mappings](mapping)
        user_id: id
        event_timestamp: occurred_at
      [relations](relation)
        events:
          to: ref('user_id')
      [aggregates](dataset#aggregates)
        total_customers:
           measures: ['total_rows']
           dimensions: ['full_location']
      [always_filters](dataset#always_filters)
        - {dimension: 'is_active', value: true}
    columns:
       country:
         description: The country the user signed up from
         meta:
           metriql.dimension:
              [type](field#type) string
              [label](field#label) User Country
              [category](field#category) Location
              [hidden](field#hidden) false
              [primary](field#primary) false
              [name](field#name) location_country
       created_at:
         meta:
           metriql.dimension:
              type: timestamp
              [timeframes](dimension#timeframes) [day, week, month, year] # only available for timestamp columns
       total_sales:
         meta:
           metriql.measure:
              [aggregation](measure#aggregation) sum
```

</File>

### `label:`
The value will be shown in the user interface. If the label is not set, the default label is the `name` of the model.

```yml
label: Facebook Ads
```

### `hidden:`
If the value is true, the model will not show up in the user interface.

```yml
hidden: false
```

### `category:`

If you set the `category` field in your models, the system requires the end user to select one of the categories before selecting the actual model. Otherwise, all the models under the same page will be listed in a single select box. It's good practice to set the category field for accessibility if you have more than 20 models. If you have set the category in at least one of the models, the models that don't belong to a category will be grouped as *Uncategorized* in the user interface.

### `measures:`

There are two ways to define a measure; under `<model l seed | source>.columns.meta.measure`:

```yml
created_at:
    meta:
        metriql.measure:
            aggregation: count_unique
            column: user_id
```

 or `<model l seed | source>.meta.metriql.measures` for measures that will be written as SQL:

```yml
models:
  - name: facebook_ads
    meta:
      metriql:
        measures:
          custom_measure:
            aggregation: sum
            sql: "{TABLE}.column1 * 2"
```

For more information, see [Measure properties](/reference/measure)

### `dimensions:` 

There are two ways to define a dimension; under `<model l seed | source>.columns.meta.dimension`:

```yml
created_at:
         meta:
           metriql.dimension:
	      type: timestamp
	      timeframes: [day, week, month, year] # only available for timestamp columns
```

 or `<model l seed | source>.meta.metriql.dimension` for measures that will be written as SQL:

```yml
models:
       - name: facebook_ads
         meta:
              metriql:
                   dimensions:
                        custom_dimension:
	                     sql: "{{TABLE}}.column1 * 2"
```

### `relations:`

The relations between the models can be defined under `<model l seed | source>.meta.metriql.relations` as follows:

```yml
models:
  - name: events
    meta:
      metriql:
        relations:
          user_attributes:
            model: users
            sql: "{TABLE}.user_id = {TARGET}.id"
            relationship: many_to_one
            type: left_join

```

### `aggregates:`

Aggregates should be defined under `<model | seed | source>.meta.metriql.aggregates`. You can see the [Aggregate properties](aggregate-properties) or learn more about the concept on [Aggregates](/introduction/aggregates).


### `always_filters:`

If you define `always_filters` for a `view`, the system pushes the relevant filter for all the queries that are executed in metriql. 

```yml
models:
  - name: pageview_events
    extens: ref('all_events')
```

### `extends`

If you want to re-use the `dimensions`, `measures`, `relations`, and `mappings` of another model or source in a dbt project, you can extend from it. When you extend from another dbt model, metriql automatically re-use the fields in the current model. If you have additional fields, it tries to merge all the fields that are defined in the current model.

```yml
models:
  - name: pageview_events
    extens: ref('all_events')
```