import * as React from "react"
import { connect, DispatchProp } from "react-redux"
import { Container } from "react-smooth-dnd"
import {
  IHandleDropColumnLayoutAction,
  INoteLayoutView,
  IState,
  INoteView,
  INote,
} from "../types"
import { styles } from "./NoteLayoutView.style"
import NoteView from "./NoteView"

// Component props.
export interface IComponentProps {}

// Props from Redux store.
interface IStateProps {
  noteLayoutView?: INoteLayoutView
}

interface IDispatchProps {}

type Props = IStateProps & IDispatchProps & IComponentProps & DispatchProp<any>

class NoteLayoutView extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  public render() {
    // console.log(JSON.stringify(this.props.layoutValue, null, 2))
    return (
      // <div data-component="layout" style={styles.container}>
      <div style={styles.container}>
        {/* <div>
          <h1>Project</h1>
        </div> */}
        <Container
          style={styles.layoutContainer2}
          groupName="2"
          orientation="horizontal"
          getChildPayload={this.handleGetChildPayload(
            this.props.noteLayoutView.noteViews
          )}
          onDragStart={this.handleDragStart}
          onDrop={this.handleDrop(this.props.noteLayoutView.noteViews)}>
          {this.props.noteLayoutView.noteViews &&
            this.props.noteLayoutView.noteViews.map((noteView, index) => {
              return (
                <NoteView
                  key={noteView.id}
                  view={noteView.id}
                  id={noteView.noteId}
                  onClick={this.onClickNoteView}
                  onTarget={this.onTargetNoteView}
                  onUntarget={this.onUntargetNoteView}
                />
              )
            })}
        </Container>
      </div>
    )
  }

  private handleGetChildPayload = (noteViews: INoteView[]) => {
    console.log("handleGetChildPayload")
    return (index) => noteViews[index]
  }

  private handleDrop = (droppedColumnLayout: INoteView[]) => {
    console.log("handleDrop")
    return (dropResult) => {
      const { removedIndex, addedIndex, payload, element } = dropResult

      this.props.dispatch({
        addedIndex,
        droppedColumnLayout,
        element,
        layoutValue: this.props.noteLayoutView,
        payload,
        removedIndex,
        // targetBlock: this.props.targetBlock,
        type: "HANDLE_DROP_NOTE",
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

  private onTargetNoteView = (noteView: INoteView) => {
    this.props.dispatch({
      type: "SET_TARGET_NOTE_VIEW",
      targetNote: noteView,
    })
  }

  private onUntargetNoteView = (noteView: INoteView) => {
    this.props.dispatch({
      type: "RESET_TARGET_BLOCK_VIEW",
    })
  }

  private onClickNoteView = (note: INote) => {
    console.log("Clicked NoteView.")
    // TODO(@mgub): Move to NoteView.
    this.props.dispatch({
      type: "SET_POINTER_REFERENCE_NOTE_VIEW",
      referenceNote: note,
    })
  }
}

// Map Redux state to component props.
const mapStateToProps = (
  state: IState,
  componentProps: IComponentProps
): IStateProps => ({
  noteLayoutView: state.noteLayout,
})

export default connect<IStateProps, IDispatchProps, IComponentProps>(
  mapStateToProps
)(NoteLayoutView)
