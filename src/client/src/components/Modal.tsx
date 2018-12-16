import * as React from "react"
import { connect, DispatchProp } from "react-redux"
import { styles } from "./Modal.style"
import Editor from "./Editor"

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
}

interface IDispatchProps {}

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
          <div style={styles.container}>
            <div style={styles.content}>
              <div style={styles.section}>{this.props.title}</div>
              <div style={styles.section}>
                optional subtitle descriptive text
              </div>
              <div style={styles.section}>
                <Editor />
              </div>
              <div style={styles.section}>insert options here, optionally</div>
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
