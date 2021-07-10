---
sidebar_position: 1
---

# Installation

metriql comes with a CLI that `generate`s [Aggregates](/introduction/aggregates) and serves them to the end-user via `run` command. You need to have Java 8 installed on your machine to run metriql.

Please note that you need to [install dbt](https://docs.getdbt.com/dbt-cli/installation) to use metriql. We recommend you use install metriql using one of four tried and tested methods:

<Tabs
  defaultValue="docker"
  values={[
      { label: 'Docker', value: 'docker', },
    { label: 'Install via binary', value: 'binary', },
    { label: 'From Source', value: 'source', }
  ]
}>
<TabItem value="homebrew">

Install [Homebrew](http://brew.sh/), and [dbt CLI](https://docs.getdbt.com/dbt-cli/installation#homebrew). Then, run:

```bash
brew update
brew tap metriql/metriql
brew install metriql
```

You can also upgrade metriql as follows:

```bash
brew update
brew upgrade metriql
```

Test your installation with `metriql --help`:
</TabItem>

<TabItem value="binary">

1. Download the file `metriql-[VERSION]-bundle.tar.gz` [on Github](https://github.com/metriql/metriql/packages/820012).
2. Extract tar.gz file

Test the CLI application with  `./bin/metriql --help`:

</TabItem>

<TabItem value="docker">

```
docker pull buremba/metriql:latest
```

And run the following command:


```
export DBT_PROJECT_DIR=${PWD}
export DBT_PROFILES_DIR=${HOME}/.dbt
export METRIQL_PORT=5656

docker run -it -p "${METRIQL_PORT}:5656" -v "${DBT_PROJECT_DIR}:/root/app" -v "${DBT_PROFILES_DIR}:/root/.dbt" -e METRIQL_RUN_HOST=0.0.0.0 -e DBT_PROJECT_DIR=/root/app buremba/metriql \
 run
```

</TabItem>

<TabItem value="source">

```bash
git clone https://github.com/metriql/metriql.git
cd metriql
./mvnw clean install -DskipTests
```

Run the following command:

```
target/metriql-*-bundle/metriql-*/bin/metriql --help
```

If you want to run the application via an IDE, the main class should be `com.metriql.ServiceStarterKt`, just pass `--help` as program arguments:

</TabItem>


</Tabs>

```bash 
Usage: commands [OPTIONS] COMMAND [ARGS]...

Options:
  -d, --debug          Enable debugging
  --profiles-dir TEXT  Which directory to look in for the profiles.yml file.
                       Default = ~/.dbt
  --profile TEXT       Which profile to load. Overrides setting in
                       dbt_project.yml.
  --project-dir TEXT   Which directory to look in for the dbt_project.yml
                       file. Default is the current working directory and its
                       parents.
  -h, --help           Show this message and exit

Commands:
  [generate](generate)  Generates dbt models for aggregates
  [run](run)       Spins up an HTTP server serving your datasets
```

The CLI interacts with the dbt via Metadata API. You need to run `dbt compile` and generate `target/manifest.json` and pass the URI of the file as an option.