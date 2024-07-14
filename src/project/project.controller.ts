import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Project } from './entities/project.entity';

@Controller('project')
export class ProjectController {
  constructor(private readonly project_service: ProjectService) {}

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
  findAll(@Headers() headers: string) {
    console.log(headers['authorization']);
    const login = headers['authorization'];
    return this.project_service.findAll(login);
  }

  @ApiCreatedResponse({
    description: 'Project Found Successfully',
    type: Project,
    isArray: false
  })
  @Get(':id')
  findOne(@Headers() headers: string, @Param('id') id: string) {
    const login = headers['authorization'];
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
