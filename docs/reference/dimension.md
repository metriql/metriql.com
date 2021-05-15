---
title: "Dimension properties"
sidebar_position: 3
---
Dimensions let you drill down a model by filtering, grouping, and pivoting. They're basically SQL expressions that are referenced in the `GROUP BY` clause. 

### `column: | sql:`

One of `column`, and `sql` should be set in order to define the dimensions under `dimension`. If your data is already modeled and clean, a model usually points to a table in your database, and dimensions point to the columns under the table. If you're using complex types such as JSON, you can define dimensions by making use of `sql`.

```yml
models:
   - name: events
     meta:
        rakam:
          dimensions:
          	location:
          	   sql: CONCAT({{TABLE}}.country, {{TABLE}}.city)
          	country:
          	   column: country
```

Please note that these fields are not required under `column.meta` as they point to the relevant `column`.

**`sql:`** lets you define the complex expressions, you can compose a dimension with a combination of columns and/or columns semantically.
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
[block:parameters]
{
  "data": {
    "h-0": "Type",
    "0-0": "timestamp",
    "h-1": "Available Timeframes",
    "1-0": "date",
    "2-0": "time",
    "0-1": "`hour`, `day`, `week`, `month`, `year`, `hour_of_day`, `day_of_month`, `week_of_year`, `month_of_year`, `quarter_of_year`, `day_of_week`",
    "1-1": "`day`, `week`, `month`, `year`, `day_of_month`, `week_of_year`, `month_of_year`, `quarter_of_year`, `day_of_week`",
    "2-1": "`minute`, `hour`"
  },
  "cols": 2,
  "rows": 3
}
[/block]