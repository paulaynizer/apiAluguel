
import propertyRouter from "@modules/properties/routes/properties.routes";
import { Router } from "express";

const routes = Router();

routes.use('/properties', propertyRouter);

export default routes;