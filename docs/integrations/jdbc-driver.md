---
sidebar_position: 2
---

# JDBC Driver
Metriql has a proxy JDBC driver that lets you reference metrics in the SQL queries that you run. It simply needs to be used along with the underlying JDBC Driver as it doesn't actually run any queries. You can active Metriql JDBC driver if you use a URL similar to as follows:

```
jdbc:metriql:postgresql://HOST:PORT/DATABASE
```

Internally, Metriql will create a connection to Postgresql driver by removing the `metriql` in the JDBC URL but it will compile your SQL queries in Jinja before sending the SQL query to the underlying JDBC driver. 

See [SQL reporting type](/query/sql) to learn more about the details.