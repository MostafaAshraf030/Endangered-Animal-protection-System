const sensorData = require('./sensor-data/sensor-data.service.js');
const users = require('./users/users.service.js');
const hooks = require('../hooks/hooks.service.js');
const animalCat = require('./animal_cat/animal_cat.service.js');
const animals = require('./animals/animals.service.js');
const notes = require('./notes/notes.service.js');
const notifications = require('./notifications/notifications.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(sensorData);
  app.configure(users);
  app.configure(hooks);
  app.configure(animalCat);
  app.configure(animals);
  app.configure(notes);
  app.configure(notifications);
};
