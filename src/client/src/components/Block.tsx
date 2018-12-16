import * as React from "react"
import { connect, DispatchProp } from "react-redux"
import { Draggable } from "react-smooth-dnd"
import { IBlock, IBlockView, IState } from "../types"
import * as styles from "./Block.styles"
import Ico from "./Ico"

const initialState = {}

type State = Readonly<typeof initialState>

// Component props.
export interface IComponentProps {
  key: string
  view: string
  id: string
  onTarget: (block: IBlockView) => void
  onUntarget: (block: IBlockView) => void
}

// Props from Redux store.
interface IStateProps {
  blockView: IBlockView
  blockValue: IBlock
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
    const blockStyle = {
      ...styles.container,
      // ...{
      //   opacity: Math.random()
      // },
      ...(this.props.blockView.hasFocus ? { backgroundColor: "#f0f0f0" } : {})
    }
    return (
      <Draggable key={this.props.key}>
        <div
          style={blockStyle}
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
          ...styles.name
        }}>
        {this.props.blockValue.blocks && this.props.blockValue.blocks.length > 0
          ? `${this.props.blockValue.name} (${
              this.props.blockValue.blocks.length
            })`
          : this.props.blockValue.name}
      </span>
    )
  }

  private renderActionIcons() {
    return (
      <span
        style={{
          marginLeft: "auto"
        }}>
        {Ico({
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
      type: "OPEN_MODAL"
    })
    this.props.dispatch({
      type: "CLOSE_MENU"
    })
  }

  private handleMouseEnter = enter => {
    this.props.dispatch({
      type: "SET_FOCUS_BLOCK",
      view: this.props.blockView
    })

    this.props.onTarget(this.props.blockView)

    // this.props.dispatch({ type: "CREATE_BLOCK" });
  }

  private handleMouseLeave = event => {
    this.props.dispatch({
      type: "UNSET_FOCUS_BLOCK",
      view: this.props.blockView
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
  blockValue: Object.values(state.blocks).filter(block => {
    return block.id === componentProps.id
  })[0],
  blockView: state.views[componentProps.view]
})

export default connect<IStateProps, IDispatchProps, IComponentProps>(
  mapStateToProps
)(Block)
