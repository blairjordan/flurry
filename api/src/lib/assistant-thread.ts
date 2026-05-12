import OpenAI from "openai"

const EXPIRY_DURATION_MS = 30 * 60 * 1000
const POLL_EXPIRED_THREADS_INTERVAL_MS = 5_000

type ThreadWrapper = {
  assistantId: string
  thread: OpenAI.Beta.Threads.Thread
  createdAt: Date
}

export class AssistantThreadManager {
  private openai: OpenAI
  private threadMap: Map<string, ThreadWrapper> = new Map()

  constructor({ openai }: { openai: OpenAI }) {
    this.openai = openai
    this.pollExpiredThreads()
  }

  private createOrFetchThread = async ({
    threadKey,
    assistantId,
  }: {
    threadKey: string
    assistantId: string
  }): Promise<OpenAI.Beta.Threads.Thread> => {
    let thread: OpenAI.Beta.Threads.Thread

    const threadMapFound = this.threadMap.get(threadKey)

    if (!threadMapFound) {
      thread = await this.openai.beta.threads.create()

      this.threadMap.set(threadKey, {
        thread,
        createdAt: new Date(),
        assistantId,
      })
    } else {
      thread = threadMapFound.thread
    }

    return thread
  }

  private removeExpiredThreads = () => {
    const now = new Date()

    for (const [threadKey, threadWrapper] of this.threadMap.entries()) {
      if (
        now.getTime() - threadWrapper.createdAt.getTime() >
        EXPIRY_DURATION_MS
      ) {
        console.info(`Removing expired thread: ${threadKey}`)
        this.threadMap.delete(threadKey)
      }
    }
  }

  private pollExpiredThreads = () => {
    setInterval(this.removeExpiredThreads, POLL_EXPIRED_THREADS_INTERVAL_MS)
  }

  runThread = async ({
    assistantId,
    fromPlayerId,
    toPlayerId,
    message,
    callback,
  }: {
    assistantId: string
    fromPlayerId: string
    toPlayerId: string
    message: string
    callback: ({ response }: { response: string }) => void
  }) => {
    const thread = await this.createOrFetchThread({
      threadKey: `${fromPlayerId}-${toPlayerId}`,
      assistantId,
    })

    await this.openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message,
    })

    let response = ""

    const stream = this.openai.beta.threads.runs.stream(thread.id, {
      assistant_id: assistantId,
    })

    for await (const chunk of stream) {
      if (chunk.event === "thread.run.failed") {
        console.error(chunk.data)
        break
      } else if (chunk.event === "thread.message.delta") {
        if (chunk.data.delta.content) {
          response += chunk.data.delta.content
            .filter((c) => c.type === "text")
            .map((c) => c.text?.value)
            .join("")
        }
      }
    }

    callback({
      response,
    })
  }
}
