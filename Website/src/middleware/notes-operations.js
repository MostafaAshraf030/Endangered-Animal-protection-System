exports.addNote = (app) => {
  return async function notesOperations(req, res, next) {
    const body = req.body;

    const newNote = {

      assoc_user: req.user.email,
      text: body.text,
      danger_level: body.danger_level
    };

    const newNotification = {
      animal_id: body.animal_id,
      title: req.user.email,
      message: body.text,
      danger_level: body.danger_level,
      time: Date.now()


    };
    console.log('ttttttttttttt', newNote);


    try {

      if (newNote.danger_level.toLowerCase() === 'high') {
        await app.service('notifications').create(newNotification);
        if (app.io) {
          app.io.emit('notification' , newNotification)   //.to("admins")

        }
      }
      await app.service('notes').create(newNote);

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


exports.getAllNotes = (app) => {
  return async function notesOperations(req, res, next) {
    try {

      const data = await app.service('notes').find({
        query: {
          $select: ['assoc_user', 'text', 'danger_level', 'createdAt'],
        }
      }, { allow_filtering: true});


      res.status(201).json({
        status: 'success',
        data
      });
    } catch (e) {
      console.log('ttttttttttttt', e, 'res is ', res);

      res.status(400).json({
        status: 'error in data',
      });
    }
  };
};

exports.getNote = (app) => {
  // console.log('came here lmao 4');
  // console.log('sign up');
  return async function notesOperations(req, res, next) {
    const body = req.body;
    const note = {
      // email: body.email,
      id: body.id,

    };
    try {

      // const data = await app.service('notes').find({raw: true, allow_filtering: true});
      const service = await app.service('notes');

      const data = await service.get(note);


      // if(data){
      res.status(201).json({
        status: 'success',
        data
      });
    } catch (e) {
      console.log('ttttttttttttt', e,);

      res.status(400).json({
        status: 'error in data',
      });
    }
  };
};

exports.deleteNote = (app) => {
  return async function userOperations(req, res, next) {
    const body = req.body;
    const user = {
      id: body.id,
    };
    try {
      const service = await app.service('notes');
      const data = await service.remove(user);
      // const raqheaders = res.req.rawHeaders
      // data.data.forEach( e => console.log(user))
      // console.log('sign up',  data.data);
      res.status(200).json({
        status: 'success',
      });
    } catch (e) {
      console.log('ttttttttttttt', e, 'res is ', res);

      res.status(400).json({
        status: 'error in data',

      });
    }
  };

};

