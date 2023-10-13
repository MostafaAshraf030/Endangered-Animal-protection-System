const socketClient = require('../socketio-client');
const createModel = require('../models/sensor-data.model');
const {SensorData} = require('../services/sensor-data/sensor-data.class');
const moment = require('moment');
const {Writable, Readable, PassThrough, Transform} = require('stream');
const stream = require('stream');
exports.getRowById = (app) => {
  return async function sensorDataStream(req, res, next) {
    const id = req.params.id;

    console.log('the request is before find ', id);

    // const incoming_data =
    try {


      const data = await app.service('sensor-data').get(id);
      // console.log('the request is ' , req  )
      res.status(201).json({
        status: 'success',
        data_length: data.length,
        data,

      });

    } catch (e) {
      console.log('caused error', e);
    }


    next();
  };
};


//////////////////////////////////////////////////////

exports.getFromTo = function (app) {
  return async function sensorDataStream(req, res, next) {
    const from = req.body['from'];
    const to = req.body['to'];

    let dateFrom = new Date(from);
    // const dateFrom2 = moment( new Date(from)).add(12, 'h').toDate();
    const dateTo = new Date(to);

    //
    const diff = Math.abs(dateTo - dateFrom);

    let tempDate = dateFrom;

    console.log('22222222222222222222222222222 \n',
        '\n dateFrom ', dateFrom,
        '\n dateTo ', dateTo,
        '\n chunkCount ', tempDate
    );

    let dataArray = [];
    // const headers = {
    //   // "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    //   "Accept-Ranges": "bytes",
    //   // "Content-Length": contentLength,
    //   "Content-Type": "application/json",
    // };
    //
    // res.writeHead(206 , headers);

    const data = [];

    try {
      while (tempDate < dateTo) {
        const newdata = await app.service('sensor-data').find({
          query: {
            time: {
              $gte: tempDate,
              $lte: dateTo
            },
            animal_id: {
              $eq: req.body.animal_id,
            },
            $allowFiltering: true,

          }
        });

        const dataArrayy = newdata['result'];
        const readableStream = Readable.from(dataArrayy);
        // readableStream.pipe(res)

        data.push(...dataArrayy);
        console.log('data added ', data.length);
        const dataArrayLength = dataArrayy.length;
        tempDate = new Date(dataArrayy[dataArrayLength - 1]);
        console.log('data added ', data.length, dataArrayy[dataArrayLength - 1]);
        console.log('data added ', data.length, tempDate);


      }
      // const readableStream = Readable.from(data);
      //
      // const ps = new stream.PassThrough();
      // const transformStream = new stream.Transform({
      //   objectMode: true,
      //   transform: function transformer(chunk, encoding, callback) {
      //     callback(null, JSON.stringify(chunk)+',');
      //   }
      // });
      // stream.pipeline(
      //   readableStream,
      //   transformStream,
      //   ps,
      //   (err) => {
      //     if (err) {
      //       console.log(err)
      //       return res.sendStatus(400);
      //     }
      //   })
      // ps.pipe(res);

      res.status(201).json({
        status: 'success',
        data_length: data.length,
        data,

      });

    } catch (e) {
      console.log('caused error', e);
    }
    // next();
  };
};
