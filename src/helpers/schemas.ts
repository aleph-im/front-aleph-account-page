import { z } from 'zod'

export const requiredStringSchema = z
  .string()
  .trim()
  .min(1, { message: 'Required field' })

export function optionalString(schema: z.ZodString) {
  return schema.optional().or(z.literal(''))
}

export const optionalStringSchema = z.string().trim().optional()

export const newCCNSchema = z.object({
  name: requiredStringSchema,
  multiaddress: optionalString(requiredStringSchema),
})
