import * as React from "react"
import { connect, DispatchProp } from "react-redux"
import { styles } from "./Modal.style"

// Component props.
export interface IComponentProps {
  // label: string
  // onClick?: (event?: any) => void
  onClose?: (event?: any) => void
}

// Props from Redux store.
interface IStateProps {
  hack?: void
  isVisible: boolean
}

interface IDispatchProps {
  hack?: void
}

type Props = IStateProps & IDispatchProps & IComponentProps & DispatchProp<any>

const initialState = {
  isVisible: true
}

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
      <div> {this.state.isVisible ? this.renderModal(true) : undefined}</div>
    )
  }

  private handleOnClick(event) {
    // this.hideModal()
    // this.setState({
    //   isVisible: false
    // })
    event.stopPropagation()
    this.props.onClose()
  }

  private hideModal() {
    this.setState({
      ...this.state,
      isVisible: false
    })
  }

  private renderModal(showModal: boolean) {
    if (showModal) {
      return (
        <div style={styles.overlay} onClick={this.handleOnClick}>
          <div style={styles.content}>foobar</div>
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
  state: State,
  componentProps: IComponentProps
): IStateProps => ({
  ...state
  // layoutValue: state.layout
  // hack: null
})

export default connect<IStateProps, IDispatchProps, IComponentProps>(
  mapStateToProps
)(Modal)
