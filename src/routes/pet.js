var express = require('express');

function route(controller) {
  var router = express.Router();
  router.route("/:id")
    .post(controller.createPet);
  return router;
}

module.exports = route;
