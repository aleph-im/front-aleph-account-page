import { z } from 'zod'

export const requiredStringSchema = z
  .string()
  .trim()
  .min(1, { message: 'Required field' })

export function optionalString(schema: z.ZodString) {
  return schema.optional().or(z.literal(''))
}

export const optionalStringSchema = z.string().trim().optional()

export const urlSchema = requiredStringSchema.regex(
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
  { message: 'Invalid url format' },
)

export const multiaddressSchema = requiredStringSchema.regex(
  /^\/ip4\/(?:[0-9]{1,3}\.){3}[0-9]{1,3}\/tcp\/[0-9]{1,4}\/p2p\/Qm[1-9A-HJ-NP-Za-km-z]{44}$/,
  { message: 'Invalid multiaddress format' },
)

export const newCCNSchema = z.object({
  name: requiredStringSchema,
  multiaddress: optionalString(multiaddressSchema),
})

export const newCRNSchema = z.object({
  name: requiredStringSchema,
  address: urlSchema,
})
