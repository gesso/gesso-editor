import * as React from "react"
import { Provider } from "react-redux"
import Layout from "./Layout"
import Menu from "./Menu"
import { store } from "./store/store"

class App extends React.Component<{}, {}> {
  constructor(props) {
    super(props)

    this.state = {
      mode: "block"
    }
  }

  public render() {
    return (
      <Provider store={store}>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            margin: 0
          }}
          onClick={this.handleClickWhitespace}
          onDrag={this.handleDragWhitespace}>
          <Menu />
          <Layout />
        </div>
      </Provider>
    )
  }

  private handleClickWhitespace = event => {
    console.log("Clicked whitespace.")
  }

  private handleDragWhitespace = event => {
    console.log("Dragged whitespace.")
  }
}

export default App
