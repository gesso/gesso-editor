import * as React from "react"
import { connect, DispatchProp } from "react-redux"
import { IBlockLayoutView, IState } from "../types"
import { styles } from "./CodeLayoutView.style"
import Editor from "./Editor"

const initialState = {
  isMenuVisible: false
}

type State = Readonly<typeof initialState>

// Component props.
export interface IComponentProps {}

// Props from Redux store.
interface IStateProps {
  blockLayoutView?: IBlockLayoutView
}

interface IDispatchProps {}

type Props = IStateProps & IDispatchProps & IComponentProps & DispatchProp<any>

class BlockLayoutView extends React.Component<Props, State> {
  // class BlockLayoutView extends React.Component<Props, {}> {
  public readonly state: State = initialState
  constructor(props: Props) {
    super(props)
  }

  public render() {
    // console.log(JSON.stringify(this.props.layoutValue, null, 2))
    return (
      <div
        data-component="layout"
        onWheel={this.wheel}
        style={styles.container}>
        <div style={styles.left}>
          <Editor
            style={{
              height: "100%",
              padding: 0
            }}
          />
          ;
        </div>
        <div style={styles.right}>
          <ul>
            <li>Real-time documentation search.</li>
            <li>TODOs</li>
            <li>Index with Elasticsearch and search based on context.</li>
          </ul>
        </div>
      </div>
    )
  }

  private wheel = event => {
    // TODO(@mgub): Scroll down if ≥50 events received within 500 ms.
    console.log("[event] onWheel")
    if (window.pageYOffset === 0 && !this.state.isMenuVisible) {
      console.log("Scrolling menu down from top")
      this.setState({
        isMenuVisible: true
      })
      setTimeout(() => {
        console.log("Hiding menu")
        this.setState({
          isMenuVisible: false
        })
      }, 1000)
    }
  }
}

// Map Redux state to component props.
const mapStateToProps = (
  state: IState,
  componentProps: IComponentProps
): IStateProps => ({
  blockLayoutView: state.layout
})

export default connect<IStateProps, IDispatchProps, IComponentProps>(
  mapStateToProps
)(BlockLayoutView)
