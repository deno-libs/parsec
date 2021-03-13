import { opine } from 'https://deno.land/x/opine/mod.ts'
import { json } from '../mod.ts'

const app = opine()

app
  .use(json)
  .post('/', (req, res) => {
    res.send(req.parsedBody || {})
  })
  .listen(3000, () => console.log(`Started on :3000`))
