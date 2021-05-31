import mrq from 'mongoose-rest-query';

const createPet = (req, res) => {
  const userModel = mrq.model(req, 'UserSchema');
  const petModel = mrq.model(req, 'PetSchema');
  petModel.create(req.body, (error, pet) => {
    if (pet) {
      console.log(req.params);
      userModel.findById(req.params.userId, (error, user) => {
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
  userModel.findById(req.params.userId)
    .select('pets')
    .populate({
      path: 'pets',
      select: 'name',
    })
    .exec((error, user) => {
      if (user) {
        console.log(user);
        res.status(200).send(user.pets);
      } else {
        res.status(404).send('User not found');
      }
    });
};

const updatePet = (req, res) => {
  const petModel = mrq.model(req, 'PetSchema');
  petModel.findByIdAndUpdate(req.params.petId, req.body, (error, pet) => {
    if (pet) {
      console.log(req.params);
      res.status(200).send(pet);
    } else {
      res.status(500).send('Pet not updated');
    }
  });
};

export default { createPet, getPets, updatePet };
