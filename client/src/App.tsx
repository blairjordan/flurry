import { ApolloProvider } from "@apollo/client"
import { Provider as ReduxProvider } from "react-redux"
import client from "./lib/apollo-client"
import store from "./redux/store"
import MainApp from "./MainApp"

function App() {
  return (
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        <div id="app" className="relative min-h-screen">
          <MainApp />
        </div>
      </ReduxProvider>
    </ApolloProvider>
  )
}

export default App
