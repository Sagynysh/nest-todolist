import { ApiProperty } from "@nestjs/swagger";
import { Project } from "src/project/entities/project.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Unique('my_unique_constraint', ['login'])
@Entity()
export class User {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id : number;

    @ApiProperty()
    @Column()
    name : string;

    @ApiProperty()
    @Column({unique : true})
    login : string;

    @ApiProperty()
    @ManyToMany(() => Project, (project) => project.users)
    @JoinTable({
        name: 'project_user',
        joinColumn: {
            name: 'project_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        }
    })
    project: Project[];
}
