const { Service } = require('feathers-cassandra');

exports.Notes = class Notes extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
