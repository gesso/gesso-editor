import * as _ from "lodash"
import * as React from "react"
import { connect, DispatchProp } from "react-redux"
import { Container, Draggable } from "react-smooth-dnd"
import {
  IBlock,
  IBlockView,
  IBlockLayoutColumnView,
  IHandleDropBlockAction,
  IBlockLayoutView,
  ICreateBlockActionMessage,
  IState
} from "../types"
import BlockView from "./BlockView"
import { styles } from "./BlockLayoutColumnView.styles"

// Component props.
export interface IComponentProps {
  key: string
  id: string
}

// Props from Redux store.
interface IStateProps {
  columnLayout?: IBlockLayoutColumnView
  layoutValue: IBlockLayoutView
  targetBlock: IBlockView | null
}

interface IDispatchProps {}

type Props = IStateProps & IDispatchProps & IComponentProps & DispatchProp<any>

class ColumnLayout extends React.Component<Props, {}> {
  public render() {
    return (
      <Draggable key={this.props.key}>
        <div data-component="columnLayout" style={styles.layoutContainer}>
          <div style={styles.columnLayout}>
            <span>{this.props.columnLayout.name}</span>
          </div>
          <Container
            groupName="1"
            orientation="vertical"
            getChildPayload={this.handleGetChildPayload(
              this.props.columnLayout.blockViews
            )}
            onDragStart={this.handleDragStart}
            onDrop={this.handleDrop(this.props.columnLayout)}>
            {this.props.columnLayout.blockViews.map(blockView => {
              return (
                <BlockView
                  key={blockView.id}
                  view={blockView.id}
                  id={blockView.blockId}
                  onClick={this.onClickBlockView}
                  onTarget={this.onTargetBlockView}
                  onUntarget={this.onUntargetBlockView}
                />
              )
            })}
          </Container>
          <div
            style={{
              color: "#c8c8c8",
              fontSize: "12px",
              textAlign: "center",
              padding: "5px 10px 5px 10px"
            }}
            onClick={this.handleCreateBlock}>
            new
          </div>
        </div>
      </Draggable>
    )
  }

  private handleCreateBlock = event => {
    console.log("Create block.")
    this.props.dispatch({
      type: "CREATE_BLOCK"
    } as ICreateBlockActionMessage)
  }

  private handleGetChildPayload = (blockViews: IBlockView[]) => {
    return index => blockViews[index]
  }

  private handleDrop = (droppedColumnLayout: IBlockLayoutColumnView) => {
    return dropResult => {
      const { removedIndex, addedIndex, payload, element } = dropResult
      this.props.dispatch({
        addedIndex,
        droppedColumnLayout,
        element,
        layoutValue: this.props.layoutValue,
        payload,
        removedIndex,
        targetBlock: this.props.targetBlock,
        type: "HANDLE_DROP_BLOCK"
      } as IHandleDropBlockAction)
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
    );
    */
  }

  private onTargetBlockView = (blockView: IBlockView) => {
    this.props.dispatch({
      type: "SET_TARGET_BLOCK_VIEW",
      targetBlock: blockView
    })
  }

  private onUntargetBlockView = (blockView: IBlockView) => {
    this.props.dispatch({
      type: "RESET_TARGET_BLOCK_VIEW"
    })
  }

  private onClickBlockView = (block: IBlock) => {
    console.log("Clicked BlockView.")
    // TODO(@mgub): Move to BlockView.
    this.props.dispatch({
      type: "SET_POINTER_REFERENCE_BLOCK_VIEW",
      referenceBlock: block
    })
  }
}

// Map Redux state to component props.
const mapStateToProps = (
  state: IState,
  componentProps: IComponentProps
): IStateProps => ({
  layoutValue: state.layout,
  targetBlock: state.targetBlock,
  columnLayout: state.layout.columnViews.filter(columnLayout => {
    return columnLayout.id === componentProps.id
  })[0]
})

export default connect<IStateProps, IDispatchProps, IComponentProps>(
  mapStateToProps
)(ColumnLayout)
