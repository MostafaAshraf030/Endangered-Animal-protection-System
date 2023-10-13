// See https://express-cassandra.readthedocs.io/en/latest/schema/
// for more of what you can do here.
module.exports = function (app) {
  const models = app.get('models');
  const users = models.loadSchema('users', {
    table_name: 'users',
    fields: {

      username: {
        type: 'text',
        rule: {
          required: [true, 'You need to choose a username'],
          // minLength : 8,
          // unique : true,
          select: false,

        }
      },

      email: {
        type: 'text',

        unique: true,
        rule: {
          required: [true, 'Please enter an email address.'],
          // unique : true,

        }
      },

      first_name: {
        type: 'text',

        unique: true,
        rule: {
          required: [true, 'Please enter an email address.'],
          // unique : true,

        }
      },

      last_name: {
        type: 'text',

        unique: true,
        rule: {
          required: [true, 'Please enter an email address.'],
          // unique : true,

        }
      },

      role: {
        type: 'text',
        enumerable: ['user', 'admin'],
        default: 'user'
      },
      password: {
        type: 'text',
        rule: {
          required: [true, 'You need to choose a password'],
          // minLength : 8,
          // unique : true,
          select: false,

        }
      },

    },
    key: ['email'],
    // PRIMARY_KEY: ('id'),
    // custom_indexes: [
    //   // {
    //   //   on: 'id',
    //   //   using: 'org.apache.cassandra.index.sasi.SASIIndex',
    //   //   options: {}
    //   // },
    //   // {
    //   //   on: 'password',
    //   //   using: 'org.apache.cassandra.index.sasi.SASIIndex',
    //   //   options: {}
    //   // }
    // ],
    options: {
      timestamps: {
        createdAt: 'created_at', // defaults to createdAt
      },
    }
  }, function (err) {
    if (err) throw err;
  });

  users.syncDB(function (err) {
    if (err) throw err;
  });

  return users;
};
