import { Repository } from 'typeorm';

export class BaseRepository<T extends { id: number }> extends Repository<T> {
  async insertOrUpdate(entities: T[]): Promise<void> {
    if (entities.length == 0) {
      return;
    }
    const columns = this.getColumns(entities[0].constructor.name);
    const quotedColumns = columns.map((column) => `\`${column}\``);
    const tableName = this.getTableName(entities[0].constructor.name);
    const columnsString = quotedColumns.join(', ');
    const placeholder = new Array(columns.length).fill('?');
    const placeholders = new Array(entities.length).fill(`(${placeholder})`).join(', ');
    const valueString = quotedColumns.map(
      (column) => `${column} = IF(VALUES(operationId) > operationId, VALUES(${column}), ${column})`,
    );
    let sql = '';
    sql += `INSERT INTO \`${tableName}\` (${columnsString})`;
    sql += ` VALUES ${placeholders}`;
    sql += ` ON DUPLICATE KEY UPDATE ${valueString}`;
    const params = [];

    for (const entity of entities) {
      for (const column of columns) {
        params.push(entity[column]);
      }
    }
    await this.manager.query(sql, params);
  }

  public async findBatch(fromId: number, from: number, count: number): Promise<T[]> {
    return this.createQueryBuilder()
      .where('id >= :fromId', { fromId })
      .orderBy('id', 'ASC')
      .skip(from)
      .take(count)
      .getMany();
  }

  public async getLastId(): Promise<number> {
    const order = {};
    order['id'] = 'DESC';
    const entity = await this.findOne({ order });
    if (entity) {
      return entity.id;
    } else {
      return 0;
    }
  }

  protected getColumns(target: string): string[] {
    const queryBuilder = this.createQueryBuilder();
    return queryBuilder.connection.getMetadata(target).columns.map((column) => column.propertyName);
  }

  protected getTableName(target: string): string {
    const queryBuilder = this.createQueryBuilder();
    return queryBuilder.connection.getMetadata(target).tableName;
  }
}
