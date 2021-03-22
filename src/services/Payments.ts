import axios, { AxiosInstance } from 'axios'
import { IOrderCaptureResponse, IOrderCreateResponse } from 'types/Payments.types'

const { CLIENT_ENV, CLIENT_ID, CLIENT_SECRET } = process.env

export class Payments {
    private apiUrl = CLIENT_ENV === 'live' ? 'https://api.paypal.com' : 'https://api.sandbox.paypal.com'

    private webUrl = CLIENT_ENV === 'live' ? 'https://www.paypal.com' : 'https://www.sandbox.paypal.com'

    private authExpiration = 0

    private client: AxiosInstance

    async checkAuth(): Promise<void> {
        if (this.authExpiration < Date.now()) {
            const params = new URLSearchParams({ grant_type: 'client_credentials' })
            await axios
                .post(`${this.apiUrl}/v1/oauth2/token/`, params.toString(), {
                    method: 'POST',
                    auth: {
                        username: CLIENT_ID,
                        password: CLIENT_SECRET
                    },
                    headers: { 'content-type': 'application/x-www-form-urlencoded' }
                })
                .then(({ data }) => {
                    this.authExpiration = data.expires_in + Date.now()

                    this.client = axios.create({
                        baseURL: this.apiUrl,
                        headers: { Authorization: `Bearer ${data.access_token}`, 'Content-Type': 'application/json' }
                    })
                })
        }
    }

    async createOrder(price: number): Promise<IOrderCreateResponse> {
        await this.checkAuth()
        return this.client
            .post('/v2/checkout/orders', {
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        amount: {
                            currency_code: 'BRL',
                            value: `${price}`
                        }
                    }
                ]
            })
            .then(({ data }) => {
                const { id, status, links } = data
                const checkoutUrl = links.filter(({ rel }) => rel === 'approve').href
                return { id, status, checkoutUrl }
            })
    }

    async captureOrder(orderId: string): Promise<IOrderCaptureResponse> {
        await this.checkAuth()
        return this.client.post(`/v2/checkout/orders/${orderId}/capture`).then(({ data }) => ({
            trasactionId: data.id,
            capture: {
                grossAmount: parseFloat(
                    data.purchase_units[0].payments.captures.seller_receivable_breakdown.gross_amount
                ),
                paypalFee: parseFloat(data.purchase_units[0].payments.captures.seller_receivable_breakdown.paypal_fee),
                netAmount: parseFloat(data.purchase_units[0].payments.captures.seller_receivable_breakdown.net_amount)
            },
            payer: {
                name: data.payer.name.given_name + data.payer.name.surname,
                email: data.payer.email_address
            }
        }))
    }
}
