---
label: generate
sidebar_position: 1
---

If you're using [Aggregates](/introduction/aggregates) in resource files, Metriql needs to create the dbt models under `models/metriql` directory of your dbt project. You can run this command every time you push a commit to the GIT repository to update the aggregate models.

Please see [Aggregates](/introduction/aggregates) to learn more about this feature.

### ./metriql.sh generate --help
```shell
Usage: commands generate [OPTIONS]

  Generates dbt models for aggregates

Options:
  -d, --debug              Enable debugging
  --profiles-dir TEXT      Which directory to look in for the profiles.yml
                           file. Default = ~/.dbt
  --profiles-content TEXT  Profiles content as YML, overrides --profiles-dir
                           option
  --profile TEXT           Which profile to load. Overrides setting in
                           dbt_project.yml.
  --project-dir TEXT       Which directory to look in for the dbt_project.yml
                           file. Default is the current working directory and
                           its parents.
  -o, --output-dir TEXT    Which directory to create aggregate models.
  -h, --help               Show this message and exit
```