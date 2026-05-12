import Head from "next/head"
import ReactMarkdown from "react-markdown"
import { Footer } from "../components/footer/Footer"
import { Nav } from "../components/nav/Nav"

const termsOfServiceContent = `
**Effective Date:** February 22, 2025

Welcome to Flurry, a multiplayer workspace for developers. These Terms of Service ("Terms") govern your access to and use of Flurry, including any associated services, applications, and websites. By using Flurry, you agree to be bound by these Terms.

---

## 1. Acceptance of Terms
By creating an account and accessing Flurry, you acknowledge that you have read, understood, and agree to be bound by these Terms, including our [Privacy Policy](https://flurry.town/privacy). If you do not agree with these Terms, you must not use Flurry.

---

## 2. User Accounts

### 2.1 Account Creation
- To use Flurry, you need a valid API key associated with your player account.
- You are responsible for maintaining the confidentiality of your API key and for all activities that occur under your account.

### 2.2 Account Termination
Flurry reserves the right to suspend or terminate accounts under the following conditions:
- **Violation of Terms:** If a user engages in prohibited activities, including hacking, spam, or offensive behavior.  
- **Inactivity:** Accounts may be terminated after extended periods of inactivity.  
- **User Request:** You may delete your account at any time by contacting [support@flurry.town](mailto:support@flurry.town).

---

## 3. Use of Services

### 3.1 Permitted Uses
Flurry is designed for developers to collaborate, share workspaces, and build integrations. Users are allowed to:
- Build services on top of Flurry using our API.
- Integrate third-party applications into their Flurry workspace.

### 3.2 Prohibited Activities
Users must not engage in the following activities:
- **Hacking:** Unauthorized access, modification, or disruption of Flurry's systems.  
- **Spam:** Sending unsolicited messages or content.  
- **Offensive Behavior:** Posting or sharing content that is abusive, hateful, or illegal.

Violations of these rules may result in immediate account suspension or termination upon review.

---

## 4. Intellectual Property

### 4.1 Flurry Assets
All in-game assets, including player customizations, virtual environments, and platform visuals, are the exclusive property of Flurry. Users may not extract, modify, or use these assets in external products or services.

### 4.2 User-Generated Content
Users retain ownership of any content they create within the platform, such as code, text, and other shared materials. However, Flurry may use user customizations for platform improvements or promotional purposes without compensation.

---

## 5. Data and Privacy

### 5.1 Data Storage
Flurry does not guarantee the retention of user data. We may delete content, workspaces, or accounts at any time without prior notice. Users are solely responsible for backing up any important data.

### 5.2 Privacy
User data is handled according to our [Privacy Policy](https://flurry.town/privacy). By using Flurry, you consent to the collection and processing of your data as outlined therein.

---

## 6. Disclaimers and Liability

### 6.1 Service Availability
Flurry is provided on an **"as-is"** and **"as-available"** basis. We do not guarantee uninterrupted access, and outages may occur without notice.

### 6.2 Limitation of Liability
To the maximum extent permitted by law:
- Flurry is not liable for **data loss**, service interruptions, or any damages arising from the use or inability to use the platform.  
- Users are solely responsible for their conduct and the consequences of their activities on Flurry.  

---

## 7. Account Deletion and Termination

Users may request account deletion by emailing [support@flurry.town](mailto:support@flurry.town). Upon termination, all associated data, including workspaces and communications, will be permanently removed.

---

## 8. Modifications to Terms

Flurry reserves the right to update these Terms at any time. Significant changes will be communicated through the platform or by email. Continued use of Flurry after such changes constitutes acceptance of the revised Terms.

---

## 9. Contact Information

For questions or concerns about these Terms, please contact:

**Flurry Support**  
📧 Email: [support@flurry.town](mailto:support@flurry.town)  
🌐 Website: [https://flurry.town](https://flurry.town)

---

By using Flurry, you acknowledge that you have read, understood, and agreed to these Terms of Service.
`

export default function TermsOfService() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>Terms of Service - Flurry</title>
      </Head>
      <main className="min-h-screen">
        <div className="relative bg-gradient-to-br from-[#4e0d52] via-[#4e0d52] to-[#ff2572]">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-grid [mask-image:radial-gradient(white,transparent_85%)]" />
          <Nav />
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Terms of Service
            </h1>
          </div>
        </div>
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
            <article className="prose prose-lg max-w-none">
              <ReactMarkdown>{termsOfServiceContent}</ReactMarkdown>
            </article>
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}
