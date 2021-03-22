import { NextFunction, Request, Response } from 'express'

import { Payments } from '@services/Payments'

class PaymentController {
    public async create(req: Request, resp: Response, next: NextFunction): Promise<void> {
        try {
            const { price } = req.body as Record<string, number>

            const payment = new Payments()

            const response = await payment.createOrder(price)

            resp.json(response)
        } catch (err) {
            next(err)
        }
    }

    public async event(req: Request, resp: Response, next: NextFunction): Promise<void> {
        try {
            const { orderId } = req.body as Record<string, string>

            const payment = new Payments()

            const response = await payment.captureOrder(orderId)

            resp.json(response)
        } catch (err) {
            next(err)
        }
    }

    public async capture(req: Request, resp: Response, next: NextFunction): Promise<void> {
        try {
            const { orderId } = req.body as Record<string, string>

            const payment = new Payments()

            const response = await payment.captureOrder(orderId)

            resp.json(response)
        } catch (err) {
            next(err)
        }
    }
}

export default new PaymentController()
