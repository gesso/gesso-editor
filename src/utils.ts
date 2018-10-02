import { IBlock, IBlockView, IColumnLayout, IState } from "./types";

interface IApplyDrag {
  blockList: IBlock;
}

// TODO: Replace with Redux action.
export const applyCompose = (
  columnLayout: IColumnLayout,
  dragResult: any,
  targetBlockList: string,
  targetBlockView: IBlockView,
  state: IState,
  action
): IColumnLayout => {
  console.log("applyCompose");
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) {
    return columnLayout;
  }

  console.log(
    `Composing block ${JSON.stringify(payload)} in block ${JSON.stringify(
      targetBlockView
    )}.`
  );

  console.log(
    `Removing block ${JSON.stringify(
      payload
    )} from group ${removedIndex}: ${targetBlockList}`
  );

  const result = [...columnLayout.blockViews];
  let movedBlockView: IBlockView = payload;

  // Remove the block from the source block list.
  if (removedIndex !== null) {
    movedBlockView = result.splice(removedIndex, 1)[0];
    console.log(`Removed index ${removedIndex}`);
  }

  // Move the block into the target block's block list.
  if (addedIndex !== null) {
    // result.splice(addedIndex, 0, itemToAdd);
    const block = state.blocks.filter(block2 => {
      return block2.id === targetBlockView.blockId;
    })[0];
    // TODO:
    // const block = state.blocks[targetBlockView.blockId];
    if (!block.blocks) {
      block.blocks = [payload];
    } else {
      block.blocks.push(payload);
    }
    console.log(`Added index ${addedIndex}`);
  }

  columnLayout.blockViews = result;

  return columnLayout;
};

// TODO: Replace with Redux action.
export const applyDrag = (
  columnLayout: IColumnLayout,
  dragResult: any,
  state: IState,
  action
): IColumnLayout => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) {
    return columnLayout;
  }

  const result = [...columnLayout.blockViews];
  let itemToAdd = payload;

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  columnLayout.blockViews = result;

  return columnLayout;
};

// click block, shows search box to search functions on board (in project)
// return will reference it, control+return will copy it

export const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};
