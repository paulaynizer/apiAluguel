import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProperties1670877352595 implements MigrationInterface {

    
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'properties',
                columns: [
                    { name: 'id', type: 'uuid', isPrimary: true,
                generationStrategy: 'uuid', default: 'uuid_generate_v4()'},
                    { name: 'description', type: 'varchar'},
                    { name: 'price', type: 'decimal', precision: 10, scale : 2},
                    { name: 'city', type: 'varchar'},
                    { name: 'street', type: 'varchar'},
                    { name: 'number', type: 'int'},
                    { name: 'created_at', type: 'timestamp', default: 'now()'},
                    { name: 'updated_at', type: 'timestamp', default: 'now()'},
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('properties');
    }


}
