
# JDBC Driver
Metriql has a proxy JDBC driver that lets you reference metrics in the SQL queries that you run. It simply needs to be used along with the underlying JDBC Driver as it doesn't actually run any queries. You can active Metriql JDBC driver if you use a URL similar to as follows:

```
jdbc:metriql:postgresql://HOST:PORT/DATABASE
```

Internally, Metriql will create a connection to Postgresql driver by removing the `metriql` in the JDBC URL but it will compile your SQL queries in Jinja before sending the SQL query to the underlying JDBC driver. Here is an example:

```sql
with nps_by_customer AS (
  {{sql('segmentation', model = 'customers', measures=['nps'], dimensions=['plan_type'], )}}
)
select * from nps_by_customer
```

When you run the query above, Metriql will compile it to the following query:

```
with nps_by_customer AS (
  select plan_type, avg(nps) from customers group by 1
)
select * from nps_by_customer
```

That way, you can reference your metrics in your SQL queries and transform that as you wish. The JDBC driver is built for integrating Metriql to your internal apps and third-party BI tools.

The following Jinja functions are available in the context:

### sql(type: string, options : object)
```
It generates the SQL query for the `report type` given the report options. The only available report type is `segmentation` at the moment.

```

### var(name : string)
```
It returns the variable given by `--vars` options to the REST server.
```