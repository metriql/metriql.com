---
sidebar_position: 2
---

# Supported adapters

We use dbt's `profiles.yml` files when connecting to your databases. If you haven't set up dbt yet, please go through the [dbt documentation](https://docs.getdbt.com/reference/profiles.yml/). Once you set up your database profiles, Metriql CLI reads your [`profiles.yml`](/metriql-cli/cli-overview) file and connects to your database using these credentials.

Metriql doesn't support all the dbt adapters at the moment because, unlike dbt, Metriql needs to understand the SQL dialect and generate relevant SQL expressions when you run ad-hoc questions. Here is the list of adapters Metriql supports:

| Adapter for | Added version | Supported by dbt | Available report types                       | Documentation                                              |
|-------------|---------------|------------------|----------------------------------------------|------------------------------------------------------------|
| Postgres    | 0.03-beta     | ✅                | `segmentation`, `funnel`, `retention`, `sql` | [See dbt](https://docs.getdbt.com/docs/available-adapters) |
| Redshift    | 0.05-beta     | ✅                | `segmentation`, `funnel`, `retention`, `sql` | [See dbt](https://docs.getdbt.com/docs/available-adapters) |
| BigQuery    | 0.06-beta     | ✅                | `segmentation`, `funnel`, `retention`, `sql` | [See dbt](https://docs.getdbt.com/docs/available-adapters) |
| Snowflake   | 0.05-beta     | ✅                | `segmentation`, `funnel`, `retention`, `sql` | [See dbt](https://docs.getdbt.com/docs/available-adapters) |
| Presto      | 0.07-beta     | Partial support  | `segmentation`, `funnel`, `sql`              | [See dbt](https://docs.getdbt.com/docs/available-adapters) |
| Mysql       | 0.08-beta     | ❌                | `segmentation`, `sql`                        |                                                            |
| SQL Server  | 0.08-beta     | ❌                | `segmentation`, `sql`                        |                                                            |
| Azure SQL   | 0.08-beta     | ❌                | `segmentation`, `sql`                        |                                                            |
| Clickhouse   | 0.12-beta     | ❌                | `segmentation`, `sql`               |                                                            | [See dbt](https://docs.getdbt.com/docs/available-adapters)

# Creating a new adapter

You can build new adapters using our SPI, build a JAR, and include it in the classpath. See [Creating new adapter](/contributing/creating-new-adapter)