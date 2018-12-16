import * as React from "react"
import { connect, DispatchProp } from "react-redux"
import Layout from "./Layout"
import Menu from "./Menu"
import Modal from "./Modal"
import { ModeType } from "../types"
import { IState } from "../types"

const initialState = {}

type State = Readonly<typeof initialState>

// Component props.
export interface IComponentProps {}

// Props from Redux store.
interface IStateProps {
  mode: string
  menu: {
    isVisible: boolean
  }
  modal: {
    isVisible: boolean
  }
}

interface IDispatchProps {}

type Props = IStateProps & IDispatchProps & IComponentProps & DispatchProp<any>

// class App extends React.Component<Props, State> {
class LayoutContainer extends React.Component<Props, State> {
  public readonly state: State = initialState

  constructor(props) {
    super(props)
    this.showModal = this.showModal.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChangeMode = this.handleChangeMode.bind(this)
  }

  public render() {
    return (
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
        {this.props.menu.isVisible ? (
          <Menu onChangeMode={this.handleChangeMode} />
        ) : null}
        {this.props.modal.isVisible ? (
          <Modal
            title="Code editor"
            onClose={this.handleClose}
            // content={Editor}
          />
        ) : null}
        {this.props.mode === "block" ? (
          <Layout />
        ) : (
          <div>{this.props.mode}</div>
        )}
      </div>
    )
  }

  private handleChangeMode(mode: ModeType) {
    console.log(`Setting workflow mode: ${mode}`)
    this.props.dispatch({
      type: "SET_MODE",
      mode
    })
  }

  private handleClose() {
    this.props.dispatch({
      type: "CLOSE_MODAL"
      // targetBlock: blockView
    })
    this.props.dispatch({
      type: "OPEN_MENU"
      // targetBlock: blockView
    })
  }

  // TODO: Turn this into a Redux action and allow the different modals' states
  // to be saved, and their initial state to be reset.
  private showModal = event => {
    this.props.dispatch({
      type: "OPEN_MODAL"
    })
    this.props.dispatch({
      type: "CLOSE_MENU"
    })
  }

  private handleClickWhitespace = event => {
    console.log("Clicked whitespace.")
  }

  private handleDragWhitespace = event => {
    console.log("Dragged whitespace.")
  }
}

// Map Redux state to component props.
const mapStateToProps = (
  state: IState,
  componentProps: IComponentProps
): IStateProps => ({
  mode: state.mode,
  menu: state.menu,
  modal: state.modal
})

export default connect<IStateProps, IDispatchProps, IComponentProps>(
  mapStateToProps
)(LayoutContainer)
