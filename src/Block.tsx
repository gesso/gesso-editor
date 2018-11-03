import * as React from "react"
import { Icon } from "react-icons-kit"
import { check, code, gitBranch, listUnordered } from "react-icons-kit/oct/"
import { connect, DispatchProp } from "react-redux"
import { Draggable } from "react-smooth-dnd"
import { IBlock, IBlockView, IState } from "./types"

export const IconCheck = (props = {}) => {
  return (
    <div>
      <Icon style={{ color: "#F4A261" }} icon={check} />
    </div>
  )
}

const IconListUnordered = (props = {}) => {
  const handleOnClick = event => {
    alert("expand this codeblock inline with control icons on top & divider")
  }
  return (
    <div style={{ marginLeft: "auto" }} onClick={handleOnClick}>
      <Icon style={{ color: "#F4A261" }} icon={listUnordered} />
    </div>
  )
}

interface IIconCode {
  onSelectOption?: (option: string) => void
}

const IconCode = (props: IIconCode) => {
  const handleOnClick = event => {
    props.onSelectOption("code")
  }
  return (
    <div onClick={handleOnClick}>
      <Icon style={{ color: "#F4A261" }} icon={code} />
    </div>
  )
}

const IconBranch = () => {
  const handleOnClick = event => {
    alert("complete this codeblock")
  }
  return (
    <div onClick={handleOnClick}>
      <Icon style={{ color: "#F4A261" }} icon={gitBranch} />
    </div>
  )
}

const blockStyle = {
  backgroundColor: "#fff",
  border: "1px solid rgba(0,0,0,.125)",
  borderRadius: "3px",
  display: "block",
  fontFamily:
    "LL Circular Pro Web,system-ui,BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif",
  fontSize: "14px",
  height: "50px",
  lineHeight: "50px",
  marginBottom: "2px",
  marginTop: "2px",
  outline: 0,
  textAlign: "center",
  width: "200px"
  // width: "100%",
} as React.CSSProperties

// Component props.
export interface IOwnProps {
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

type Props = IStateProps & IDispatchProps & IOwnProps & DispatchProp<any>

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
            ...(this.state.isOverlapped ? { backgroundColor: "#f0f0f0" } : {})
          }}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onDragEnter={this.handleDragEnter}>
          {this.props.blockValue.blocks &&
          this.props.blockValue.blocks.length > 0
            ? `${this.props.blockValue.name} (${
                this.props.blockValue.blocks.length
              })`
            : this.props.blockValue.name}
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
const mapStateToProps = (state: IState, ownProps: IOwnProps): IStateProps => ({
  blockValue: state.blocks.filter(block => {
    return block.id === ownProps.id
  })[0],
  blockView: state.views[ownProps.view]
})

export default connect<IStateProps, IDispatchProps, IOwnProps>(mapStateToProps)(
  Block
)
