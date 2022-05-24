import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class pools1652151503858 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pools',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            unsigned: true,
          },
          {
            name: 'acceptedToken',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cap',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'APR',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'lockDuration',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'delayDuration',
            type: 'int',
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
    if (await queryRunner.hasTable('pools')) await queryRunner.dropTable('pools');
  }
}
