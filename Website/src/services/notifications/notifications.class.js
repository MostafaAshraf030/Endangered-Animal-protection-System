const { Service } = require('feathers-cassandra');

exports.Notifications = class Notifications extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
