import { Project } from "src/project/entities/project.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Unique('my_unique_constraint', ['login'])
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @Column({unique : true})
    login : string;

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
