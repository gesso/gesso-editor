import * as React from "react"

// ----------------------------------------------------------------------------
//
//  DSL.
//
// ----------------------------------------------------------------------------

export interface IEntity {
  id: string
}

export interface IBlock {
  id: string
  name: string
  blocks?: IBlock[]
  // TODO(@mgub): Refactor to only include only list of block identifiers and load them from the Redux store.
}

export interface ITask {
  id: string
  name: string
  tasks?: ITask[]
  // TODO(@mgub): Refactor to only include only list of block identifiers and load them from the Redux store.
}

// TODO: IHorizontalLayout (contains IColumnLayouts)
// export type IBlockLayoutView = IBlockLayoutView | ITaskLayoutView

export interface IBlockLayoutView {
  id: string
  name: string
  columnViews: IBlockLayoutColumnView[]
  views: IViewStore
}

export interface ITaskLayoutView {
  id: string
  name: string
  columnViews: ITaskLayoutColumnView[]
  views: IViewStore
}

// TODO: Refactor this to also be an IBlockType
export interface IBlockLayoutColumnView {
  id: string
  name: string // TODO(@mgub): Make optional.
  blockViews?: IBlockView[]
}

export interface ITaskLayoutColumnView {
  id: string
  name: string // TODO(@mgub): Make optional.
  taskViews?: ITaskView[]
}

export interface IBlockView {
  id: string
  blockId: string
  hasFocus: boolean
}

export interface ITaskView {
  id: string
  taskId: string
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

export interface IState {
  blocks: IBlockMap
  tasks: ITaskMap
  layout: IBlockLayoutView
  taskLayout: ITaskLayoutView
  targetBlock: IBlockView
  pointerReferenceBlock: IBlockView
  targetTask: ITaskView
  views: IViewStore
  mode: ModeType
  menu: {
    isVisible: boolean
  }
  modal: IModalState
}

interface IModalState {
  isVisible: boolean
  view: React.Component
}

interface IBlockActions {
  create: "CREATE_BLOCK"
}

interface IActions {
  block: IBlockActions
}

interface IBlockMap {
  [id: number]: IBlock
}

interface ITaskMap {
  [id: number]: ITask
}

export type View = IBlockView | ITaskView

export interface IViewStore {
  [index: string]: View
}

export interface IHandleDropAction {
  reorderedBoards: IBlockLayoutColumnView[]
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

export interface IHandleDropTaskAction {
  addedIndex: any
  droppedColumnLayout: any
  element: any
  payload: any
  removedIndex: any
  targetTask: any
  layoutValue: any
}

export type ActionType = IHandleDropAction
