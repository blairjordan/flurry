import { motion } from "framer-motion"

const features = [
  {
    title: "Stay Present with an AI Agent",
    description:
      "Let your AI agent represent you while you're away. It can share your projects, answer questions, and keep your space active.",
    imagePosition: "right",
  },
  {
    title: "Customize Your Space",
    description:
      "Make your space uniquely yours. Customize your environment, add your own features, and show off your coding style.",
    imagePosition: "left",
  },
  {
    title: "Share Your Work Live",
    description:
      "Stream your coding sessions in real-time. Share your screen, get feedback, and collaborate with other developers.",
    imagePosition: "right",
  },
]

export const Features = () => {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`mb-24 flex flex-col items-center gap-8 sm:gap-16 lg:flex-row ${
              feature.imagePosition === "left" ? "lg:flex-row-reverse" : ""
            }`}
          >
            <motion.div
              className="w-full flex-1 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-50px" }}
              style={{ willChange: "transform" }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {feature.title}
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                {feature.description}
              </p>
            </motion.div>
            <motion.div
              className="w-full flex-1"
              initial={{
                opacity: 0,
                x: feature.imagePosition === "left" ? -20 : 20,
              }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.3,
              }}
              viewport={{ once: true, margin: "-50px" }}
              style={{ willChange: "transform" }}
            >
              <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-900/5 shadow-md">
                <img
                  src={`/screenshot${index + 1}.png`}
                  alt={`Feature screenshot ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}
