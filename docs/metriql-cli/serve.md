---
label: serve
sidebar_position: 1
---

If you want to consume the data or share your metrics via REST API, Metriql has an embedded HTTP server that reads your `manifest.json` file generated as dbt artifact and serves it to the end-user.

Please see [REST API](/rest-api) for specification.

:::info
If you're using BigQuery with `gcloud` CLI and test Metriql locally, you should map the credentials as follows:

```
-v "${HOME}/.config/gcloud:/root/.config/gcloud"
```
:::

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
  --models TEXT                    Which models to expose as datasets
  --project-dir TEXT               Which directory to look in for the
                                   dbt_project.yml file. Default is the
                                   current working directory and its parents.
  --vars TEXT                      Supply variables to the project. This
                                   argument overrides variables defined in
                                   your dbt_project.yml file. This argument
                                   should be a YAML string, eg. '{my_variable:
                                   my_value}'
  --multi-tenant-url TEXT          Enables multi-tenant deployment using the
                                   auth URL that you provided. Ignores all the
                                   other parameters.
  --multi-tenant-cache-duration TEXT
                                   The cache duration for successful auth
                                   requests in when multi-tenant deployment is
                                   enabled. You can use `m` for minutes, `s`
                                   for seconds, and `h` for hours. (default:
                                   10m)
  --origin TEXT                    The origin HTTP server for CORS
  --trino, --jdbc                  Enable Trino API
  --threads INT                    Specify number of threads to use serving
                                   requests. The default is [number of
                                   processors * 2]
  --port INT                       (default: 5656)
  -h, --host TEXT                  The binding host for the REST API (default:
                                   127.0.0.1)
  --timezone TEXT                  The timezone that will be used running
                                   queries on your data warehouse
  --api-auth-secret-base64 TEXT    Your JWT secret key in Base64 format.
                                   Metriql supports various algorithms such as
                                   HS256 and RS256 and identifies the key
                                   parsing the content.
  --api-auth-username-password TEXT
                                   Your username:password pair for basic
                                   authentication
  --pass-credentials-to-datasource
                                   Pass username & password to datasource
                                   configs
  --catalog-file TEXT              Metriql catalog file
  --api-auth-secret-file TEXT      If you're using Metriql locally, you can
                                   set the private key file or API secret as a
                                   file argument.
  --manifest-json TEXT             The URI of the manifest.json, `file`,
                                   `http`, and `https` is supported. The
                                   default is
                                   $DBT_PROJECT_DIR/target/manifest.json
  --help                           Show this message and exit
```

### Authorization and Permission Management

By default, Metriql uses the credentials defined in your dbt profiles `~/.dbt/profiles.yml` file. However; since Metriql is exposed to your users, you may want to use different authentification methods. Here are the alternatives:

#### Parametrizing username & password with `--pass-credentials-to-datasource`

If you pass the relevant config when starting Metriql, it will pass the username & password to datasource crendentials for connecting the databases. It can help you audit the queries and apply the relevant permissions for your users directly in your database. That way, you will create the users directly in your database, apply relevant permissions to them and Metriql will automatically pass the user credentials when connecting the datasource.

#### JWT tokens in REST API
If you would like to use Metriql for embedded analytics use-cases, you can enable JWT tokens to authentificate the users in your single page application. Please refer to [REST API documentation](https://metriql.com/integrations/rest-api/#authorization) to learn more about it.

#### Using variables in SQL datasets 
When you pass `--var` parameter to the dbt project, it becomes available the [SQL context](https://metriql.com/reference/sql-context). In addition to that you can access the username of the current user referencing `{user}` variable in SQL expressions. If you use [ephemeral dbt models](https://docs.getdbt.com/docs/building-a-dbt-project/building-models/materializations#ephemeral), Metriql compiles the SQL queries on the fly before executing them in your database so you can parametrize the table references, add additional WHERE conditions depending on the current user.

#### Using multi-tenant deployment
If you want to have different datasets for different users or use different database credentials for each user, you can use multi-tenant deployment. It's the preferred solution if you're building a system for exposing Metriql to your customers. Please see the [following section](#multi-tenant deployment).


### Multi-tenant deployment

By default, Metriql reads your `manifest.json` file and dbt adapter using the configuration you passed when starting Metriql. If you would like to use Metriql for your users in multi-tenant mode, you can use the same Metriql deployment to access multiple databases and dbt projects for your customers. You need to develop an API endpoint that returns the `manifest.json` URI under `manifest` and dbt adapter under `connection_parameters` depending on the [Basic access authorization](https://en.wikipedia.org/wiki/Basic_access_authentication). Here is an example response:

```
> GET https://metriql-auth.mydomain.com/metriql/auth
Authorization: Basic username:password

{
    "manifest": {
        "url": "https://mydomain.com/customer1/manifest.json", // supported schemes are `http`, `https`, `file`, and `dbt-cloud`
        "updated_at": "2021-10-21T11:00:13+00:00"
    },
    "connection_parameters": { // see [available-adapters](https://docs.getdbt.com/docs/available-adapters)
        "type": "postgres",
        "host": "POSTGRESQL_HOST",
        "port": 5432,
        "database": "POSTGRESQL_DATABASE",
        "user": "POSTGRESQL_USER",
        "pass": "POSTGRESQL_PASSWORD"
    }
}
```

To enable multi-tenant mode, you should pass either:

1. `METRIQL_MULTI_TENANT_URL=https://metriql-auth.mydomain.com/metriql/auth` environment variable or,
2.  `--multi-tenant-url=https://metriql-auth.mydomain.com/metriql/auth` argument.

Metriql caches the `manifest.json` file for each user depending on the `updated_at` property. In addition to that we cache the successful auth requests to speed up queries. By default the cache duration is 10 minutes but you can configure it using the `METRIQL_MULTI_TENANT_CACHE_DURATION` environment variable.

## Deploying to Production

Metriql is stateless so you can use Kubernetes or a managed solution such as Heroku to deploy Metriql and run it behind a load balancer. There is two things to consider when you're running Metriql behind a load balancer:

* __Session affinity (sticky cookies)__: If the client queries are taking longer than 60 seconds, you need to poll the system to fetch the query status and result but all the Metriql instances keep status of the queries running inside the same container. Therefore, the client needs to hit the same container to be able to access the query results. Most of the cloud prodivers ([1](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/sticky-sessions.html), [2](https://cloud.google.com/load-balancing/docs/backend-service#client_ip_affinity)) support this feature out of the box.
* __Query Caches__: Metriql caches the queries and their results and reuse it if two clients run the same query concurrently or within the certain timeframe such as an hour. We're working on optional Redis support for query caches if you're running Metriql in a distributed environment.