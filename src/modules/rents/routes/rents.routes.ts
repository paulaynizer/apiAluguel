import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import RentsController from "../controllers/RentsController";

const rentsRouter = Router();
const rentsController = new RentsController();

rentsRouter.use(isAuthenticated);
rentsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {id: Joi.string().uuid().required()}
  }),
  rentsController.show);

  rentsRouter.post('/',
celebrate({
  [Segments.BODY] : {
  customer_id: Joi.string().required(),
  properties: Joi.required()
  }
})
,rentsController.create);

export default rentsRouter;