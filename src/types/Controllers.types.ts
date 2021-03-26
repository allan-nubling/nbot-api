/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
const HandleErrors = (): any => (target: any, key: string): any => {
    const method = target[key] as (req, res, next) => Promise<void> | void
    target[key] = (...args: any[]): void => {
        const next = args[2] as (e?: Error) => void
        const result = method.apply(this, args) as Promise<void> | void
        if (result && result instanceof Promise) {
            result.catch(next)
        }
    }
    return target[key]
}

export { HandleErrors }
