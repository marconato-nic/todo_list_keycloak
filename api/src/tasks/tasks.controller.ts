import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
import { Tasks } from './tasks.entity';
import { CreateTaskDTO } from './dto/createTask.dto';
import { UpdateTaskDTO } from './dto/updateTask.dto';
import { AuthGuard, Resource, Roles, Unprotected } from 'nest-keycloak-connect';

@Controller('tasks')
@Resource('service-tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  //@AuthGuard()
  @Unprotected()
  @Unprotected()
  async findAll(): Promise<Tasks[]> {
    return await this.taskService.findAll();
  }

  @Get(':id')
  //@AuthGuard()
  @Unprotected()
  async findById(@Param('id') id): Promise<Tasks> {
    return await this.taskService.findById(id);
  }

  @Delete(':id')
  //@AuthGuard()
  @Unprotected()
  async delete(@Param('id') id): Promise<string> {
    await this.taskService.delete(id);
    return `id ${id} removido`;
  }

  @Post()
  //@AuthGuard()
  @Unprotected()
  async create(@Body() createTaskDTO: CreateTaskDTO) {
    await this.taskService.create(createTaskDTO);
    return 'usuário criado';
  }

  @Put(':id')
  //@AuthGuard()
  @Unprotected()
  async update(@Param('id') id, @Body() updateTaskDTO: UpdateTaskDTO) {
    await this.taskService.update(id, updateTaskDTO);
    return `id ${id} atualizado`;
  }
}
