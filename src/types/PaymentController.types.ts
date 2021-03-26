/* eslint-disable camelcase */
// eslint-disable-next-line no-shadow
export enum EventType {
    OrderApproved = 'CHECKOUT.ORDER.APPROVED'
}

export interface IEventRequestBody {
    id: string
    event_version: string
    create_time: string
    resource_type: string
    resource_version: string
    event_type: string
    summary: string
    resource: {
        create_time: string
        id: string
        intent: string
        payer: {
            email_address: string
            payer_id: string
        }
        status: string
    }
    links: [
        {
            href: string
            rel: string
            method: string
        }
    ]
}
