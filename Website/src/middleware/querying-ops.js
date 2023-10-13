exports.getVideoFromTo = function (app) {
  return async function (req, res, next) {
/*
  * convert date into yyyy-mm-dd-hh-mm
  * get which file the date is found in,
    (based on the time of the recording or the saving process)
    ( the time in the name of the video is of the starting time. i.e. if you start
    recording at 05:05 for 5 minutes the name will be 05-05 not 05-10)

  * we record a video per hour
  * figure out the times at the video
  * determine those ranges in bytes in relevence to the video size
  * get a stream from to, and pipe it to the front-end
 */
    const from = req.body["from"];
    const to = req.body["to"];

    const dateFrom = new Date(from)
    const dateTo = new Date(to)

    const videoFileName = `${dateFrom.toISOString().split('T')[0]}-${dateFrom.getHours().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })}-${dateFrom.getMinutes().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })}`


    console.log(  videoFileName , dateTo)

    //
    // const body = req.body;
    // const newNote = {
    //   assoc_user: body.assoc_user,
    //   text: body.text
    // };
    try {
      // await app.service('notes').create(newNote);
      res.status(200).json({
        status: 'success',
        // data,
      });
    } catch (e) {
      console.log('ttttttttttttt', e, 'res is ', res);

      res.status(400).json({
        status: 'error in data',

      });
    }

    // next();
  };

};
