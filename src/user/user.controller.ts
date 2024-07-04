import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiResponseProperty } from '@nestjs/swagger';
import { Project } from 'src/project/entities/project.entity';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly user_service: UserService) {}

  @ApiCreatedResponse({
    description: 'Created Succesfully',
    isArray: false,
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try{
      await this.user_service.create(createUserDto);

      return {
        success : true,
        message : 'User create successfully'
      }
    }catch(error){
      return {
        success : false,
        message : error.message
      }
    }
  }

  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: Project,
    isArray: true,
  })
  @Get(':id/projects')
  findProjects(@Param('id') id: string) {
    return this.user_service.projects(+id);
  }

  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: User,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.user_service.findAll();
  }

  @ApiCreatedResponse({
    description: 'User Found Succesfully',
    type: User
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.user_service.findOne(+id);
  }

  @ApiCreatedResponse({
    description: 'Updated Succesfully',
    type: User
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.user_service.update(+id, updateUserDto);
  }

  @ApiCreatedResponse({
    description: 'Deleted Succesfully',
    type: User
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.user_service.remove(+id);
  }
}
