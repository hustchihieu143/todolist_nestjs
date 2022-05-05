import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class crawlStatus1651765172253 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'crawl_status',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            unsigned: true,
          },
          {
            name: 'contract_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'contract_address',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'block_number',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'datetime',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable('crawl_status')) await queryRunner.dropTable('crawl_status');
  }
}
