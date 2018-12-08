import * as React from "react"
import { Provider } from "react-redux"
import Layout from "./components/Layout"
import Menu from "./components/Menu"
import Modal from "./components/Modal"
import { store } from "./store/store"

const initialState = {
  mode: "block",
  isModalVisible: false
}

type State = Readonly<typeof initialState>

class App extends React.Component<{}, State> {
  public readonly state: State = initialState

  constructor(props) {
    super(props)
    this.openModal = this.openModal.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
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
          <button onClick={this.openModal}>Open Modal</button>
          {this.state.isModalVisible ? (
            <Modal onClose={this.handleOnClick} />
          ) : null}
          <Layout />
        </div>
      </Provider>
    )
  }

  private handleOnClick() {
    // this.hideModal()
    this.setState({
      isModalVisible: false
    })
    // this.props.onClick()
  }

  private openModal = event => {
    this.setState({
      isModalVisible: true
    })
  }

  private handleClickWhitespace = event => {
    console.log("Clicked whitespace.")
  }

  private handleDragWhitespace = event => {
    console.log("Dragged whitespace.")
  }
}

export default App
