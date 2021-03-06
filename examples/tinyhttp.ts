import { App, Request } from 'https://deno.land/x/tinyhttp/mod.ts'
import { json, ReqWithBody } from '../mod.ts'

const app = new App<unknown, Request & ReqWithBody>()

app
  .use(json)
  .post((req, res) => {
    res.send(req.requestBody || {})
  })
  .listen(3000, () => console.log(`Started on :3000`))
