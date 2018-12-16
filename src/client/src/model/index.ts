import * as _ from "lodash"
import projectNameGenerator = require("project-name-generator")
import * as uuidv4 from "uuid/v4"
import { IBlock, IBlockView, IColumnLayout, ILayout } from "../types"

// ----------------------------------------------------------------------------
//
//  Mock database.
//
// ----------------------------------------------------------------------------

export const generateBlocks = (blockCount: number): IBlock[] => {
  const blockList: IBlock[] = []
  for (let i = 0; i < blockCount; i++) {
    blockList.push(generateBlock(true, 0.9))
  }
  return blockList
}

interface IGenerateLayoutInput {
  minColumnCount: number
  maxColumnCount: number
  blocks: IBlock[]
}

export const generateLayout = (input: IGenerateLayoutInput): ILayout => {
  const columnCount =
    input.minColumnCount +
    Math.random() * (input.maxColumnCount - input.minColumnCount)
  // TODO(@mgub): Add random factor to list length.
  const blocksPerColumnCount = input.blocks.length / columnCount
  const layout: ILayout = {
    id: uuidv4(),
    columnLayouts: [],
    views: {}
  }
  // TODO(@mgub): Generate layout.
  _.times(columnCount, index => {
    // Create views for blocks.
    const blockViews: IBlockView[] = input.blocks
      .slice(
        index * blocksPerColumnCount,
        index * blocksPerColumnCount + blocksPerColumnCount
      )
      .map(block => {
        return {
          blockId: block.id,
          id: uuidv4(),
          hasFocus: false
        } as IBlockView
      })
    // Save block views.
    _.each(blockViews, blockView => {
      layout.views[blockView.id] = blockView
    })
    // Create column layout.
    const columnLayout: IColumnLayout = {
      blockViews,
      id: uuidv4(),
      name: projectNameGenerator({ words: 2, number: false }).dashed
    }
    // Add column to layout.
    layout.columnLayouts.push(columnLayout)
  })
  return layout
}

export const generateBlock = (
  withChildren = true,
  childrenWithChildrenProbability = 0
): IBlock => {
  const blockNameWordCount = 2 + Math.random() * 3
  return {
    id: uuidv4(),
    name: projectNameGenerator({ words: blockNameWordCount, number: false })
      .dashed,
    blocks:
      withChildren && Math.random() <= childrenWithChildrenProbability
        ? _.times(Math.random() * 10).map(index => {
            return generateBlock(true, 0.5 * childrenWithChildrenProbability)
          })
        : []
  }
}
