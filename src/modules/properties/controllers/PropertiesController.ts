import CreatePropertiesService from "@modules/properties/services/CreatePropetyService";
import DeletePropertiesService from "@modules/properties/services/DeletePropertyService";
import ListPropertiesService from "@modules/properties/services/ListPropertyService";
import ShowPropertiesService from "@modules/properties/services/ShowPropertyService";
import UpdatePropertiesService from "@modules/properties/services/UpdatePropertyService";
import { Request, Response } from "express";

export default class PropertiesController{

    public async index(request: Request, response: Response) :
    Promise<Response> {
        const listProperties = new ListPropertiesService();
        const properties = await listProperties.execute();
        return response.json(properties);    
    }

    public async show(request: Request, response: Response) :
    Promise<Response> {
        const { id } = request.params;
        const showProperty= new ShowPropertiesService();
        const property= await showProperty.execute({ id });
        return response.json(property);    
    }

    public async create(request: Request, response: Response) :
    Promise<Response> {
        const { description, price, city, street, district, size, number, quantity } = request.body;
        const createProperty= new CreatePropertiesService();
        const property= await createProperty.execute({ description,
        price, city, street, district, size, number, quantity });
        return response.json(property);    
    }

    public async update(request: Request, response: Response) :
    Promise<Response> {
        const { id } = request.params;
        const { description, price, city, street, district, size, number, quantity } = request.body;
        const updateProperty= new UpdatePropertiesService();
        const property= await updateProperty.execute({ id, description,
        price, city, street, district, size,number, quantity });
        return response.json(property);    
    }

    public async delete(request: Request, response: Response) :
    Promise<Response> {
        const { id } = request.params;
        const deleteProperty= new DeletePropertiesService();
        await deleteProperty.execute({ id });
        return response.json([]);    
    }

}