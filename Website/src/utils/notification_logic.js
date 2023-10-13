// module.exports =  ( ={}) =>{
module.exports = (options = {}) => {

  return async context => {
    try {

      // const data = await context.app.service('sensor-data').find({$limit: 10});
      const {animal_id , Heart_Rate, SpO2_Rate , Animal_Temperature, Weather , Air_Qualit , Humidity} = context.arguments[0];
      // const new_Min_A_T = context.arguments[0];

      //
      // const Heart_Rate = context.arguments[0]['Heart_Rate'];
      // const SpO2_Rate = context.arguments[0]['SpO2_Rate'];
      // const Animal_Temperature = context.arguments[0]['Animal_Temperature'];
      // const Weather = context.arguments[0]['Weather'];
      // const Air_Qualit = context.arguments[0]['Air_Qualit'];
      // const Humidity = context.arguments[0]['Humidity'];

      const {
        Min_A_T,
        Max_A_T,
        Min_H_R,
        Max_H_R,
        Min_SpO2,
        Max_SpO2
      } = await context.app.service('animal-cat').get(animal_id);

      if(
          (Heart_Rate <= Min_H_R || Heart_Rate >= Max_H_R)
          || (SpO2_Rate <= Min_SpO2 || SpO2_Rate >= Max_SpO2)
          || (Animal_Temperature <= Min_A_T || Animal_Temperature >= Max_A_T)
      ) {
        // ! (
        //     (
        //         (Heart_Rate >= Min_H_R)
        //         || (Heart_Rate <= Max_H_R)
        //     )
        //     && (
        //         (SpO2_Rate >= Min_SpO2)
        //         || (SpO2_Rate <= Max_SpO2)
        //     )
        //     && (
        //         (Animal_Temperature >= Min_A_T)
        //         || (Animal_Temperature >= Max_A_T)
        //     )
        // )
        const newNotification = {
          animal_id: animal_id,
          title : `Warning!!`,
          message: "Something Wen Wrong! "
              +((Animal_Temperature <= Min_A_T || Animal_Temperature >= Max_A_T) ? "Anima Temperature: "+Animal_Temperature : "")
              +((SpO2_Rate <= Min_SpO2 || SpO2_Rate >= Max_SpO2) ? ", SpO2 Rate: "+SpO2_Rate : "")
              +((Heart_Rate <= Min_H_R || Heart_Rate >= Max_H_R) ?", Heart Rate: " +Heart_Rate : "")
              +", Humidity: "+Humidity,
          danger_level: "high",
          time: Date.now(),
          // Heart_Rate: Heart_Rate



        }
        await context.app.service('notifications').create(newNotification);


        if (context.app.io) {
          context.app.io.emit('notification' , newNotification)   //.to("admins")

        }

      }
    } catch (e) {
      console.log('error is  ', e);

    }

    return context;


  };

};
