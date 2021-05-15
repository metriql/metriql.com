---
title: "Common field properties"
sidebar_position: 2
---

We call `measure`, `dimension`,  and `relation` properties as `field`. The following properties can be used in fields:

### `name:`
The unique identifier of the metric. If you set the name, you can reference the metric from other metrics.

```yml
name: total_events
```

### `label:`
The value will be shown in the user interface. If the label is not set, the default label is `name`.

```yml
label: Total Events
```

### `category:`
If you have many different fields for different use-cases, you can group them under different categories by setting the `category` field. By default, the fields are not categorized.

```yml
category: Product
```

### `hidden:`

If the value is `true`, the model will not show up in the user interface.

```yml
hidden: false
```