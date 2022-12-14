import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";
import PropertiesController from "../controllers/PropertiesController";

const propertyRouter = Router();
const propertiesController = new PropertiesController();

propertyRouter.get('/', propertiesController.index);

propertyRouter.get('/:id', celebrate({
    [Segments.PARAMS] : {id: Joi.string().uuid().required()}
}), propertiesController.show);

propertyRouter.post('/', celebrate({
    [Segments.BODY]: {
        description: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        number: Joi.number().required(),
    }
}),propertiesController.create);

propertyRouter.put('/:id', celebrate({
    [Segments.PARAMS] : {id: Joi.string().uuid().required()},
    [Segments.BODY]: {
        description: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        number: Joi.number().required(),
    }
}), propertiesController.update);

propertyRouter.delete('/:id', celebrate({
    [Segments.PARAMS] : {id: Joi.string().uuid().required()}
}), propertiesController.delete);

export default propertyRouter;

//lembrar de importar na routes->index