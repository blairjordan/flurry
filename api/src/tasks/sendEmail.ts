import { Resend } from "resend"

export const sendEmail = ({
  resendApiKey,
  notificationEmailSender,
  notificationEmailRecipient,
}: {
  resendApiKey: string
  notificationEmailSender: string
  notificationEmailRecipient: string
}) => {
  const resend = new Resend(resendApiKey)

  return async (payload: unknown) => {
    if (
      !payload ||
      typeof payload !== "object" ||
      !("subject" in payload) ||
      !("content" in payload)
    ) {
      throw new Error("Invalid email payload structure")
    }

    const { subject, content } = payload as {
      subject: string
      content: string
    }

    try {
      const createEmailResponse = await resend.emails.send({
        from: notificationEmailSender,
        to: notificationEmailRecipient,
        subject,
        text: content,
      })

      if (createEmailResponse.error === null) {
        console.info("Email notification sent successfully")
      } else {
        throw new Error(createEmailResponse.error.message)
      }
    } catch (error) {
      console.error("Error sending email notification:", error)
      throw error
    }
  }
}
