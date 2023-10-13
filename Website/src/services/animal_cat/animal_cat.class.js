const { Service } = require('feathers-cassandra');

exports.AnimalCat = class AnimalCat extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
