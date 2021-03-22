import { Router } from 'express'

import PaymentController from '@controllers/PaymentController'

const paymentRoute = Router()

paymentRoute.post('/create', PaymentController.create)

paymentRoute.post('/event', PaymentController.event)

paymentRoute.post('/capture', PaymentController.capture)

export default paymentRoute
