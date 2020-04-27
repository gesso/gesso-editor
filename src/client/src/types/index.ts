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

// TODO: IHorizontalLayout (contains IColumnLayouts)
// export type IBlockLayoutView = IBlockLayoutView | ITaskLayoutView
export interface IBlockView {
  id: string
  blockId: string
  hasFocus: boolean
}

export interface IBlockLayoutView {
  id: string
  name: string
  columnViews: IBlockLayoutColumnView[]
  views: IViewStore
}

// TODO: Refactor this to also be an IBlockType
export interface IBlockLayoutColumnView {
  id: string
  name: string // TODO(@mgub): Make optional.
  blockViews?: IBlockView[]
}

export interface ITask {
  id: string
  name: string
  tasks?: ITask[]
  // TODO(@mgub): Refactor to only include only list of block identifiers and load them from the Redux store.
}

export interface ITaskView {
  id: string
  taskId: string
  hasFocus: boolean
}

export interface ITaskLayoutView {
  id: string
  name: string
  columnViews: ITaskLayoutColumnView[]
  views: IViewStore
}

export interface ITaskLayoutColumnView {
  id: string
  name: string // TODO(@mgub): Make optional.
  taskViews?: ITaskView[]
}

export interface INote {
  id: string
  name: string
  notes?: INote[]
}

export interface INoteLayoutView {
  id: string
  name: string
  views: IViewStore
  noteViews?: INoteView[]
}

export interface INoteView {
  id: string
  noteId: string
  hasFocus: boolean
}

// ----------------------------------------------------------------------------
//
//  Modes.
//
// ----------------------------------------------------------------------------

type BlockType = "block"

type TaskType = "task"

type CodeType = "code"

type NoteType = "note"

export interface IBlockMode {
  type: BlockType
}

export interface ITaskMode {
  type: BlockType
}

export interface IEditorMode {
  type: CodeType
}

export interface INoteMode {
  type: NoteType
}

export type ModeType = CodeType | BlockType | TaskType | NoteType

export type IMode = IBlockMode | ITaskMode | IEditorMode | INoteMode

// export interface IApplication {
//   mode: IMode
// }

// ----------------------------------------------------------------------------
//
//  Redux.
//
// ----------------------------------------------------------------------------

export interface IState {
  blocks: IBlockMap
  tasks: ITaskMap
  notes: INoteMap
  layout: IBlockLayoutView
  taskLayout: ITaskLayoutView
  noteLayout: INoteLayoutView
  targetBlock: IBlockView
  pointerReferenceBlock: IBlockView
  pointerReferrenceNote: INoteView
  targetTask: ITaskView
  views: IViewStore
  mode: ModeType
  menu: IMenuState
  modal: IModalState
}

export interface IModalState {
  isVisible: boolean
  view: React.Component
}

export interface IMenuState {
  isVisible: boolean
}

interface IBlockActions {
  create: "CREATE_BLOCK"
}

interface IActions {
  block: IBlockActions
}

interface IEntityMap<T> {
  [id: number]: T
}

type IBlockMap = IEntityMap<IBlock>

type ITaskMap = IEntityMap<ITask>

type INoteMap = IEntityMap<INote>

export type View = IBlockView | ITaskView | INoteView

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

export interface ICreateBlockActionMessage {
  type: "CREATE_BLOCK"
}

export type ActionType = IHandleDropAction
