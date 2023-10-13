// eslint-disable-next-line no-unused-vars
const signup = require('./signup');
const login = require('./login');
const sensorDataStream = require('./sensor_data_stream');
const userController = require('./user-operations');
const videoStream = require('./video-stream');
const fs = require('fs');
const {authenticate} = require('@feathersjs/express');

const notesOperations = require('./notes-operations');
const animalOperations = require('./animal-operations');
const animalCatOps = require('./animal_cat_ops');
const notificationLogic = require('../utils/notification_logic');
const notifications = require('./notifications');
const queryingOps = require('./querying-ops');
// const path = require('path');
//
// const pathToMedia = path.dirname('./../../media/')


// const multer = require('multer');


module.exports = function (app) {
  // app.use('/sensorData/getAll/',sen
  // sorDataStream.getRowById(app));
  // app.use('/', notificationLogic);


  // fs.open('./../../media/live/scree_stream/2022-04-07-04-09-44.mp4', 'r', function (err, f) {
  //   console.log('Saved!');
  // });
  //
  // console.log("path to media is ",       fs.open('./../../media/live/scree_stream/2022-04-07-04-09-44.mp4', 'r', function (err, f) {
  //   console.log('Saved!');
  // }));

  // const fileStorageEngine = multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     cb(null, "./media");//important this is a direct path fron our current file to storage location
  //
  //
  //   },
  //   filename: (req, file, cb) => {
  //
  //     cb(null, Date.now() + "--" + file.originalname);
  //
  //     console.log("level222" , Date.now() + "--" + file.originalname);
  //
  //   },
  // });
//
//
// // The Multer Middleware that is passed to routes that will receive income requests with file data (multipart/formdata)
// // You can create multiple middleware each with a different storage engine config so save different files in different locations on server
//   const upload = multer({ storage: fileStorageEngine });
//
// // Single File Route Handler
// //   app.post("/single", upload.single("image"), (req, res) => {
// //     console.log(req.file);
// //
// //     res.send("Single FIle upload success");
// //   });
//
//
//



  //middlewares
  //*************************************************************************
  //                WHEN CREATING THE FIRST ADMIN USER, YOU NEED TO COMMENT LINE 79 AND 78
  //                (ONLY LOGGED IN ADMIN USERS CAN CREATE NEW USERS) AND IN THE BODY OF THE REQUEST, ((((SPECIFY THE "role" FIELD TO BE "admin")))))
  //
  //                AFTER THE ADMIN USER IS CREATED, UNCOMMENT THE TWO LINES
  //                    SO ONLY THE LOGGED IN ADMIN CAN USE END POINT
  //*************************************************************************
  app.use('/signup',
    // authenticate('jwt'), //authentication before accessing the actual function                                                     <<<<<<<<---------
    // userController.restrictTo('admin'), //signup function or (creating a new user) can only be done by an authenticated admin         <<<<<<<<<--------
    signup.signup(app));


  // only admins can see user list, delete or update users. delete notes, etc
  app.use('/liveStream', userController.restrictTo('admin'),videoStream(app));



  //get sensor data between two times, takes time "from" and "to" in the body, and the animal id
  /*
        {
          "from": "2022-04-09 12:45:22.035000+0000",
          "to":    "2022-04-10 11:00:36.536000+0000",
          "animal_id":1

        }
   */
  app.use('/sensorData/getAll/', sensorDataStream.getFromTo(app));



  //get all users. doesn't have a body, only authentication
  app.use('/getAllUsers', authenticate('jwt'), userController.restrictTo('admin'), userController.getAllUsers(app));

  //get a user by id
  /*
        {
          "id": "a59a8b0e-7c3d-4919-af5e-abf2686adec5"
        }
   */
  app.use('/getUser', authenticate('jwt'), userController.restrictTo('admin'), userController.getUser(app));

  //delete user by id
  /*
        {
    "id": "a59a8b0e-7c3d-4919-af5e-abf2686adec5"
         }
   */
  app.use('/deleteUser', authenticate('jwt'), userController.restrictTo('admin'), userController.deleteUser(app));

  /// update a user by id (username), and the fields that need to be updated
  /*
        {
          "username": "rddmustafa",
          "first_name": "mustafaddd",
           "password": "admin@12asasas3",
       "email": "newsddadmin.mustffafa@gmail.com"

        }
   */
  app.use('/updateUser', authenticate('jwt'), userController.restrictTo('admin'), userController.updateUser(app));


  // get all notes, no body
  app.use('/getAllNotes', authenticate('jwt'), notesOperations.getAllNotes(app));

  // get note by id
  /*
        {
          "id":"4b4c9b4c-6ed5-4e28-9288-4fdd7b2bd34e"
        }
   */
  app.use('/getNote', authenticate('jwt'), notesOperations.getNote(app));
  app.use('/deleteNote', authenticate('jwt'),userController.restrictTo('admin'),  notesOperations.deleteNote(app));


  //add a new note
  /*
        {
          "assoc_user": "fbf9d670-eafd-4fb0-8226-cd62eb472d4c",
          "text": "lmao worked"
        }
   */
  app.use('/addNote', authenticate('jwt'), notesOperations.addNote(app)); //create a new note with the assoc_user(username)

  app.use('/getAllAnimalInfo', authenticate('jwt'), animalOperations.getAllAnimalInfo(app));
  app.use('/getAnimalData', authenticate('jwt'), animalOperations.getAnimalData(app));
  app.use('/addNewAnimalIfon', authenticate('jwt'), userController.restrictTo('admin'), animalOperations.addNewAnimalInfo(app));


  app.use('/getAllAnimal_CatInfo', authenticate('jwt'), animalCatOps.getAllCatInfo(app));
  app.use('/getAnimal_CatData', authenticate('jwt'), animalCatOps.getCatData(app));
  app.use('/addNewAnimal_CatInfo', authenticate('jwt'), userController.restrictTo('admin'), animalCatOps.addNewCatInfo(app));


  app.use('/getAllNotifications', authenticate('jwt'), userController.restrictTo('admin'), notifications.getAllNotifications(app));
  app.use('/getNotification', authenticate('jwt'),userController.restrictTo('admin'),  notifications.getNotification(app));


  // app.use('/get_video_from_to', queryingOps.getVideoFromTo(app));


  // app.use(queryingOps());
};
