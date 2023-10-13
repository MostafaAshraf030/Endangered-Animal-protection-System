// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
// module.exports = function (options = {}) {
//   return async context => {
//     if (context.data) {
//       let user2 = context.data.user;
//       if (user2) {
//         // RealWorld -- peel off the user wrapper and add strategy if missing
//         var strategy = user2.strategy;
//         if (!strategy) {
//           user2.strategy = 'local';
//         }
//         context.data = user2;
//       }
//     }
//     return context;
//   };
// };
//



const { authenticate } = require('@feathersjs/authentication').hooks
const { NotAuthenticated } = require('@feathersjs/errors')
const verifyIdentity = authenticate('jwt')

function hasToken(hook) {
  if (hook.params.headers == undefined) return false
  if (hook.data.accessToken == undefined) return false
  return hook.params.headers.authorization || hook.data.accessToken
}

module.exports = async function authenticate(hook) {
  try {
    console.log(hook);
    return await verifyIdentity(hook)
  } catch (error) {
    if (error instanceof NotAuthenticated && !hasToken(hook)) {
      return hook
    }

    throw error
  }
}
