import { motion } from "framer-motion"
import { FaCode, FaEthereum } from "react-icons/fa"
import { MdMonitor, MdPets } from "react-icons/md"
import { SiGraphql } from "react-icons/si"

const features = [
  {
    title: "VS Code & Cursor Integration",
    description:
      "Share your status and projects directly from your favorite editors",
    icon: FaCode,
  },
  {
    title: "Train Virtual Pets",
    description:
      "Level up your coding companion as you write code. They grow with your productivity!",
    icon: MdPets,
  },
  {
    title: "Full GraphQL API",
    description:
      "Build your own integrations, bring your own AI agents, or create custom features with our complete API",
    icon: SiGraphql,
  },
  {
    title: "Web3 Ready",
    description: "Support developers and projects with MetaMask integration",
    icon: FaEthereum,
  },
  {
    title: "Live Streaming",
    description: "Share your screen and collaborate in real-time",
    icon: MdMonitor,
  },
]

export const FeatureGrid = () => {
  return (
    <div className="relative overflow-hidden bg-[linear-gradient(165deg,#4e0d52_0%,#4e0d52_60%,#ff2572_100%)] py-24 sm:py-32">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-grid [mask-image:radial-gradient(white,transparent_85%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built for Developers, Hackable by Design
          </h2>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true, margin: "-50px" }}
                style={{ willChange: "transform" }}
              >
                <div className="relative flex-none">
                  <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm" />
                  <div className="relative flex h-14 w-14 items-center justify-center">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div className="flex-auto">
                  <dt className="text-lg font-semibold leading-7 text-white">
                    {feature.title}
                  </dt>
                  <dd className="mt-1 text-base leading-7 text-gray-300">
                    {feature.description}
                  </dd>
                </div>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
