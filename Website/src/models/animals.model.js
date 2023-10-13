// See https://express-cassandra.readthedocs.io/en/latest/schema/
// for more of what you can do here.
module.exports = function (app) {
  const models = app.get('models');
  const animals = models.loadSchema('animals', {
    table_name: 'animals',
    fields: {
      id: 'int',
      monitoring_start_Date: {
        type: 'timestamp',
        rule: {
          required: true
        }
      },
      cat_id: {
        type: 'text',
        rule: {
          required: true
        }
      }
    },
    key: ['id'],
    // custom_indexes: [
    //   {
    //     on: 'text',
    //     using: 'org.apache.cassandra.index.sasi.SASIIndex',
    //     options: {}
    //   }
    // ],
    options: {
      timestamps: {
        createdAt: 'monitoring_start_Date', // defaults to createdAt
      },
    }
  }, function (err) {
    if (err) throw err;
  });

  animals.syncDB(function (err) {
    if (err) throw err;
  });

  return animals;
};
