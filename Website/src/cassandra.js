const ExpressCassandra = require('express-cassandra');
const FeathersCassandra = require('feathers-cassandra');
const Cassanknex = require('cassanknex');

module.exports = function (app) {
  const connectionInfo = app.get('cassandra');
  const models = ExpressCassandra.createClient({

    clientOptions: {


      contactPoints: [
        '127.0.0.1'
      ],
      protocolOptions: {
        port: 9042
      },
      localDataCenter: 'datacenter1',
      keyspace: 'datacenter1',
      queryOptions: {
        'consistency': 1
      }
    },
    ormOptions: {
      defaultReplicationStrategy: {
        class: 'SimpleStrategy',
        'replication_factor': 1
      },
      migration: 'alter',
      createKeyspace: true
    },
    authentication: {

      entity: 'user',
      service: 'users',
      secret: 'avy4wHh5mQqDwGyIk20f3aSOxp8=',
      authStrategies: [
        'jwt',
        'local'
      ],
      jwtOptions: {
        header: {
          typ: 'access'
        },
        audience: 'https://yourdomain.com',
        issuer: 'feathers',
        algorithm: 'HS256',
        expiresIn: '1d'
      },
      local: {
        usernameField: 'email',
        passwordField: 'password'
      }
    },

  });
  const cassandraClient = models.orm.get_system_client();

  app.set('models', models);

  cassandraClient.connect(err => {
    if (err) throw err;

    const cassanknex = Cassanknex({connection: cassandraClient});

    FeathersCassandra.cassanknex(cassanknex);

    cassanknex.on('ready', err => {
      if (err) throw err;
    });

    app.set('cassanknex', cassanknex);
  });
};
