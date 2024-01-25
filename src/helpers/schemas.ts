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

export const ethereumAddressSchema = requiredStringSchema.regex(
  /^0x[a-fA-F0-9]{40}$/,
  { message: 'Invalid address format' },
)

export const messageHashSchema = requiredStringSchema.regex(/^[0-9a-f]{64}$/, {
  message: 'Invalid hash format',
})

// --------------------------

export const newCCNSchema = z.object({
  name: requiredStringSchema,
  multiaddress: multiaddressSchema,
})

export const newCRNSchema = z.object({
  name: requiredStringSchema,
  address: urlSchema,
})

// --------------------------

export const imgFileSchema = z
  .custom<File>((val) => val instanceof File, 'Invalid file type')
  .refine(
    (file) => {
      return (
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/svg+xml'
      )
    },
    { message: 'only png, jpg, jpeg or svg formats are valid' },
  )
  .refine((file) => file.size > 0, {
    message: 'Image size size should be greater than 0',
  })

export const updateBaseNodeSchema = z.object({
  name: requiredStringSchema,
  hash: messageHashSchema,
  picture: optionalString(requiredStringSchema).or(imgFileSchema),
  banner: optionalString(requiredStringSchema).or(imgFileSchema),
  description: optionalString(requiredStringSchema),
  reward: optionalString(ethereumAddressSchema),
  manager: optionalString(ethereumAddressSchema),
  authorized: optionalString(requiredStringSchema).or(
    z.array(ethereumAddressSchema).optional(),
  ),
  locked: z.boolean().optional(),
  registration_url: optionalString(urlSchema),
})

export const updateCCNSchema = updateBaseNodeSchema.extend({
  multiaddress: optionalString(multiaddressSchema),
})

export const updateCRNSchema = updateBaseNodeSchema.extend({
  address: optionalString(urlSchema),
  stream_reward: optionalString(ethereumAddressSchema),
})
