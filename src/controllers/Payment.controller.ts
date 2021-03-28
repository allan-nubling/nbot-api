import { Request, Response } from 'express'
import { EntityNotFoundError, getRepository } from 'typeorm'
import { HandleErrors } from 'types/Controllers.types'
import { EventType, IEventRequestBody } from 'types/PaymentController.types'

import Character from '@models/Character'
import Order from '@models/Order'
import { PaymentClient } from '@services/PaymentClient'
import { BadRequest, NotFound } from '@utils/errors'

export default class PaymentController {
    @HandleErrors()
    static async create(req: Request, resp: Response): Promise<void> {
        const { mnk, days } = req.query as Record<string, string>

        await getRepository(Character)
            .findOneOrFail({ where: { mnk } })
            .catch(err => {
                if (err instanceof EntityNotFoundError) {
                    throw new BadRequest('character not found')
                }
                throw err
            })

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
        await order.save()

        resp.redirect(checkoutUrl)
    }

    @HandleErrors()
    static async event(req: Request, resp: Response): Promise<void> {
        const { event_type: event, resource } = req.body as IEventRequestBody

        const payment = new PaymentClient()

        if (event === EventType.OrderApproved) {
            const response = await payment.captureOrder(resource.id)

            const order = await getRepository(Order).findOne({ where: { id: resource.id } })
            order.transactionId = response.trasactionId
            order.capturedPrice = response.capture.netAmount
            order.payerName = response.payer.name
            order.payerEmail = response.payer.email
            await order.save()

            const character = await getRepository(Character).findOne({ where: { mnk: order.mnk } })
            const expDate = character.expirationDate
            character.expirationDate = new Date(expDate.setDate(expDate.getDate() + order.days))
            await character.save()
        } else {
            throw new NotFound('event not found')
        }

        resp.send()
    }
}
