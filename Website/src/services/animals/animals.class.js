const { Service } = require('feathers-cassandra');

exports.Animals = class Animals extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
