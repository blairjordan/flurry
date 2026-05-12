import { Navbar, NavbarBrand } from "@heroui/react"
import type { ReactNode } from "react"

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar isBordered>
        <NavbarBrand>speaksee</NavbarBrand>
      </Navbar>
      <main className="container mx-auto px-4 py-8 max-w-7xl">{children}</main>
    </div>
  )
}
