module.exports = (app) => {
  return async function login(req, res, next) {
    // const app = this;
    const body = req.body;


    const user = {
      email: body.email,
      password: body.password
    };



    //
    // await app.service('users').create(user).then(err=>{
    //   console.log(err)
    // })
    //



    try {
      const service =  await app.service('users').find(user)

      const auth = await app.service('authentication')

      console.log('received body is ', user ,
        "user form system is " , service , " auth is " , auth
      );

      console.log('ttttttttfsdfttttt', 'res is ',
      );

      res.status(201).json({
        status:"success",
        service

      })



    } catch (e) {
      console.log('ttttttttttttt', e, 'res is ', res);

      res.status(201).json({
        status:"failed",

      })



    }

    // next();
  };
};
