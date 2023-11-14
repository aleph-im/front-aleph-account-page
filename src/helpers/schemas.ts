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

export const newCCNSchema = z.object({
  name: requiredStringSchema,
  multiaddress: optionalString(requiredStringSchema),
})

export const newCRNSchema = z.object({
  name: requiredStringSchema,
  address: urlSchema,
})
