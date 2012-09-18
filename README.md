Skynet Client
=============

A client library to talk with Skynet.

Initialising the skynet client
------------------------------

```js
var SkynetClient = require('skynet-client');

var options = {
  "host": "skynet.kondoot.com"
, "username": "********"
, "password": "********"
};

skynet = new SkynetClient(options);
```

Avaliable commands
------------------

```js
skynet.listRoles(callback);
skynet.listStrategies(callback);
skynet.listSquadrons(callback);
skynet.listDrones(callback);
skynet.listMachines(callback);

skynet.getRole(roleId, callback);
skynet.getStrategy(strategyId, callback);
skynet.getSquadron(strategyId, callback);
skynet.getDrone(droneId, callback);

skynet.upsertRole(roleId, data, callback);
skynet.upsertStrategy(strategyId, data, callback);

skynet.deleteRole(roleId, callback);
skynet.deleteStrategy(strategyId, callback);

skynet.decommissionDrone(droneId, callback);
skynet.stopDrone(droneId, callback);
```

Example
-------

```js
skynet.listRoles(function(err, res, roles) {
  // roles is an array of objects
});
```