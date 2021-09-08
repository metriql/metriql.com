# Creating a new adapter

metriql uses [ServiceLoader](https://docs.oracle.com/javase/8/docs/api/java/util/ServiceLoader.html) mechanism to load adapters in the classpath. You need to implement the interface `com.metriql.warehouse.spi.Warehouse`, create a file called `META-INF/services/com.metriql.warehouse.spi.Warehouse` under the resources directory, and append your class name there.

If you package your project as JAR and include it in the classpath, metriql will automatically discover the adapter and load it in runtime. We will be writing more detailed instructions as well, if you have any questions, feel free to [join Slack](https://join.slack.com/t/metriql/shared_invite/zt-tz1nzvyd-ker8LGcBQmzrwvfAkFO1qQ) and ask there!
