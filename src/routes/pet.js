import { Router } from 'express';

const route = (controller) => {
  const router = Router();
  router.route('/:id')
    .post(controller.createPet)
    .get(controller.getPets);
  return router;
};

export default route;
