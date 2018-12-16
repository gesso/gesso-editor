import * as React from "react"
import * as ReactDOM from "react-dom"
import Application from "./components/Application"
import { Provider } from "react-redux"
import { store } from "./store"
import "./index.css"
import registerServiceWorker from "./registerServiceWorker"

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById("root") as HTMLElement
)
registerServiceWorker()
