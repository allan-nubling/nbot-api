import app from '@config/app'

const { PORT, NODE_ENV } = process.env

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`⚡️[server]: Server is running ${NODE_ENV === 'development' && `on http://127.0.0.1:${PORT}`}`)
})
