import { IBlockType } from "./store/types";

interface IApplyDrag {
  blockList: IBlockType;
}

export const applyCompose = (
  blockList: any[],
  dragResult: any,
  targetBlockList: string,
  targetBlock: IBlockType
) => {
  console.log("applyCompose");
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) {
    return blockList;
  }

  console.log(
    `Composing block ${JSON.stringify(payload)} in block ${JSON.stringify(
      targetBlock
    )}.`
  );

  console.log(`Removing block ${JSON.stringify(payload)} from group ${removedIndex}: ${targetBlockList}`)

  const result: IBlockType[] = [...blockList];
  let movedBlock: IBlockType = payload;

  // Remove the block from the source block list.
  if (removedIndex !== null) {
    movedBlock = result.splice(removedIndex, 1)[0];
    console.log(`Removed index ${removedIndex}`)
  }

  // Move the block into the target block's block list.
  if (addedIndex !== null) {
    // result.splice(addedIndex, 0, itemToAdd);
    if (!targetBlock.blocks) {
      targetBlock.blocks = [payload]
    } else {
      targetBlock.blocks.push(payload)
    }
    console.log(`Added index ${addedIndex}`)
  }

  return result;
};

export const applyDrag = (blockList: any[], dragResult: any) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) {
    return blockList;
  }

  const result = [...blockList];
  let itemToAdd = payload;

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};

// click block, shows search box to search functions on board (in project)
// return will reference it, control+return will copy it
