import CustomersRepository from "@modules/customers/typeorm/repositories/CustomersRepository";
import PropertyRepository from "@modules/properties/typeorm/repositories/PropertyRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Rent from "../typeorm/entities/Rent";
import RentRepository from "../typeorm/repositories/RentRepoitory";

interface IProperty {
  id: string;
  quantity: number;
}
interface IRequest {
  customer_id: string;
  properties: IProperty[];
}

export default class CreateRentService {
  public async execute({ customer_id, properties }: IRequest): Promise<Rent> {
    const rentsRepository = getCustomRepository(RentRepository);
    const customersRepository = getCustomRepository(CustomersRepository);
    const propertiesRepository = getCustomRepository(PropertyRepository);

    const customerExists = await customersRepository.findById(customer_id);
    if (!customerExists) {
      throw new AppError("Could not find any customer with the given ids.");
    }

    //implementar no repositório de produtos.
    const existsProperties = await propertiesRepository.findAllByIds(properties);
    if (!existsProperties.length) {
      throw new AppError("Could not find any properties with the given ids.");
    }

    //pra eu saber se todos os produtos foram encontrados
    const existsPropertiesIds = existsProperties.map((property) => property.id);
    const checkInexistentProperties = properties.filter(
      (property) => !existsPropertiesIds.includes(property.id)
    );
    if (!existsPropertiesIds.length) {
      //imprimo os produtos que não foram encontrados
      throw new AppError(
        `Could not find property ${checkInexistentProperties[0].id}.`
      );
    }

    //verificar a quantidade de produtos
    //não posso vender mais do que eu tenho
    const quantityAvailable = properties.filter(
      (property) =>
        existsProperties.filter((prop) => prop.id === property.id)[0].quantity <
        property.quantity
    );
    if (quantityAvailable.length) {
      throw new AppError(`The quantity ${quantityAvailable[0].id}
       is not available for ${quantityAvailable[0].id}.`);
    }

    //calculo o valor do pedido
    const serializerProperties = properties.map((property) => ({
      property_id: property.id,
      quantity: property.quantity,
      price: existsProperties.filter((prop) => prop.id === property.id)[0].price,
    }));

    //crio o pedido
    const rent = await rentsRepository.createRent({
      customer: customerExists,
      properties: serializerProperties,
    });

    //atualizo a quantidade produtos após meu pedido
    const { rent_properties } = rent;
    const updatePropertyQuantity = rent_properties.map((property) => ({
      id: property.property_id,
      quantity:
        existsProperties.filter((p) => p.id === property.property_id)[0].quantity -
        property.quantity,
    }));

    await propertiesRepository.save(updatePropertyQuantity);
    return rent;
  }
}
