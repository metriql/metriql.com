---
sidebar_position: 1
---

# Introduction

The recipes correspond to dbt projects, an open-source data modeling tool by Fishtown Analytics. We heavily rely on dbt's [resources properties](https://docs.getdbt.com/reference/declaring-properties) and extend them in order for you to define your metrics and build a semantic layer on top of your data. For those who're not familiar with dbt, we have an embedded IDE that lets you create dbt models from your data but we strongly advise you to go through dbt's [tutorials](https://docs.getdbt.com/docs/introduction) or at least learn the concept.

## Introduction to Rakam for beginners

Once you create [your first recipe](https://docs.rakam.io/docs/introduction#creating-your-own-recipe), you can create your first model from your tables in your database. In dbt, the resource is called as `source`. 
 
To create a source, click the `+ Create` dropdown in the sidebar, click the `Create file` button and select the tables that you're going to analyze. Once you import the tables, The IDE creates a dbt resource file that can be modified for your use case. 
