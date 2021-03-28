import { Router } from 'express'

import PaymentController from '@controllers/Payment.controller'

const paymentRoute = Router()

paymentRoute.get('/create', PaymentController.create)

paymentRoute.post('/event', PaymentController.event)

// paymentRoute.post('/capture', PaymentController.capture)

export default paymentRoute
