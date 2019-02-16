import {
  SetLayoutActionString,
  SetModeActionString,
  HandleDropBlockActionString,
  HandleDropBlockColumnLayoutActionString,
  CreateBlockActionString,
  SetFocusBlockActionString,
  UnsetFocusBlockActionString,
  HandleDropTaskActionString,
  HandleDropTaskColumnLayoutActionString,
  SetFocusTaskActionString,
  UnsetFocusTaskActionString,
  SetTargetBlockViewActionString,
  ResetTargetBlockViewActionString,
  SetPointerReferenceBlockViewActionString,
  ResetPointerReferenceBlockViewActionString,
  SetTargetTaskViewActionString,
  ResetTargetTaskViewActionString,
  OpenMenuActionString,
  CloseMenuActionString,
  OpenModalActionString,
  CloseModalActionString
} from "./types"

// Application layout actions.
export const SET_LAYOUT_ACTION: SetLayoutActionString = "SET_LAYOUT"

// Application mode actions.
export const SET_MODE_ACTION: SetModeActionString = "SET_MODE"

// Block layout actions.
export const CREATE_BLOCK_ACTION: CreateBlockActionString = "CREATE_BLOCK"
export const HANDLE_DROP_BLOCK_COLUMN_LAYOUT_ACTION: HandleDropBlockColumnLayoutActionString =
  "HANDLE_DROP_BLOCK_COLUMN_LAYOUT"
export const HANDLE_DROP_BLOCK_ACTION: HandleDropBlockActionString =
  "HANDLE_DROP_BLOCK"
export const SET_FOCUS_BLOCK_ACTION: SetFocusBlockActionString =
  "SET_FOCUS_BLOCK"
export const UNSET_FOCUS_BLOCK_ACTION: UnsetFocusBlockActionString =
  "UNSET_FOCUS_BLOCK"
export const SET_TARGET_BLOCK_VIEW_ACTION: SetTargetBlockViewActionString =
  "SET_TARGET_BLOCK_VIEW"
export const RESET_TARGET_BLOCK_VIEW_ACTION: ResetTargetBlockViewActionString =
  "RESET_TARGET_BLOCK_VIEW"

// Task layout actions.
export const HANDLE_DROP_TASK_COLUMN_LAYOUT_ACTION: HandleDropTaskColumnLayoutActionString =
  "HANDLE_DROP_TASK_COLUMN_LAYOUT"
export const HANDLE_DROP_TASK_ACTION: HandleDropTaskActionString =
  "HANDLE_DROP_TASK"
export const SET_FOCUS_TASK_ACTION: SetFocusTaskActionString = "SET_FOCUS_TASK"
export const UNSET_FOCUS_TASK_ACTION: UnsetFocusTaskActionString =
  "UNSET_FOCUS_TASK"
export const SET_TARGET_TASK_VIEW_ACTION: SetTargetTaskViewActionString =
  "SET_TARGET_TASK_VIEW"
export const RESET_TARGET_TASK_VIEW_ACTION: ResetTargetTaskViewActionString =
  "RESET_TARGET_TASK_VIEW"

// Interactivity actions.
export const SET_POINTER_REFERENCE_BLOCK_VIEW_ACTION: SetPointerReferenceBlockViewActionString =
  "SET_POINTER_REFERENCE_BLOCK_VIEW"
export const RESET_POINTER_REFERENCE_BLOCK_VIEW_ACTION: ResetPointerReferenceBlockViewActionString =
  "RESET_POINTER_REFERENCE_BLOCK_VIEW"

// Menu actions.
export const OPEN_MENU_ACTION: OpenMenuActionString = "OPEN_MENU"
export const CLOSE_MENU_ACTION: CloseMenuActionString = "CLOSE_MENU"

// Modal actions.
export const OPEN_MODAL_ACTION: OpenModalActionString = "OPEN_MODAL"
export const CLOSE_MODAL_ACTION: CloseModalActionString = "CLOSE_MODAL"
