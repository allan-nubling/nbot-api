import { Router } from 'express'

import AppController from '@controllers/App.controller'
import protectedRoute from '@middlewares/protectedRoute'

const appRoute = Router()

appRoute.get('/auth', protectedRoute, AppController.auth)

// appRoute.post('/event', PaymentController.event)

// appRoute.post('/capture', PaymentController.capture)

export default appRoute
