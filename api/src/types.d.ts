import { Request } from "express"

export interface PgRequest extends Request {
  normalizedConnectionParams?: Record<string, unknown>
}
