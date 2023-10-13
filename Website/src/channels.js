const socketClient = require('./socketio-client');
const {Manager} = require('socket.io-client');
const deflate = require('permessage-deflate');
// const app = require('./app')
const manager = new Manager('ws://localhost:1880', {
    upgrade: false,
  }
);
// Create SocketIO instance, connect
var socket2 = manager.socket('/', {
  // withCredentials: false,
});


module.exports = function (app) {
  if (typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on('connection', function (socket, ) {
    //
    //
    //
    // console.log('lmmmmmow' )
    //
    // // socket.emit('connected', {text: 'A client connected!'});
    //
    // app.io.on('listen', function (received) {
    //   // socket.eventNames(["listen"]);
    //   // console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwww", received);
    //   app.io.emit('news', {text: 'A client connected!'});
    // });
    //
    // app.on('lol', function (received) {
    //   // socket.eventNames(["listen"]);
    //   console.log('lol');
    //   app.emit('news', {text: 'A client connected!'});
    // });
    //
    //
    // app.io.on('tryingANewConnection', function (received) {
    //
    //
    //   console.log('connecting to 1880....' , received);
    //   // console.log(socket2.connect());
    //
    //
    //   socket2.on('connect', function () {
    //     console.log('ccccccccccccccccccccccccccccccccccccccccccdlksfkdl');
    //     // app.channel("anonymous").join(socket2);
    //
    //   });
    //
    //
    //   socket2.on('stream', (data) => {
    //     // app.mystream.write(data);
    //     // socket2.join()
    //     // socket2.emit('add user' , data)
    //
    //     // console.log('lmaaaaaaao', JSON.parse(data));
    //     const looooll = JSON.parse(data);
    //
    //
    //     const {animal_id, Heart_Rate, SpO2_Rate, Animal_Temperature, Weather, Air_Qualit, Humidity} = looooll['d'];
    //
    //
    //     // console.log('lmaaaaaaao', animal_id,
    //     //   Heart_Rate,
    //     //   SpO2_Rate,
    //     //   Animal_Temperature,
    //     //   Weather,
    //     //   Air_Qualit,
    //     //   Humidity);
    //
    //     const newRow = {
    //       animal_id: parseInt(animal_id),
    //       Heart_Rate: parseInt(Heart_Rate),
    //       SpO2_Rate: parseInt(SpO2_Rate),
    //       Animal_Temperature: parseInt(Animal_Temperature),
    //       Weather: parseInt(Weather),
    //       Air_Qualit: parseInt(Air_Qualit),
    //       Humidity: parseInt(Humidity)
    //
    //     };
    //
    //
    //     app.service('sensor-data').create(newRow);
    //     app.io.emit('stream', newRow);
    //   });
    //
    //
    //   socket2.on('connect_error', (err) => {
    //     console.log(err);
    //     // console.log(err.connect);
    //     socket2.connect();
    //     if (err.message === 'invalid credentials') {
    //       socket2.auth.token = 'efgh';
    //       socket2.connect();
    //     }
    //   });
    // });
    //
    //
    // app.io.on('disconnectFromNodeRed', function (received) {
    //   // socket.eventNames(["listen"]);
    //   socket2.close();
    //   app.io.emit('disconnected', {text: 'disconnected from node red'});
    // });


  });

  app.on('login', (authResult, {connection}) => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    console.log('login data ,    ', authResult,);
    if (connection) {
      // Obtain the logged in user from the connection
      // const user = connection.user;

      console.log('ttttttttttttt', authResult , connection);


      // The connection is no longer anonymous, remove it
      app.channel('anonymous').leave(connection);

      // Add it to the authenticated user channel
      app.channel('authenticated').join(connection);

      // Channels can be named anything and joined on any condition

      // E.g. to send real-time events only to admins use
      // if(user.isAdmin) { app.channel('admins').join(connection); }

      // If the user has joined e.g. chat rooms
      // if(Array.isArray(user.rooms)) user.rooms.forEach(room => app.channel(`rooms/${room.id}`).join(connection));

      // Easily organize users by email and userid for things like messaging
      // app.channel(`emails/${user.email}`).join(connection);
      // app.channel(`userIds/${user.id}`).join(connection);
    }
  });

  // eslint-disable-next-line no-unused-vars
  app.publish((data, hook) => {
    // Here you can add event publishers to channels set up in `channels.js`
    // To publish only for a specific event use `app.publish(eventname, () => {})`

    // console.log(
    //   'Publishing all events to all authenticated users. See `channels.js` and https://docs.feathersjs.com/api/channels.html for more information.'
    // ); // eslint-disable-line

    // e.g. to publish all service events to all authenticated users use
    return app.channel('authenticated');
  });

  // Here you can also add service specific event publishers
  // e.g. the publish the `users` service `created` event to the `admins` channel
  // app.service('users').publish('created', () => app.channel('admins'));

  // With the userid and email organization from above you can easily select involved users
  // app.service('messages').publish(() => {
  //   return [
  //     app.channel(`userIds/${data.createdBy}`),
  //     app.channel(`emails/${data.recipientEmail}`)
  //   ];
  // });
};
