import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddPropertyIdToRentsProperty1678900919922 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
          'rents_properties',
          new TableColumn({
            name: 'property_id',
            type: 'uuid',
            isNullable: true,
          }),
        );
    
        await queryRunner.createForeignKey('rents_properties',
          new TableForeignKey({
            name: 'RentsPropertiesProperty',
            columnNames: ['property_id'],
            referencedTableName: 'properties',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('rents_properties', 'RentsPropertiesProperty');
        await queryRunner.dropColumn('rents_properties', 'poperty_id');
      }

}
