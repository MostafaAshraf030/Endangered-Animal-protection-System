// Initializes the `animals` service on path `/animals`
const { Animals } = require('./animals.class');
const createModel = require('../../models/animals.model');
const hooks = require('./animals.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/animals', new Animals(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('animals');

  service.hooks(hooks);
};
