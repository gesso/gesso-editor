import * as React from "react"
import { connect, DispatchProp } from "react-redux"
import * as styles from "./Menu.style"
import MenuOption from "./MenuOption"
import { IMode, ModeType, IMenuState, IState } from "../types"

// Component props.
export interface IComponentProps {
  onChangeMode?: (mode: ModeType) => void
}

// Props from Redux store.
interface IStateProps {
  // mode: ModeType
  menu: IMenuState
}

interface IDispatchProps {}

type Props = IStateProps & IDispatchProps & IComponentProps & DispatchProp<any>

class LayoutView extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  public render() {
    return (
      <div style={styles.menu}>
        {/* <MenuOption
          label="code"
          onClick={this.handleClickModeOption(
            "show code editor and make _all_ blocks searchable and browsable (with tabs?)"
          )}
        />
        <div style={styles.menuOption}>&rarr;</div> */}
        <MenuOption
          label="logic" // prev., "work", "mix", "browse", "intelligence" <- "block/frame"
          onClick={this.handleClickModeOption("block")}
        />
        <div style={styles.menuOption}>&rarr;</div>
        <MenuOption label="task" onClick={this.handleClickModeOption("task")} />
        <div style={styles.menuOption}>&rarr;</div>
        <MenuOption label="note" onClick={this.handleClickModeOption("note")} />
      </div>
    )
  }

  private handleClickModeOption = (mode) => {
    return (event) => {
      event.stopPropagation()
      this.setMode(mode)
    }
  }

  private setMode = (mode: ModeType) => {
    this.setState({
      mode,
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
  menu: state.menu,
})

export default connect<IStateProps, IDispatchProps, IComponentProps>(
  mapStateToProps
)(LayoutView)