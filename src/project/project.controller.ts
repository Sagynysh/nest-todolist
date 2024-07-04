import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Project } from './entities/project.entity';

@Controller('project')
export class ProjectController {
  constructor(private readonly project_service: ProjectService) {}

  @ApiCreatedResponse({
    description: 'User added to Project Succesfully',
  })
  @Post(':id/add-users')
  add_users(@Param('id') id: string, @Body() createUserDtos: CreateUserDto[]) {
    return this.project_service.add_users(+id, createUserDtos);
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
  findAll() {
    return this.project_service.findAll();
  }

  @ApiCreatedResponse({
    description: 'Project Found Successfully',
    type: Project,
    isArray: false
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.project_service.findOne(+id);
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
