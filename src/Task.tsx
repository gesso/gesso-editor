import * as React from "react";
import { Draggable } from "react-smooth-dnd";
import { IBlock } from "./types";

const blockStyle = {
  backgroundColor: "#fff",
  border: "1px solid rgba(0,0,0,.125)",
  borderRadius: "3px",
  display: "block",
  fontSize: "14px",
  height: "50px",
  lineHeight: "50px",
  marginBottom: "2px",
  marginTop: "2px",
  outline: 0,
  textAlign: "center",
  width: "200px"
} as React.CSSProperties;

interface IProps {
  key: string;
  blockValue: IBlock;

  onTarget: (block: IBlock) => void;
  onUntarget: (block: IBlock) => void;
}

interface IState {
  isOverlapped: boolean;
}

class Groups extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isOverlapped: false
    };
  }

  public render() {
    return (
      <Draggable key={this.props.key}>
        <div
          style={{
            ...blockStyle,
            ...(this.state.isOverlapped ? { backgroundColor: "#cccccc" } : {})
          }}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onDragEnter={this.handleDragEnter}>
          {this.props.blockValue.blocks
            ? `${this.props.blockValue.name} (${this.props.blockValue.blocks.length})`
            : this.props.blockValue.name}
        </div>
      </Draggable>
    );
  }

  private handleMouseEnter = enter => {
    // console.log("onMouseEnter");
    this.setState({
      isOverlapped: true
    });

    this.props.onTarget(this.props.blockValue);
  };

  private handleMouseLeave = event => {
    // console.log("onMouseLeave");
    this.setState({
      isOverlapped: false
    });

    this.props.onUntarget(this.props.blockValue);
  };

  private handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    // console.log("onDragEnter");
  };
}

// Groups.propTypes = {};

export default Groups;
