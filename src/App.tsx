import * as React from "react"
import { Provider } from "react-redux"
import Layout from "./Layout"
import { store } from "./store/store"

const optionStyle = {
  color: "#a8a8a8",
  padding: "10px"
}

type BlockType = "block"

type TaskType = "task"

type ModeType = BlockType | TaskType

interface IState {
  mode: ModeType
}

class App extends React.Component<{}, IState> {
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
          <div
            style={{
              display: "flex",
              height: "50px",
              justifyContent: "center",
              marginRight: "50px",
              marginTop: "50px",
              minHeight: "50px"
            }}>
            <div
              style={optionStyle}
              onClick={this.handleClickModeOption("code")}>
              code
            </div>
            <div style={optionStyle}>&rarr;</div>
            <div
              style={optionStyle}
              onClick={this.handleClickModeOption("block")}>
              <strong>block</strong>
            </div>
            <div style={optionStyle}>&rarr;</div>
            <div
              style={optionStyle}
              onClick={this.handleClickModeOption("task")}>
              task
            </div>
            <div style={optionStyle}>&rarr;</div>
            <div
              style={optionStyle}
              onClick={this.handleClickModeOption("plan")}>
              plan
            </div>
            <div style={optionStyle}>&rarr;</div>
            <div
              style={optionStyle}
              onClick={this.handleClickModeOption("deploy")}>
              deploy
            </div>
          </div>
          <Layout />
        </div>
      </Provider>
    )
  }

  private handleClickModeOption = mode => {
    return event => {
      this.setMode(mode)
    }
  }

  private handleClickWhitespace = event => {
    console.log("Clicked whitespace.")
  }

  private handleDragWhitespace = event => {
    console.log("Dragged whitespace.")
  }

  private setMode = (mode: ModeType) => {
    this.setState({
      mode
    })
  }
}

export default App
