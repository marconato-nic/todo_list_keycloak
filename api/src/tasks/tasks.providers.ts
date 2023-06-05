import { DataSource } from 'typeorm';
import { Tasks } from './tasks.entity';

export const taskProviders = [
  {
    provide: 'TASK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Tasks),
    inject: ['DATA_SOURCE'],
  },
];
