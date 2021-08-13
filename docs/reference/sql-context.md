---
title: "SQL Context"
sidebar_position: 100
---

The Jinja context is available in all `sql` definitions such as `view.sql`, `measure.sql`, `dimension.sql`, and `relation.sql` properties. Please note that the Jinja context is different from [dbt Jinja context](https://docs.getdbt.com/docs/building-a-dbt-project/jinja-macros), dbt compiles your code for once and doesn't run on-demand whereas metriql compiles Jinja variables on the fly when the user runs a query.

Benefits of using dynamic SQL contexts:

* Using statements to control the flow of the SQL expression.
* Accessing project and user attributes inside SQL context thus the ability to generate unique expressions.

If you want to learn more about Jinja, visit the [Jinja2 documentation](https://jinja.palletsprojects.com/en/2.10.x/templates/).


:::tip Using Jinja inside yml files
dbt compiles the resource files, so references `{{TABLE}}` won't work in yml files. Instead, we support `{TABLE}` (with one curly brace).
:::

You can access the value of a dimension, measure, relation, or dataset target. Accessing the fields inside a SQL editor is done as follows: 

![Execution diagram](https://files.readme.io/42f42ce-Untitled_Diagram_1.png)

The context starts with `model.` prefix and follows the name such as `app_opened`. Every dataset has dimension, measure, and relation fields. You can choose to access those or just leave it as `{model.app_opened}` to get the SQL reference of a model.

To render a dimension, measure or relation, type a relation name followed by its name `{model.app_opened.dimension._country}`. The last keyword for both fields and models is optional. You can either choose to render it as `projection` style or `filter` style. The default rendering style is `filter`.

### for datasets:
* `{model.app_opened}` > `schema_name.app_opened`
* `{model.app_opened.filter}` > `schema_name.app_opened`
* `{model.app_opened}` > `schema_name.app_opened as app_opened`

### for fields:
* `{model.app_opened.dimension._country}` > `schema_name.app_opened._country`
* `{model.app_opened.dimension._country.filter}` > `schema_name.app_opened._country`
* `{model.app_opened.dimension._country.projection}` > `schema_name.app_opened._country as _country`


### measures, dimensions, and relations

When composing fields in SQL type, an additional variable is injected into the Jinja context: `{TABLE}`. This variable gets rendered to the model name of the field. For instance -a measure in `orders` model- `SUM({TABLE}.price)` will be rendered to `SUM(orders.price)`.

To access other fields you can choose to access fields over a model, or the field is in the same model you access them as follows:

* `{dimension.dimension_name}`
* `{measure.measure_name}`
* `{relation.relation_name}`

For example, composing a measure that aggregates a dimension: `SUM({dimension.price})`. Using this convention, the measure is rendered dynamically thus any changes to the dimension will affect how the measure is being rendered.

### Other variables

* `{TABLE}`: The current datasets' name
* `{aq}`: Alias quote for the target database. Ex: `"` for PostgreSQL and ``` for BigQuery.
* `{user}`: The user attributes context. 

## Only available in `relation.sql`

* `{TARGET}`: returns the alias of the target dataset


:::info
Are you missing any convenience function for your problem? [Let us know](https://join.slack.com/t/metriql/shared_invite/zt-tz1nzvyd-ker8LGcBQmzrwvfAkFO1qQ) in Slack!
:::
