---
sidebar_position: 2
---

# Segmentation

Segmentation lets you analyze the data with `measure` and `dimension` pairs. You select a dataset using `dataset` property and specify the measures and dimensions under the dataset as part of the request, and an SQL query is generated depending on the field definitions. You can also `filter` the data using field references.

Here is an example dataset:

<File name='models/schema.yml'>

```yml
version: 2
sources:
  - name: first_dataset
    tables:
      - name: users
        meta:
          metriql:
            total_users:
              aggregation: count
        columns:
          - name: country
          - nps:
              metriql.measure:
                 - average
```

</File>

<Tabs
  defaultValue="api"
  values={[
    { label: 'API', value: 'api', },
    { label: 'SQL', value: 'sql', }
  ]
}>
<TabItem value="api">

You can query the data using as follows:


```yml
[dataset](introduction#dataset): source('first_dataset', 'users')
[measures](introduction#measure): ["total_users"]
[dimensions](introduction#dimension): ["country"]
[filters](introduction#filter)
  - {dimension: nps, operator: greater_than, value: 10}
limit: 1000
```
</TabItem>
<TabItem value="sql">

Alternatively, you can compile the SQL as follows:

```sql
with top_users_by_country AS (
  {{sql('segmentation', [dataset](introduction#dataset) = 'users', 
            [measures](introduction#measure) = ['total_users'], 
            [dimensions](introduction#dimension) = ['country'], 
            [filters](introduction#filter) = [dimension: 'nps', operator: 'greater_than', value: 10}])}}
)
select * from top_users_by_country
```
</TabItem>
</Tabs>


The metriql queries above compile to the following query when you use the REST API SQL or JDBC API:

```sql
with top_users_by_country AS (
  SELECT country, count(*) FROM users HAVING avg(nps) > 10 GROUP BY country 
)
select * from top_users_by_country
```

:::tip
If you have [event_timestamp](/reference/mapping#event_timestamp) mapping, the dataset will be marked as time-series data.
:::