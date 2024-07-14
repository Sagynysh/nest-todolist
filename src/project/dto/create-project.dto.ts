import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProjectDto {
    
    @ApiProperty({description: 'Name of Project', nullable: false})
    @IsNotEmpty()
    @IsString()
    project_name : string;
}
