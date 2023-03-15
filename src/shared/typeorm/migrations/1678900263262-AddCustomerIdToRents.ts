import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddCustomerIdToRents1678900263262 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
          'rents',
          new TableColumn({
            name: 'customer_id',
            type: 'uuid',
            isNullable: true, //mesmo que não exista mais cliente, ainda guarda pedidos
          }),
        );
    
        await queryRunner.createForeignKey('rents',
          new TableForeignKey({
            name: 'RentsCustomer',
            columnNames: ['customer_id'],
            referencedTableName: 'customers',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('rents', 'RentssCustomer');
        await queryRunner.dropColumn('rents', 'customer_id');
      }
}
