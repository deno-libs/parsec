import * as qs from 'https://deno.land/std@0.89.0/node/querystring.ts'
import { ServerRequest } from 'https://deno.land/std@0.89.0/http/server.ts'

export const bodyParser = async (req: ServerRequest) => {
  const buf = await Deno.readAll(req.body)

  const dec = new TextDecoder()

  const body = dec.decode(buf)

  return body
}

export interface ReqWithBody<T = Record<string, unknown>> extends ServerRequest {
  requestBody?: T
}

type NextFunction = (err?: unknown) => void

export const json = async <T = Record<string, unknown>>(req: ReqWithBody<T>, _?: unknown, next?: NextFunction) => {
  try {
    const body = JSON.parse(await bodyParser(req))
    req.requestBody = body
  } finally {
    next?.()
  }
}

export const urlencoded = async (
  req: ReqWithBody<Record<string, string | string[]>>,
  _: unknown,
  next?: NextFunction
) => {
  try {
    const body = qs.parse(await bodyParser(req))
    req.requestBody = body
  } finally {
    next?.()
  }
}
