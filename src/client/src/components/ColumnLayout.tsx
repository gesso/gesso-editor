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
import { styles } from "./ColumnLayout.style"

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

interface IDispatchProps {
  // onSomeEvent: () => void;
  hack?: void
}

type Props = IStateProps & IDispatchProps & IComponentProps & DispatchProp<any>

class ColumnLayout extends React.Component<Props, {}> {
  public render() {
    return (
      <Draggable key={this.props.key}>
        <div style={styles.columnLayoutContainer}>
          <div style={styles.columnLayout}>
            <span>{this.props.columnLayout.name}</span>{" "}
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
        // reorderedColumnLayouts,
      } as IHandleDropBlockAction)
      // if (this.props.targetBlock) {
      //   // // console.log(`Composing block ${JSON.stringify(payload)} in block ${JSON.stringify(this.state.targetBlock)}.`)
      //   // // console.log(`Removing block ${JSON.stringify(payload)} from group ${}`)
      //   // // TODO: <MOVE_INTO_HANDLE_DROP>
      //   // const reorderedColumnLayouts: IColumnLayout[] = this.props.layoutValue.columnLayouts.reduce(
      //   //   (value, groupState) => {
      //   //     if (groupState.id === droppedColumnLayout.id) {
      //   //       const reorderedColumnLayout = utils.applyCompose(
      //   //         groupState,
      //   //         dropResult,
      //   //         droppedColumnLayout.id,
      //   //         // TODO(@mgub): [BUG] targetBlock is a split brain across this file and Layout.tsx. Move to Redux.
      //   //         this.props.targetBlock
      //   //       );
      //   //       if (reorderedColumnLayout.blockViews.length > 0) {
      //   //         value.push(reorderedColumnLayout);
      //   //       }
      //   //       return value;
      //   //     } else {
      //   //       value.push(groupState);
      //   //       return value;
      //   //     }
      //   //   },
      //   //   []
      //   // );
      //   // // TODO: </MOVE_INTO_HANDLE_DROP>

      //   this.props.dispatch({
      //     addedIndex,
      //     droppedColumnLayout,
      //     element,
      //     payload,
      //     removedIndex,
      //     targetBlock: this.props.targetBlock,
      //     type: "HANDLE_DROP"
      //     // reorderedColumnLayouts,
      //   });
      // } else {
      //   // // TODO: <MOVE_INTO_HANDLE_DROP>
      //   // console.log(
      //   //   `DROPPED in ${
      //   //     droppedColumnLayout.id
      //   //   }: removedIndex: ${removedIndex}, addedIndex: ${addedIndex}, payload: ${JSON.stringify(
      //   //     payload,
      //   //     null,
      //   //     2
      //   //   )}, element: ${element}}`
      //   // );

      //   // const reorderedColumnLayouts: IColumnLayout[] = this.props.layoutValue.columnLayouts.reduce(
      //   //   (value, columnLayout) => {
      //   //     if (columnLayout.id === droppedColumnLayout.id) {
      //   //       const reorderedColumnLayout = applyDrag(columnLayout, dropResult);
      //   //       if (reorderedColumnLayout.blockViews.length > 0) {
      //   //         value.push(reorderedColumnLayout);
      //   //       }
      //   //       return value;
      //   //     } else {
      //   //       value.push(columnLayout);
      //   //       return value;
      //   //     }
      //   //   },
      //   //   []
      //   // );
      //   // // TODO: </MOVE_INTO_HANDLE_DROP>

      //   this.props.dispatch({
      //     reorderedColumnLayouts,
      //     type: "HANDLE_DROP"
      //   });
      // }
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
    console.log(`Targeting block view ${blockView.id}.`)
    // this.setState({
    //   targetBlock: blockView
    // });
    this.props.dispatch({
      type: "SET_TARGET_BLOCK_VIEW",
      targetBlock: blockView
    })
  }

  private onUntargetBlockView = (blockView: IBlockView) => {
    console.log(`Untargeting block view ${blockView.id}.`)
    // this.setState({
    //   targetBlock: null
    // });
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
