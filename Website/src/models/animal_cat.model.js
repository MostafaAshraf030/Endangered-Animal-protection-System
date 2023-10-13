// See https://express-cassandra.readthedocs.io/en/latest/schema/
// for more of what you can do here.
module.exports = function (app) {
  const models = app.get('models');
  const animalCat = models.loadSchema('animalCat', {
    table_name: 'animal_cat',
    fields: {
      cat_id: 'int',
      name: {
        type: 'text',
        rule: {
          required: true
        }
      },
      Min_H_R: {
        type: 'int',
        rule: {
          required: true
        }
      },
      Max_H_R: {
        type: 'int',
        rule: {
          required: true
        }
      },
      Min_A_T: {
        type: 'int',
        rule: {
          required: true
        }
      },
      Max_A_T: {
        type: 'int',
        rule: {
          required: true
        }
      },
      Min_SpO2: {
        type: 'int',
        rule: {
          required: true
        }
      },
      Max_SpO2: {
        type: 'int',
        rule: {
          required: true
        }
      },
    },
    key: ['cat_id'],
    // custom_indexes: [
    //   {
    //     on: 'text',
    //     using: 'org.apache.cassandra.index.sasi.SASIIndex',
    //     options: {}
    //   }
    // ],
    options: {
      timestamps: true
    }
  }, function (err) {
    if (err) throw err;
  });

  animalCat.syncDB(function (err) {
    if (err) throw err;
  });

  return animalCat;
};
