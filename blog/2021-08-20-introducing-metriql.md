---
slug: introducing-metriql
title: "Introducing metriql: Open-source metrics store"
author: Burak Kabakci
author_title: Core Team
author_url: https://github.com/buremba
author_image_url: https://avatars.githubusercontent.com/u/82745
tags: [announcement]
hide_table_of_contents: true
draft: false
unlisted: true
---

Today, most data-led/driven companies successfully establish the data warehouse as the single source of truth for their data and collect all their data into their data warehouse through ETL jobs. However, ETL is only one part of the whole process. Companies want to collect and own their data because they want to consume it in various ways to grow their business whether it might be building analytical dashboards for stakeholders or building an ML application. To consume the data via BI or data tools, companies need to model their data, define business metrics and KPIs so stakeholders can have an agreement in the definition of the data. Establishing the single source of truth for metadata is a very difficult because tools and even teams consume the data in different methods than each other. This topic has also been addressed by many data folks recently: Ben has written [The missing piece of the modern data stack](https://benn.substack.com/p/metrics-layer) and Basecamp came up with the [Headless BI](https://basecase.vc/blog/headless-bi) concept, Airbnb introduced [Minerva](https://medium.com/airbnb-engineering/airbnb-metric-computation-with-minerva-part-2-9afe6695b486).

We have been also giving careful thoughts to this particular problem for a while. The way we think about metrics is not just about the definitions, instead, a better integration between data tools and data warehouses. Most companies already use a modern data warehouse and have adopted the data warehouse as the single source of truth. They ingest data in real-time, run ELT jobs directly in their data warehouse, run ad-hoc queries and get the results in low-latency, and even run ML jobs on them.

If you’re using a data transformation tool such as dbt, you can model your data and expose it to your data tools but that’s not often enough for the data tools, we often found ourselves doing extra data modeling in data tools for metric definitions. This is primarily because most of the data tools introduce different ways to define metrics and you need to adopt it to be able to analyze the data reliably using these tools. There are 3 common metric definition types that we've identified, let me explain what they are and how they're defined differently in each BI tool:

### Aggregate measures
In most cases, you usually have a numeric column in your database and define a metric with aggregation functions such as SUM, COUNT, or AVERAGE. If you use Tableau to analyze your sales data, you usually connect it to a table in your data warehouse that has a `Number of Sales` column, use Tableau’s [SUM](https://help.tableau.com/current/pro/desktop/en-us/calculations_aggregation.htm) function to define a default aggregation for that column and slice & dice the data. If your business stakeholders (usually the finance people in this case) don't know about the Tableau expressions, you need to create a workbook manually on behalf of them every time you change the data model. Even if you use the [SUM](https://www.w3schools.com/sql/sql_count_avg_sum.asp) function in ANSI SQL, Tableau doesn’t recognize it and you need to search and use the appropriate Tableau aggregate function to define the metric. If you have some [non-additive](https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/additive-semi-additive-non-additive-fact/) measures such as unique counts, you usually rely on your BI tool's capability to perform ad-hoc calculation for different dimensions. Unfortunately, it's [not](https://blog.gbrueckl.at/2020/11/powerbi-big-data-using-pre-calculated-aggregations-of-semi-and-non-additive-measures/) [that](https://www.tableau.com/about/blog/2018/5/how-instacart-implemented-hyperloglog-redshift-and-tableau-calculate-distinct) easy even in most advanced BI tools nowadays because they don't use [native](https://cloud.google.com/blog/products/gcp/counting-uniques-faster-in-bigquery-with-hyperloglog) [aggregation](https://docs.snowflake.com/en/user-guide/querying-approximate-cardinality.html) functions when querying data warehouses. 

### Non-aggregate measures
As your data model gets more advanced, you start to calculate the metrics such as LTV, and CAC. Customer acquisition cost usually defined as follows:

```
[Total Expenses Metric] / [Total Customers Metric]
```

If you use SQL to define this metric in your data model, you can’t just use an aggregation function such as SUM to calculate this metric. Instead, it should be calculated on the fly directly in an ad-hoc SQL query for the report you're generating. That’s why Tableau has [calculations](https://help.tableau.com/current/pro/desktop/en-us/calculations_calculatedfields_lod.htm), Metabase has [custom expressions](https://www.metabase.com/learn/questions/custom-expressions), PowerBI has [DAX](https://docs.microsoft.com/en-us/power-bi/transform-model/desktop-quickstart-learn-dax-basics). SQL is not enough anymore even though you can write the same expression in SQL, you need to learn these custom expression languages to be able to define your metrics, usually using their GUI.

### Window measures

As your data grows, your charts start to look much better but now you want to see your growth rate. You want to see how much your revenue is increasing compared to the previous months. You basically create a data model defining a WINDOW function as follows:

```
sales - LAG(sales) OVER (order by month)
```

Your business stakeholder wants to use different data buckets such as quarter and year and you realize that you need to create different data models for each of them. It’s OK, you will just copy and paste the existing month and change the date bucket accordingly. After some time, the business stakeholder wants to use different dimensions such as user country, segment, etc. and you realize that you should use Tableau calculations to be able to make it dynamic. Since you already know about the LAG function, you start looking at the Tableau-way but [it’s](https://community.tableau.com/s/question/0D54T00000C6lOy/lag-function-logic) [completely](https://community.tableau.com/s/question/0D54T00000C6afV/how-to-do-lag-in-tableau) [different](https://community.tableau.com/s/question/0D54T00000C6XqLSAV/calculating-lag-days) than SQL approach and now you need to maintain that metric inside Tableau while you’re using SQL for the rest of the data model.

While you can cover these use-cases in most of the well-known BI tools, there are two issues:

1. You need to learn yet another expression language that’s never flexible enough compared to SQL. (It must be compiled to SQL anyway)
2. Since you usually need to use a GUI to define the metrics, it’s not easy to automate, test, or share them with other data tools. (I’m not even talking about continuous integration and deployment)

Moreover, the problem is actually not just about the metric definitions. It's also about another buzzword everyone is talking about, self-serve analytics. If you aim to be one of those data-driven companies, you should enable all the people in your organization to analyze the data without any assistance from the data teams. To achieve that,  depending on the organizational structure, you can either:

1. Teach everyone SQL and have a company-wide documentation for your data.
2. Hire a data team, collect all the company data into a data warehouse, model the data for business requirements and expose the data to the business stakeholders using their preferred tools.

It's not realistic to expect every company to have the luxury to teach SQL to all their stakeholders. Many departments such as product, marketing, and finance have different sets of priorities and responsibilities and don't have [time](https://twitter.com/sethrosen/status/1363327369726074880) to invest in learning SQL. If you go with the latter approach, you usually need to use an ELT provider such as Fivetran, Stitch, etc. and adopt a data transformation tool such as dbt or Airflow for your company or stick with the data transformation features of your BI tool. You usually have the following two options with BI:

##### Go through the sales process and buy an enterprise product such as Tableau, PowerBI, etc.:

* Advantages
    * Powerful visualization
    * Ability to analyze the data much faster by extracting the data if your data source is slow
    * Better community

* Drawbacks
    * Learning curve is too high
    * Doesn’t play well with the direct data sources

##### Stick with a free plug-and-play solution such as Metabase or Google Data Studio:

* Advantages
    * Time to value is much shorter
    * Easy to adopt non-technical people

* Drawbacks
    * Data should be modeled in advance
    * Not flexible enough

Unfortunately, there is no one size fits all solution in the market. The enterprise solutions usually include all the components from data storage, transformation, and visualization whereas plug-and-play solutions focus mainly on data visualization. The enterprise solutions are around for the last 20 years and a lot has been changed since then:

1. Cloud Data Warehouses are efficient enough for self-serve analytics so companies started to collect all their company data into data warehouses. (They can be expensive but there are ways to optimize the cost)
2. SQL became the de facto interface for querying data. (Even NoSQL solutions started to support SQL at some point!)
3. As the data teams grow, the data transformation solutions have to evolve in a way that enables collaboration and automation. (Software developers invaded the data space just like what they did to DevOps)


Looking at these shifts, there is one enterprise focused BI solution that we admire; Looker. We particularly like Looker because they foresaw this shift 7 years ago. Their data modeling language, LookML lets data analysts collaborate, test, and document the data and enable self-serve analytics for business stakeholders, all within SQL. It didn’t even focus much on the data visualization (just compare the customizations that you can apply to a chart in Tableau and Looker) because people only care about the data, not the fancy charts. Once you’re sure that the data is correct, you can get insights even by looking at a boring table. 

However; Looker is still an enterprise product just like Tableau and PowerBI and tries to solve multiple problems at once. Luckily, with Looker’s wave, new data modeling tools have emerged such as dbt Core. It’s an open-source data transformation tool at its core but you can also test and document your data, just like LookML. It’s not comparable to LookML though, it has a much broader audience because it enables all the other data tools to use the generated data models in your data warehouse. It's [not designed](https://blog.getdbt.com/how-do-you-decide-what-to-model-in-dbt-vs-lookml/) to be the serving layer unlike LookML. With dbt Core, we believe that the data transformation layer is a solved problem but the serving layer for your data is still missing. The data tools connect directly to the data warehouses 

> metriql is LookML for all the BI tools in the market. You transform, test, and document your data with dbt, define your metrics with metriql and serve data models to your data tools in a consistent way.

metriql is an open-source project that lets you define your company metrics as code in a central metric store using dbt and later let you sync the data models to all your data tools at once.

metriql sits between your data-warehouse and the data tools. It doesn’t have its query engine, instead leverages your existing data warehouse. While it has a REST API, it’s often not enough. A more tight integration was required for the BI tools so we built MQL, a SQL dialect for your metriql datasets. We have native integrations with multiple tools such as Google Sheets and Google Data Studio and use Trino-interface for some others such as Looker & Tableau.

If you don't have a standardized way of sharing the data across your organization and tools, each team ends up introducing their own way of understanding the data and it gets messy and painful to maintain and this bears discussions like: [self serve is a problem](https://benn.substack.com/p/self-serve-still-a-problem). Our goal is to contribute to the solution of this self-serve problem by working on standardization of the metric definition and distribution.

What we learned by working with data-driven and successful companies in the past years is that they use the right tool for the right job, they don't try to force one tool to fit all use cases. Today, BI tools are the front-end of companies' data and teams want to be able to choose and use any front-end depending on their use case without worrying about vendor lock-in. While the Headless BI concept is relatively new and still in the early stages, it has many use cases which save data teams time and let them sync their data models to any data tool that their stakeholders and teams want to use. Happy and excited to be one of the first companies in this space! 🤞

We already released some metriql [integrations](https://metriql.com/integrations/bi-tools/index) including rakam, Tableau, Google Data Studio, Looker, Python, Rest API. We aim to build integrations with other modern data stack tools as fast as we can and let companies sync their metrics with every data tool they are using. Happy to accept contributions, ideas or integration requests on [GitHub](https://github.com/metriql/metriql/projects/1) and brainstorm aboGut your use-cases [on Slack](https://join.slack.com/t/metriql/shared_invite/zt-tz1nzvyd-ker8LGcBQmzrwvfAkFO1qQ)! 
