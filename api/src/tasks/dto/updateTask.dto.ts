import { CreateTaskDTO } from './createTask.dto';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateTaskDTO extends CreateTaskDTO {
  @IsString()
  description: string;

  @IsBoolean()
  done: boolean;
}
