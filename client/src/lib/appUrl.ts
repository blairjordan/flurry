const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "")

export const getAppBaseUrl = () => {
  const configuredBaseUrl = import.meta.env.VITE_APP_BASE_URL?.trim()

  if (configuredBaseUrl) {
    return trimTrailingSlash(configuredBaseUrl)
  }

  return trimTrailingSlash(window.location.origin)
}

export const toAbsoluteAppUrl = (path: string) => {
  return new URL(path, `${getAppBaseUrl()}/`).toString()
}

export const getTransactionRequestUrl = (transactionRequestId: string | number) =>
  toAbsoluteAppUrl(`/transactions/${transactionRequestId}`)
