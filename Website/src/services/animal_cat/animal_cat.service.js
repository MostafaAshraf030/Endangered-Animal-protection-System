// Initializes the `animal_cat` service on path `/animal-cat`
const { AnimalCat } = require('./animal_cat.class');
const createModel = require('../../models/animal_cat.model');
const hooks = require('./animal_cat.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/animal-cat', new AnimalCat(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('animal-cat');

  service.hooks(hooks);
};
