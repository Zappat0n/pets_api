import { Router } from 'express';

const route = (controller) => {
  const router = Router();
  router.route('/user/:userId')
    .post(controller.createPet)
    .get(controller.getPets);

  router.route('/:petId')
    .put(controller.updatePet);

  router.route('/:petId/user/:userId')
    .delete(controller.deletePet);

  return router;
};

export default route;
