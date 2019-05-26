import * as React from "react"
import { connect, DispatchProp } from "react-redux"
import { IBlockLayoutView, IState, ModeType, IMenuState } from "../types"
import { styles } from "./CodeLayoutView.style"
import Editor from "./Editor"
import { CLOSE_MENU_ACTION, OPEN_MENU_ACTION } from "src/store/actions"

const initialState = {}

type State = Readonly<typeof initialState>

// Component props.
export interface IComponentProps {}

// Props from Redux store.
interface IStateProps {
  blockLayoutView?: IBlockLayoutView
  menu: IMenuState
}

interface IDispatchProps {}

type Props = IStateProps & IDispatchProps & IComponentProps & DispatchProp<any>
// interface IState {
//   mode: ModeType
//   menu: IMenuState
// }
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
        onWheel={this.handleMouseWheel}
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

  private handleMouseWheel = event => {
    // TODO(@mgub): Scroll down if ≥50 events received within 500 ms.
    console.log("[event] onWheel")
    console.log(this.props.menu.isVisible)
    if (window.pageYOffset === 0 && !!this.props.menu.isVisible) {
      console.log("Scrolling menu down from top")
      this.hideMenu()
      setTimeout(() => {
        console.log("Hiding menu")
        this.showMenu()
      }, 3000)
    }
  }

  private showMenu = () => {
    this.props.dispatch({
      type: OPEN_MENU_ACTION
    })
  }

  private hideMenu = () => {
    this.props.dispatch({
      type: CLOSE_MENU_ACTION
    })
  }
}

// Map Redux state to component props.
const mapStateToProps = (
  state: IState,
  componentProps: IComponentProps
): IStateProps => ({
  blockLayoutView: state.layout,
  menu: state.menu
})

export default connect<IStateProps, IDispatchProps, IComponentProps>(
  mapStateToProps
)(BlockLayoutView)
