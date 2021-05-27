var mrq = require("mongoose-rest-query");

var createPet = function(req, res) {
  var userModel = mrq.model(req, "UserSchema");
  var petModel = mrq.model(req, "PetSchema");
  petModel.create(req.body, function(error, pet) {
    if (pet) {
      console.log(req.params);
      userModel.findById(req.params.id, function(error, user) {
        if (user) {
          user.pets.push(pet._id);
          user.save();
          res.send("Success");
        } else {
          res.send("User not found");
        }
      })
    } else {
      res.send("Pet not found");
    }
  })
}

module.exports = { createPet: createPet };
