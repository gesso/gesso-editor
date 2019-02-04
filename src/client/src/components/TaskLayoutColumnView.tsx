import * as _ from "lodash"
import * as React from "react"
import { connect, DispatchProp } from "react-redux"
import { Container, Draggable } from "react-smooth-dnd"
import {
  ITaskView,
  ITaskLayoutColumnView,
  IHandleDropTaskAction,
  ITaskLayoutView,
  IState
} from "../types"
import TaskView from "./TaskView"
import { styles } from "./TaskLayoutColumnView.styles"

// Component props.
export interface IComponentProps {
  key: string
  id: string
}

// Props from Redux store.
interface IStateProps {
  columnLayout?: ITaskLayoutColumnView
  layoutValue: ITaskLayoutView
  targetTask: ITaskView | null
}

interface IDispatchProps {}

type Props = IStateProps & IDispatchProps & IComponentProps & DispatchProp<any>

class TaskLayoutColumnView extends React.Component<Props, {}> {
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
              this.props.columnLayout.taskViews
            )}
            onDragStart={this.handleDragStart}
            onDrop={this.handleDrop(this.props.columnLayout)}>
            {this.props.columnLayout.taskViews.map(taskView => {
              return (
                <TaskView
                  key={taskView.id}
                  view={taskView.id}
                  id={taskView.taskId}
                  onTarget={this.onTargetTaskView}
                  onUntarget={this.onUntargetTaskView}
                />
              )
            })}
          </Container>
        </div>
      </Draggable>
    )
  }

  private handleGetChildPayload = (taskViews: ITaskView[]) => {
    return index => taskViews[index]
  }

  private handleDrop = (droppedColumnLayout: ITaskLayoutColumnView) => {
    return dropResult => {
      const { removedIndex, addedIndex, payload, element } = dropResult
      this.props.dispatch({
        addedIndex,
        droppedColumnLayout,
        element,
        layoutValue: this.props.layoutValue,
        payload,
        removedIndex,
        targetTask: this.props.targetTask,
        type: "HANDLE_DROP_TASK"
      } as IHandleDropTaskAction)
    }
  }

  private handleDragStart = ({ isSource, payload, willAcceptDrop }) => {
    console.log("handleDragStart");
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

  private onTargetTaskView = (taskView: ITaskView) => {
    this.props.dispatch({
      type: "SET_TARGET_TASK_VIEW",
      targetTask: taskView
    })
  }

  private onUntargetTaskView = (taskView: ITaskView) => {
    this.props.dispatch({
      type: "RESET_TARGET_TASK_VIEW"
    })
  }
}

// Map Redux state to component props.
const mapStateToProps = (
  state: IState,
  componentProps: IComponentProps
): IStateProps => ({
  layoutValue: state.taskLayout,
  targetTask: state.targetTask,
  columnLayout: state.taskLayout.columnViews.filter(columnLayout => {
    return columnLayout.id === componentProps.id
  })[0]
})

export default connect<IStateProps, IDispatchProps, IComponentProps>(
  mapStateToProps
)(TaskLayoutColumnView)
