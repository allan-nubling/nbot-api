import { Request, Response } from 'express'
import { HandleErrors } from 'types/Controllers.types'
import { EventType, IEventRequestBody } from 'types/PaymentController.types'

import Order from '@models/Order'
import { PaymentClient } from '@services/PaymentClient'
import { BadRequest, NotFound } from '@utils/errors'

export default class PaymentController {
    @HandleErrors()
    static async create(req: Request, resp: Response): Promise<void> {
        const { mnk, days } = req.query as Record<string, string>

        // TODO: Get character info

        // TODO: Generate Order Price
        let price: number
        if (days === '30') price = 24.99
        else if (days === '90') price = 59.99
        else if (days === '180') price = 99.99
        else throw new BadRequest('invalid days range')

        const payment = new PaymentClient()

        const { id, status, checkoutUrl } = await payment.createOrder(price)

        const order = new Order({
            id,
            status,
            mnk,
            days: parseInt(days, 10),
            fullPrice: price,
            price
        })
        order.save()

        resp.redirect(checkoutUrl)
    }

    @HandleErrors()
    static async event(req: Request, resp: Response): Promise<void> {
        const { event_type: event, resource } = req.body as IEventRequestBody

        const payment = new PaymentClient()

        if (event === EventType.OrderApproved) {
            // Update
            const response = await payment.captureOrder(resource.id)
            // Generate KEY
        } else {
            throw new NotFound('event not found')
        }

        resp.send()
    }
}
