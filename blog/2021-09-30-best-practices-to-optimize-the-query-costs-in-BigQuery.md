---
title: "Best Practices to optimize the query costs in BigQuery"
author: Emre Semercioglu
author_title: Core Team
author_url: https://github.com/emresemercioglu
author_image_url: https://avatars.githubusercontent.com/u/24774762?v=4
tags: [tutorial]
hide_table_of_contents: false
---

I wanted to write this post to help those starting to worry about their increasing BigQuery cost. You've probably been using Firebase or Google Analytics because of their powerful and free services. Later, you realized the UI isn't advanced enough to answer all your questions about your data. And as your company grew, you needed to combine data from different resources in a single report/dashboard for a complete view of user behaviors across different channels and devices. In one common use case, you wanted to combine product data, marketing and CRM data to understand whether the conversion rates from email to in-app purchase events are higher than conversion rates from ads to in-app purchase events. Answering this or similar questions requires another approach to data storage and consumption. Like many other data-driven and successful companies, you decided to collect all your company data into your data warehouse and do analysis on top of your data warehouse. You ended up using GA4's or Firebase's BigQuery link to load all the data into your BigQuery, which is Google's Cloud Data warehouse solution.
<!--truncate-->
BigQuery offers free credit for new users, which is excellent! You didn't care to think how much it would cost you to store or query data in BigQuery, so naturally, you didn't check for alternatives like Snowflake, Redshift. Everything started very well. You had your Firebase and GA4 data inside your BigQuery, later you loaded data from Google Ads, Adsense and Admob into BigQuery as well thanks to the tight integration between Google Products. You probably started getting insights from your data by asking your data analysts to write SQL queries to draw this insight from your data warehouse. But later, you were introduced to the world of BI tools that can help you get faster and deeper insights from your data with visuals. Your analysts or product managers managed to get powerful insights from your company data and started to build better products, more importantly, the products that your users tell you to build for them through their actions/events. But one day will come and you will notice a big chunk of payment in your credit card statement! Yes, that day, you will realize querying the data inside BigQuery costs something. 

What should you do now? You should understand what causes the costs to increase and whether you can keep the cost at a level that won't hurt your pocket. In most cases, there are actually some tips you can easily implement to lower your costs.

It would help if you understood that you are charged for the number of bytes processed by BigQuery. Therefore, the key to optimizing your query costs is to reduce the number of bytes processed. Let's go through the best practices to reduce the cost of running your queries, such as SQL commands, data structuring, user-defined functions, and more:

Note: I won’t go into details about optimizing the storage costs in this article, maybe it’s a topic for another blog.


### 1) Denormalize the data into individual columns
If you're using struct data type, which means you store all the event properties inside a struct column called event_params, [denormalizing](https://towardsdatascience.com/how-to-build-efficient-and-perfomant-data-structures-in-bigquery-7981203b8a62) the data into individual columns could drastically reduce the data that needs to be processed, leading to a 70% cost-saving potential. This is mainly because when you use UNNEST, BigQuery charges for all the properties inside a STRUCT type, which is probably not what you’re looking for.

### 2) Avoid costly queries by setting up controls
Remember that SELECT * is the most expensive way to query data because it will query across every column available in the table(s), including the ones you might not need. So try to avoid using SELECT * unless you need to.  Here is an example query from BigQuery, you can see the huge processing GB difference between two queries. Even some experienced SQL users can make these mistakes, after all, we're human beings; you or your team can unknowingly query all your data, which could hurt your pocket. So, you can set up controls to limit query cost and prevent these errors. If the query goes above a limit, it will fail without incurring the cost of the query.If you’re just exploring the data and trying to understand the semantic of the table, you can also use no-charge data preview options without affecting quotas.

![Introduction](/img/bigqueryquery.png) 

### 3) Cache the query results.
Caching query results can drastically reduce the load in your BigQuery and boost your performance. You won't also be charged for the results retrieved from the cached tables. By default, cache preference is turned on for 24 hours in BigQuery but you can customize it depending on your use case.

### 4) Pre-aggregate the data in your fact tables
BigQuery has [materialized views](https://cloud.google.com/bigquery/docs/materialized-views-intro) that lets you roll up the data in fact tables. You can create materialized views to reduce the load in your BigQuery. If the question you ask in the interface requires you to query lots of data, instead of running this big and costly query across billions of rows, you can create materialized views which is the smallest and most efficient table available in your database to run this query while still maintaining the accuracy of the result. Even if you have tens of billions of rows, the roll-up tables(materialized) typically have less than a million rows. If you're using [dbt](https://docs.getdbt.com/docs/building-a-dbt-project/building-models/materializations) for the data transformation layer, you can define materializations via dbt too. Using materialization methods in general will help you reduce query cost and boost the performance. 

### 5) Use BigQuery BI Engine
You can allocate slots from BI engine to keep the data in tables in memory and avoid BigQuery’s processing cost. BI Engine has fixed cost and pricing which are based on the memory that you allocate. So if you can pre-aggregate the data in your fact tables and query them, you can efficiently run queries without paying any extra processing fee. Metriql can help you build an [OLAP engine](https://metriql.com/blog/2021/09/07/olap-in-modern-data-stack/#1-bigquery-bi-engine) using BigQuery and expose the metadata to your favorite downstream tools via its [integrations](https://metriql.com/integrations/bi-tools/index).

### 6) Lastly, know when you need to switch from on-demand to flat-rate.
Once your BigQuery monthly bill hits north of $10,000, check your BigQuery cost for processing queries to see if flat-rate pricing could be a better choice.

