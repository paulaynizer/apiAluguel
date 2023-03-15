import { EntityRepository, In, Repository } from "typeorm";
import Property from "../entities/Property";

interface IFindProperties {
  id: string;
}

@EntityRepository(Property)
export default class PropertyRespository extends Repository<Property> {
  public async findByName(description: string): Promise<Property | undefined> {
    const property = await this.findOne({
      where: { description },
    });
    return property;
  }
  public async findAllByIds(
    properties: IFindProperties[]
  ): Promise<Property[]> {
    const propertiesIds = properties.map((property) => property.id);
    const existsProperty = await this.find({
      where: {
        id: In(propertiesIds),
      },
    });
    return existsProperty;
  }
}
