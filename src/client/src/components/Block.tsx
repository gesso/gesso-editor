import * as React from "react"
import { connect, DispatchProp } from "react-redux"
import { Draggable } from "react-smooth-dnd"
import { IBlock, IBlockView, IState } from "../types"
import { blockNameStyle, blockStyle } from "./Block.style"
import Ico from "./Ico"

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

interface IDispatchProps {
  // onSomeEvent: () => void;
  hack?: void
}

type Props = IStateProps & IDispatchProps & IComponentProps & DispatchProp<any>

// TOOD(@mgub): Delete. Don't use state.
interface IStateDELETE {
  isOverlapped: boolean
}

class Block extends React.Component<Props, IStateDELETE> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isOverlapped: false
    }
  }

  public render() {
    return (
      <Draggable key={this.props.key}>
        <div
          style={{
            ...blockStyle,
            // ...{
            //   opacity: Math.random()
            // },
            ...(this.state.isOverlapped ? { backgroundColor: "#f0f0f0" } : {})
          }}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onDragEnter={this.handleDragEnter}>
          <span
            style={{
              ...blockNameStyle
            }}>
            {this.props.blockValue.blocks &&
            this.props.blockValue.blocks.length > 0
              ? `${this.props.blockValue.name} (${
                  this.props.blockValue.blocks.length
                })`
              : this.props.blockValue.name}
          </span>
          <span
            style={{
              marginLeft: "auto"
            }}>
            {Ico({
              name: "code",
              onSelectOption: event => {
                console.log("Clicked on code!!!!!!!!!!!!")
              }
            })}
          </span>
          {/* {IconBranch()}
          {IconCheck()}
          {IconListUnordered()} */}
        </div>
      </Draggable>
    )
  }

  private handleMouseEnter = enter => {
    // console.log("onMouseEnter");
    this.setState({
      isOverlapped: true
    })

    this.props.onTarget(this.props.blockView)

    // this.props.dispatch({ type: "CREATE_BLOCK" });
  }

  private handleMouseLeave = event => {
    // console.log("onMouseLeave");
    this.setState({
      isOverlapped: false
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
  blockValue: state.blocks.filter(block => {
    return block.id === componentProps.id
  })[0],
  blockView: state.views[componentProps.view]
})

export default connect<IStateProps, IDispatchProps, IComponentProps>(
  mapStateToProps
)(Block)
