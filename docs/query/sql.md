Metriql---
sidebar_position: 5
---

# SQL

You can run ad-hoc SQL queries using metriql just like the other reporting types. metriql compiles your SQL queries with Jinja. Here is an example query:

```yml
query: >
    with nps_by_customer AS (
        {{sql('segmentation', dataset = 'source('first_dataset', 'users')', measures=['nps'], dimensions=['plan_type'] )}}
    )
    select * from nps_by_customer
query_options:
  limit: 1000
```


When you run the query above, Metriql compiles it to the following query:

```sql
with nps_by_customer AS (
  select plan_type, avg(nps) from customers group by 1
)
select * from nps_by_customer
```

That way, you can reference your metrics in your SQL queries and transform that as you wish. 

The following Jinja functions are available in the context:

##### sql(type: string, options : object)

It generates the SQL query for the `report type` given the report options. See the [available report types](/query/introduction).



##### var(name : string)

It returns the variable given by `--vars` options to the REST server.


### limit

The number of maximum rows returned from the query. The default value is `1000`
