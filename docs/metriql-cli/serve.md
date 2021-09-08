---
label: serve
sidebar_position: 1
---

If you want to consume the data or share your metrics via REST API, metriql has an embedded HTTP server that reads your `manifest.json` file generated as dbt artifact and serves it to the end-user.

Please see [REST API](/rest-api) for specification.

### ./metriql.sh serve --help
```shell
Usage: commands serve [OPTIONS]

  Spins up an HTTP server serving your datasets

Options:
  -d, --debug                      Enable debugging
  --profiles-dir TEXT              Which directory to look in for the
                                   profiles.yml file. Default = ~/.dbt
  --profiles-content TEXT          Profiles content as YML, overrides
                                   --profiles-dir option
  --profile TEXT                   Which profile to load. Overrides setting in
                                   dbt_project.yml.
  --project-dir TEXT               Which directory to look in for the
                                   dbt_project.yml file. Default is the
                                   current working directory and its parents.
  --origin TEXT                    The origin HTTP server for CORS
  --jdbc                           Enable JDBC services via Trino Proxy
  --vars TEXT                      Supply variables to the project. This
                                   argument overrides variables defined in
                                   your dbt_project.yml file. This argument
                                   should be a YAML string, eg. '{my_variable:
                                   my_value}'
  --threads INT                    Specify number of threads to use serving
                                   requests. The default is [number of
                                   processors * 2]
  --port INT
  -h, --host TEXT                  The binding host for the REST API
  --timezone TEXT                  The timezone that will be used running
                                   queries on your data warehouse
  --api-auth-secret-base64 TEXT    Your JWT secret key in Base64 format.
                                   metriql supports various algorithms such as
                                   HS256 and RS256 and identifies the key
                                   parsing the content.
  --api-auth-username-password TEXT
                                   Your username:password pair for basic
                                   authentication
  --api-auth-secret-file TEXT      If you're using metriql locally, you can
                                   set the private key file or API secret as a
                                   file argument.
  --manifest-json TEXT             The URI of the manifest.json, `file`,
                                   `http`, and `https` is supported. The
                                   default is
                                   $DBT_PROJECT_DIR/target/manifest.json
  --help                           Show this message and exit
```