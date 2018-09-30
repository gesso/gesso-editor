import * as _ from "lodash";
import projectNameGenerator = require("project-name-generator");
import * as uuidv4 from "uuid/v4";
import { IBlock, IBlockView, IColumnLayout, ILayout } from "../types";
import * as utils from "../utils";

// ----------------------------------------------------------------------------
//
//  Mock database.
//
// ----------------------------------------------------------------------------

export const generateBlocks = (blockCount: number): IBlock[] => {
  const blockList: IBlock[] = [];
  for (let i = 0; i < blockCount; i++) {
    blockList.push(generateBlock(true, 0.9));
  }
  return blockList;
};

interface IGenerateLayoutInput {
  minColumnCount: number;
  maxColumnCount: number;
  blocks: IBlock[];
}

export const generateLayout = (input: IGenerateLayoutInput): ILayout => {
  const columnCount =
    input.minColumnCount +
    Math.random() * (input.maxColumnCount - input.minColumnCount);
  const blocksPerColumnCount = input.blocks.length / columnCount;
  const layout: ILayout = {
    id: uuidv4(),
    columnLayouts: []
  };
  // TODO(mgub): Generate layout.
  _.times(columnCount, index => {
    const blockViews: IBlockView[] = input.blocks
      .slice(
        index * blocksPerColumnCount,
        index * blocksPerColumnCount + blocksPerColumnCount
      )
      .map(block => {
        return {
          blockId: block.id,
          id: uuidv4()
        } as IBlockView;
      });
    const columnLayout: IColumnLayout = {
      // blocks: generateBlocks(6),
      blockViews,
      id: uuidv4(),
      name: projectNameGenerator({ words: 2, number: false }).dashed
    };
    layout.columnLayouts.push(columnLayout);
  });
  console.log(`layout: ${JSON.stringify(layout, null, 2)}`);
  return layout;
};

export const generateBlock = (
  withChildren = true,
  childProbability = 0
): IBlock => {
  return {
    id: uuidv4(),
    name: projectNameGenerator({ words: 2, number: false }).dashed,
    blocks:
      withChildren && Math.random() <= childProbability
        ? _.times(Math.random() * 10).map(index => {
            return generateBlock(true, 0.5 * childProbability);
          })
        : []
  };
};
