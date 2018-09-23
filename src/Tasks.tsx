import * as React from "react";
import { Container } from "react-smooth-dnd";
import * as store from "./store/store";
import { IBlockType } from "./store/types";
import Task from "./Task";
import { applyDrag } from "./utils";
import * as utils from "./utils";

const groupStyle: React.CSSProperties = {
  alignItems: "center",
  backgroundColor: "teal",
  display: "flex",
  flexDirection: "column",
  justifyContent: "top",
  marginLeft: "20px",
  marginRight: "20px",
  // minHeight: "50px",
  width: "200px"
};

interface IState {
  items1?: IBlockType[];
  items2?: IBlockType[];
  items3?: IBlockType[];
  items4?: IBlockType[];
  itemsLeft?: IBlockType[];
  itemsRight?: IBlockType[];

  targetBlock: IBlockType | null;
}

class Tasks extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      items1: store.fetchBlocks(5),
      items2: store.fetchBlocks(10),
      items3: store.fetchBlocks(3),
      items4: store.fetchBlocks(8),
      itemsLeft: [],
      itemsRight: [],

      targetBlock: null
    };
  }

  public render() {
    return (
      <div
        style={{
          alignItems: "top",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          margin: 0
        }}>
        <div style={groupStyle}>
          <Container
            groupName="1"
            getChildPayload={this.handleGetChildPayload(this.state.itemsLeft)}
            onDragStart={this.handleDragStart}
            onDrop={this.handleDrop("itemsLeft", this.state.itemsLeft)}>
            {this.state.itemsLeft.map(blockValue => {
              return (
                <Task
                  key={blockValue.id}
                  blockValue={blockValue}
                  onTarget={this.onTarget}
                  onUntarget={this.onUntarget}
                />
              );
            })}
          </Container>
        </div>
        <div style={groupStyle}>
          <Container
            groupName="1"
            getChildPayload={this.handleGetChildPayload(this.state.items1)}
            onDragStart={this.handleDragStart}
            onDrop={this.handleDrop("items1", this.state.items1)}>
            {this.state.items1.map(blockValue => {
              return (
                <Task
                  key={blockValue.id}
                  blockValue={blockValue}
                  onTarget={this.onTarget}
                  onUntarget={this.onUntarget}
                />
              );
            })}
          </Container>
        </div>
        {/* <div style={groupStyle}>
          <Container
            groupName="1"
            getChildPayload={this.handleGetChildPayload(this.state.itemsLeft)}
            onDrop={this.handleDrop("itemsLeft", this.state.itemsLeft)}>
            {this.state.itemsLeft.map(blockValue => {
              return <Task key={blockValue.id} blockValue={blockValue} onTarget={this.onTarget} onUntarget={this.onUntarget} />;
            })}
          </Container>
        </div> */}
        <div style={groupStyle}>
          <Container
            groupName="1"
            getChildPayload={this.handleGetChildPayload(this.state.items2)}
            onDragStart={this.handleDragStart}
            onDrop={this.handleDrop("items2", this.state.items2)}>
            {this.state.items2.map(blockValue => {
              return (
                <Task
                  key={blockValue.id}
                  blockValue={blockValue}
                  onTarget={this.onTarget}
                  onUntarget={this.onUntarget}
                />
              );
            })}
          </Container>
        </div>
        <div style={groupStyle}>
          <Container
            groupName="1"
            getChildPayload={this.handleGetChildPayload(this.state.items3)}
            onDragStart={this.handleDragStart}
            onDrop={this.handleDrop("items3", this.state.items3)}>
            {this.state.items3.map(blockValue => {
              return (
                <Task
                  key={blockValue.id}
                  blockValue={blockValue}
                  onTarget={this.onTarget}
                  onUntarget={this.onUntarget}
                />
              );
            })}
          </Container>
        </div>
        <div style={groupStyle}>
          <Container
            groupName="1"
            getChildPayload={this.handleGetChildPayload(this.state.items4)}
            onDragStart={this.handleDragStart}
            onDrop={this.handleDrop("items4", this.state.items4)}>
            {this.state.items4.map(blockValue => {
              return (
                <Task
                  key={blockValue.id}
                  blockValue={blockValue}
                  onTarget={this.onTarget}
                  onUntarget={this.onUntarget}
                />
              );
            })}
          </Container>
        </div>
        <div style={groupStyle}>
          <Container
            groupName="1"
            getChildPayload={this.handleGetChildPayload(this.state.itemsRight)}
            onDrop={this.handleDrop("itemsRight", this.state.itemsRight)}
            onDragStart={this.handleDragStart}
            dragClass="drag-class">
            {this.state.itemsRight.map(blockValue => {
              return (
                <Task
                  key={blockValue.id}
                  blockValue={blockValue}
                  onTarget={this.onTarget}
                  onUntarget={this.onUntarget}
                />
              );
            })}
          </Container>
        </div>
      </div>
    );
  }

  private handleGetChildPayload = (blocks: IBlockType[]) => {
    return index => blocks[index];
  };

  private handleDrop = (blockListKey: string, blocks: IBlockType[]) => {
    return dropResult => {
      const { removedIndex, addedIndex, payload, element } = dropResult;
      if (this.state.targetBlock) {
        // console.log(`Composing block ${JSON.stringify(payload)} in block ${JSON.stringify(this.state.targetBlock)}.`)
        // console.log(`Removing block ${JSON.stringify(payload)} from group ${}`)

        const updatedState: IState = {
          ...this.state,
          [blockListKey]: utils.applyCompose(
            blocks,
            dropResult,
            blockListKey,
            this.state.targetBlock
          )
        };
        this.setState(updatedState);
      } else {
        console.log(
          `DROPPED in ${blockListKey}: removedIndex: ${removedIndex}, addedIndex: ${addedIndex}, payload: ${JSON.stringify(
            payload,
            null,
            2
          )}, element: ${element}}`
        );
        const updatedState: IState = {
          ...this.state,
          [blockListKey]: applyDrag(blocks, dropResult)
        };
        this.setState(updatedState);
      }
    };
  };

  private handleDragStart = ({ isSource, payload, willAcceptDrop }) => {
    console.log(
      `isSource: ${isSource}, payload: ${JSON.stringify(
        payload,
        null,
        2
      )}, willAcceptDrop: ${willAcceptDrop}`
    );
  };

  private onTarget = (block: IBlockType) => {
    console.log(`Targeting block ${block.id}.`);
    this.setState({
      targetBlock: block
    });
  };

  private onUntarget = (block: IBlockType) => {
    console.log(`Untargeting block ${block.id}.`);
    this.setState({
      targetBlock: null
    });
  };
}

// Groups.propTypes = {};

export default Tasks;
