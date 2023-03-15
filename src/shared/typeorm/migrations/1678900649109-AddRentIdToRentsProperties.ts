import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddRentIdToRentsProperties1678900649109 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
          'rents_properties',
          new TableColumn({
            name: 'rent_id',
            type: 'uuid',
            isNullable: true,
          }),
        );
  
        await queryRunner.createForeignKey('rents_properties',
          new TableForeignKey({
            name: 'RentsPropertiesRents',
            columnNames: ['rent_id'],
            referencedTableName: 'rents',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
          })
        );
      }
  
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('rents_properties', 'RentsPropertiesRents');
        await queryRunner.dropColumn('rents_properties', 'rent_id');
      }
}
