// Initializes the `sensor-data` service on path `/sensor-data`
const {SensorData} = require('./sensor-data.class');
const createModel = require('../../models/sensor-data.model');
const hooks = require('./sensor-data.hooks');
const socketClient = require('./../../socketio-client');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    // paginate: app.get('paginate'),
    sorted: {
      createdAt: -1
    },
    autoIncrement: true,
    whitelist: ['$allowFiltering', '$filters', '$ttl', '$if'],

  };

  // Initialize our service with any options it requires
  app.use('/sensor-data', new SensorData(options, app));
  // app.use('/sensor-data/stream',socketClient());
  // app.rou
  // console.log("the client is finally working on a route" , socketClient())

  // Get our initialized service so that we can register hooks
  const service = app.service('sensor-data');

  service.hooks(hooks);
};
