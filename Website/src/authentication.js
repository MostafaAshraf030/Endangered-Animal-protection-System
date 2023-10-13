const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth } = require('@feathersjs/authentication-oauth');

module.exports = app => {
  const authentication = new AuthenticationService(app);
  const jwtStrategy  = new JWTStrategy();
  const localStrategy  = new LocalStrategy();

  authentication.register('jwt', jwtStrategy);



  authentication.register('local', localStrategy);



  app.use('/login' , authentication)
  // );
  const AuthService  = app.service('authentication');

  // console.log('yyyyyyyyyyyyyy' , typeof AuthService)

  // app.use('/authentication', authentication);
  app.configure(expressOauth());
};















//
// // const authentication = require('@feathersjs/authentication');
// const { LocalStrategy } = require('@feathersjs/authentication-local');
// const { expressOauth } = require('@feathersjs/authentication-oauth');
// const authenticateResponse = require('./hooks/authenticate-response');
// const authenticate = require('./hooks/authenticate');
// const authentication = require('@feathersjs/authentication');
// const jwt = require('@feathersjs/authentication-jwt');
//
// const log = require('./hooks/authentication');
// const {AuthenticationService} = require('@feathersjs/authentication');
//
//
//
//
// module.exports = function (app) {
//   let authentication = new AuthenticationService(app);
//   const config = app.get('authentication');
//   // console.log("loooooooooooooog" ,  authentication)
//
//   app.configure(authentication());
//
//   app.configure(log(config));
//   app.configure(jwt());
//   app.service('users/login');
//   app.service('users/login').hooks({
//     before: {
//       create: [
//         authenticate(),
//         authentication.hooks.authenticate(config.strategies),
//
//       ],
//       remove: [
//         authentication.hooks.authenticate(['jwt'])
//       ]
//     },
//     after: {
//       create: [
//         authenticateResponse()
//       ]
//     }
//   });
//
//
//
//
//
//
//
// //
// //
// //
// //
// //   authentication.register('jwt', new JWTStrategy());
// //   authentication.register('local', new LocalStrategy());
// // console.log("loooooooooooooog" , jwt)
// //   app.use('/authentication', authentication);
// //   app.configure(expressOauth());
// };






















/*



const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth } = require('@feathersjs/authentication-oauth');

module.exports = app => {
  const authentication = new AuthenticationService(app, ({
    $allowFiltering: true
  }));

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
};
 */
