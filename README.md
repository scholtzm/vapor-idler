[![NPM version](http://img.shields.io/npm/v/vapor-idler.svg?style=flat)](https://www.npmjs.org/package/vapor-admin-commands)

# Vapor Idler Plugin

[Vapor](https://github.com/scholtzm/vapor) plugin which allows to easily idle in games.

### Features

- Allows to idle multiple games at once
- Adds extra command

### Installation

```sh
npm install vapor-idler
```

### Usage

```js
var idler = require('vapor-idler');

// Instantiate Vapor etc.

vapor.use(idler, {
    games: [440, 730],
    autoStart: true
});
```

### Configuration

#### `games` (required)

Array of game IDs.

#### `autoStart` (optional)

Whether to start automatically right after logging in. Default value: `false`

### Commands

Command | Description
------- | -----------
!idle | Enable or disable the idling process. Available only to admins.

### License

MIT. See `LICENSE`.
