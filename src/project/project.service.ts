import { HttpException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { throwError } from 'rxjs';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private project_repository: Repository<Project>
  ){}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    return await this.project_repository.save(createProjectDto); 
  }

  async findAll() {
    return await this.project_repository.find();
  }

  async findOne(id: number): Promise<Project> {
    const project_data = await this.project_repository.findOne({
      where: {
        id: id
      },
      relations: {
        tasks: true
      }
    });

    if(!project_data){
      throw new HttpException(
        'Project Not Found',
        404,
      )
    }
    return project_data;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.project_repository.delete({id});
  }
}
