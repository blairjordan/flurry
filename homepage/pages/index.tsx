import Head from "next/head"
import { FeatureGrid } from "../components/features/FeatureGrid"
import { Features } from "../components/features/Features"
import { Footer } from "../components/footer/Footer"
import { Hero } from "../components/hero/Hero"
import { Nav } from "../components/nav/Nav"

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>Flurry</title>
      </Head>
      <main className="min-h-screen">
        <div className="relative bg-gradient-to-br from-[#4e0d52] via-[#4e0d52] to-[#ff2572]">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-grid [mask-image:radial-gradient(white,transparent_85%)]" />
          <Nav />
          <Hero />
        </div>
        <Features />
        <FeatureGrid />
        <Footer />
      </main>
    </>
  )
}
