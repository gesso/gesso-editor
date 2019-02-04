import * as React from "react"
import { connect, DispatchProp } from "react-redux"
import { IBlockLayoutView, IState } from "../types"
import { styles } from "./CodeLayoutView.style"
import Editor from "./Editor"

// Component props.
export interface IComponentProps {}

// Props from Redux store.
interface IStateProps {
  blockLayoutView?: IBlockLayoutView
}

interface IDispatchProps {}

type Props = IStateProps & IDispatchProps & IComponentProps & DispatchProp<any>

class BlockLayoutView extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  public render() {
    // console.log(JSON.stringify(this.props.layoutValue, null, 2))
    return (
      <div data-component="layout" style={styles.container}>
        <Editor
          style={{
            height: "100%"
          }}
        />
        ;
      </div>
    )
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
