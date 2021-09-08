---
slug: common-metric-types
title: "Common Metric Types"
author: Burak Kabakci
author_title: Core Team
author_url: https://github.com/buremba
author_image_url: https://avatars.githubusercontent.com/u/82745
tags: [technical]
hide_table_of_contents: true
---


We've been working on building the first open-source metrics store for the last months. We worked closely with many data teams from different industries and markets to help them define their metrics as code. While working closely with various data teams, we've identified 3 types of metrics definitions that are widely accepted by data teams. Let me explain what these 3 common metric types are and how they are defined in BI tools today:

<!--truncate-->

### Aggregate measures
In most cases, you usually have a numeric column in your database and define a metric with aggregation functions such as SUM, COUNT, or AVERAGE. If you use Tableau to analyze your sales data, you usually connect it to a table in your data warehouse that has a `Number of Sales` column, use Tableau's [SUM](https://help.tableau.com/current/pro/desktop/en-us/calculations_aggregation.htm) function to define a default aggregation for that column and slice & dice the data. If your business stakeholders (usually the finance people) don't know about the Tableau expressions, you need to create a workbook manually on their behalf every time you change the data model. Even if you use the [SUM](https://www.w3schools.com/sql/sql_count_avg_sum.asp) function in ANSI SQL, Tableau doesn't recognize it, and you need to search and use the appropriate Tableau aggregate function to define the metric. If you have some [non-additive](https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/additive-semi-additive-non-additive-fact/) measures such as unique counts, you usually rely on your BI tool's capability to perform the ad-hoc calculation for different dimensions. Unfortunately, it's [not](https://blog.gbrueckl.at/2020/11/powerbi-big-data-using-pre-calculated-aggregations-of-semi-and-non-additive-measures/) [that](https://www.tableau.com/about/blog/2018/5/how-instacart-implemented-hyperloglog-redshift-and-tableau-calculate-distinct) easy even in most advanced BI tools nowadays because they don't use [native](https://cloud.google.com/blog/products/gcp/counting-uniques-faster-in-bigquery-with-hyperloglog) [aggregation](https://docs.snowflake.com/en/user-guide/querying-approximate-cardinality.html) functions when querying data warehouses. 

### Non-aggregate measures
As your data model gets more advanced, you start to calculate the metrics such as LTV and CAC are usually defined as follows:

```
[Total Expenses Metric] / [Total Customers Metric]
```

If you use SQL to define this metric in your data model, you can't just use an aggregation function such as SUM to calculate this metric. Instead, it should be calculated on the fly directly in an ad-hoc SQL query for the report you're generating. That's why Tableau has [calculations](https://help.tableau.com/current/pro/desktop/en-us/calculations_calculatedfields_lod.htm), Metabase has [custom expressions](https://www.metabase.com/learn/questions/custom-expressions), PowerBI has [DAX](https://docs.microsoft.com/en-us/power-bi/transform-model/desktop-quickstart-learn-dax-basics). SQL is not enough anymore even though you can write the same expression in SQL, you need to learn these custom expression languages to be able to define your metrics, usually using their GUI.

### Window measures

As your data grows, your charts start to look much better, but now you want to see your growth rate. You want to see how much your revenue is increasing compared to the previous months. You basically create a data model defining a WINDOW function as follows:

```
sales - LAG(sales) OVER (order by month)
```

Your business stakeholder wants to use different data buckets such as quarter and year, and you realize that you need to create different data models for each of them. It's OK, you will copy and paste the current month and change the date bucket accordingly. After some time, the business stakeholder wants to use different dimensions such as user country, segment, etc., and you realize that you should use Tableau calculations to be able to make it dynamic. Since you already know about the LAG function, you start looking at the Tableau-way but [it's](https://community.tableau.com/s/question/0D54T00000C6lOy/lag-function-logic) [completely](https://community.tableau.com/s/question/0D54T00000C6afV/how-to-do-lag-in-tableau) [different](https://community.tableau.com/s/question/0D54T00000C6XqLSAV/calculating-lag-days) than SQL approach and now you need to maintain that metric inside Tableau while you're using SQL for the rest of the data model.

At Metriql, we're currently supporting all these 3 types of metric definitions. Feel free to reach out to us if you're defining metrics differently in your company, we'd like to learn about your use case, and so maybe we can add a new way to define metrics via Metriql.
