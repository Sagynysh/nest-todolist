import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Project } from './entities/project.entity';
import { CreateProjectTaskDto } from 'src/task/dto/create-project-task.dto';
import { Authlogin } from 'src/decorator/authlogin/authlogin.decorator';

@Controller('project')
export class ProjectController {
  constructor(private readonly project_service: ProjectService) {}


  @ApiCreatedResponse({
      description: 'Project and task was created successfully',
  })
  @Post('/create-with-task')
  create_project_and_task(@Authlogin() login: string, @Body() createTaskDto: CreateProjectTaskDto) {
      return this.project_service.create_project_and_task(login, createTaskDto);
  }

  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: Project
  })
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.project_service.create(createProjectDto);
  }

  @ApiCreatedResponse({
    description: 'All Projects',
    type: Project,
    isArray: true
  })
  @Get()
  findAll(@Authlogin() login: string) {
    return this.project_service.findAll(login);
  }

  @ApiCreatedResponse({
    description: 'Project Found Successfully',
    type: Project,
    isArray: false
  })
  @Get(':id')
  findOne(@Authlogin() login: string, @Param('id') id: string) {
    return this.project_service.findOne(login, +id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.project_service.update(+id, updateProjectDto);
  }

  @ApiCreatedResponse({
    description: 'Project Deleted Successfully',
    type: Project,
    isArray: false
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.project_service.remove(+id);
  }
}
