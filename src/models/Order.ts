import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn
} from 'typeorm'
import { OrderStatus } from 'types/OrderModel.types'

import Character from './Character'

@Entity()
export default class Order extends BaseEntity {
    @PrimaryColumn()
    id: string

    @Column('varchar', { length: 32 })
    status: OrderStatus

    @Column()
    mnk: string

    @Column()
    days: number

    @Column()
    fullPrice: number

    @Column()
    price: number

    @Column()
    capturedPrice: number

    @Column()
    transactionId: string

    @Column()
    payerName: string

    @Column()
    payerEmail: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(_type => Character)
    @JoinColumn({ name: 'mnk' })
    character: Character

    constructor(params: {
        id: string
        status: OrderStatus
        mnk: string
        days: number
        fullPrice: number
        price: number
    }) {
        super()
        this.id = params?.id
        this.status = params?.status
        this.mnk = params?.mnk
        this.days = params?.days
        this.fullPrice = params?.fullPrice
        this.price = params?.price
    }
}
