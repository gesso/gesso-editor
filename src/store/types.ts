export interface IBlockType {
  id: string
  name: string
  blocks?: IBlockType[]
}

////

// interface IRunner {
//   id: string
//   code: string
// }

// interface IBlockList {
//   id: string
//   blocks: ICodeBlock[]
// }

// interface ICodeBlock {
//   id: string
//   content: IBlockList | IRunner
// }

// interface IIssueBlock {
//   id: string
//   content: string
// }

// type Block = IIssueBlock | ICodeBlock

// interface IBoard {
//   id: string

// }

// // Board layout.

// interface IBoardContext {
//   board: IBoard
//   layout: IBoardLayout
// }

// interface IBoardLayout {
//   columns: IBoardColumn
// }

// interface IBoardColumn {
//   rows: IBoardRow
// }

// interface IBoardRow {
//   items: Block[]
// }

// <UNDO_HISTORY>
export interface IAction {
  id: string
  identifier: string
}

export interface IActionHistory {
  id: string
  timestamp: string
  actions: IAction[]
}
// </UNDO_HISTORY>