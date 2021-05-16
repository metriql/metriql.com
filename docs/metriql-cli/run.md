---
label: run
---

If you want to consume the data or share your metrics via REST API, metriql has an embedded HTTP server that reads your `manifest.json` file generated as dbt artifact and serves to the end users.

Please see [REST API](/rest-api) for specification.

### ./metriql.sh run --help
```shell
Usage: commands run [OPTIONS]

  Spins up an HTTP server serving your datasets

Options:
  --profiles-dir TEXT  Which directory to look in for the profiles.yml file. Default = ~/.dbt
  -t, --target TEXT    Which target to load for the given profile
  --profile TEXT       Which profile to load. Overrides setting in dbt_project.yml.
  --origin TEXT        The origin HTTP server for CORS
  --vars TEXT          Supply variables to the project. This argument
                       overrides variables defined in your dbt_project.yml
                       file. This argument should be a YAML string, eg.
                       '{my_variable: my_value}'
  --threads INT        Specify number of threads to use serving requests. The
                       default is [number of processors * 2]
  --port INT           The default is 3030
  -h, --host TEXT
  --help               Show this message and exit
```