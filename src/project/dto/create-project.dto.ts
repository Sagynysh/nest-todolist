import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateProjectDto {
    
    @IsNotEmpty()
    @IsString()
    project_name : string;
}
