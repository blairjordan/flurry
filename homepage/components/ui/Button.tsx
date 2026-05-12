import { Button as HeroButton, extendVariants } from "@heroui/react"

export const Button = extendVariants(HeroButton, {
  variants: {
    // Override the default color variant
    color: {
      primary: "bg-primary text-white",
      default: "bg-default-100 text-default-700",
    },
  },
  defaultVariants: {
    radius: "sm", // This will use our custom 0.5rem radius
    color: "primary",
  },
})
