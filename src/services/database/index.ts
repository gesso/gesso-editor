import { generateBlocks, generateLayout } from "../../model";
import { IBlock, IColumnLayout, ILayout } from "../../types";

export const fetchBlocks = (count: number): IBlock[] => {
  return generateBlocks(count);
};

export const fetchLayout = (
  maxColumnCount: number,
  blocks: IBlock[]
): ILayout => {
  return generateLayout({
    minColumnCount: 0,
    maxColumnCount,
    blocks
  });
};
