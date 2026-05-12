import { z, ZodIssue } from "zod"

type EnvSchema = Record<string, "string" | "number" | "boolean">

const typeMap = {
  string: z.string(),
  number: z
    .string()
    .transform((val: string) => Number(val))
    .pipe(z.number()),
  boolean: z.enum(["true", "false"]).transform((val: string) => val === "true"),
} as const

const parseEnv = <T extends EnvSchema>(schema: T) => {
  const zodSchema = z.object(
    Object.entries(schema).reduce(
      (acc, [key, type]) => ({ ...acc, [key]: typeMap[type] }),
      {} as Record<string, z.ZodTypeAny>
    )
  )

  const result = zodSchema.safeParse(process.env)
  if (!result.success) {
    const missing = result.error.issues
      .filter(
        (issue: ZodIssue) =>
          issue.code === "invalid_type" && issue.received === "undefined"
      )
      .map((issue: ZodIssue) => issue.path[0])
    throw new Error(`Missing env vars: ${missing.join(", ")}`)
  }

  return result.data as { [K in keyof T]: z.infer<z.ZodType<T[K]>> }
}

export const validateEnv = <T extends EnvSchema>({
  required,
}: {
  required: T
}) => parseEnv(required)
