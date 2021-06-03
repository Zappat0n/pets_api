"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongooseRestQuery = _interopRequireDefault(require("mongoose-rest-query"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createPet = function createPet(req, res) {
  var userModel = _mongooseRestQuery["default"].model(req, 'UserSchema');

  var petModel = _mongooseRestQuery["default"].model(req, 'PetSchema');

  petModel.create(req.body, function (error, pet) {
    if (pet) {
      console.log(req.params);
      userModel.findById(req.params.userId, function (error, user) {
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

var getPets = function getPets(req, res) {
  var userModel = _mongooseRestQuery["default"].model(req, 'UserSchema');

  userModel.findById(req.params.userId).select('pets').populate({
    path: 'pets',
    select: 'name'
  }).exec(function (error, user) {
    if (user) {
      console.log(user);
      res.status(200).send(user.pets);
    } else {
      res.status(404).send('User not found');
    }
  });
};

var updatePet = function updatePet(req, res) {
  var petModel = _mongooseRestQuery["default"].model(req, 'PetSchema');

  petModel.findByIdAndUpdate(req.params.petId, req.body, function (error, pet) {
    if (pet) {
      console.log(req.params);
      res.status(200).send(pet);
    } else {
      res.status(500).send('Pet not updated');
    }
  });
};

var _default = {
  createPet: createPet,
  getPets: getPets,
  updatePet: updatePet
};
exports["default"] = _default;