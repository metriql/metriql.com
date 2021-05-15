# Overview

metriql comes with a CLI that generates roll-up models and serves them to the end user. You can download the [latest version on Github](https://github.com/metriql/metriql/releases).


#### ./metriql --help
```bash 
Usage: commands [OPTIONS] COMMAND [ARGS]...

Options:
  -d, --debug           Enable debugging
  --manifest-json TEXT  The URI of the manifest.json, `file`, `http`, and `https` is supported
  -h, --help            Show this message and exit

Commands:
  [generate](generate)  Generates dbt models for aggregates
  [run](run)       Spins up an HTTP server serving your datasets
```

The CLI interact with the dbt via Metadata API. You need to run `dbt compile` and generate `target/manifest.json` and pass the URI of the file as an option.