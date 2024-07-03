import { HttpException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from 'src/project/entities/project.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly task_repository: Repository<Task>,
    @InjectRepository(Project)
    private readonly project_repository: Repository<Project>,
  ){}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const projectData = await this.project_repository.findOneBy({id: createTaskDto.project_id});
    const task_data = new Task();
    task_data.purpose = createTaskDto.purpose;
    task_data.project = projectData;
    return await this.task_repository.save(task_data);
  }

  async findAll(): Promise<Task[]> {
    return await this.task_repository.find();
  }

  async findOne(id: number): Promise<Task> {
    const task_data = await this.task_repository.findOneBy({id});
    if(!task_data){
      throw new HttpException(
        'Task Not Found',
        404,
      );
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
        completed: true
      }
    });

    if(!tasks){
      throw new HttpException(
        'There is no completed tasks',
        404
      )
    }
    return tasks;
  }
}
