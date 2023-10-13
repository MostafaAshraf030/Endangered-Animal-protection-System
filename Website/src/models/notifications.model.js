// See https://express-cassandra.readthedocs.io/en/latest/schema/
// for more of what you can do here.
module.exports = function (app) {
  const models = app.get('models');
  const notifications = models.loadSchema('notifications', {
    table_name: 'notifications',
    fields: {

      animal_id: {
        type: 'int',
        rule: {
          required: true
        }
      },
      title: {
        type: 'text',
        rule: {
          required: true
        }
      },
      message: {
        type: 'text',
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
      danger_level: {
        type: 'text',
        rule: {
          required: true
        }
      },


    },
    key: [ 'animal_id','time' ],
    clustering_order: {'time': 'asc'},

    options: {
      timestamps: {
        createdAt : 'time'
      }
    }
  }, function (err) {
    if (err) throw err;
  });

  notifications.syncDB(function (err) {
    if (err) throw err;
  });

  return notifications;
};
