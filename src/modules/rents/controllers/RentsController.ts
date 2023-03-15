import { Request, Response } from "express";
import CreateRentService from "../services/CreateRentService";
import ShowRentService from "../services/ShowRentService";

export default class RentsController{
    constructor(){}
  
    public async show(request: Request, response: Response): Promise<Response>{
      const { id } = request.params;
      const showRent = new ShowRentService();
      const rent = await showRent.execute({ id });
      return response.json(rent);
    }
  
    public async create(request: Request, response: Response): Promise<Response>{
      const {customer_id, properties} = request.body;
      const createRent = new CreateRentService();
      const rent = await createRent.execute({customer_id, properties});
      return response.json(rent);
    }
  
  }