import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tasks } from './tasks.entity';
import { CreateTaskDTO } from './dto/createTask.dto';
import { UpdateTaskDTO } from './dto/updateTask.dto';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepository: Repository<Tasks>,
  ) {}

  async findAll(): Promise<Tasks[]> {
    return await this.taskRepository.find();
  }

  async findById(id: number): Promise<Tasks> {
    return await this.taskRepository.findOne({
      select: {
        id: true,
        description: true,
        done: true,
      },
      where: {
        id: id,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.taskRepository.delete({ id: id });
  }

  async create(createTaskDTO: CreateTaskDTO) {
    console.log(createTaskDTO);
    return await this.taskRepository.save(createTaskDTO);
  }

  async update(id: number, updateTaskDTO: UpdateTaskDTO) {
    return await this.taskRepository.update(id, updateTaskDTO);
  }
}
