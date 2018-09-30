import * as _ from "lodash";
import * as React from "react";
import { connect, DispatchProp } from "react-redux";
import { Container } from "react-smooth-dnd";
import Block from "./Block";
import ColumnLayout from "./ColumnLayout";
import * as store from "./store/store";
import { IBlock, IBlockView, IColumnLayout, ILayout, IState } from "./types";
import { applyDrag } from "./utils";
import * as utils from "./utils";

const styles = {
  layoutContainer: {
    alignItems: "center",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    margin: 0
  },
  layout: {
    // backgroundColor: "teal",
    border: "1px solid #e0e0e",
    borderRadius: "5px",
    marginLeft: "20px",
    marginRight: "20px",
    minHeight: "50px",
    width: "200px"
  }
};

// Component props.
export interface IOwnProps {
  hack?: void;
}

// Props from Redux store.
interface IStateProps {
  layout?: ILayout;
}

interface IDispatchProps {
  // onSomeEvent: () => void;
  hack?: void;
}

type Props = IStateProps & IDispatchProps & IOwnProps & DispatchProp<any>;

interface IStateDELETE {
  targetBlock: IBlock | null;
}

class LayoutView extends React.Component<Props, IStateDELETE> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    console.log(JSON.stringify(this.props.layout, null, 2));
    return (
      <div style={styles.layoutContainer}>
        <div style={styles.layout}>Holder</div>
        {this.props.layout.columnLayouts.map(columnLayout => {
          return <ColumnLayout key={columnLayout.id} id={columnLayout.id} />;
        })}
        <div style={styles.layout}>Holder</div>
      </div>
    );
  }

  private handleGetChildPayload = (blocks: IBlockView[]) => {
    return index => blocks[index];
  };

  private handleDrop = group => {
    return dropResult => {
      const { removedIndex, addedIndex, payload, element } = dropResult;
      if (this.state.targetBlock) {
        // console.log(`Composing block ${JSON.stringify(payload)} in block ${JSON.stringify(this.state.targetBlock)}.`)
        // console.log(`Removing block ${JSON.stringify(payload)} from group ${}`)
        const reorderedBoards: IColumnLayout[] = this.props.layout.columnLayouts.reduce(
          (value, groupState) => {
            if (groupState.id === group.id) {
              const board = utils.applyCompose(
                groupState,
                dropResult,
                group.id,
                this.state.targetBlock
              );
              if (board.blockViews.length > 0) {
                value.push(board);
              }
              return value;
            } else {
              value.push(groupState);
              return value;
            }
          },
          []
        );

        this.props.dispatch({
          reorderedBoards,
          type: "HANDLE_DROP"
        });
      } else {
        console.log(
          `DROPPED in ${
            group.id
          }: removedIndex: ${removedIndex}, addedIndex: ${addedIndex}, payload: ${JSON.stringify(
            payload,
            null,
            2
          )}, element: ${element}}`
        );

        const reorderedBoards: IColumnLayout[] = this.props.layout.columnLayouts.reduce(
          (value, groupValue) => {
            if (groupValue.id === group.id) {
              const board = applyDrag(groupValue, dropResult);
              if (board.blockViews.length > 0) {
                value.push(board);
              }
              return value;
            } else {
              value.push(groupValue);
              return value;
            }
          },
          []
        );
        this.props.dispatch({
          reorderedBoards,
          type: "HANDLE_DROP"
        });
      }
    };
  };
}

// Map Redux state to component props.
const mapStateToProps = (state: IState, ownProps: IOwnProps): IStateProps => ({
  layout: state.layout
});

export default connect<IStateProps, IDispatchProps, IOwnProps>(mapStateToProps)(
  LayoutView
);
