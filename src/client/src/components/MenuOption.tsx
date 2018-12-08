import * as React from "react"
import { connect, DispatchProp } from "react-redux"
import { styles } from "./MenuOption.style"

// Component props.
export interface IComponentProps {
  label: string
  onClick?: (event?: any) => void
}

// Props from Redux store.
interface IStateProps {
  hack: void
}

interface IDispatchProps {
  hack?: void
}

type Props = IStateProps & IDispatchProps & IComponentProps & DispatchProp<any>

interface IState {
  hack?: void
}

class MenuOption extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  public render() {
    // console.log(JSON.stringify(this.props.layoutValue, null, 2))
    return (
      <div style={styles} onClick={this.handleClickModeOption}>
        {this.props.label}
      </div>
    )
  }

  private handleClickModeOption(event) {
    this.props.onClick(event)
  }
}

// Map Redux state to component props.
const mapStateToProps = (
  state: IState,
  componentProps: IComponentProps
): IStateProps => ({
  // layoutValue: state.layout
  hack: null
})

export default connect<IStateProps, IDispatchProps, IComponentProps>(
  mapStateToProps
)(MenuOption)
