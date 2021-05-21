---
sidebar_position: 3
---

# Funnel

The funnel reporting type is built for customer event data. If you have your user behavior data in your data warehouse, you can understand if your users are performing a series of events with funnels. For example, let's say that you have `pageview`, `add_to_basket` and `transaction` events stored in a database and you want to calculate metric called cart abandonment rate (i.e. people who added an item to their basket but didn't make any purchase). 

Most of the BI tools let you ask [Segmentation](/query/segmentation) questions but it's not easy to build funnel metrics since it doesn't play well with the customer behavioral data. If you're familiar with SQL, you can write a complex SQL query that calculates the card abandonment rate and share it with your product people. While you can parametrize the SQL query in your BI tool, the product people won't have much flexibility to compare the different user segment, define different funnel steps or filter by an event property.

That's why metriql provides different reporting types for different use-cases. Let's see a typical funnel query:

```yml
steps:
  - [dataset](/query/introduction#dataset): pageview
    [filters](/query/introduction#filter): 
      - {dimension: campaign, operator: 'equals', 'winter_sale'}
  - dataset: add_to_basket
  - dataset: transaction
[dimension](#dimension):
[window](#window): {value: 1, type: hour} # the maximum time period in between the events
[connector](#connector): user_id # optional, the default is [user_id mapping](/reference/manning#user_id)
```

### `window:`

### `excluded_steps:`

### `connector:`

### `approximate:`

### `dimension:`

### `strictly_ordered:`



