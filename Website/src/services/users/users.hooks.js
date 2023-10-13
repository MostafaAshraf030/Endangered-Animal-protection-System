const {v4: uuidv4} = require('uuid');
const {authenticate} = require('@feathersjs/authentication').hooks;
const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const authentication = require('../../hooks/authentication');
const validatePassword = require('../../hooks/validate-password');
const checkPermissions = require('feathers-permissions');


module.exports = {
  before: {
    all: [authentication()],
    all: [
      // (context)=>{
      // console.log("query is ", context)
      //         return context;
      // }
    ],

    find: [

      (context) => {
        if (context.params.query) {
          context.params.query['$allowFiltering'] = true;

        }


        return context;

      }


      , authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [(context) => {
        // context.arguments[0].id = uuidv4();
        console.log('dddddddddddddddddd', context.arguments);


        // const newUser = context.arguments[0];

        // console.log('dddddddddddddddddd', newUser);
        // app.service('/users').create(newUser);
        // return context;

      }
      // , validatePassword()
      , hashPassword('password')],
    update: [hashPassword('password'), authenticate('jwt')],
    patch: [hashPassword('password'), authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password' , 'created_at' , 'id', 'permissions' , 'updatedAt'),
      // context => {
      //   // console.log('jwt is ', data);
      //   // console.log('ooooooooooooooooooooooooo', context);
      //
      //   return context
      // }
    ],
    find: [
      protect('password' , 'created_at' , 'id', 'permissions', 'role' , 'updatedAt'),

    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [
      // data => {
      //   console.log('err is ', data.params );
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
