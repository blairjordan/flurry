import OpenAI from "openai"
import { AssistantThreadManager } from "../lib/assistant-thread"

export class OpenAIService {
  openai: OpenAI
  threadManager: AssistantThreadManager

  constructor({ openapiApiKey }: { openapiApiKey: string }) {
    this.openai = new OpenAI({ apiKey: openapiApiKey })
    this.threadManager = new AssistantThreadManager({
      openai: this.openai,
    })
  }
}
