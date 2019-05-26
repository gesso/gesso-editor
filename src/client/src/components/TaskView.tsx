import * as React from "react"
import { connect, DispatchProp } from "react-redux"
import { Draggable } from "react-smooth-dnd"
import { ITask, ITaskView, IState } from "../types"
import * as styles from "./TaskView.styles"
import Icon from "./Ico"
import ModalScroller from "./ModalScroller"

import { Icon as Icon2 } from "react-icons-kit"
import { iosArrowForward } from "react-icons-kit/ionicons/"
import {
  SET_FOCUS_TASK_ACTION,
  UNSET_FOCUS_TASK_ACTION
} from "src/store/actions"

const initialState = {}

type State = Readonly<typeof initialState>

// Component props.
export interface IComponentProps {
  key: string
  view: string
  id: string
  onTarget: (task: ITaskView) => void
  onUntarget: (task: ITaskView) => void
}

// Props from Redux store.
interface IStateProps {
  taskView: ITaskView
  taskValue: ITask
}

interface IDispatchProps {}

type Props = IStateProps & IDispatchProps & IComponentProps & DispatchProp<any>

class TaskView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  public render() {
    return this.renderTask()
  }

  private renderTask() {
    const taskStyle = {
      ...styles.title,
      // ...{
      //   opacity: Math.random()
      // },
      ...(this.props.taskView && this.props.taskView.hasFocus
        ? { backgroundColor: "#f0f0f0" }
        : {})
    }
    return (
      <Draggable key={this.props.key}>
        <div style={styles.container}>
          <div
            style={taskStyle}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            onDragEnter={this.handleDragEnter}>
            {this.renderTaskActions()}
            {this.renderTaskName()}
            <span>
              <Icon2 style={{ color: "#F4A261" }} icon={iosArrowForward} />
            </span>
          </div>
          {this.renderTaskList()}
        </div>
      </Draggable>
    )
  }

  private renderTaskName = () => {
    return (
      <span
        style={{
          ...styles.name,
          margin: "0px 8px 0px 8px",
          width: "100%"
        }}>
        {this.props.taskValue.tasks && this.props.taskValue.tasks.length > 0
          ? `${this.props.taskValue.name} (${
              this.props.taskValue.tasks.length
            })`
          : this.props.taskValue.name}
      </span>
    )
  }

  private renderTaskActions() {
    return (
      <span>
        {this.props.taskValue.tasks.length > 1
          ? Icon({
              name: "compositeTask",
              onSelectOption: event => {
                console.log("Clicked on code!")
                this.showModal(event)
              }
            })
          : Icon({
              name: "task",
              onSelectOption: event => {
                console.log("Clicked on code!")
                this.showModal(event)
              }
            })}
      </span>
    )
  }

  private renderTaskList = () => {
    return (
      <div
        style={{
          padding: "3px 5px 3px 5px"
        }}>
        <div
          style={{
            display: "flex"
          }}>
          <div>
            {Icon({
              name: "task",
              onSelectOption: event => {
                console.log("Clicked on code!")
                this.showModal(event)
              }
            })}
          </div>
          <div
            style={{
              margin: "0px 8px 0px 8px"
            }}>
            Some specific task
          </div>
        </div>
        <div
          style={{
            display: "flex"
          }}>
          <div>
            {Icon({
              name: "task",
              onSelectOption: event => {
                console.log("Clicked on code!")
                this.showModal(event)
              }
            })}
          </div>
          <div
            style={{
              margin: "0px 8px 0px 8px"
            }}>
            Some specific task
          </div>
        </div>
        <div
          style={{
            display: "flex"
          }}>
          <div>
            {Icon({
              name: "task",
              onSelectOption: event => {
                console.log("Clicked on code!")
                this.showModal(event)
              }
            })}
          </div>
          <div
            style={{
              margin: "0px 8px 0px 8px"
            }}>
            Some specific task
          </div>
        </div>
      </div>
    )
  }

  // TODO: Turn this into a Redux action and allow the different modals' states
  // to be saved, and their initial state to be reset.
  private showModal = event => {
    this.props.dispatch({
      type: "OPEN_MODAL",
      view: (
        <ModalScroller title="dumb! ...add assign operation to select coder or role/specialty/skill set." />
      )
    })
    this.props.dispatch({
      type: "CLOSE_MENU"
    })
  }

  private handleMouseEnter = enter => {
    this.props.dispatch({
      type: SET_FOCUS_TASK_ACTION,
      view: this.props.taskView
    })
    this.props.onTarget(this.props.taskView)
  }

  private handleMouseLeave = event => {
    this.props.dispatch({
      type: UNSET_FOCUS_TASK_ACTION,
      view: this.props.taskView
    })

    this.props.onUntarget(this.props.taskView)
  }

  private handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    // console.log("onDragEnter");
  }
}

// Map Redux state to component props.
// TODO(@mgub): Make this more efficient. Research ways to handle.
const mapStateToProps = (
  state: IState,
  componentProps: IComponentProps
): IStateProps => ({
  taskValue: Object.values(state.tasks).filter(task => {
    return task.id === componentProps.id
  })[0],
  taskView: state.views[componentProps.view] as ITaskView
})

function mapDispatchToProps(dispatch) {
  return {
    // setFocusTask: () => dispatch()
  }
}

export default connect<IStateProps, IDispatchProps, IComponentProps>(
  mapStateToProps
  // mapDispatchToProps
)(TaskView)
