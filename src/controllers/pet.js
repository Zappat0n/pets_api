import mrq from 'mongoose-rest-query';

const createPet = (req, res) => {
  const userModel = mrq.model(req, 'UserSchema');
  const petModel = mrq.model(req, 'PetSchema');
  petModel.create(req.body, (error, pet) => {
    if (pet) {
      console.log(req.params);
      userModel.findById(req.params.id, (error, user) => {
        if (user) {
          user.pets.push(pet._id);
          user.save();
          res.send('Success');
        } else {
          res.send('User not found');
        }
      });
    } else {
      res.send('Pet not found');
    }
  });
};

const getPets = (req, res) => {
  const userModel = mrq.model(req, 'UserSchema');
  userModel.findById(req.params.id)
    .select('pets')
    .populate('pets')
    .exec((error, user) => {
      if (user) {
        console.log(user);
        res.send(user.pets);
      } else {
        res.send('User not found');
      }
    });
};

export default { createPet, getPets };
