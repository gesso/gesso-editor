import * as _ from "lodash";
import * as React from "react";
import { connect, DispatchProp } from "react-redux";
import { Container } from "react-smooth-dnd";
import BlockView from "./Block";
import { IBlock, IBlockView, IColumnLayout, ILayout, IState } from "./types";
import { applyDrag } from "./utils";
import * as utils from "./utils";

const styles = {
  columnLayoutContainer: {
    // backgroundColor: "teal",
    border: "1px solid #e0e0e",
    borderRadius: "5px",
    marginLeft: "20px",
    marginRight: "20px",
    minHeight: "50px",
    width: "200px"
  } as React.CSSProperties,
  columnLayout: {
    backgroundColor: "#D7F2FF",
    border: "1px solid #ff5733",
    borderRadius: "5px",
    color: "#ff5733",
    fontWeight: 600,
    padding: "10px",
    textAlign: "center"
  } as React.CSSProperties
};

// Component props.
export interface IOwnProps {
  key: string;
  id: string;
}

// Props from Redux store.
interface IStateProps {
  columnLayout?: IColumnLayout;
  layoutValue: ILayout;
  targetBlock: IBlockView | null;
}

interface IDispatchProps {
  // onSomeEvent: () => void;
  hack?: void;
}

type Props = IStateProps & IDispatchProps & IOwnProps & DispatchProp<any>;

class ColumnLayout extends React.Component<Props, {}> {
  public render() {
    return (
      <div style={styles.columnLayoutContainer}>
        <div>Holder</div>
        <div style={styles.columnLayout}>{this.props.columnLayout.name}</div>
        <Container
          groupName="1"
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
                onTarget={this.onTarget}
                onUntarget={this.onUntarget}
              />
            );
          })}
        </Container>
        <div>Holder</div>
      </div>
    );
  }

  private handleGetChildPayload = (blockView: IBlockView[]) => {
    return index => blockView[index];
  };

  private handleDrop = droppedColumnLayout => {
    return dropResult => {
      const { removedIndex, addedIndex, payload, element } = dropResult;

      this.props.dispatch({
        addedIndex,
        droppedColumnLayout,
        element,
        layoutValue: this.props.layoutValue,
        payload,
        removedIndex,
        targetBlock: this.props.targetBlock,
        type: "HANDLE_DROP"
        // reorderedColumnLayouts,
      });
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
    };
  };

  private handleDragStart = ({ isSource, payload, willAcceptDrop }) => {
    console.log(
      `isSource: ${isSource}, payload: ${JSON.stringify(
        payload,
        null,
        2
      )}, willAcceptDrop: ${willAcceptDrop}`
    );
  };

  private onTarget = (blockView: IBlockView) => {
    console.log(`Targeting block view ${blockView.id}.`);
    // this.setState({
    //   targetBlock: blockView
    // });
    this.props.dispatch({
      type: "SET_TARGET_BLOCK_VIEW",
      targetBlock: blockView
    });
  };

  private onUntarget = (blockView: IBlockView) => {
    console.log(`Untargeting block view ${blockView.id}.`);
    // this.setState({
    //   targetBlock: null
    // });
    this.props.dispatch({
      type: "RESET_TARGET_BLOCK_VIEW"
    });
  };
}

// Map Redux state to component props.
const mapStateToProps = (state: IState, ownProps: IOwnProps): IStateProps => ({
  layoutValue: state.layout,
  targetBlock: state.targetBlock,
  columnLayout: state.layout.columnLayouts.filter(columnLayout => {
    return columnLayout.id === ownProps.id;
  })[0]
});

export default connect<IStateProps, IDispatchProps, IOwnProps>(mapStateToProps)(
  ColumnLayout
);
