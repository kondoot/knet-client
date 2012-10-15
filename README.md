KNet Client
=============

A client library to talk with KNet.

Initialising the KNet client
------------------------------

```js
var KNetClient = require('knet-client');

var options = {
  "host": "knet.kondoot.com"
, "username": "********"
, "password": "********"
};

knet = new KNetClient(options);
```

Avaliable commands
------------------

```js
knet.listRoles(callback);
knet.listStrategies(callback);
knet.listSquadrons(callback);
knet.listDrones(callback);
knet.listMachines(callback);

knet.getRole(roleId, callback);
knet.getStrategy(strategyId, callback);
knet.getSquadron(strategyId, callback);
knet.getDrone(droneId, callback);

knet.upsertRole(roleId, data, callback);
knet.upsertStrategy(strategyId, data, callback);

knet.deleteRole(roleId, callback);
knet.deleteStrategy(strategyId, callback);

knet.decommissionDrone(droneId, callback);
knet.stopDrone(droneId, callback);
```

Example
-------

```js
knet.listRoles(function(err, res, roles) {
  // roles is an array of objects
});
```