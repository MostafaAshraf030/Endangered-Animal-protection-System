exports.getAllAnimalInfo  = (app) => {
  return async function notesOperations(req, res, next) {
    try {
      // console.log('sign up');
      console.log('user is ', req.user);

      const data = await app.service('animals').find({raw: true, allow_filtering: true});
      // console.log('came here lmao 222');
      // console.log('sign up');
      // if(data){
      res.status(201).json({
        status: 'success',
        data
      });
    } catch (e) {
      // console.log('ttttttttttttt', e, 'res is ', res);

      res.status(400).json({
        status: 'error in data',
      });
    }
  };
};


exports.getAnimalData  = (app) => {
  return async function animalOperations(req, res, next) {
    const body = req.body;
    const animal = {
      // email: body.email,
      id: body.id,

    };
    try {
      const service = await app.service('animals');
      const data = await service.get(animal);
      // const raqheaders = res.req.rawHeaders
      // data.data.forEach( e => console.log(user))
      // console.log('sign up',  data.data);
      res.status(200).json({
        status: 'success',
        data
      });
    } catch (e) {
      console.log('ttttttttttttt', e, 'res is ', res);

      res.status(400).json({
        status: 'no animals associated with this info',

      });
    }
    // next();
  };
};
exports.addNewAnimalInfo = (app) => {
  return async function animalOperations(req, res, next) {
    const body = req.body;

    const animal = {
      id:body.id,
      monitoring_start_Date : body.monitoring_start_Date,
      cat_id : body.cat_id
    }
    try {
      await app.service('animals').create(animal);
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




  };
};
