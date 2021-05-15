---
title: "Mapping properties"
slug: "mapping"
hidden: false
createdAt: "2021-04-28T17:49:08.720Z"
updatedAt: "2021-04-28T18:13:04.289Z"
---
## Mappings

Models have **mappings** that let the system understand the data in a better way. It's basically a list of string to dimension pair as follows:

```
mappings:
    event_timestamp: occurred_at # dimension name
    user_id: anonymous_id
```

##  `event_timestamp`: 
If this model is a time-series data, you can set the value that points to a dimension with the `timestamp` type, and the Explores will have a date picker and enforce the user to set the value of the date picker in the UI.

##  `user_id`: 
 If your model represents user data such as a customer event type (ex: `pageview` or `transaction`), you can set the this mapping dimension the unlock features such as funnel and retention explores.