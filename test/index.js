var should = require('should')
  , nock = require('nock');

var KNetClient = require('../lib/knet-client');
  
var testOptions = {
  host: 'http://knet.local'
, username: 'knet'
, password: 'woohoo'
};

var knetHostMock = nock(testOptions.host).matchHeader('Authorization', 'Basic a25ldDp3b29ob28=');

var knet = new KNetClient(testOptions);

describe('KNet Client Library', function(){
  it('A GET request', function(done) {
    knetHostMock.get('/roles').reply(200, [
      { name: 'app', package: 'Small 1GB', dataset: 'smartos'}
    , { name: 'lb', package: 'Small 1GB', dataset: 'smartos'}
    ]);
    
    knet.listRoles(function(err, res, roles) {
      should.not.exist(err);
      roles.should.have.length(2);
      roles[0].name.should.equal('app');
      done();
    });
  });
  it('A POST request', function(done) {
    var data = { name: 'app', package: 'Small 1GB', dataset: 'smartos'};
    knetHostMock.post('/role/app', data).reply(200, function(uri, requestBody) {
      return requestBody;
    });
    
    knet.upsertRole(data.name, data, function(err, res, role) {
      should.not.exist(err);
      role.should.eql(data);
      done();
    });
  });
  it('A DELETE request', function(done) {
    knetHostMock.delete('/role/app').reply(201);

    knet.deleteRole('app', function(err, res, role) {
      should.not.exist(err);
      should.not.exist(role);
      done();
    });
  });
});