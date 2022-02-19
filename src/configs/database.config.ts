import { registerAs } from '@nestjs/config';
import { getConfig } from './index';

export interface DatabaseConfig {
  type: 'mysql';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities: string[];
  logging: boolean;
}

export default registerAs('database', () => ({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT || 5432,
}));

// export const masterConfig = {
//   ...getConfig().get<DatabaseConfig>('master'),
//   name: 'master',
//   entities: [__dirname + '/../models/entities/**/*{.ts,.js}'],
//   autoLoadEntities: true,
//   loading: true,
// };

// export const reportConfig = {
//   ...getConfig().get<DatabaseConfig>('report'),
//   name: 'report',
//   entities: [__dirname + '/../models/entities/**/*{.ts,.js}'],
//   autoLoadEntities: true,
//   loading: true,
// };
