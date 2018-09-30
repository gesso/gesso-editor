import { IBlock, IBlockView, IColumnLayout } from "./types";

interface IApplyDrag {
  blockList: IBlock;
}

export const applyCompose = (
  board: IColumnLayout,
  dragResult: any,
  targetBlockList: string,
  targetBlock: IBlock
): IColumnLayout => {
  console.log("applyCompose");
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) {
    return board;
  }

  console.log(
    `Composing block ${JSON.stringify(payload)} in block ${JSON.stringify(
      targetBlock
    )}.`
  );

  console.log(
    `Removing block ${JSON.stringify(
      payload
    )} from group ${removedIndex}: ${targetBlockList}`
  );

  const result = [...board.blockViews];
  let movedBlock: IBlockView = payload;

  // Remove the block from the source block list.
  if (removedIndex !== null) {
    movedBlock = result.splice(removedIndex, 1)[0];
    console.log(`Removed index ${removedIndex}`);
  }

  // Move the block into the target block's block list.
  if (addedIndex !== null) {
    // result.splice(addedIndex, 0, itemToAdd);
    if (!targetBlock.blocks) {
      targetBlock.blocks = [payload];
    } else {
      targetBlock.blocks.push(payload);
    }
    console.log(`Added index ${addedIndex}`);
  }

  board.blockViews = result;

  return board;
};

export const applyDrag = (
  board: IColumnLayout,
  dragResult: any
): IColumnLayout => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) {
    return board;
  }

  const result = [...board.blockViews];
  let itemToAdd = payload;

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  board.blockViews = result;

  return board;
};

// click block, shows search box to search functions on board (in project)
// return will reference it, control+return will copy it

export const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};
