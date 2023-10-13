// Initializes the `hooks` service on path `/hooks`
const { Hooks } = require('./hooks.class');
const hooks = require('./hooks.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/hooks', new Hooks(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('hooks');

  service.hooks(hooks);
};
