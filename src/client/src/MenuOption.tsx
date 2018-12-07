import * as React from "react"
import { connect, DispatchProp } from "react-redux"

// Component props.
export interface IOwnProps {
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

type Props = IStateProps & IDispatchProps & IOwnProps & DispatchProp<any>

const styles = {
  color: "#a8a8a8",
  padding: "10px"
}

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
const mapStateToProps = (state: IState, ownProps: IOwnProps): IStateProps => ({
  // layoutValue: state.layout
  hack: null
})

export default connect<IStateProps, IDispatchProps, IOwnProps>(mapStateToProps)(
  MenuOption
)
