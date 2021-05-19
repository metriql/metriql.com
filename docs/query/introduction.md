---
title: Introduction
sidebar_position: 1
---

When you model the data and create datasets, you can analyze the data using the REST API or JDBC Adapter. metriql provides different reporting features for different use-cases and lets you interact with the data in different ways.

You use the `measure` and `dimension` references of your datasets, filter the data using them and calculate different metrics depending on the report type. See the available report types:

| Name | Description | Mappings <br /><sub>(* is required)</sub> |
|-------------|-------------|-------------|
| [Segmentation](segmentation) | Filter, drilldown and calculate the metrics within one dataset | <sub>[event_timestamp](/reference/mapping#event_timestamp)</sub> |
| [SQL](sql) | Run SQL queries with additional Jinja syntax | - | 
| [Funnel](funnel) | Analyze customer event data and understand the user journey |  <sub>[user_id*](/reference/mapping#user_id), [event_timestamp*](/reference/mapping#event_timestamp)</sub> |
| [Retention](retention) | Analyze customer event data and build cohort tables | <sub>[user_id*](/reference/mapping#user_id), [event_timestamp*](/reference/mapping#event_timestamp) </sub> |

------

Here are the common features of the available report types:

### Measure
You can reference the measures by their name. If you're using `column.meta.metriql.measure`, you need to specify the 

### Dimension



### Filters

You can filter the datasets 