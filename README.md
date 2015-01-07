# SplitTables

Responsive table jQuery plugin based on the [Zurb experiment](http://zurb.com/playground/responsive-tables).

## Installation

Install via [Bower](http://bower.io):
```
$ bower install websolutions/split-tables --save
```

## Usage

The most basic example follows a normal table structure:
``` html
<table>
  <tbody>
    <tr>
      <th>...
```

And is initialized like so:
``` javascript
$("table.responsive").wsol_splitTables();
```

Tables can be unsplit at any time:
``` javascript
$("table.responsive").data("wsol.splitTables").destroy();
```

### Configuring

The jQuery plugin supports a number of configuration options:

Option                      | Type     | Description                                                      | Default
----------------------------|----------|------------------------------------------------------------------|--------
`wrapperClass`              | String   | Class name to apply to the wrapper element                       | `table-wrapper`
`pinnedClass`               | String   | Class name to apply to the pinned content element                | `pinned`
`scrollableClass`           | String   | Class name to apply to the scrollable content element            | `scrollable`
`splitClass`                | String   | Class name to apply to split tables                              | `split`
