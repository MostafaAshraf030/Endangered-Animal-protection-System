const {v4: uuidv4} = require('uuid');
const AppError = require('../utils/appError');
const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;
const hooks = require('./../services/users/users.hooks');


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


exports.getAllUsers = (app) => {
  return async function userOperations(req, res, next) {

    try {


      const service = app.service('users');


      const data = await service.find({
        query: {

          $select: ['email', 'username', 'first_name', 'last_name', 'role'],
          $allowFiltering: true
        }
      });
      // console.log('ttttttttttttt', data);

      // console.log('came here lmao 1');
      // console.log('sign up');
      // if(data){
      res.status(201).json({
        status: 'success',
        data


      });
      // }
      // next();
      // else throw error


    } catch (e) {
      console.log('ttttttttttttt', e, 'res is ', res);

      res.status(400).json({
        status: 'error in data',

      });
      // next();

    }


    // next();
  };
};

exports.getUser = (app) => {
  return async function userOperations(req, res, next) {
    const body = req.body;
    const user = {
      // email: body.email,
      email: body.email,

    };
    try {
      const service = await app.service('users');
      const data = await service.get(user);
      // const raqheaders = res.req.rawHeaders
      // data.data.forEach( e => console.log(user))
      // console.log('sign up',  data.data);
      res.status(200).json({
        status: 'success',
        data: {
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          role: data.role,
          username: data.username,
        }
      });
    } catch (e) {
      console.log('ttttttttttttt', e, 'res is ', res);

      res.status(400).json({
        status: 'no user associated with this info',

      });
    }
  };
};

exports.updateUser = (app) => {
  return async function userOperations(req, res, next) {
    const body = req.body;
    const userFromReq = {
      email: body.email,
      // id: uuid.parse(body.id),

    };

    // const username = body.username
    try {
      const data = await app.service('users').find({
        query: {
          email: {
            $eq: userFromReq.email,
          },
          $allowFiltering: true
        }
      });
      console.log('found a user with these crs', userFromReq.email, data.data.length);

      if (data.data.length == 0) {
        res.status(400).json({
          status: 'user doesn\'t exist',

        });

      } else {
        const service = await app.service('users');
        const user = await service.get(userFromReq);

        const newData = await service.patch(userFromReq, {
          username: body.username || user.username,
          first_name: body.first_name || user.first_name,
          last_name: body.last_name || user.last_name,
          password: user.password || body.password,
        });
        res.status(200).json({
          status: 'success',
          data:{
            email: newData.email,
            first_name: newData.first_name,
            last_name: newData.last_name,
            username: user.username,
            old: user.password,
            password: newData.password
          }

        });
      }
    } catch (e) {
      console.log('ttttttttttttt', e);

      res.status(400).json({
        status: 'error in data',

      });
    }
  };

};

exports.deleteUser = (app) => {
  return async function userOperations(req, res, next) {
    const body = req.body;
    const user = {
      email: body.email,

    };
    try {
      const service = await app.service('users');
      const data = await service.remove(user);
      // const raqheaders = res.req.rawHeaders
      // data.data.forEach( e => console.log(user))
      // console.log('sign up',  data.data);
      res.status(200).json({
        status: 'success',
      });
    } catch (e) {
      console.log('ttttttttttttt', e, 'res is ', res);

      res.status(400).json({
        status: 'error in data',

      });
    }
  };
};


/*
// const e = require('express');
// const fs = require('fs');
// const { nextTick } = require('process');
// const { stringify } = require('querystring');
const User = require('../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require("../utils/appError");
const { resetWatchers } = require('nodemon/lib/monitor/watch');

const filterThisObj = (obj, ...restOfTheParameters) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (restOfTheParameters.includes(el)) {
      newObj[el] = obj[el];
    }
  });

  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({

  });

  // res.status(500).json({

  // });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) if there's a try to update the password, send err (maybe redirect later)
  if (req.body.password || req.body.passwordConfirm) {


  res.status(200).json({

  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  res.status(204).json({

  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'this route is not defined yet',
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'this route is not defined yet',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'this route is not defined yet',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'this route is not defined yet',
  });
};



 */
