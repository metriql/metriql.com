Metriql---
sidebar_position: 1
---

# What is metriql?

metriql lets you define your metrics centrally for once and synchronize them globally to every other tool you're using. People talk about metrics and KPIs, not database tables and columns. While there are great tools, such as [dbt Core](https://getdbt.com) from Fishtown Analytics for the transformation layer, the metadata layer was an unsolved problem. Each BI tool introduces its way of defining metrics and dimensions. Most of them don't provide a well-defined API so that you can share the metrics with the other tools.

We believe that the data warehouse is the [single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth). As you load tons of data into your data warehouse, it gets hard to maintain and make them useful for your organization. You're also likely to consume the data in a lot of different ways: 

1. Business, finance,  and marketing departments use Business Intelligence tools.
2. Product managers use product analytics tools.
3. Data analysts use SQL 
4. Data scientists use a variety of tools such as Python, R, and APIs.

If you don't have a standardized way of sharing data within your organization, each department will need to introduce its own way of understanding the data, which gets messy and painful to maintain. metriql solves this exact problem as the metadata layer of your data.

We realize that you may need to transform the data because metric and dimension definitions are only one part of the problem. We don't want to introduce another way to transform the data though, as it's a solved problem with [dbt Core](https://getdbt.com). That's why metriql works as an extension of dbt, you can use dbt to transform the data and implement metriql in your existing project without learning a brand new technology. If you don't need to transform the data, you can also use dbt's [sources](https://docs.getdbt.com/docs/building-a-dbt-project/using-sources) for metriql.

The problem is defined as [the missing piece of the modern data stack](https://benn.substack.com/p/metrics-layer), and [Headless BI](https://basecase.vc/blog/headless-bi). If you haven't read thesee articles, we strongly advise you to do so. 


Still not clear? See [FAQ](/faq).

If you're ready to try metriql, see the the tutorials [for starters](/tutorial/for-starters) or [for dbt users](/tutorial/for-dbt-users).
