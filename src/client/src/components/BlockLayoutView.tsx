import * as React from "react"
import { connect, DispatchProp } from "react-redux"
import { Container } from "react-smooth-dnd"
import {
  ITaskLayoutColumnView,
  IHandleDropColumnLayoutAction,
  IBlockLayoutView,
  IState
} from "../types"
import BlockLayoutColumnView from "./BlockLayoutColumnView"
import { styles } from "./BlockLayoutView.style"

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
        <Container
          style={styles.layoutContainer2}
          groupName="2"
          orientation="horizontal"
          getChildPayload={this.handleGetChildPayload(
            this.props.blockLayoutView.columnViews
          )}
          onDragStart={this.handleDragStart}
          onDrop={this.handleDrop(this.props.blockLayoutView.columnViews)}>
          {this.props.blockLayoutView.columnViews.map((columnView, index) => {
            return (
              <BlockLayoutColumnView key={columnView.id} id={columnView.id} />
            )
          })}
        </Container>
      </div>
    )
  }

  private handleGetChildPayload = (columnLayouts: ITaskLayoutColumnView[]) => {
    console.log("handleGetChildPayload")
    return index => columnLayouts[index]
  }

  private handleDrop = (droppedColumnLayout: ITaskLayoutColumnView[]) => {
    console.log("handleDrop")
    return dropResult => {
      const { removedIndex, addedIndex, payload, element } = dropResult

      this.props.dispatch({
        addedIndex,
        droppedColumnLayout,
        element,
        layoutValue: this.props.blockLayoutView,
        payload,
        removedIndex,
        // targetBlock: this.props.targetBlock,
        type: "HANDLE_DROP_BLOCK_COLUMN_LAYOUT"
        // reorderedColumnLayouts,
      } as IHandleDropColumnLayoutAction)
    }
  }

  private handleDragStart = ({ isSource, payload, willAcceptDrop }) => {
    console.log("handleDragStart")
    /*
    console.log(
      `isSource: ${isSource}, payload: ${JSON.stringify(
        payload,
        null,
        2
      )}, willAcceptDrop: ${willAcceptDrop}`
    )
    */
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
