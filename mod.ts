import * as qs from 'https://deno.land/std@0.111.0/node/querystring.ts'

/**
 * Request interface extension with additional `parsedBody` property (where parsed body gets stored)
 */
export interface ReqWithBody<T = Record<string, unknown>> extends Request {
  parsedBody?: T
}

const dec = new TextDecoder()

/**
 * Universal body parser function
 * @param fn request body formatter
 */
export const bodyParser =
  <T>(fn: (body: string) => T) =>
  async (req: ReqWithBody<T>) => {
    const body = await req.text()

    req.parsedBody = fn(body)

    return req.parsedBody
  }

type NextFunction = (err?: Error) => void

/**
 * Parse a request with JSON body and `Content-Type`: `application/json` header.
 * @param req Server request
 * @param _
 * @param next
 */
export const json = async <T = Record<string, unknown>>(req: ReqWithBody<T>, _?: unknown, next?: NextFunction) => {
  if (req.headers.get('content-type') === 'application/json') {
    try {
      await bodyParser((x) => JSON.parse(x.toString()))(req)
    } catch (e) {
      next?.(e)
    } finally {
      next?.()
    }
  } else next?.()
}

/**
 * Parse a form with the body and `Content-Type`: `application/x-www-urlencoded` header.
 * @param req Server request
 * @param _
 * @param next
 */
export const urlencoded = async (
  req: ReqWithBody<Record<string, string | string[]>>,
  _?: unknown,
  next?: NextFunction
) => {
  if (req.headers.get('content-type') === 'application/x-www-form-urlencoded') {
    try {
      await bodyParser((x) => qs.parse(x.toString()))(req)
    } catch (e) {
      next?.(e)
    } finally {
      next?.()
    }
  } else next?.()
}
