import * as React from "react"
import { connect, DispatchProp } from "react-redux"
import MenuOption from "./MenuOption"

// Component props.
export interface IOwnProps {
  hack?: void
}

// Props from Redux store.
interface IStateProps {
  hack: void
}

interface IDispatchProps {
  hack?: void
}

type Props = IStateProps & IDispatchProps & IOwnProps & DispatchProp<any>

type ModeType = BlockType | TaskType

const optionStyle = {
  color: "#a8a8a8",
  padding: "10px"
}

type BlockType = "block"

type TaskType = "task"

interface IState {
  mode: ModeType
}

class LayoutView extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  public render() {
    // console.log(JSON.stringify(this.props.layoutValue, null, 2))
    return (
      // <div
      //   style={{
      //     color: "#a8a8a8",
      //     top: "20px",
      //     right: "20px",
      //     position: "absolute",
      //     zIndex: 9999
      //   }}>
      //   [ <span>settings</span> <span>chat</span> ] <span>login</span>
      // </div>
      // <div
      //   style={{
      //     color: "#a8a8a8",
      //     top: "20px",
      //     left: "20px",
      //     position: "absolute",
      //     zIndex: 9999
      //   }}>
      //   <span>search</span> <span>views</span> <span>timeline</span>{" "}
      //   <span>commit</span> <span>docs</span> <span>timeout/forget</span>
      // </div>
      <div
        style={{
          display: "flex",
          height: "50px",
          justifyContent: "center",
          marginRight: "50px",
          marginTop: "50px",
          minHeight: "50px"
        }}>
        <MenuOption label="code" onClick={this.handleClickModeOption("code")} />
        <div style={optionStyle}>&rarr;</div>
        <MenuOption
          label="block"
          onClick={this.handleClickModeOption("block")}
        />
        <div style={optionStyle}>&rarr;</div>
        <MenuOption label="task" onClick={this.handleClickModeOption("task")} />
        <div style={optionStyle}>&rarr;</div>
        <MenuOption label="plan" onClick={this.handleClickModeOption("plan")} />
        <div style={optionStyle}>&rarr;</div>
        <MenuOption
          label="deploy"
          onClick={this.handleClickModeOption("deploy")}
        />
      </div>
    )
  }

  private handleClickModeOption = mode => {
    return event => {
      this.setMode(mode)
    }
  }

  private setMode = (mode: ModeType) => {
    this.setState({
      mode
    })
  }
}

// Map Redux state to component props.
const mapStateToProps = (state: IState, ownProps: IOwnProps): IStateProps => ({
  // layoutValue: state.layout
  hack: null
})

export default connect<IStateProps, IDispatchProps, IOwnProps>(mapStateToProps)(
  LayoutView
)
