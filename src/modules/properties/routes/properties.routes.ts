import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import PropertiesController from "../controllers/PropertiesController";

const propertiesRouter = Router();
const propertiesController = new PropertiesController();

propertiesRouter.get('/', propertiesController.index);
propertiesRouter.get('/:id', celebrate({
    [Segments.PARAMS] : {id: Joi.string().uuid().required()}
}), propertiesController.show);

propertiesRouter.post('/', celebrate({
    [Segments.BODY]: {
        description: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        district: Joi.string().required(),
        size: Joi.number().required(),
        number: Joi.number().required(),
    } 
}), propertiesController.create);

propertiesRouter.put('/:id', celebrate({
    [Segments.PARAMS] : {id: Joi.string().uuid().required()},
    [Segments.BODY]: {
        description: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        district: Joi.string().required(),
        size: Joi.number().required(),
        number: Joi.number().required(),
    }
}), propertiesController.update);

propertiesRouter.delete('/:id', celebrate({
    [Segments.PARAMS] : {id: Joi.string().uuid().required()}
}), propertiesController.delete);

export default propertiesRouter;

//lembrar de importar na routes->index