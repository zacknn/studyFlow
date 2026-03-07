import z from "zod"
import { ZodToJsonSchemaConverter } from '@orpc/zod'
const schema = z.object({
  params: z.object({ id: z.string().cuid() }),
  body: z.object({ title: z.string() })
})
const converter = new ZodToJsonSchemaConverter()
async function run() {
  const res = await converter.convert(schema, { strategy: 'input' })
  console.log(JSON.stringify(res, null, 2))
}
run().catch(console.error)
