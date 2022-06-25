import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class histories1652152126655 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'histories',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            generationStrategy: 'increment',
            isPrimary: true,
            unsigned: true,
          },
          {
            name: 'account',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'poolId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'amount',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'stakedId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'stakingTime',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'rewardClaimed',
            type: 'varchar',
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
