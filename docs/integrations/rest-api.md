---
sidebar_position: 2
---

# REST API

The most common way to interact with datasets is via the REST API. [`./metriql serve`](/metriql-cli/serve) command creates an HTTP server that takes dbt Core artifact called `manifest.json`.

[See the API specification here](/rest-api-endpoints).

## Authorization

If you use the `--api-auth-secret-*` arguments or `METRIQL_API_AUTH_SECRET_*` environment variables, the JWT based authorization becomes active automatically. All the requests need to have `Authorization: Bearer [TOKEN]` header parameter. You can generate the token either in your backend application or use an authorization provider such as [Auth0](https://auth0.com) or [Amazon Cognito](https://aws.amazon.com/cognito/).

The JWT body is parsed and if you have user attributes attached to the `user_metadata`, you can reference them as `user.attributeName` in Jinja context.