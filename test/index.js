var should = require('should')
  , nock = require('nock');

var SkynetClient = require('../lib/skynet-client');
  
var testOptions = {
  host: 'http://skynet-test.kondoot.com.au'
, username: 'kondoot'
, password: 'woohoo'
};

var skynetHostMock = nock(testOptions.host).matchHeader('Authorization', 'Basic a29uZG9vdDp3b29ob28=');

var skynet = new SkynetClient(testOptions);

describe('Skynet Client Library', function(){
  it('A GET request', function(done) {
    skynetHostMock.get('/roles').reply(200, [
      { name: 'app', package: 'Small 1GB', dataset: 'smartos'}
    , { name: 'lb', package: 'Small 1GB', dataset: 'smartos'}
    ]);
    
    skynet.listRoles(function(err, res, roles) {
      should.not.exist(err);
      roles.should.have.length(2);
      roles[0].name.should.equal('app');
      done();
    });
  });
  it('A POST request', function(done) {
    var data = { name: 'app', package: 'Small 1GB', dataset: 'smartos'};
    skynetHostMock.post('/role/app', data).reply(200, function(uri, requestBody) {
      return requestBody;
    });
    
    skynet.upsertRole(data.name, data, function(err, res, role) {
      should.not.exist(err);
      role.should.eql(data);
      done();
    });
  });
  it('A DELETE request', function(done) {
    skynetHostMock.delete('/role/app').reply(201);

    skynet.deleteRole('app', function(err, res, role) {
      should.not.exist(err);
      should.not.exist(role);
      done();
    });
  });
});