import {
  IBlock,
  IBlockView,
  IBlockLayoutColumnView,
  ITaskLayoutColumnView,
  IHandleDropBlockAction,
  IHandleDropColumnLayoutAction,
  IState
} from "./types"

// ----------------------------------------------------------------------------
//
//  Task.
//
// ----------------------------------------------------------------------------

// TODO: Replace with Redux action.
export const applyComposeBlocks = (
  columnLayoutView: IBlockLayoutColumnView,
  dragResult: any,
  droppedColumnLayoutId: string,
  targetBlockView: IBlockView,
  state: IState,
  action
): IBlockLayoutColumnView => {
  console.log("applyCompose")
  const { removedIndex, addedIndex, payload } = dragResult
  if (removedIndex === null && addedIndex === null) {
    return columnLayoutView
  }

  console.log(
    `Composing block ${JSON.stringify(payload)} in block ${JSON.stringify(
      targetBlockView
    )}.`
  )

  console.log(
    `Removing block ${JSON.stringify(
      payload
    )} from group ${removedIndex}: ${droppedColumnLayoutId}`
  )

  const result = [...columnLayoutView.blockViews]
  let movedBlockView: IBlockView = payload

  // Remove the block from the source block list.
  if (removedIndex !== null) {
    movedBlockView = result.splice(removedIndex, 1)[0]
    console.log(`Removed index ${removedIndex}`)
  }

  // Insert the block into the target block's block list.
  if (addedIndex !== null) {
    // result.splice(addedIndex, 0, itemToAdd);
    const block = Object.values(state.blocks).filter(block2 => {
      return block2.id === targetBlockView.blockId
    })[0]
    // TODO:
    // const block = state.blocks[targetBlockView.blockId];
    if (!block.blocks) {
      block.blocks = [payload]
    } else {
      block.blocks.push(payload)
    }
    console.log(`Added index ${addedIndex}`)
  }

  columnLayoutView.blockViews = result // columnLayoutView.blockViews

  return columnLayoutView
}

interface IApplyDragBlock {
  columnLayout: IBlockLayoutColumnView
  dragResult: any
}

// TODO: Replace with Redux action.
export const applyDragBlock = (
  columnLayout: IBlockLayoutColumnView,
  dragResult: any
): IBlockLayoutColumnView => {
  const { removedIndex, addedIndex, payload } = dragResult
  if (removedIndex === null && addedIndex === null) {
    return columnLayout
  }

  const result = [...columnLayout.blockViews]
  let itemToAdd = payload

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0]
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd)
  }

  columnLayout.blockViews = result

  return columnLayout
}

export const applyDragColumnLayout = (
  columnLayouts: IBlockLayoutColumnView[],
  dragResult: any
): IBlockLayoutColumnView[] => {
  const { removedIndex, addedIndex, payload } = dragResult
  if (removedIndex === null && addedIndex === null) {
    return columnLayouts
  }

  const reorderedColumnLayouts = [...columnLayouts]
  let itemToAdd = payload

  if (removedIndex !== null) {
    itemToAdd = reorderedColumnLayouts.splice(removedIndex, 1)[0]
  }

  if (addedIndex !== null) {
    reorderedColumnLayouts.splice(addedIndex, 0, itemToAdd)
  }

  columnLayouts = reorderedColumnLayouts

  return columnLayouts
}

// ----------------------------------------------------------------------------
//
//  Task.
//
// ----------------------------------------------------------------------------

// TODO: Replace with Redux action.
export const applyDragTask = (
  columnLayout: ITaskLayoutColumnView,
  dragResult: any
): ITaskLayoutColumnView => {
  const { removedIndex, addedIndex, payload } = dragResult
  if (removedIndex === null && addedIndex === null) {
    return columnLayout
  }

  const result = [...columnLayout.taskViews]
  let itemToAdd = payload

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0]
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd)
  }

  columnLayout.taskViews = result

  return columnLayout
}

export const applyDragTaskColumnLayout = (
  columnLayouts: ITaskLayoutColumnView[],
  dragResult: any
): ITaskLayoutColumnView[] => {
  console.log("APPLY DRAG TASK COLUMN LAYOUT")
  const { removedIndex, addedIndex, payload } = dragResult
  if (removedIndex === null && addedIndex === null) {
    return columnLayouts
  }

  const reorderedColumnLayouts = [...columnLayouts]
  let itemToAdd = payload

  if (removedIndex !== null) {
    itemToAdd = reorderedColumnLayouts.splice(removedIndex, 1)[0]
  }

  if (addedIndex !== null) {
    reorderedColumnLayouts.splice(addedIndex, 0, itemToAdd)
  }

  columnLayouts = reorderedColumnLayouts

  return columnLayouts
}

// click block, shows search box to search functions on board (in project)
// return will reference it, control+return will copy it

export const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max))
}
