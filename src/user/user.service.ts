import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository : Repository<User>
  ){}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userData = await this.userRepository.save(createUserDto);
    return userData;
  }

  async findAll(): Promise<User[]>{
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User>{
    const userData = await this.userRepository.findOneBy({id});
    if(!userData){
      throw new HttpException(
        'User Not Found',
        404,
      );
    }
    return userData;
  }

  async update(id: number, updateUserDto: UpdateUserDto) : Promise<User> {
    const existingUser = await this.userRepository.findOneBy({id});
    const userData = await this.userRepository.merge(existingUser, updateUserDto);
    return await this.userRepository.save(userData);
  }

  async remove(id: number): Promise<User>{
    const existingUser = await this.userRepository.findOneBy({id});
    return await this.userRepository.remove(existingUser);
  }
}
