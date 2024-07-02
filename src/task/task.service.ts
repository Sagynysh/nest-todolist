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
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ){}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const projectData = await this.projectRepository.findOneBy({id: createTaskDto.project_id});
    const task_data = new Task();
    task_data.purpose = createTaskDto.purpose;
    task_data.project = projectData;
    return await this.taskRepository.save(task_data);
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    const task_data = await this.taskRepository.findOneBy({id});
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
    await this.taskRepository.update(id, {completed: true});
  }

  async active(): Promise<Task[]>{
    const tasks = await this.taskRepository.find({
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
