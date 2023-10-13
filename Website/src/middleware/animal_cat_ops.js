exports.getAllCatInfo  = (app) => {
  return async function notesOperations(req, res, next) {
    try {

      const data = await app.service('animal-cat').find({ allow_filtering: true});
      // console.log('came here lmao 222');
      // console.log('sign up');
      // if(data){
      console.log('sign up' , data.length);

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
    // next();
  };
};


exports.getCatData  = (app) => {

  return async function notesOperations(req, res, next) {
    const body = req.body;
    const note = {
      // email: body.email,
      id: body.id,

    };
    // console.log('came here lmao ' , req);

    try {

      // const data = await app.service('notes').find({raw: true, allow_filtering: true});
      const service = await app.service('animal-cat');

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
    // next();
  };

};
exports.addNewCatInfo = (app) => {
  return async function animalOperations(req, res, next) {
    const body = req.body;

    const animal = {
      // monitoring_start_Date : body.monitoring_start_Date,
      cat_id : body.cat_id,
      name : body.name,
      Min_H_R : body.Min_H_R,
      Max_H_R : body.Max_H_R,
      Min_A_T : body.Min_A_T,
      Max_A_T : body.Max_A_T,
      Min_SpO2 : body.Min_SpO2,
      Max_SpO2 : body.Max_SpO2,
    }
    try {
      await app.service('animal-cat').create(animal);
      res.status(200).json({
        status: 'success',
        animal,
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
