import * as React from "react"
import { connect, DispatchProp } from "react-redux"
import { menuStyle, optionStyle } from "./Menu.style"
import MenuOption from "./MenuOption"
import { ModeType } from "../types"

// Component props.
export interface IComponentProps {
  onChangeMode?: (mode: ModeType) => void
}

// Props from Redux store.
interface IStateProps {}

interface IDispatchProps {}

type Props = IStateProps & IDispatchProps & IComponentProps & DispatchProp<any>

interface IState {
  mode: ModeType
  menu
}

class LayoutView extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  public render() {
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
      <div style={menuStyle}>
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
      event.stopPropagation()
      this.setMode(mode)
    }
  }

  private setMode = (mode: ModeType) => {
    this.setState({
      mode
    })
    if (this.props.onChangeMode) {
      this.props.onChangeMode(mode)
    }
  }
}

// Map Redux state to component props.
const mapStateToProps = (
  state: IState,
  componentProps: IComponentProps
): IStateProps => ({
  menu: state.menu
})

export default connect<IStateProps, IDispatchProps, IComponentProps>(
  mapStateToProps
)(LayoutView)
