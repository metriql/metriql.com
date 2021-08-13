---
title: "Relation properties"
sidebar_position: 5
---
Relations enable the non-technical users to use dimensions and measures from other datasets when there is a relation between the source dataset and the target datasets. Typically, metriql generates JOIN statements in SQL. You can define relations under `meta.metriql.relations` property.

#### Creating relation via dbt test

```yml
seeds:
  - name: countries
    columns:
      - name: iso_code
models:
  - name: pageviews
    meta:
      metriql:
        relations:
          country:
            to: ref('countries')
            sql: "{TABLE}.country = {TARGET}.iso_code"
            type: left_join 
            relationship: many_to_many
```

#### Creating relation via `meta.metriql`

In some cases, you need to write an SQL expression to build up a relation between the datasets. In this case, you can use `meta.metriql.relations` as follows:

```yml
seeds:
  - name: countries
    columns:
      - name: iso_code
models:
  - name: pageviews
    meta:
      metriql:
        relations:
          countries:
            to: ref('countries')
            type: left_join 
            sql: "get_iso_code({TABLE}.country) = {TARGET}.iso_code"
            relationship: many_to_many
```

Here is the full list of properties that you can use:

### `relationship:`

Available values are `one_to_one`, `one_to_many`, `many_to_many`, and `many_to_many`.

The default is:
```yml
relationship: one_to_one
```

### `type:`

Available values are `left_join`, `right_join`, `inner_join`, `full_join`

If you use `left_join`, the following SQL expression is generated:
```SQL
SELECT ...
LEFT JOIN target ON (source.source_col = target.target_col)
```

The default is:
```yml
type: left_join
```
### `label:`
The value that will be visible in the user interface. The default value is the relation name but you can override it as follows:

```yml
label: Countries
```

### `description:`

Example:
```yml
label: The country the user signed up from
```

### `hidden:`
Hides the relation in the user interface. It's useful in case you want to test the relationship in the ELT layer with dbt but hide it from the end users.

The default is:
```yml
hidden: false
```

## Symmetric Aggregates

If there is a `one_to_many` or `many_to_many` in between the two datasets, joining fields form multiple datasets and result in invalid calculation of measures. You may run [into](https://stackoverflow.com/questions/59881785/sql-aggregation-function-to-choose-the-only-value) [this](https://stackoverflow.com/questions/4611897/group-by-aggregate-function-confusion-in-sql) [problem](https://stackoverflow.com/questions/3333541/aggregate-functions-return-wrong-values-when-joining-more-tables) [dealing](https://stackoverflow.com/questions/20547503/left-outer-join-on-aggregate-queries) [with](https://stackoverflow.com/questions/14140288/mysql-aggregate-functions-in-query-with-two-joins-gives-unexpected-results) [SQL](https://community.cloudera.com/t5/Support-Questions/aggregate-function-with-join-gives-wrong-value-in-hive/m-p/152203) but there is not an easy [solution](https://fivetran.com/blog/how-to-use-measures-with-one-to-many-joins). metriql automatically finds out the symmetric issues depending on the [`aggregation`](/reference/measure#aggregation) of your measure and uses your [primary key dimension](/reference/dimension#primary) to calculate the correct measures. 

It uses the following algorithm from [Looker](https://help.looker.com/hc/en-us/articles/360023722974-A-Simple-Explanation-of-Symmetric-Aggregates-or-Why-On-Earth-Does-My-SQL-Look-Like-That-);

```sql
SUM(DISTINCT big_unique_number + total) - SUM(DISTINCT big_unique_number)
```

:::warning
If you don't have a dimension marked as [primary key](/reference/dimension#primary), metriql can't generate the SQL query and throws an exception.
:::

## Self joins
You can join the same table or model more than once by specifying multiple join relations with different names. Here is an example:

```yml
relations: 
    customers: 
      relationship: 'one_to_one'
      type: 'left_join'
      to: ref('apps')
    vendors: 
      relationship: 'one_to_one'
      type: 'inner_join'
      to: ref('apps')
```

## Join through another relation

In some cases, you may want to join a model that doesn't have a direct relationship to your model. Let's say that you have three models; `events`, `campaigns`, and `ad_networks`. There is a relation between `events` and `campaigns` model via `events.campaign_id = campaigns.id` and `campaigns` to `ad_networks` via `campaigns.ad_network_id = ad_networks.id`.

Rather than calculating the number of unique users who came from a specific campaign, you want to see different ad networks and see how they perform compared to each other. Since you don't have a direct relationship between the `events` and `ad_networks` model, you can't easily select the columns and define the relation. Instead, you need to join the `campaigns` model to be able to join `ad_networks` model. In that case, you can use the following SQL relation from `events`  model to `ad_networks` model.

```yml
   relations: 
    campaign: 
      relationship: one_to_one
      type: left_join
      to: ref('campaigns')
      source: campaign_id
      target: id
    ad_network:
      relationship: many_to_one
      type: left_join
      to: ref('ad_networks')
      sql: '{TARGET}.id = {relation.campaign.dimension.ad_network_id}'
```

Since your `sql` references the `campaign` relation in `events` model, the join statements for both `campaigns` and `ad_networks` model will be included automatically when you select a dimension from `ad_network` model.