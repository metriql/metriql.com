# Creating a new adapter:

Metriql uses [ServiceLoader](https://docs.oracle.com/javase/8/docs/api/java/util/ServiceLoader.html) mechanism to load adapters in the classpath. You need to implement the interface `com.metriql.warehouse.spi.Warehouse`, create a file as seen below under the resources directory, and append your class name there:

```
META-INF/services/com.metriql.warehouse.spi.Warehouse
```

If you package your project as JAR and include it in the classpath, Metriql will automatically dPPiscover the adapter and load it in runtime.

JDBC is the preferred way to integrate new data warehouses in Metriql as we already have a JDBC bridge. You can extend the following abstract class `com.metriql.warehouse.JDBCWarehouse` if you already have a JDBC adapter for the database that you're going to use.

# Creating a new report type:

Metriql uses [ServiceLoader](https://docs.oracle.com/javase/8/docs/api/java/util/ServiceLoader.html) mechanism to load adapters in the classpath. You need to implement the interface `com.metriql.report.ReportType`, create a file as seen below under the resources directory, and append your class name there:

```
META-INF/services/com.metriql.report.ReportType
```

If you need to use the existing report types such as Segmentation, you can inject their service classs in your report's service class and the system will automatically pass the objects in the constructor.

If you have any questions, feel free to [join Slack](https://join.slack.com/t/metriql/shared_invite/zt-tz1nzvyd-ker8LGcBQmzrwvfAkFO1qQ) and ask there!
