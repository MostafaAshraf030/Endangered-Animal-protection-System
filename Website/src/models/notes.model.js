// See https://express-cassandra.readthedocs.io/en/latest/schema/
// for more of what you can do here.
module.exports = function (app) {
  const models = app.get('models');
  const notes = models.loadSchema('notes', {
    table_name: 'notes',
    fields: {
      id: 'uuid',
      text: {
        type: 'text',
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
      assoc_user: {
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
      timestamps: true
    }
  }, function (err) {
    if (err) throw err;
  });

  notes.syncDB(function (err) {
    if (err) throw err;
  });

  return notes;
};
