const { Service } = require('feathers-cassandra');

exports.Users = class Users extends Service {
  constructor(options) {
    // console.log("asdfasdfasdfadsfa" , options)
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
