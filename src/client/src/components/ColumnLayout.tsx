import * as _ from "lodash"
import * as React from "react"
import { connect, DispatchProp } from "react-redux"
import { Container, Draggable } from "react-smooth-dnd"
import {
  IBlockView,
  IColumnLayout,
  IHandleDropBlockAction,
  ILayout,
  IState
} from "../types"
import BlockView from "./Block"
import { styles } from "./ColumnLayout.styles"

// Component props.
export interface IComponentProps {
  key: string
  id: string
}

// Props from Redux store.
interface IStateProps {
  columnLayout?: IColumnLayout
  layoutValue: ILayout
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
            groupName="2"
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
                  onTarget={this.onTargetBlockView}
                  onUntarget={this.onUntargetBlockView}
                />
              )
            })}
          </Container>
        </div>
      </Draggable>
    )
  }

  private handleGetChildPayload = (blockViews: IBlockView[]) => {
    return index => blockViews[index]
  }

  private handleDrop = (droppedColumnLayout: IColumnLayout) => {
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
    console.log(
      `isSource: ${isSource}, payload: ${JSON.stringify(
        payload,
        null,
        2
      )}, willAcceptDrop: ${willAcceptDrop}`
    )
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
}

// Map Redux state to component props.
const mapStateToProps = (
  state: IState,
  componentProps: IComponentProps
): IStateProps => ({
  layoutValue: state.layout,
  targetBlock: state.targetBlock,
  columnLayout: state.layout.columnLayouts.filter(columnLayout => {
    return columnLayout.id === componentProps.id
  })[0]
})

export default connect<IStateProps, IDispatchProps, IComponentProps>(
  mapStateToProps
)(ColumnLayout)
