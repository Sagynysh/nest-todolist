import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateProjectDto {
    
    @ApiProperty({description: 'Name of Project', nullable: false})
    @IsNotEmpty()
    @IsString()
    project_name : string;
}
