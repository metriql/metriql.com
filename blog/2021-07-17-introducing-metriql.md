---
slug: introducing-metriql
title: Introducing metriql
author: Burak Kabakci
author_title: Core Team
author_url: https://github.com/buremba
author_image_url: https://avatars.githubusercontent.com/u/82745
tags: [announcement]
hide_table_of_contents: true
---

Metric definitions is a hot topic most people are talking about lately. Ben has written [The missing piece of the modern data stack](https://benn.substack.com/p/metrics-layer) and Basecamp came up with the [Headless BI](https://basecase.vc/blog/headless-bi) concept in the last few months.

We have been also giving careful thoughts to this particular problem for a while. The way we think about metrics is not just about the definitions, instead, a better integration between data tools and data warehouses. Most companies already use a modern data warehouse and have adopted the data warehouse as the single source of truth. They ingest data in real-time, run ELT jobs directly in their data warehouse, run ad-hoc queries and get the results in low-latency, and even run ML jobs on them.

If you’re using a data transformation tool such as dbt, you can model your data and expose it to your data tools but that’s not often enough for the data tools, we often found ourselves doing extra data modeling in data tools for metric definitions. This is primarily because most of the data tools introduce different ways to define the metrics and you need to adopt it to be able to analyze the data reliably. Let's categorize the metric types under 3 category:

### Aggregate measures
In most cases, you usually have a numeric column in your database and define a metric with aggregation functions such as SUM, COUNT, or AVERAGE. If you use Tableau for analyzing your sales, you usually connect to a table in your data warehouse that has a `Number of Sales` column, use Tableau’s [SUM](https://help.tableau.com/current/pro/desktop/en-us/calculations_aggregation.htm) function to define a default aggregation for that column and slice & dice the data. If your business stakeholders (usually the finance people in this case) don't know about the Tableau expressions, you need to create a workbook manually on behalf of them every time you change the data model. Even if you use the [SUM](https://www.w3schools.com/sql/sql_count_avg_sum.asp) function in ANSI SQL, Tableau doesn’t recognize it and you need to search and use the appropriate Tableau aggregate function to define the metric. 

### Non-aggregate measures
As your data model gets more advanced, you start to calculate the metrics such as LTV, and CAC. Customer acquisition cost usually defined as follows:

```
[Total Expenses Metric] / [Total Customers Metric]
```

If you use SQL to define this metric in your data model, you can’t just use an aggregation function such as SUM to calculate this metric. Instead, it should be calculated on the fly directly from your visualization tool from the source data. That’s why Tableau has [calculations](https://help.tableau.com/current/pro/desktop/en-us/calculations_calculatedfields_lod.htm), Metabase has [custom expressions](https://www.metabase.com/learn/questions/custom-expressions), PowerBI has [DAX](https://docs.microsoft.com/en-us/power-bi/transform-model/desktop-quickstart-learn-dax-basics). SQL is not enough anymore even though you can write the same expression in SQL, you need to learn these custom expression languages to be able to define your metrics, usually using their GUI.

### Window measures

As your data grows, your charts start to look much better but now you want to see your growth rate. You want to see how much your revenue is increasing compared to the previous months. You basically create a data model defining a WINDOW function as follows:

```
sales - LAG(sales) OVER (order by month)
```

Your business stakeholder wants to use different data buckets such as quarter and year and you realize that you need to create different data models for each of them. It’s OK, you will just copy and paste the existing month and change the date bucket accordingly. After some time, the business stakeholder wants to use different dimensions such as user country, segment, etc. and you realize that you should use Tableau calculations to be able to make it dynamic. Since you already know about the LAG function, you start looking at the Tableau-way but [it’s](https://community.tableau.com/s/question/0D54T00000C6lOy/lag-function-logic) [completely](https://community.tableau.com/s/question/0D54T00000C6afV/how-to-do-lag-in-tableau) [different](https://community.tableau.com/s/question/0D54T00000C6XqLSAV/calculating-lag-days) than SQL approach and now you need to maintain that metric inside Tableau while you’re using SQL for the rest of the data model.

While you can cover these use-cases in most of the well-known BI tools, there is two issues:

1. You need to learn yet another expression language that’s never flexible enough compared to SQL. (It must be compiled to SQL anyway)
2. Since you usually need to use a GUI to define the metrics, it’s not easy to automate, test, or share them with other data tools. (I’m not even talking about continuous integration and deployment)

Moreover, the problem is actually not just about the metric definitions. One other buzzword everyone is talking about is self-serve analytics. If you aim to be one of those data-driven companies, you should enable all the people in your organization to analyze the data without any assistance from the data teams. Depending on the organizational structure, you can either:

1. Teach everyone SQL and have a company-wide documentation for your data.
2. Hire a data team, collect all the company data into a data warehouse, model the data for business requirements and expose the data to the business stakeholders using their preferred tools.

Unfortunately, not all the companies have the luxury to teach SQL to all business stakeholders. Most departments such as product, marketing, and finance have different sets of responsibilities that prevent them from investing [enormous](https://twitter.com/sethrosen/status/1363327369726074880) time learning SQL. If you go with the latter approach, you usually need to use an ELT provider such as Fivetran, Stitch, etc. and adopt a data transformation tool such as dbt or Airflow for your company or stick with the data transformation features of your BI tool. You usually have the following options:

##### Go through the sales process and buy an enterprise product such as Tableau, PowerBI, etc.:

* Advantages
    * Powerful visualization
    * Ability to analyze the data much faster if your data source if slow
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

However; Looker is still an enterprise product just like Tableau and PowerBI and tries to solve multiple problems at once. Luckily, with Looker’s wave, new data modeling tools have emerged such as dbt Core. It’s an open-source data transformation tool at its core but you can also test and document your data, just like LookML. It’s not comparable to LookML though, it has a much broader audience because it enables all the other data tools to use the generated data models in your data warehouse. It's [not designed](https://blog.getdbt.com/how-do-you-decide-what-to-model-in-dbt-vs-lookml/) to be the serving layer unlike LookML as well. With dbt Core, we believe that the data transformation layer is a solved problem but the serving layer for your data is still missing. The data tools connect directly to the data warehouses 

> metriql is LookML for all the BI tools in the market. You transform, test, and document your data with dbt, define your metrics with metriql and serve data models to your data tools in a consistent way.


We believe in using the right tool for the right job. BI tools are now the front-end of your data and your business stakeholders should have the option to choose any front-end depending on their preference. While the Headless BI concept is relatively new and still in the early stages, it has many use-cases that saves data people's life just like how dbt started to replace data transformation within the BI tools. Happy and excited to be one of the first companies in this space! 🤞