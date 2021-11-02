---
title: "LookML and Tableau - is it a match made in heaven?"
author: Emre Semercioglu
author_title: Core Team
author_url: https://github.com/emresemercioglu
author_image_url: https://avatars.githubusercontent.com/u/24774762?v=4
tags: [vision]
hide_table_of_contents: false
---

**Short answer:** If you're a customer of both these tools, yes, it's terrific news for you! Otherwise, there are more flexible and cheaper solutions than LookML to create a semantic layer for Tableau.
<!--truncate-->

We all heard the [big news](https://www.tableau.com/about/blog/2021/10/expanding-google-partnership-tableau-integrations-looker-bigquery) yesterday. Thanks to the new integration between these two, users will access Looker's semantic layer from Tableau. It means users can model their data using LookML and later use these models in either Tableau or Looker to explore and visualize their data.

Today, Tableau and Looker could be the most popular BI tools, without a doubt. They both offer something unique that users can't find in other BI tools: Tableau's advanced visualization capabilities and Looker's semantic layer, aka LookML. This integration brings the best of both tools together. 

Tableau might be offering the best in class exploratory data analysis, but unlike Looker, it doesn't play well with the modern data warehouses. Most of its power users use Tableau in extract mode, which requires them to load the data into Tableau servers, thus leading to data duplication and exposure of sensitive company data. On the other hand, Looker's semantic layer gives so much flexibility: Users can access and explore their data in their data warehouse without moving or duplicating it, thanks to the robust semantic layer. 

Today, In the modern data stack, companies tend to collect all their data into a single database/warehouse/lake and call it the single source of truth for their data. They don't want to move the data out from their warehouse; instead, they use data warehouse-centric tools to access, process, and explore this data on top of their warehouse. Since Tableau wasn't built on this vision and promise, they were struggling to bring Tableau to the modern data stack, and it looks like they are aiming to solve this issue with their new integration with LookML.

If the company wants to use Tableau in a live connection with their data warehouse, they can define their datasets using LookML and connect to this semantic layer from Tableau. That seems like a great strategy at first, but this approach has some difficulties: You can't just use LookML; you need to purchase the whole Looker platform. 

Looker isn't a cheap product; it's an enterprise product and is considered one of the most expensive tools in the market because it comes with extensive capabilities: Self-service Data exploration and visualization, semantic layer (LookML), Looker actions, etc. If your company has already purchased both of these tools, you can easily use this integration without paying extra money, which is excellent! However, if your company was only using Tableau, it probably doesn't make sense to buy Looker just for the sake of using the LookML semantic layer. There are better and free alternatives of LookML that you can use to create a universal semantic layer. (looking at you, **dbt** and **Metriql**)

[dbt](https://www.getdbt.com) is an open-source transformation tool that enables data teams to transform, test and document data in the cloud data warehouses. [Metriql](https://metriql.com) is also an open-source project that lets companies create a semantic layer of their data by extending dbt for metrics definitions and syncing these data models to their preferred BI tools through [integrations](https://metriql.com/integrations/bi-tools/index). Instead of purchasing Looker, you can set up dbt and Metriql for free, create a universal semantic layer and expose your data not only to Tableau but all other BI and data tools that your company wants to use.

Metriql can be the single source of truth for your metadata and let your teams build, collaborate, and test their data models in a vendor-neutral environment where they don't need to fear of being vendor locked in. For Tableau, the workflow is as follows:

1. You model the data with Metriql.
2. Go to dashboard, click Tableau and select the dataset that you want to analyze.
3. Once you download the [TDS file](https://help.tableau.com/current/pro/desktop/en-us/environ_filesandfolders.htm#:~:text=Extract%20Your%20Data.-,Data%20Source%20(.tds),-%E2%80%93%20Tableau%20data%20source), double-click it and enter your credentials.

That's all! You will see all your dimensions & measures in an organized way, and as you drag & drop fields into the canvas, Tableau sends the queries to Metriql that re-writes the query for your target data warehouse. You don't need to learn Tableau expressions or manually create fields anymore! [See how the integration works](https://metriql.com/integrations/bi-tools/tableau)

-----
