---
sidebar_position: 2
---

# Segmentation

Segmentation lets you analyze the data with `measure` and `dimension` pairs. You select a dataset using `dataset` property and specify the measures and dimensions under the dataset as part of the request, and a SQL query is generated depending on the field definitions. You can also `filter` the data using field references.

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
              rakam.measure:
                 - average
```

</File>

<Tabs
  defaultValue="rest"
  values={[
    { label: 'REST API', value: 'rest', },
    { label: 'SQL', value: 'sql', }
  ]
}>
<TabItem value="rest">

You can query the data using [REST API](/rest-api#operation/SegmentationQuery) as follows:


```json
{
  "dataset": "users",
  "[measures](introduction#measure)": ["total_users"],
  "[dimensions](introduction#dimension)": ["country"],
  "[filters](introduction#filter)": [
    {"dimension": "nps", "operator": "greater_than", "value": 10}
  ]
}
```
</TabItem>
<TabItem value="sql">

Alternatively, you can compile the SQL as follows:

```sql
with top_users_by_country AS (
  {{sql('segmentation', dataset = 'users', 
            [measures](introduction#measure) = ['total_users'], 
            [dimensions](introduction#dimension) = ['country'], 
            [filters](introduction#filter) = [{dimension: 'nps', operator: 'greater_than', value: 10}])}}
)
select * from top_users_by_country
```
</TabItem>
</Tabs>


The metriql queries above compiles to the following query when you use the REST API SQL or JDBC API:

```sql
with top_users_by_country AS (
  SELECT country, count(*) FROM users HAVING avg(nps) > 10 GROUP BY country 
)
select * from top_users_by_country
```