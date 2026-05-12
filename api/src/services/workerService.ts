import { run, Runner } from "graphile-worker"
import {
  sendAgentMessage,
  createAssistant,
  updateAgents,
  createStream,
  abandonInactiveDesks,
  sendEmail,
} from "../tasks"
import { OpenAIService } from "./openai"

export const workerService = ({
  connectionString,
  openAIService,
  cloudflare,
  resend,
  concurrency = 5,
  pollInterval = 1000,
}: {
  connectionString: string
  openAIService: OpenAIService
  cloudflare: {
    accountID: string
    apiKey: string
    urlOverride: string
  }
  resend: {
    resendApiKey: string
    notificationEmailSender: string
    notificationEmailRecipient: string
  }
  concurrency?: number
  pollInterval?: number
}) => {
  const taskList: Record<string, any> = {
    send_agent_message: sendAgentMessage({ openAIService }),
    create_assistant: createAssistant({ openAIService }),
    update_agents: updateAgents(),
    create_stream: createStream(cloudflare),
    abandon_inactive_desks: abandonInactiveDesks(),
  }

  if (
    resend.resendApiKey &&
    resend.notificationEmailSender &&
    resend.notificationEmailRecipient
  ) {
    taskList.send_email = sendEmail(resend)
  }

  return async () => {
    try {
      const runner: Runner = await run({
        connectionString,
        taskList,
        concurrency,
        pollInterval,
        crontab: `
          */1 * * * * update_agents
          0 * * * * abandon_inactive_desks
        `,
      })

      runner.events.on("job:success", ({ worker, job }) => {
        console.log(
          `Worker ${worker.workerId} successfully processed job ${job.id}`
        )
      })

      runner.events.on("job:failed", ({ worker, job, error }) => {
        console.error(
          `Worker ${worker.workerId} failed to process job ${job.id}`,
          error
        )
      })

      runner.events.on("job:error", ({ worker, job, error }) => {
        console.error(
          `Worker ${worker.workerId} encountered an error processing job ${job.id}`,
          error
        )
      })

      return runner
    } catch (error) {
      console.error("Error starting worker:", error)
      throw error
    }
  }
}
