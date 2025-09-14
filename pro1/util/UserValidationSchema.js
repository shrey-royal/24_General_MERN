const zod = require('zod')

const userValidationSchema = zod.object({
    body: zod.object({
        name: zod.string().min(3).max(100),
        email: zod.email(),
        age: zod.number().int().min(18).max(100),
        status: zod.boolean().default(false)
    }).strict()
})

module.exports = userValidationSchema;