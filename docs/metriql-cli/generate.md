---
label: generate
---

If you're using `aggregates` in resource files, metriql needs to create the dbt models under `models/metriql` directory of your dbt project. You can run this command every time you push a commit to GIT repository to update the aggregate models.

Please see [Aggregates](/advanced/aggregates) to learn more about this feature.

### ./metriql.sh generate --help
```shell
Usage: commands generate [OPTIONS] --target-name

  Generates dbt models for aggregates

Options:
  --project-dir TEXT  Which directory to look in for the dbt_project.yml file.
                      Default is the current working directory and its parents.
  --output-dir TEXT   Which directory to create aggregate models.
  -h, --help          Show this message and exit

Arguments:
  --target-name  Database dialect that you have in `profile.type`
```