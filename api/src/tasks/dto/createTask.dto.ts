import { IsBoolean, IsString } from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  description: string;

  @IsBoolean()
  done: boolean;
}
