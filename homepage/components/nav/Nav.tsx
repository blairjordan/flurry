import Image from "next/image"
import Link from "next/link"

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.flurry.town"

export const Nav = () => {
  return (
    <nav className="relative z-10 w-full">
      <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/logo.png"
                alt="Flurry Logo"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <span className="text-2xl font-semibold tracking-widest text-white/90 transition-colors group-hover:text-white">
                flurry
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href={appUrl}
              className="rounded-full bg-white/10 px-8 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105"
            >
              Spectate
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
