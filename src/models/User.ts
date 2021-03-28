import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import Character from './Character'

@Entity({ name: 'users' })
export default class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date

    @OneToMany(_type => Character, character => character.user)
    characters: Character[]
}
