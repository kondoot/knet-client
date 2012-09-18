var request = require('request');

var SkynetClient = function(options) {
  this.options = options
};

var respond = function(cb) {
  return function(err, req, res, obj) {
    cb(err, obj);
  };
};

var proto = SkynetClient.prototype

proto.request = function(method, path, body, cb) {
  if ( undefined === cb) {
    var cb = body;
    var body = null;
  }
  
  var options = {
    method: method
  , uri: this.options.host + path
  , json: true
  , headers: {
      Authorization: "Basic " + new Buffer(this.options.username+":"+this.options.password).toString('base64')
    }
  };
  
  if ( body ) {
    options.body = body;
  }
  
  request(options, cb);
};

// List methods
proto.listRoles = function(cb) {
  this.request('GET', '/roles', cb);
};

proto.listStrategies = function(cb) {
  this.request('GET', '/strategies', cb);
};

proto.listSquadrons = function(cb) {
  this.request('GET', '/strategies', cb);
};

proto.listDrones = function(cb) {
  this.request('GET', '/drones', cb);
};

proto.listMachines = function(cb) {
  this.request('GET', '/machines', cb);
};

// Get Methods
proto.getRole = function(id, cb) {
  this.request('GET', '/role/'+id, cb);
};

proto.getStrategy = function(id, cb) {
  this.request('GET', '/strategy/'+id, cb);
};

proto.getSquadron = function(id, cb) {
  this.request('GET', '/squadron/'+id, cb);
};

// Upsert methods
proto.upsertRole = function(id, data, cb) {
  this.request('POST', '/role/'+id, data, cb);
};

proto.upsertStrategy = function(id, data, cb) {
  this.request('POST', '/strategy/'+id, data, cb);
};

// Delete methods
proto.deleteRole = function(id, cb) {
  this.request('DELETE', '/role/'+id, cb);
};

proto.deleteStrategy = function(id, cb) {
  this.request('DELETE', '/strategy/'+id, cb);
};

// Drone specific
proto.decommisionDrone = function(id, cb) {
  this.client.get("/drone/"+id+"/decommission", respond(cb));
};

proto.stopDrone = function(id, cb) {
  this.client.get("/drone/"+id+"/stop", respond(cb));
};

module.exports = SkynetClient;