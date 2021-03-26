import { OrderStatus } from './OrderModel.types'

export interface IOrderCreateResponse {
    id: string
    status: OrderStatus
    checkoutUrl: string
}

export interface IOrderCaptureResponse {
    trasactionId: string
    capture: {
        grossAmount: number
        paypalFee: number
        netAmount: number
    }
    payer: {
        name: string
        email: string
    }
}
