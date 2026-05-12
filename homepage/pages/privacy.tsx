import Head from "next/head"
import ReactMarkdown from "react-markdown"
import { Footer } from "../components/footer/Footer"
import { Nav } from "../components/nav/Nav"

const privacyPolicyContent = `
**Effective Date:** February 22, 2025

At Flurry, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect your data when you use Flurry, a multiplayer workspace for developers. By accessing or using Flurry, you agree to the terms outlined in this Privacy Policy.

## 1. Information We Collect

We collect the following types of information to provide and improve our services:

### 1.1 Authentication Information
- **API Key:** Used only to authenticate requests to your player account.

### 1.2 Profile Information
- **User-Provided:** Username, role, company, and profile text for personalization.
- **Metamask (Optional):** Public wallet address if users choose to integrate Web3 features.
- **Status Data:** Ephemeral status updates from the [VS Code Hive Status Plugin](https://marketplace.visualstudio.com/items?itemName=Pegleg.hive-status).

### 1.3 Communication and Chat
- **Direct Messages (DMs):** Stored for user retrieval.
- **Public Chats:** Stored and streamed publicly for subscribers.

### 1.4 Analytics and Cookies
- We collect only **basic, non-personal analytics** on our landing page to understand user interaction.
- We do not use Google Analytics or any other trackers within the Flurry application itself.
- We do not require third-party authentication cookies.

## 2. How We Use Your Information

We use the information collected for the following purposes:

- **Account Management:** To create and manage user profiles.
- **AI Assistance:** To power automated agents by providing user profile context and customizations.
- **Collaboration:** To facilitate real-time communication and workspace sharing.
- **Quality Assurance:** To improve services through video recordings, which are automatically deleted after 30 days.

We do not use your personal data for advertising or profiling.

## 3. Legal Basis for Data Processing

Under the General Data Protection Regulation (GDPR), we rely on the following legal bases for processing personal data:

- **Contractual Necessity:** To provide and maintain the Flurry platform.
- **Legitimate Interests:** To ensure service quality, account security, and user support.
- **Consent:** For any optional features or marketing communications (currently none).

## 4. How We Store and Protect Your Information

We implement strict security measures to protect your data:

- **Identity and Authentication:** User identity is managed via API keys. We do not store passwords.
- **Data Storage:** Non-sensitive user data is stored in a PostgreSQL database.
- **Video Streams:** Managed by Cloudflare, with automatic deletion after 30 days.
- **Server Location:** All Flurry servers operate in Singapore.
- **Encryption:** All data is encrypted in transit via HTTPS.

We do not collect IP addresses, location data, or device/browser information.

## 5. Data Sharing with Third Parties

We only share data with third parties for essential services:

- **Infrastructure:** Cloud hosting providers for application and data services.
- **AI Services:** OpenAI for automated assistants, using user profile and workspace context.
- **Web3:** MetaMask for wallet integration (if enabled by the user).

We do not sell, rent, or share personal data for advertising purposes.

## 6. International Data Transfers

Flurry operates servers in Singapore. When users access our services from the European Economic Area (EEA), personal data may be transferred outside the EEA. We ensure appropriate safeguards for these transfers, including:

- **Standard Contractual Clauses (SCCs):** We rely on SCCs with cloud providers where required to protect cross-border data transfers.
- **Data Minimization:** Only necessary information is transferred.

By using Flurry, you acknowledge and consent to the transfer of your personal data outside your country of residence, including to Singapore.

## 7. User Rights under GDPR and CCPA

If you are located in the European Economic Area (EEA) or California, you have the following rights regarding your personal data:

- **Access:** Request a copy of the personal data we hold about you.
- **Rectification:** Correct inaccurate or incomplete information.
- **Erasure:** Request deletion of your account and associated data.
- **Data Portability:** Obtain a copy of your data in a commonly used format.
- **Objection:** Object to processing based on legitimate interests.
- **Withdraw Consent:** Withdraw consent for optional features at any time.

To exercise these rights, please contact us at [support@flurry.town](mailto:support@flurry.town).

## 8. Data Retention

We retain user data for as long as the account remains active. Dormant accounts are not automatically deleted unless a user requests removal.

Specific retention periods include:
- **Profile Data:** Stored until account deletion.
- **Chat History:** Retained until account deletion.
- **Video Recordings:** Automatically deleted after 30 days.

## 9. Right to Lodge a Complaint (GDPR Compliance)

If you are an EU resident and believe we are processing your data unlawfully, you have the right to lodge a complaint with your local **Data Protection Authority (DPA)**.

## 10. Children's Privacy

Flurry is not intended for children under the age of 13. We do not knowingly collect personal information from children. If we become aware of such collection, we will promptly delete the data.

## 11. Changes to This Privacy Policy

We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify users of significant updates through the Flurry platform or by email.

The **effective date** at the top of this page reflects the latest version.

## 12. Contact Us

For privacy-related questions, data requests, or concerns, please contact:

- **Email:** [support@flurry.town](mailto:support@flurry.town)
- **Website:** [https://flurry.town](https://flurry.town)

This Privacy Policy is designed to comply with applicable privacy laws, including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA). By using Flurry, you agree to the terms outlined above.
`

export default function Privacy() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>Privacy Policy - Flurry</title>
      </Head>
      <main className="min-h-screen">
        <div className="relative bg-gradient-to-br from-[#4e0d52] via-[#4e0d52] to-[#ff2572]">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-grid [mask-image:radial-gradient(white,transparent_85%)]" />
          <Nav />
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Privacy Policy
            </h1>
          </div>
        </div>
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
            <article className="prose prose-lg max-w-none">
              <ReactMarkdown>{privacyPolicyContent}</ReactMarkdown>
            </article>
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}
