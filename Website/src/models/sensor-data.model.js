// See https://express-cassandra.readthedocs.io/en/latest/schema/
// for more of what you can do here.
module.exports = function (app) {
  const models = app.get('models');
  const sensorData = models.loadSchema('sensorData', {
    table_name: 'sensor_data',
    fields: {

      animal_id: {
        type: 'int',
        rule: {
          required: true
        }
      },
      time: {
        type: 'timestamp',
        rule: {
          required: true
        }
      },

      Heart_Rate: {
        type: 'int',
        rule: {
          required: true
        }
      },
      SpO2_Rate: {
        type: 'int',
        rule: {
          required: true
        }
      },

      Animal_Temperature: {
        type: 'int',
        rule: {
          required: true
        }
      },

      Weather: {
        type: 'int',
        rule: {
          required: true
        }
      },

      Air_Qualit: {
        type: 'int',
        rule: {
          required: true
        }
      },
      Humidity: {
        type: 'int',
        rule: {
          required: true
        }
      },

    },
    key: [ 'animal_id','time' ],
    clustering_order: {'time': 'asc'},
    // custom_indexes: [
    //   {
    //     on: 'id',
    //     using: 'org.apache.cassandra.index.sasi.SASIIndex',
    //     options: {}
    //   }
    // ],
    options: {
      timestamps: false
      //   {
      //   createdAt: 'created_at', // defaults to createdAt
      //   updatedAt: 'updated_at' // defaults to updatedAt
      // },
    }
  }, function (err) {
    if (err) throw err;
  });

  sensorData.syncDB(function (err) {
    if (err) throw err;
  });

  return sensorData;
};
