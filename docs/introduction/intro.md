---
sidebar_position: 1
---

# What is metriql?

metriql lets you define your metrics for once and synchronize them everywhere. People talk about metrics and KPIs, not database tables and columns. While there are great tools (looking at you, dbt) for transformation layer, the metadata layer was an unsolved problem. Each BI tool introduce its own way of defining metrics and dimensions and most of them doesn't provide a well-defined API so that you can share the metrics with the other tools that you're using under your organization. 

We believe that the data warehouse is the [single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth). As you load tons of data to your data-warehouse, it gets hard to maintain and make them useful for your organization. You're also likely to consume the data in a lot of different ways: 

1. Business, finance,  and marketing people use Business Intelligence tools.
2. Product people use product analytics tools.
3. Data analysts use SQL 
4, Data scientists use variety of tools such as Python, R, and APIs.

If you don't have a standartized way of sharing the data with your organization, each departmant needs to introduce its own way of understanding the data and gets messy and painful to maintain. metriql solves this exact problem, it serves as the metadata layer of your data.

We realize that you need to transform the data as well, the metric & dimension definition is only one part of the problem. We don't want to introduce yet another way to transform the data though, we believe that it's a solved problem with [dbt](https://getdbt.com). That's why metriql works as an extension of dbt, you can use dbt to transform the data and implement metriql to your existing project without learning a brand new technology. If you don't need to transform the data, you can also use dbt's [sources](https://docs.getdbt.com/docs/building-a-dbt-project/using-sources) for metriql.

The problem is defined as [the missing piece of the modern data stack](https://benn.substack.com/p/metrics-layer), and [Headless BI](https://basecase.vc/blog/headless-bi). If you didn't read the articles, we strongly advise you to do so. 


Still not clear? See [FAQ](/faq).

If you're ready to try metriql, see the the tutorials [for starters](/tutorial/for-starters) or for [dbt users](/tutorial/for-dbt-users).