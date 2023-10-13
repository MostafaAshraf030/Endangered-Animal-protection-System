const {v4: uuidv4} = require('uuid');
const { authenticate } = require('@feathersjs/authentication').hooks;

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [
      (context) => {
        context.arguments[0].id = uuidv4();
        // context.arguments[0].app_name = 'zoo-monitor';
        //
        // context.arguments[0].role = context.arguments[0].role || 'user';
        //
        // const newUser = context.arguments[0];
        // const app = this

        // console.log('dddddddddddddddddd', context.params, newUser);
        // app.service('/users').create(newUser);
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
