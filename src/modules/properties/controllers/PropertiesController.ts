import CreatePropertyService from "@modules/properties/services/CreatePropertyService";
import DeletePropertyService from "@modules/properties/services/DeletePropertyService";
import ListPropertyService from "@modules/properties/services/ListPropertyService";
import ShowPropertyService from "@modules/properties/services/ShowPropertyService";
import UpdatePropertyService from "@modules/properties/services/UpdatePropertyService";
import { Request, Response } from "express";

export default class PropertiesController{

    public async index(request: Request, response: Response) :
    Promise<Response> {
        const listProperties = new ListPropertyService();
        const properties = await listProperties.execute();
        return response.json(properties);    
    }

    public async show(request: Request, response: Response) :
    Promise<Response> {
        const { id } = request.params;
        const showProperty= new ShowPropertyService();
        const property= await showProperty.execute({ id });
        return response.json(property);    
    }

    public async create(request: Request, response: Response) :
    Promise<Response> {
        const { description, price, city, street, district, size, number } = request.body;
        const createProperty= new CreatePropertyService();
        const property= await createProperty.execute({ description,
        price, city, street, district, size, number });
        return response.json(property);    
    }

    public async update(request: Request, response: Response) :
    Promise<Response> {
        const { id } = request.params;
        const { description, price, city, street, district, size, number } = request.body;
        const updateProperty= new UpdatePropertyService();
        const property= await updateProperty.execute({ id,  description,
        price, city, street, district, size,number });
        return response.json(property);    
    }

    public async delete(request: Request, response: Response) :
    Promise<Response> {
        const { id } = request.params;
        const deleteProperty= new DeletePropertyService();
        await deleteProperty.execute({ id });
        return response.json([]);    
    }

}