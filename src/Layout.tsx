import * as React from "react"
import { connect, DispatchProp } from "react-redux"
import { Container } from "react-smooth-dnd"
import ColumnLayout from "./ColumnLayout"
import {
  IColumnLayout,
  IHandleDropColumnLayoutAction,
  ILayout,
  IState
} from "./types"

const styles = {
  layoutContainer: {
    alignItems: "center",
    // backgroundColor: "red",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    margin: 0
  },
  layoutContainer2: {
    alignItems: "center",
    // backgroundColor: "red",
    display: "flex",
    justifyContent: "center",
    margin: 0
  },
  layout: {
    border: "1px solid #e0e0e",
    borderRadius: "5px",
    marginLeft: "20px",
    marginRight: "20px",
    minHeight: "50px",
    width: "200px"
  }
}

// Component props.
export interface IOwnProps {
  hack?: void
}

// Props from Redux store.
interface IStateProps {
  layoutValue?: ILayout
}

interface IDispatchProps {
  // onSomeEvent: () => void;
  hack?: void
}

type Props = IStateProps & IDispatchProps & IOwnProps & DispatchProp<any>

class LayoutView extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  public render() {
    // console.log(JSON.stringify(this.props.layoutValue, null, 2))
    return (
      <div style={styles.layoutContainer}>
        <Container
          style={styles.layoutContainer2}
          groupName="2"
          orientation="horizontal"
          getChildPayload={this.handleGetChildPayload(
            this.props.layoutValue.columnLayouts
          )}
          onDragStart={this.handleDragStart}
          onDrop={this.handleDrop(this.props.layoutValue.columnLayouts)}>
          {this.props.layoutValue.columnLayouts.map((columnLayout, index) => {
            return <ColumnLayout key={columnLayout.id} id={columnLayout.id} />
          })}
        </Container>
      </div>
    )
  }

  private handleGetChildPayload = (columnLayouts: IColumnLayout[]) => {
    console.log("handleGetChildPayload")
    return index => columnLayouts[index]
  }

  private handleDrop = (droppedColumnLayout: IColumnLayout[]) => {
    console.log("handleDrop")
    return dropResult => {
      const { removedIndex, addedIndex, payload, element } = dropResult

      this.props.dispatch({
        addedIndex,
        droppedColumnLayout,
        element,
        layoutValue: this.props.layoutValue,
        payload,
        removedIndex,
        // targetBlock: this.props.targetBlock,
        type: "HANDLE_DROP_COLUMN_LAYOUT"
        // reorderedColumnLayouts,
      } as IHandleDropColumnLayoutAction)
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
}

// Map Redux state to component props.
const mapStateToProps = (state: IState, ownProps: IOwnProps): IStateProps => ({
  layoutValue: state.layout
})

export default connect<IStateProps, IDispatchProps, IOwnProps>(mapStateToProps)(
  LayoutView
)
