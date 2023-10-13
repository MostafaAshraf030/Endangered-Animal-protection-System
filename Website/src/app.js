const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');
const cassandra = require('./cassandra');
const authentication = require('./authentication');
// const mongodb = require('./mongodb');
const app = express(feathers());
const NodeMediaServer = require('node-media-server');
// const sendService = require("./socketio-client");
// const socketClient = require('./socketio-client');


///for node media server  nodemediaserver nms
const nms = require('./utils/NodeMediaServer')





// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder

const {Manager} = require('socket.io-client');
const deflate = require('permessage-deflate');
const manager = new Manager('ws://localhost:1880', {
    upgrade: false,
  }
);
// Create SocketIO instance, connect
const socket2 = manager.socket('/', {
  // withCredentials: false,
});

const stream = require('stream');
const socketClient = require('./socketio-client');
const notificationLogic = require('./utils/notification_logic');
// exports.mystream = stream.Readable();


// function lmao() {
//   console.log("connecting to 1880....");
//   console.log(socket2.connect());
//   socket2.on("connect", function () {
//     console.log("ccccccccccccccccccccccccccccccccccccccccccdlksfkdl");
//   });
//
//
//
//   socket2.on("stream", (data) => {
//     console.log(data);
//     socket2.emit('add user' , { name : "got ya bitch"})
//   });
//
//
//
//   socket2.on("connect_error", (err) => {
//     console.log(err);
//     // console.log(err.connect);
//     socket2.connect();
//     if (err.message === "invalid credentials") {
//       socket2.auth.token = "efgh";
//       socket2.connect();
//     }
//   });
//
// }
// lmao();

/////////////////////////////////////////////////////
app.use('/', express.static(app.get('public')), cors());
// app.use("/ws/", function () {
//   lmao();

//   console.log("asdfasdf");
// });

// Set up Plugins and providers
app.configure(express.rest());
// app.configure(socketClient)

// app.configure(socketClient);


app.configure(
  socketio(function (io) {
      io.on('connection', function (socket) {
        // socket.emit('connected', {text: 'A client connected!'});
        // // socket.on('tryingANewConnection', function (received) {
        // console.log('connecting to 1880....');
        // // console.log(socket2.connect());
        // socket2.on('connect', function () {
        //   console.log('ccccccccccccccccccccccccccccccccccccccccccdlksfkdl');
        //   // app.channel("anonymous").join(socket2);
        //
        // });
        // socket2.on('stream', async (data) => {
        //   const looooll = JSON.parse(data);
        //   const {animal_id, Heart_Rate, SpO2_Rate, Animal_Temperature, Weather, Air_Qualit, Humidity} = looooll['d'];
        //
        //   const newRow = {
        //     animal_id: parseInt(animal_id),
        //     Heart_Rate: parseInt(Heart_Rate),
        //     SpO2_Rate: parseInt(SpO2_Rate),
        //     Animal_Temperature: parseInt(Animal_Temperature),
        //     Weather: parseInt(Weather),
        //     Air_Qualit: parseInt(Air_Qualit),
        //     Humidity: parseInt(Humidity)
        //   };
        //   // console.log(data);
        //
        //   await app.service('sensor-data').create(newRow);
        //   socket.emit('stream', newRow);
        // });
        // socket2.on('connect_error', (err) => {
        //   console.log(err);
        //   // console.log(err.connect);
        //   socket2.connect();
        //   if (err.message === 'invalid credentials') {
        //     socket2.auth.token = 'efgh';
        //     socket2.connect();
        //   }
        // });
      });
  })
);

app.configure(socketClient)

app.configure(cassandra);
// app.configure(socketClient);

// app.configure(mongodb);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)

app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
// app.configure(sendService);

app.use(express.errorHandler({logger}));

app.hooks(appHooks);
// app.configure(notificationLogic);


// try {
//   app.configure(notificationLogic);
//
// }catch (e) {
//   console.log("wooops" , e)
// }


module.exports = app;


