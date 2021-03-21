import dotenv from 'dotenv'

import app from '@config/app'

dotenv.config()

const { PORT, NODE_ENV } = process.env

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`⚡️[server]: Server is running on ${NODE_ENV === 'development' ? `http://127.0.0.1:${PORT}` : PORT}`)
})
