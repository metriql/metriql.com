---
title: "Creating Datasets"
sidebar_position: 3
---

A dataset represents a dataset in your data warehouse. Rakam automatically creates datasets from your dbt [`models`](https://docs.getdbt.com/docs/building-a-dbt-project/building-models), [`sources`](https://docs.getdbt.com/docs/building-a-dbt-project/using-sources), and [`seeds`](https://docs.getdbt.com/docs/building-a-dbt-project/seeds). You can also semantically define your datasets as SQL using our [`view`](https://docs.rakam.io/docs/semantic-models) resource in a semantic way.

A dataset has three important properties:

**dimension** lets you drill down into the dataset, it can be used to filter query results. It can be either a column in your table or a SQL expression that processes a single row and returns a value.

**measure** is a field that uses a SQL aggregate function, such as `count`, `sum`, or `average`. Measures can be used to aggregate dimensions. For example, measures for a `Sales` model might include total items sold (a count), total sales price (a sum), and the average sales price (an average). 

**relation** defines a join in between the datasets. metriql automatically generates SQL join logic to bring in all fields from another dataset correctly then the user analyzes a specific dataset.

Rakam makes use of dbt as the data modeling language by extending dbt for metric definition. Your dbt projects can be integrated to Rakam via GIT and we automatically synchronize the dbt `models`, `seeds`, and `sources`. However; dbt doesn't know about business metrics (aka. `measures`) so we have an additional field that will be used inside `yml` files.

## Integrate dbt models

You can map your columns as dimensions and measures under the `meta` property of `columns` as follows:

```yml
models:
 - name: customers
   columns:
     - name: country_code
       meta:
         metriql.dimension:
           type: string
     - name: city
       meta:
         metriql.dimension:
           type: string
     - name: total_customers
       description: total number of customers defined as count(*) in sql
       meta:
         metriql.measure:
    	    aggregation: sum
```

In addition to column mapping, you can also create custom measures and dimensions by defining them under `meta` of the model:

```yml
models:
  - name: customers
    meta:
      metriql:
         measures:
            total_rows:
               aggregation: count
         dimensions:
            full_location:
	            sql: CONCAT({TABLE}.country, {TABLE}.city)   
	            type: string
```

You can see the full list of properties that you can use under `model.meta` and `column.meta` here.

## Mapping sources as models

In case you want to create models that point to tables in your database, you can make use of dbt's source properties as follows:

```yml
sources:
  - name: raw_events
    tables:
      - name: pageview
        meta:
          metriql:
             measures:
                total_pageviews:
                aggregation: count
        columns:
          - name: url
            meta:
              metriql.dimension:
                type: string
```

If you're analyzing the time-series data, you can also define `mappings` so that Rakam understands your data in a better way and lets you access specific features such as funnel and retention:


```yml
models:
  - name: events
    meta:
      metriql:
	      mappings:
	        event_timestamp: event_occurred_at
	        userId: user_id
```

## Integrating seeds into your models

#### Exposing your seeds to the end-users
Since seeds are usually used to enrich the data, we don't create models from `seeds` by default. However; you can expose them to the end-users if you enable the `seeds` to have appeared in dbt docs:

```yml
seeds:
  - name: countries
    docs:
      show: true
    meta:
      metriql:
        measures:
        #
    columns:
      - name: iso_code
        meta:
          metriql.dimension:
      - name: user_friendly_name
        meta:
          metriql.dimension: 
            type: string
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

metriql automatically creates the relation from `pageview` to a hidden `countries` model so that the users can drill down by `user_friendly_name` when they're analyzing `pageviews`.

### Supported tests

We make use of your dbt test definitions in order to understand your data in a better way. Here is the list of column tests we currently support:

* `unique` enables Rakam to be able to calculate symmetric aggregates as there must be a unique key in a model.
* `not_null` hides the `is not set` filter to the user in the user interface.
* `accepted_values` makes Rakam suggests the values to the end-user in the user interface. It disables the automatic suggestion in favor of performance.
* `relationships` automatically creates the relations between the models. We extend it with `join` and `type` properties in order to resolve the relation.