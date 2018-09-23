import projectNameGenerator = require("project-name-generator")
import * as uuidv4 from "uuid/v4"
import { IBlockType } from "./types";

export const fetchBlocks = (count: number): IBlockType[] => {
  return generateBlocks(count)
}

const generateBlocks = (blockCount: number) => {
  const blockList: IBlockType[] = [];
  for (let i = 0; i < blockCount; i++) {
    blockList.push({
      id: uuidv4(),
      name: projectNameGenerator({ words: 2, number: false}).dashed,
    });
  }
  return blockList;
};