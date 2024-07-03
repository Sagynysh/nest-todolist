import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly project_service: ProjectService) {}

  @Post(':id/add-users')
  add_users(@Param('id') id: string, @Body() createUserDtos: CreateUserDto[]) {
    return this.project_service.add_users(+id, createUserDtos);
  }

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.project_service.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.project_service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.project_service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.project_service.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.project_service.remove(+id);
  }
}
