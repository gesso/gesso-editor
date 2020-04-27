import * as React from "react"
import { connect, DispatchProp } from "react-redux"
import { Draggable } from "react-smooth-dnd"
import { IBlock, IBlockView, IState } from "../types"
import * as styles from "./BlockView.styles"
import Icon from "./Icon"
import Editor from "./Editor"
import ModalScroller from "./ModalScroller"

const initialState = {}

type State = Readonly<typeof initialState>

// Component props.
export interface IComponentProps {
  key: string
  view: string
  id: string
  onTarget: (block: IBlockView) => void
  onUntarget: (block: IBlockView) => void
  onClick: (block: IBlock) => void
}

// Props from Redux store.
interface IStateProps {
  blockView: IBlockView
  blockValue: IBlock
  // View state.
  isPrimaryPointerReference: boolean
}

interface IDispatchProps {}

type Props = IStateProps & IDispatchProps & IComponentProps & DispatchProp<any>

class Block extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  public render() {
    return this.renderBlock()
  }

  private renderBlock() {
    console.log(
      "renderBlock#isPrimaryPointerReference: ",
      this.props.isPrimaryPointerReference
    )
    const blockStyle = {
      ...styles.container,
      // ...{
      //   opacity: Math.random() < 0.1 ? 0.5 : null
      // },
      ...(this.props.blockView.hasFocus ? { backgroundColor: "#e0e0e0" } : {}),
    }
    return (
      <Draggable key={this.props.key}>
        <div
          style={{
            ...blockStyle,
            backgroundColor: this.props.isPrimaryPointerReference
              ? "#f0f0f0"
              : blockStyle.backgroundColor,
          }}
          onClick={this.handleMouseClick}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onDragEnter={this.handleDragEnter}>
          {this.renderBlockName()}
          {this.renderActionIcons()}
        </div>
      </Draggable>
    )
  }

  private renderBlockName() {
    return (
      <span
        style={{
          ...styles.name,
        }}>
        {this.props.blockValue.blocks && this.props.blockValue.blocks.length > 0
          ? `${this.props.blockValue.name} (${this.props.blockValue.blocks.length})`
          : this.props.blockValue.name}
      </span>
    )
  }

  private renderActionIcons() {
    return (
      <span
        style={{
          marginLeft: "auto",
        }}>
        {/* {Ico({
          name: "code",
          onSelectOption: event => {
            console.log("Clicked on code!!!!!!!!!!!!")
            this.showModal(event)
          }
        })} */}
        {this.props.blockValue.blocks.length > 1
          ? Icon({
              name: "compositeCode",
              onSelectOption: (event) => {
                console.log("Clicked on code!!!!!!!!!!!!")
                this.showModal(event)
                // event.stopPropagation();
              },
            })
          : Icon({
              name: "code",
              onSelectOption: (event) => {
                console.log("Clicked on code!!!!!!!!!!!!")
                this.showModal(event)
              },
            })}
      </span>
    )
  }

  // TODO: Turn this into a Redux action and allow the different modals' states
  // to be saved, and their initial state to be reset.
  private showModal = (event) => {
    this.props.dispatch({
      type: "OPEN_MODAL",
      ...(this.props.blockValue.blocks.length > 1
        ? { view: <ModalScroller title="Expand block!" /> }
        : { view: <Editor /> }),
    })
    this.props.dispatch({
      type: "CLOSE_MENU",
    })
  }

  private handleMouseClick = (event) => {
    // this.props.dispatch({
    //   type: "SET_POINTER_REFERENCE_BLOCK_VIEW",
    //   referenceBlock: this
    // });

    // this.props.onClick(this.props.blockView);

    // console.log("Clicked BlockView.")
    // TODO(@mgub): Move to BlockView.
    // this.props.dispatch({
    //   type: "SET_POINTER_REFERENCE_BLOCK_VIEW",
    //   referenceBlock: this.props.blockView
    // });

    this.props.onClick(this.props.blockValue)

    event.stopPropagation()

    // this.props.dispatch({ type: "CREATE_BLOCK" });
  }

  private handleMouseEnter = (event) => {
    this.props.dispatch({
      type: "SET_FOCUS_BLOCK",
      view: this.props.blockView,
    })

    this.props.onTarget(this.props.blockView)

    event.stopPropagation()

    // this.props.dispatch({ type: "CREATE_BLOCK" });
  }

  private handleMouseLeave = (event) => {
    this.props.dispatch({
      type: "UNSET_FOCUS_BLOCK",
      view: this.props.blockView,
    })

    this.props.onUntarget(this.props.blockView)
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
  // TODO(@mgub): Refactor to get block object from a dictionary (or ES index).
  blockValue: Object.values(state.blocks).filter((block) => {
    return block.id === componentProps.id
  })[0],
  blockView: state.views[componentProps.view] as IBlockView,
  // View state.
  isPrimaryPointerReference:
    state.pointerReferenceBlock ===
    Object.values(state.blocks).filter((block) => {
      return block.id === componentProps.id
    })[0],
})

export default connect<IStateProps, IDispatchProps, IComponentProps>(
  mapStateToProps
)(Block)
