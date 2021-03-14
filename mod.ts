import * as qs from 'https://deno.land/std@0.89.0/node/querystring.ts'
import { ServerRequest } from 'https://deno.land/std@0.89.0/http/server.ts'

type Req = Pick<ServerRequest, 'body' | 'headers'>

export interface ReqWithBody<T = Record<string, unknown>> extends Req {
  parsedBody?: T
}

const dec = new TextDecoder()

export const bodyParser = <T>(fn: (body: string) => T) => async (req: ReqWithBody<T>) => {
  const buf = await Deno.readAll(req.body)

  const body = dec.decode(buf)

  req.parsedBody = fn(body)

  return req.parsedBody
}

type NextFunction = (err?: Error) => void

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
