import Image from "next/image"
import Link from "next/link"

export const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8">
          {/* Left side - Logo, Copyright and Legal Links */}
          <div className="flex flex-col gap-6">
            <Image
              src="/logo.png"
              alt="Flurry Logo"
              width={48}
              height={48}
              className="h-12 w-12"
            />
            <div className="flex flex-col gap-4">
              <p className="text-sm leading-5 text-gray-500">
                &copy; {new Date().getFullYear()} Flurry. All rights reserved.
              </p>
              <div className="flex flex-col gap-2">
                <Link
                  href="/privacy"
                  className="text-sm leading-5 text-gray-500 hover:text-gray-900"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms-of-service"
                  className="text-sm leading-5 text-gray-500 hover:text-gray-900"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>

          {/* Right side - Product Links */}
          <div className="flex flex-col items-start md:items-end gap-6 md:gap-4">
            <div className="flex flex-col items-start md:items-end gap-2">
              <Link
                href="https://marketplace.visualstudio.com/items?itemName=Pegleg.hive-status"
                className="text-sm leading-5 text-gray-500 hover:text-gray-900"
              >
                Status Plugin
              </Link>
              <Link
                href="https://marketplace.visualstudio.com/items?itemName=Pegleg.codachi"
                className="text-sm leading-5 text-gray-500 hover:text-gray-900"
              >
                Pet Plugin
              </Link>
              <Link
                href="http://api.flurry.town/graphiql"
                className="text-sm leading-5 text-gray-500 hover:text-gray-900"
              >
                GraphQL API
              </Link>
              <Link
                href="https://metamask.io/"
                className="text-sm leading-5 text-gray-500 hover:text-gray-900"
              >
                MetaMask
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
