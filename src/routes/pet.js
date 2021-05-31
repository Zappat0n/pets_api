import { Router } from 'express';

const route = (controller) => {
  const router = Router();
  router.route('/:userId')
    .post(controller.createPet)
    .get(controller.getPets);

  router.route('/:petId')
    .put(controller.updatePet);
  return router;
};

export default route;
