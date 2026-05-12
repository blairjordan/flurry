import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { onError } from "@apollo/client/link/error"
import { WebSocketLink } from "@apollo/client/link/ws"
import { getMainDefinition } from "@apollo/client/utilities"
import { clearStoredApiKey, getStoredApiKey } from "./api-key"

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_HTTP_LINK,
})

const wsLink = new WebSocketLink({
  uri: import.meta.env.VITE_WS_LINK,
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: () => {
      const apiKey = getStoredApiKey()
      if (!apiKey) {
        return {}
      }

      return {
        authorization: `Bearer ${apiKey}`,
        "x-api-key": apiKey,
      }
    },
  },
})

const errorLink = onError(({ graphQLErrors }) => {
  if (!graphQLErrors) {
    return
  }

  for (const err of graphQLErrors) {
    const isPermissionDenied = err.message.includes("permission denied")
    const hasErrorCode = err.extensions?.errcode === "42501"

    if (isPermissionDenied || hasErrorCode) {
      console.error("Permission error detected.", err.message)
      clearStoredApiKey()
      window.dispatchEvent(new CustomEvent("flurry-auth-cleared"))
      break
    }
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    )
  },
  wsLink,
  httpLink
)

const authLink = setContext((_, { headers }) => {
  const apiKey = getStoredApiKey()
  if (!apiKey) {
    return { headers }
  }

  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${apiKey}`,
      "x-api-key": apiKey,
    },
  }
})

const client = new ApolloClient({
  link: from([errorLink, authLink.concat(splitLink)]),
  cache: new InMemoryCache(),
})

export default client
