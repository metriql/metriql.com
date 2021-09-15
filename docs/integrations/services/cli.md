# CLI

You can run [MQL](/query/mql) queries directly from your CLI using Trino's command-line application. Please refer to [Trino CLI](https://trino.io/docs/current/installation/cli.html) for documentation.

### Usage


<Tabs
  defaultValue="docker"
  values={[
    { label: 'Docker', value: 'docker', },
    { label: 'Local', value: 'local' },
  ]
}>
<TabItem value="docker">

1. [Install Docker](https://docs.docker.com/get-docker/).

2. Run the following command:

```
docker run trivadis/trino-cli --host demo.metriql.com --port 443 --user cli-myuser --catalog metriql
```

</TabItem>

<TabItem value="local">

1. [Install Java](https://www.java.com/en/download/).

2. Download the latest version of the CLI [is here](https://trino.io/download.html), please click the link `trino-cli-xxx-executable.jar` under `Command line client` section.

3. Run the following command:

```
./trino-cli-xxx-executable.jar --host demo.metriql.com --port 443 --user cli-myuser --catalog metriql
```

4. Enter `SHOW TABLES FROM public` and press enter.

</TabItem>

</Tabs>

Here is how it looks like:

<img src="/img/integrations/cli-query.png" alt="CLI Query Screen" style={{maxWidth: '600px'}}/>



