---
sidebar_position: 3
---

# JDBC Driver

Metriql has a proxy JDBC driver that lets you reference metrics in the SQL queries that you run. It simply needs to be used along with the underlying JDBC Driver as it doesn't run any queries. You can connect Metriql JDBC driver if you use a URL similar to as follows:

```yml
jdbc:metriql:postgresql://HOST:PORT/DATABASE
```

Internally, Metriql creates a connection to the PostgreSQL driver by removing the `metriql` in the JDBC URL, but it compiles your SQL queries in Jinja before sending the SQL query to the underlying JDBC driver. The JDBC driver is built for integrating metriql to your internal apps and third-party BI tools.

See [SQL reporting type](/query/sql) to learn more about the details.