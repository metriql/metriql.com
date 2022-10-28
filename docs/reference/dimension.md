---
title: "Dimension properties"
sidebar_position: 3
---
Dimensions let you drill down a model by filtering, grouping, and pivoting. They're basically SQL expressions that are referenced in the `GROUP BY` clause. 

By default, if you don't have `columns` property in your [YML definitions](https://docs.getdbt.com/reference/model-properties), Metriql creates dimensions from all your columns by converting their column names to dimension names. If your dimension names doesn't conform the [convention](field#name), we lowercase all the characters and strip the special ones from the name. For example, if your column name is `Country ISO`, the dimension name becomes `country_iso`. The best practice is to define the `columns` property under the dbt resources since automatically converting columns to dimensions may cause inconsistencies and break your existing reports in your BI tools.

You can define the dimensions using `meta.metriql.dimensions` and `columns.meta`. Here is an example that use both methods:

```
models:
  - name: events
    meta:
      metriql:
        dimensions:
          computed_dimension:
            sql: "{TABLE}.col1 * 2" # useful in case you want to define dimensions as SQL
            type: string
    columns:
      - name: col1
        meta:
          metriql.dimension:
            - type: string

```

Defining `type` under `metriql.dimension` is optional but recommended. If you don't define the type, Metriql discovers the type by running a metadata query in your database.

Here is the list of properties that you can use to define dimensions:

### `column: | sql:`

You should set either `column` or `sql` in order to define the dimensions under `model.meta.metriql.dimensions`. If your data is already modeled and clean, a model usually points to a table in your database, and dimensions point to the columns under the table. If you're using complex types such as JSON, you can define dimensions by making use of `sql`.

```yml
models:
   - name: events
     meta:
        metriql:
          dimensions:
          	location:
          	   sql: CONCAT({TABLE}.country, {TABLE}.city)
          	country:
          	   column: country
```

Please note that these fields are not required under `column.meta` as they point to the relevant `column`.

**`sql:`** lets you define the complex expressions, you can compose a dimension with a combination of columns semantically.
**`column:`** references the columns in the model target.

### `primary:`

Marks the dimensions as the primary key. We make use of primary keys when joining other models. 

`primary: true`

### `pivot:`

Enables the pivoting for the dimension in the segmentation reporting type.

`pivot: true`

### `timeframes:`

You can let the end user see the date for different date intervals and buckets. By default, all the applicable timeframe values are enabled for `date`, `timestamp`, and `time` dimensions.

```yml
timeframes: [week, month, year, hour_of_day, day_of_month]
```


| Type      | Available Timeframes                                                                                                                     |
|-----------|------------------------------------------------------------------------------------------------------------------------------------------|
| timestamp | `hour`, `day`, `week`, `month`, `year`, `hour_of_day`, `day_of_month`, `week_of_year`, `month_of_year`, `quarter_of_year`, `day_of_week` |
| date      | `day`, `week`, `month`, `year`, `day_of_month`, `week_of_year`, `month_of_year`, `quarter_of_year`, `day_of_week`                        |
| time      | `minute`, `hour`                                                                                                                         |