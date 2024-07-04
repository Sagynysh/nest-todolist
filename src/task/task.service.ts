import { HttpException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from 'src/project/entities/project.entity';
import { ProjectNotFoundException, TaskNotFoundException } from 'src/exception/exceptions';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly task_repository: Repository<Task>,
    @InjectRepository(Project)
    private readonly project_repository: Repository<Project>,
  ){}

  
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const project_data = await this.project_repository.findOneBy({id: createTaskDto.project_id});
    if(!project_data){
      throw new ProjectNotFoundException();
    }
    const task_data = new Task();
    task_data.purpose = createTaskDto.purpose;
    task_data.project = project_data;
    return await this.task_repository.save(task_data);
  }

  async findAll(): Promise<Task[]> {
    return await this.task_repository.find();
  }

  async findOne(id: number): Promise<Task> {
    const task_data = await this.task_repository.findOneBy({id});
    if(!task_data){
      throw new TaskNotFoundException();
    }
    return task_data;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }

  async complete(id: number): Promise<void>{
    await this.task_repository.update(id, {completed: true});
  }

  async active(): Promise<Task[]>{
    const tasks = await this.task_repository.find({
      where: {
        completed: false
      }
    });

    if(!tasks){
      throw new TaskNotFoundException();
    }
    return tasks;
  }
}
