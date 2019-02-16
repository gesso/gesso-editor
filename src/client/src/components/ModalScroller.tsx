import * as React from "react"
import { connect, DispatchProp } from "react-redux"
import { styles } from "./ModalScroller.style"
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
  content: any
}

interface IDispatchProps {}

type Props = IStateProps & IDispatchProps & IComponentProps & DispatchProp<any>

const initialState = {}

type State = Readonly<typeof initialState>

class Scroller extends React.Component<Props, State> {
  public readonly state: State = initialState

  constructor(props: Props) {
    super(props)
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
      <div>{this.renderModal(true)}</div>
    )
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
        <div style={styles.container}>
          <div style={styles.content}>
            <div style={styles.section}>{this.props.title}</div>
            <div style={styles.section}>optional subtitle descriptive text</div>
            <div style={styles.section}>
              {/* {this.props.view} */}
              Hello!
            </div>
            <div style={styles.section}>insert options here, optionally</div>
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
  isVisible: true,
  content: null
})

export default connect<IStateProps, IDispatchProps, IComponentProps>(
  mapStateToProps
)(Scroller)
