const {v4: uuidv4} = require('uuid');
const middleware = require('../../middleware');
const notificationLogic = require('./../../utils/notification_logic')


module.exports = {
  before: {
    all: [
      // (context)=>{
      //   console.log("incoming data" , context.arguments)
      // }
    ],
    find: [],
    get: [],
    create: [
      (context) => {

        context.arguments[0].time = Date.now();
        // console.log("time now is " , Date.now())

        // console.log('dddddddddddddddddd', context , context.arguments[0] );


        // context.arguments[1].id = uuidv4();
        // context.arguments[0].app_name = 'zoo-monitor';
        //
        // context.arguments[0].role = context.arguments[0].role || 'user';
        //
        // const newUser = context.arguments[0];
        // const app = this

        // console.log('dddddddddddddddddd', context  );
        // app.service('/users').create(newUser);

        return context;
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [
      async (context) => {


        const resultLength = await context.result.length;
        const result = await context.result;
        context.result = {
          'DataLength': resultLength,
          result
        };
        return context;
        // console.log('dddddddddddddddddd', result.length, result);
      },
    ],
    get: [],
    create: [ notificationLogic()],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [
      (context) => {
        console.log('the error happened', );
        return context;

      }
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
