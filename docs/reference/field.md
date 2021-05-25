---
title: "Common field properties"
sidebar_position: 2
---

We call `measure`, `dimension`,  and `relation` properties as `field`. The following properties can be used in fields:

### `name:`
The unique identifier of a metric. If you set the name, you can reference the metric from other metrics.

```yml
name: total_events
```

### `type:`
The metriql type of the field.

Available values are: 

* `string`, `boolean`, `array_string`, `map_string`
* `date`, `timestamp`, `time` support [timeframes](/reference/dimension#timeframes)
* `integer`, `decimal`, `double`, `long` support [custom formatting](#report)

```yml
type: string
```

### `label:`
The value that will be visible in the user interface. If the label is not set, the default label is `name`.

```yml
label: Total Events
```

### `category:`
If you have many different fields for different use-cases, you can group them under different categories by setting the `category` field. By default, the fields are not categorized.

```yml
category: Product
```

### `hidden:`

If the value is `true`, the model won't be visible in the user interface.

```yml
hidden: false
```

### `report:`

An object that defines how the value will be shown to the end user. Currently, metriql supports `format_numbers`.

Example:

```yml
report:
  format_numbers: 0.0%
```