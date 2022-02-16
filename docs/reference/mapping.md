---
title: "Mapping properties"
slug: "mapping"
hidden: false
createdAt: "2021-04-28T17:49:08.720Z"
updatedAt: "2021-04-28T18:13:04.289Z"
---
## Mappings

Models have **mappings** that let the system understand the data in a better way. It's basically a list of string to dimension pair as follows:

```yml
mappings:
    event_timestamp: occurred_at # dimension name
    user_id: anonymous_id
```

##  `event_timestamp`: 
If the dataset represents time-series data, you can set the value that points to a dimension with the `timestamp` type, the implications are:
* [Aggregates](/introduction/aggregates) will create `incremental` dbt model instead of `table` models to process the data incrementally.
* The downstream tools that support time-series data will be syncronized to utilize the timestamp dimension.
  * For example, [Data Studio](https://support.google.com/datastudio/answer/7059697?hl=en#zippy=%2Cin-this-article) and [Superset](https://preset.io/blog/2020-06-26-timeseries-chart/) has an optional timestamp column that lets you drilldown different granularies and Metriql maps the event_timestamp to their native timeseries mapping.

##  `user_id`: 
 If your dataset represents user data such as a customer event type (ex: `pageview` or `transaction`), you can set the user_id the unlock product analytics features. The implications are:
* You will be able to use Funnel and Retention report types.
* The downstream tools that support user data will be synchronized.
