// Application hooks that run for every service
const notificationLogic = require('./utils/notification_logic')
const { when } = require('feathers-hooks-common');
// const logger = require('./hooks/logger');
const authorize = require('./hooks/abilities');
const authenticate = require('./hooks/authenticate');


module.exports = {
  before: {
    all: [
      // when(
      //   hook => hook.params.provider && `/${hook.path}` !== hook.app.get('authentication').path,
      //   authenticate,
      //   authorize()
      // )

    ],
    find: [],
    get: [],
    create: [
      async (context) => {
        // const thisData = await context.app.service('sensor-data').find();
        // console.log('incomming sensor data is ',
        //   thisData
        // );

        // notificationLogic(context.app)

        return context;

      }


    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      // (context)=>{
      //   console.log( 'ooooooooooooooooooooooooo',context)
      // }
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [
      // (context)=>{
      // console.log( 'ooooooooooooooooooooooooo',context)
      // }
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
