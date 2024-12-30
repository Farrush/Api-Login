import { Column, Entity, PrimaryGeneratedColumn,  } from "typeorm";

@Entity('login')
export class Login{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    name: string

    @Column({type: 'text', unique: true})
    email: string

    @Column({type: 'text'})
    pass: string
}