const AppError = require('../utils/appError');
exports.signup = (app) => {
  return async function signup(req, res, next) {
    const body = req.body;
    console.log('ttttttttttttt');

    const user = {
      email: body.email,
      password: body.password,
      username: body.username,
      first_name: body.first_name,
      last_name: body.last_name,
      role: body.role || 'user',

    };


    try {

      // check if there's already a user with these info, if yes, don't create. if no, create
      // const service = await app.service('users');
      const data = await app.service('users').find({
              query: {
                email: {
                  $eq: user.email,
                },
                $allowFiltering: true
              }
            })
      console.log('found a user with these crs',user.email, data.data.length )

      if (data.data.length != 0 ) {
        res.status(400).json({
          status: 'cannot create a user with these credentials as they already exist',

        });

      } else {
        const createdUser = await app.service('users').create(user);
        // const raqheaders = res.req.rawHeaders
        res.status(201).json({
          status: 'success',
          username: createdUser.username,
          email: createdUser.email,
          role: createdUser.role


        });
      }
      // next();


    } catch (e) {
      console.log('ttttttttttttt', e,);

      res.status(400).json({
        status: 'error in data',
        e

      });
      // next();

    }


  };
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};
