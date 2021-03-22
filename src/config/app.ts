import { urlencoded, json } from 'body-parser'
import cors from 'cors'
import express from 'express'

import handleErrors from '@middlewares/handleErrors'

import routes from '../routes'

const app = express()

app.use(cors())
app.use(urlencoded({ extended: false }))
app.use(json())
app.use(routes)
app.use(handleErrors)

export default app
