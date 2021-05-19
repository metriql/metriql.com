---
label: FAQs
sidebar_position: 8
---

# List of FAQs

#### 1. Why would I need metriql if I'm already using dbt?

dbt lets you transform, test, and document your data but it doesn't provide any way to define metrics or serve to your end-users. Most of the BI tools provide ways to define the metrics either using their GUI or programmatically. However, it can't be shared with the other tools that you're using. metriql standardizes the metric definitions and serves as the metadata layer for all your company data. 

A more comparable alternative would be LookML, Looker's data modeling language. Tristan, one of dbt's founders [has a blog post](https://blog.getdbt.com/-how-do-you-decide-what-to-model-in-dbt-vs-lookml--/) explaining the differences between LookML and dbt. Typically, if you need to perform complex transformations, you can use dbt materializations. Otherwise, you can use metriql [Aggregates](/introduction/aggregates) for roll-up tables, define your metrics in dbt resource files without learning a brand new data modeling tool, such as LookML.

#### 2. Why Kotlin when we already have Python?

Most of the data people feel comfortable with Python, and some even hate the JVM world, we get it. That being said, metriql has fundamental differences compared to dbt. It runs on demand while metriql usually used as [an HTTP server](/rest-api). Also, metriql needs to understand the SQL dialect in order to be able to generate ad-hoc queries, therefore we need battle-tested database drivers. We use [JDBC](https://en.wikipedia.org/wiki/Java_Database_Connectivity), the technology behind many other BI tools, such as Looker, Tableau, and Metabase. While we agree that Java is verbose, [Kotlin is worth learning](https://github.com/Khan/kotlin-for-python-developers).

#### How is this different from [x]?

<b>Airbnb's Mirvana</b> is a fdssfsdf.
<br />
<b>Cube.js</b> is a 

#### 3. What's Rakam, and how it's related to metriql?

Rakam, Inc. is the company that built metriql. We use dbt internally for the last 2 years, and we believe in [their viewpoint](https://docs.getdbt.com/docs/about/viewpoint). We tested metriql for our customers and found out that it can also be used outside of Rakam. We're also using tons of open-source technologies, and the founders also have [open-source background](https://github.com/rakam-io/rakam-api). We decided to open-source metriql under a vendor-neutral organization using the same open-source license as dbt.

#### 4. Do I need to use dbt for metriql?

If your data is already modeled, you can use dbt's [sources](https://docs.getdbt.com/docs/building-a-dbt-project/using-sources) to create datasets in metriql. [Here is an example project)(https://github.com/rakam-recipes/tenjin) that doesn't need any transformation.

#### 4. Does metriql run my dbt models?

No, it's not. If you have `table` or `incremental` models, you need to run dbt yourself. We advise and usually use [dbt Cloud](https://cloud.getdbt.com/) from Fishtown Analytics, but you can also use Github Actions or Gitlab CI you don't want to use a Cloud IDE.

#### You have another question, [come Slack](https://community.metriql.com) and ask us!