// ----------------------------------------------------------------------------
//
//  DSL.
//
// ----------------------------------------------------------------------------

// export interface IBlockType {
//   id: string
//   type: "BLOCK_TYPE"
// }

// export type IType = IBlockType

export interface IEntity {
  id: string
}

export interface IBlock {
  id: string
  name: string
  blocks?: IBlock[]
}

export interface ITask {
  id: string
  name: string
  description: string
  tasks?: ITask[]
}

// TODO: IHorizontalLayout (contains IColumnLayouts)
export type ILayout = IBlockLayout | ITaskLayout

export interface IBlockLayout {
  id: string
  columnLayouts: IColumnLayout[]
  views: IViewStore
}

export interface ITaskLayout {
  id: string
  columnLayouts: IColumnLayout[]
  views: IViewStore
}

// TODO: Refactor this to also be an IBlockType
export interface IColumnLayout {
  id: string
  name: string // TODO(@mgub): Make optional.
  // blocks?: IBlock[]
  blockViews?: IBlockView[]
}

export interface IBlockView {
  id: string
  blockId: string
  hasFocus: boolean
}

type BlockType = "block"

type TaskType = "task"

export type ModeType = BlockType | TaskType

// ----------------------------------------------------------------------------
//
//  Redux.
//
// ----------------------------------------------------------------------------

interface IBlockActions {
  create: "CREATE_BLOCK"
}

interface IActions {
  block: IBlockActions
}

interface IBlockMap {
  [id: number]: IBlock
}

export interface IState {
  blocks: IBlockMap
  layout: ILayout
  targetBlock: IBlockView
  views: IViewStore
  mode: ILayout
  menu: {
    isVisible: boolean
  }
  modal: {
    isVisible: boolean
  }
}

export type View = IBlockView

export interface IViewStore {
  [index: string]: View
}

export interface IHandleDropAction {
  reorderedBoards: IColumnLayout[]
}

export interface IHandleDropColumnLayoutAction {
  addedIndex: any
  droppedColumnLayout: any
  element: any
  payload: any
  removedIndex: any
  // targetColumnLayout: any
  layoutValue: any
}

export interface IHandleDropBlockAction {
  addedIndex: any
  droppedColumnLayout: any
  element: any
  payload: any
  removedIndex: any
  targetBlock: any
  layoutValue: any
}

export type ActionType = IHandleDropAction

// ----------------------------------------------------------------------------
//
//  WIP.
//
// ----------------------------------------------------------------------------

/*
interface IStateDraft {
  // Content.
  blocks: IBlock[]

  // Layout.
  blockContainers: IBoardLayoutContainer[]
}

// ----------------------------------------------------------------------------

type RenderStateOpen = "VIEW_STATE_OPEN"

type RenderStateDetail = "VIEW_STATE_DETAIL"

const DEFAULT_VIEW_STATE = "VIEW_STATE_OPEN" as RenderStateOpen

// Purely a layout component. No style, just function.
// Horizontal drag and drop. <Container>.
interface IBoardLayoutContainer {
  id: string
  boardLayout: IBoardLayout[]
}

// Horizontal drag and drop. <Draggable>.
interface IBoardLayout {
  id: string
  // script: IScript
  blockLayoutContainer: IBlockLayout[]
  isOpen: boolean
}

// Vertical drag and drop. <Container>.
type IBlockLayout = IBlockOpenLayout | IBlockClosedLayout

// Vertical drag and drop. <Draggable>.
interface IBlockOpenLayout {
  id: string
  type: "BLOCK_OPEN_LAYOUT_VIEW"
  block: IBlock
}

// Render closed block.
interface IBlockClosedLayout {
  id: string
  type: "BLOCK_CLOSED_LAYOUT_VIEW"
  block: IBlock
}
*/

// IProcessor // Accepts a script.
