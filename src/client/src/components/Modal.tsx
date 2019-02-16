import * as React from "react"
import { connect, DispatchProp } from "react-redux"
import { styles } from "./Modal.style"
import { IState } from "../types"

// Component props.
export interface IComponentProps {
  title: string
  // content: () => any // React.Component<any, any, any>
  onOpen?: (event?: any) => void
  onClose?: (event?: any) => void
}

// Props from Redux store.
interface IStateProps {
  isVisible: boolean
  view: any
}

interface IDispatchProps {}

type Props = IStateProps & IDispatchProps & IComponentProps & DispatchProp<any>

const initialState = {}

type State = Readonly<typeof initialState>

class Modal extends React.Component<Props, State> {
  public readonly state: State = initialState

  constructor(props: Props) {
    super(props)

    this.handleOnClick = this.handleOnClick.bind(this)
  }

  public render() {
    // console.log(JSON.stringify(this.props.layoutValue, null, 2))
    return (
      // <div style={styles} onClick={this.handleClickModeOption}>
      //   {this.props.label}
      // </div>
      // <div style={styles.overlay} onClick={this.handleOnClick}>
      //   <div style={styles.content}>foobar</div>
      // </div>
      <div> {this.props.isVisible ? this.renderModal(true) : undefined}</div>
    )
  }

  private handleOnClick(event) {
    event.stopPropagation()
    this.props.onClose()
  }

  // private hideModal() {
  //   this.setState({
  //     ...this.state,
  //     isVisible: false
  //   })
  // }

  private renderModal(showModal: boolean) {
    if (showModal) {
      return (
        <div style={styles.overlay} onClick={this.handleOnClick}>
          <div style={styles.container}>
            <div style={styles.content}>
              {/* <div style={styles.section}>{this.props.title}</div>
              <div style={styles.section}>
                optional subtitle descriptive text
              </div> */}
              <div style={styles.section}>{this.props.view}</div>
              {/* <div style={styles.section}>insert options here, optionally</div> */}
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  // private handleClickModeOption(event) {
  //   this.props.onClick(event)
  // }
}

// Map Redux state to component props.
const mapStateToProps = (
  state: IState,
  componentProps: IComponentProps
): IStateProps => ({
  isVisible: state.modal.isVisible,
  view: state.modal.view
})

export default connect<IStateProps, IDispatchProps, IComponentProps>(
  mapStateToProps
)(Modal)
