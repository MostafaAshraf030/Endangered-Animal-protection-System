const { Service } = require('feathers-cassandra');

exports.SensorData = class SensorData extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
