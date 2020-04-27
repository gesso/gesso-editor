import * as React from "react"
import { connect, DispatchProp } from "react-redux"
import { Draggable } from "react-smooth-dnd"
import { INote, INoteView, IState } from "../types"
import * as styles from "./NoteView.style"
import Ico from "./Ico"
import Editor from "./Editor"
import ModalScroller from "./ModalScroller"

const initialState = {}

type State = Readonly<typeof initialState>

// Component props.
export interface IComponentProps {
  key: string
  view: string
  id: string
  onTarget: (note: INoteView) => void
  onUntarget: (note: INoteView) => void
  onClick: (note: INote) => void
}

// Props from Redux store.
interface IStateProps {
  noteView: INoteView
  noteValue: INote
  // View state.
  isPrimaryPointerReference: boolean
}

interface IDispatchProps {}

type Props = IStateProps & IDispatchProps & IComponentProps & DispatchProp<any>

class Note extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  public render() {
    const noteStyle = {
      ...styles.container
      // ...{
      //   opacity: Math.random() < 0.1 ? 0.5 : null
      // },
      // ...(this.props.noteView.hasFocus ? { backgroundColor: "#e0e0e0" } : {})
    }
    // return (
    //   <div
    //     style={{
    //       ...noteStyle,
    //       backgroundColor: this.props.isPrimaryPointerReference
    //         ? "#f0f0f0"
    //         : noteStyle.backgroundColor
    //     }}
    //     onClick={this.handleMouseClick}
    //     onMouseEnter={this.handleMouseEnter}
    //     onMouseLeave={this.handleMouseLeave}
    //     onDragEnter={this.handleDragEnter}>
    //     {/* {this.renderNoteName()}
    //     {this.renderActionIcons()} */}
    //     Note
    //   </div>
    // )
    return this.renderEntry()
  }

  private renderEntry() {
    console.log(
      "renderNote#isPrimaryPointerReference: ",
      this.props.isPrimaryPointerReference
    )
    const noteStyle = {
      ...styles.container,
      // ...{
      //   opacity: Math.random() < 0.1 ? 0.5 : null
      // },
      ...(this.props.noteView.hasFocus ? { backgroundColor: "#e0e0e0" } : {})
    }
    return (
      <Draggable key={this.props.key}>
        <div
          style={{
            ...noteStyle,
            backgroundColor: this.props.isPrimaryPointerReference
              ? "#f0f0f0"
              : noteStyle.backgroundColor
          }}
          onClick={this.handleMouseClick}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onDragEnter={this.handleDragEnter}>
          {this.renderNoteName()}
          {this.renderActionIcons()}
        </div>
      </Draggable>
    )
  }

  private renderNoteName() {
    return (
      <span
        style={{
          ...styles.name
        }}>
        {this.props.noteValue.notes && this.props.noteValue.notes.length > 0
          ? `${this.props.noteValue.name} (${
              this.props.noteValue.notes.length
            })`
          : this.props.noteValue.name}
      </span>
    )
  }

  private renderActionIcons() {
    return (
      <span
        style={{
          marginLeft: "auto"
        }}>
        {/* {Ico({
          name: "code",
          onSelectOption: event => {
            console.log("Clicked on code!!!!!!!!!!!!")
            this.showModal(event)
          }
        })} */}
        {this.props.noteValue.notes.length > 1
          ? Ico({
              name: "compositeCode",
              onSelectOption: event => {
                console.log("Clicked on code!!!!!!!!!!!!")
                this.showModal(event)
                // event.stopPropagation();
              }
            })
          : Ico({
              name: "code",
              onSelectOption: event => {
                console.log("Clicked on code!!!!!!!!!!!!")
                this.showModal(event)
              }
            })}
      </span>
    )
  }

  // TODO: Turn this into a Redux action and allow the different modals' states
  // to be saved, and their initial state to be reset.
  private showModal = event => {
    this.props.dispatch({
      type: "OPEN_MODAL",
      ...(this.props.noteValue.notes.length > 1
        ? { view: <ModalScroller title="Expand note!" /> }
        : { view: <Editor /> })
    })
    this.props.dispatch({
      type: "CLOSE_MENU"
    })
  }

  private handleMouseClick = event => {
    // this.props.dispatch({
    //   type: "SET_POINTER_REFERENCE_NOTE_VIEW",
    //   referenceNotebookEntry: this
    // });

    // this.props.onClick(this.props.noteView);

    // console.log("Clicked NotebookEntryView.")
    // TODO(@mgub): Move to NotebookEntryView.
    // this.props.dispatch({
    //   type: "SET_POINTER_REFERENCE_NOTE_VIEW",
    //   referenceNotebookEntry: this.props.noteView
    // });

    this.props.onClick(this.props.noteValue)

    event.stopPropagation()

    // this.props.dispatch({ type: "CREATE_NOTE" });
  }

  private handleMouseEnter = event => {
    this.props.dispatch({
      type: "SET_FOCUS_NOTE",
      view: this.props.noteView
    })

    this.props.onTarget(this.props.noteView)

    event.stopPropagation()

    // this.props.dispatch({ type: "CREATE_NOTE" });
  }

  private handleMouseLeave = event => {
    this.props.dispatch({
      type: "UNSET_FOCUS_NOTE",
      view: this.props.noteView
    })

    this.props.onUntarget(this.props.noteView)
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
  // TODO(@mgub): Refactor to get note object from a dictionary (or ES index).
  noteValue: Object.values(state.notes).filter(note => {
    return note.id === componentProps.id
  })[0],
  noteView: state.views[componentProps.view] as INoteView,
  // View state.
  isPrimaryPointerReference:
    state.pointerReferrenceNote ===
    Object.values(state.notes).filter(note => {
      return note.id === componentProps.id
    })[0]
})

export default connect<IStateProps, IDispatchProps, IComponentProps>(
  mapStateToProps
)(Note)
