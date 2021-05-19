---
sidebar_position: 1
---

# REST API

The most common way to interact with datasets is via the REST API. [`./metriql run`](/metriql-cli/run) command creates an HTTP server that takes dbt's artifact called `manifest.json`.

[See the API endpoints here](/rest-api-endpoints).

## Authorization

If you set `--metriql-api-secret` argument or `METRIQL_API_SECRET` environment, the JWT based authorization becomes active automatically. All the requests need to have `Authorization: Bearer [TOKEN]` header parameter. You can generate the token either in your backend application or use an authorization provider such as [Auth0](https://auth0.com) or [Amazon Cognito](https://aws.amazon.com/cognito/) 