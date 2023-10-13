const fs = require('fs');


module.exports = (app) => {
  return function videoStream(req, res, next) {
    const range = req.headers.range;
    console.log('Uploaded chunk;' , range)

    if (!range) {
      res.status(400).send('requires range header');
    }
    const videoPath =  `${__dirname}/bigbuck.mp4`;
    const videoSize = fs.statSync(videoPath).size;

    const CHUNK_SIZE = 10 ** 6;

    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const contentLength = end - start +1;

    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };



    res.writeHead(206 , headers);

    // console.log("823407583475" , res);

    const videoStream = fs.createReadStream(videoPath , {start , end});


    videoStream.pipe(res);




    // next();
  };
};
