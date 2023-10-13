const {Manager} = require('socket.io-client');
const deflate = require('permessage-deflate');
const socketio = require('@feathersjs/socketio');
// const app = require('./app')
const manager = new Manager('ws://localhost:1880', {
    upgrade: false,
  }
);
// Create SocketIO instance, connect
var socket2 = manager.socket('/', {
  // withCredentials: false,
});

module.exports = function (app) {          // console.log("connecting to 1880....");


  if (app.io) {  // if a client is connected to node js socketio

    app.io.emit('connected', {text: 'A client connected!'});


  }


  // socket.on('tryingANewConnection', function (received) {
  console.log('connecting to 1880....');
  // console.log(socket2.connect());
  socket2.on('connect', function () {
    console.log('ccccccccccccccccccccccccccccccccccccccccccdlksfkdl');

    // app.channel("anonymous").join(socket2);

  });
  socket2.on('stream', async (data) => {

    const looooll = JSON.parse(data);
    const {animal_id, Heart_Rate, SpO2_Rate, Animal_Temperature, Weather, Air_Qualit, Humidity} = looooll['d'];

    const newRow = {
      animal_id: parseInt(animal_id),
      Heart_Rate: parseInt(Heart_Rate),
      SpO2_Rate: parseInt(SpO2_Rate),
      Animal_Temperature: parseInt(Animal_Temperature),
      Weather: parseInt(Weather),
      Air_Qualit: parseInt(Air_Qualit),
      Humidity: parseInt(Humidity)
    };

    await app.service('sensor-data').create(newRow);


    if (app.io !="undefined") {
      app.io.emit('stream', newRow)
    }

  });
  socket2.on('connect_error', (err) => {
    console.log(err);
    // console.log(err.connect);
    socket2.connect();
    if (err.message === 'invalid credentials') {
      socket2.auth.token = 'efgh';
      socket2.connect();
    }
  });

};
// lmao();
//14: 00007FF726DD4AEE v8::internal::SetupIsolateDelegate::SetupHeap+45310
// 5: 00007FF726D6F5D6 v8::internal::Builtins::code_handle+172694
//1: 00007FF7264F30AF v8::internal::CodeObjectRegistry::~CodeObjectRegistry+112511
//C:\WINDOWS\system32\cmd.exe [10192]: c:\ws\src\node_file.cc:1739: Assertion `(argc) == (5)' failed.
