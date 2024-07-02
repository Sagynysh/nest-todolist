import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateProjectDto } from "src/project/dto/create-project.dto";

export class CreateTaskDto {

    @IsNotEmpty()
    @IsString()
    purpose: string;

    @IsNotEmpty()
    @IsNumber()
    project_id: number;
}
