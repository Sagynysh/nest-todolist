import { ApiProperty } from "@nestjs/swagger";
import { Task } from "src/task/entities/task.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Project {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id : number;

    @ApiProperty()
    @Column()
    project_name : string;

    @ApiProperty({isArray: true})
    @ManyToMany(() => User, user => user.projects, {
        cascade: ['insert']
    })
    users : User[];

    @ApiProperty({isArray: true})
    @OneToMany(() => Task, (task) => task.project,{
        cascade: ['insert', 'remove']
    })
    tasks : Task[];
}
