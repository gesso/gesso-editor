import * as _ from "lodash"
import { createStore, combineReducers, Reducer } from "redux"
import { generateBlock } from "../model"
import * as database from "../services/store"
import {
  ITaskLayoutColumnView,
  IHandleDropBlockAction,
  IHandleDropColumnLayoutAction,
  IHandleDropTaskAction,
  IState,
  IBlock,
  ITask,
  ModeType,
  IBlockLayoutColumnView,
  INote
} from "../types"
import {
  SET_LAYOUT_ACTION,
  SET_MODE_ACTION,
  HANDLE_DROP_BLOCK_ACTION,
  HANDLE_DROP_BLOCK_COLUMN_LAYOUT_ACTION,
  CREATE_BLOCK_ACTION,
  SET_FOCUS_BLOCK_ACTION,
  UNSET_FOCUS_BLOCK_ACTION,
  SET_TARGET_BLOCK_VIEW_ACTION,
  RESET_TARGET_BLOCK_VIEW_ACTION,
  SET_POINTER_REFERENCE_BLOCK_VIEW_ACTION,
  RESET_POINTER_REFERENCE_BLOCK_VIEW_ACTION,
  HANDLE_DROP_TASK_ACTION,
  HANDLE_DROP_TASK_COLUMN_LAYOUT_ACTION,
  SET_FOCUS_TASK_ACTION,
  UNSET_FOCUS_TASK_ACTION,
  SET_TARGET_TASK_VIEW_ACTION,
  RESET_TARGET_TASK_VIEW_ACTION,
  OPEN_MENU_ACTION,
  CLOSE_MENU_ACTION,
  OPEN_MODAL_ACTION,
  CLOSE_MODAL_ACTION,
  HANDLE_DROP_NOTE_ACTION,
  SET_FOCUS_NOTE_ACTION,
  UNSET_FOCUS_NOTE_ACTION,
  SET_TARGET_NOTE_VIEW_ACTION,
  RESET_TARGET_NOTE_VIEW_ACTION
} from "./actions"
import * as utils from "../utils"

// ----------------------------------------------------------------------------
//
//  Actions.
//
// ----------------------------------------------------------------------------

const blocks: IBlock[] = database.fetchBlocks(40)
const tasks: ITask[] = database.fetchTasks(20)
const notes: INote[] = database.fetchNotes(20)

const initialState: IState = {
  blocks,
  tasks,
  notes,
  layout: null,
  taskLayout: null,
  noteLayout: null,
  targetBlock: null,
  pointerReferenceBlock: null,
  pointerReferrenceNote: null,
  targetTask: null,
  views: null,
  mode: "task",
  menu: {
    isVisible: true
  },
  modal: {
    isVisible: false,
    view: null
  }
}
console.log(`Initial state: ${JSON.stringify(initialState, null, 2)}`)

// Redux calls this with the state and an action that just happened.
// Returns the state.
//
// Rules:
// - This should model a DSL for the data manipulations required to
//   interact and manipulate the data model for the user's data; the UI
//   actions, and others to be defined. Each of these should be defined and
//   used with the same pattern.
// - Always return new objects when manipulating state. Never manipulate data
//   structures directely. In other words, only update the state in a functional
//   manner.
const reducer = (
  state: IState = initialState,
  action /*: ActionType */
): IState => {
  switch (action.type) {
    case SET_LAYOUT_ACTION:
      return setLayout(state, action)
    case SET_MODE_ACTION:
      return setMode(state, action)
    case HANDLE_DROP_BLOCK_ACTION:
      return handleDropBlock(state, action)
    case HANDLE_DROP_BLOCK_COLUMN_LAYOUT_ACTION:
      return handleDropBlockColumnLayout(state, action)
    case CREATE_BLOCK_ACTION:
      return createBlock(state, action)
    case SET_FOCUS_BLOCK_ACTION:
      return setFocusBlock(state, action)
    case UNSET_FOCUS_BLOCK_ACTION:
      return unsetFocusBlock(state, action)
    case SET_TARGET_BLOCK_VIEW_ACTION:
      return setTargetBlockView(state, action)
    case RESET_TARGET_BLOCK_VIEW_ACTION:
      return resetTargetBlockView(state, action)
    case SET_POINTER_REFERENCE_BLOCK_VIEW_ACTION:
      return setPointerReferenceBlockView(state, action)
    case RESET_POINTER_REFERENCE_BLOCK_VIEW_ACTION:
      return resetPointerReferenceBlockView(state, action)
    case HANDLE_DROP_TASK_ACTION:
      return handleDropTask(state, action)
    case HANDLE_DROP_TASK_COLUMN_LAYOUT_ACTION:
      return handleDropTaskColumnLayout(state, action)
    case SET_FOCUS_TASK_ACTION:
      return setFocusTask(state, action)
    case UNSET_FOCUS_TASK_ACTION:
      return unsetFocusTask(state, action)
    case SET_TARGET_TASK_VIEW_ACTION:
      return setTargetTaskView(state, action)
    case RESET_TARGET_TASK_VIEW_ACTION:
      return resetTargetTaskView(state, action)
    case HANDLE_DROP_NOTE_ACTION:
      return handleDropNote(state, action)
    case SET_FOCUS_NOTE_ACTION:
      return setFocusNote(state, action)
    case UNSET_FOCUS_NOTE_ACTION:
      return unsetFocusNote(state, action)
    case SET_TARGET_NOTE_VIEW_ACTION:
      return setTargetNoteView(state, action)
    case RESET_TARGET_NOTE_VIEW_ACTION:
      return resetTargetNoteView(state, action)
    case OPEN_MENU_ACTION:
      return openMenu(state, action)
    case CLOSE_MENU_ACTION:
      return closeMenu(state, action)
    case OPEN_MODAL_ACTION:
      return openModal(state, action)
    case CLOSE_MODAL_ACTION:
      return closeModal(state, action)
    default:
      return state
  }
}

// ----------------------------------------------------------------------------
//
//  Actions: Mode.
//
// ----------------------------------------------------------------------------

const setMode = (state: IState, action) => {
  const { mode } = action
  return {
    ...state,
    mode
  }
}

// ----------------------------------------------------------------------------
//
//  Actions: Layout.
//
// ----------------------------------------------------------------------------

const setLayout = (state: IState, action) => {
  return {
    ...state,
    layout: action.layout,
    taskLayout: action.taskLayout,
    noteLayout: action.noteLayout,
    views: {
      // <REFACTOR>
      ...state.views,
      ...action.layout.views,
      ...action.taskLayout.views,
      ...action.noteLayout.views
      // </REFACTOR>
    }
  }
}

// ----------------------------------------------------------------------------
//
//  Actions: Menu.
//
// ----------------------------------------------------------------------------

const openMenu = (state: IState, action) => {
  console.log("OPEN_MENU")
  return {
    ...state,
    menu: {
      ...state.menu,
      isVisible: true
    }
  }
}

const closeMenu = (state: IState, action) => {
  console.log("CLOSE_MENU")
  return {
    ...state,
    menu: {
      ...state.menu,
      isVisible: false
    }
  }
}

// ----------------------------------------------------------------------------
//
//  Actions: Modal.
//
// ----------------------------------------------------------------------------

const openModal = (state: IState, action) => {
  console.log("OPEN_MODAL")
  return {
    ...state,
    modal: {
      ...state.modal,
      isVisible: true,
      view: action.view
    }
  }
}

const closeModal = (state: IState, action) => {
  console.log("CLOSE_MODAL")
  return {
    ...state,
    modal: {
      ...state.modal,
      isVisible: false
    }
  }
}

// ----------------------------------------------------------------------------
//
//  Actions: Drag and drop.
//
// ----------------------------------------------------------------------------

const handleDropBlockColumnLayout = (
  state: IState,
  action: IHandleDropColumnLayoutAction
) => {
  // console.log(`Composing block ${JSON.stringify(payload)} in block ${JSON.stringify(this.state.targetBlock)}.`)
  // console.log(`Removing block ${JSON.stringify(payload)} from group ${}`)
  const {
    addedIndex,
    droppedColumnLayout,
    element,
    payload,
    removedIndex,
    // targetColumnLayout,
    layoutValue
  } = action

  // if (targetColumnLayout) {
  //   const reorderedColumnLayouts: IColumnLayout[] = layoutValue.columnLayouts.reduce(
  //     (value, columnLayout) => {
  //       if (columnLayout.id === droppedColumnLayout.id) {
  //         const reorderedColumnLayout = utils.applyComposeBlocks(
  //           columnLayout,
  //           { removedIndex, addedIndex, payload, element }, // dropResult
  //           droppedColumnLayout.id,
  //           // TODO(@mgub): [BUG] targetBlock is a split brain across this file and Layout.tsx. Move to Redux.
  //           targetColumnLayout,
  //           // Refactored:
  //           state,
  //           action
  //         )
  //         if (reorderedColumnLayout.blockViews.length > 0) {
  //           value.push(reorderedColumnLayout)
  //         }
  //         return value
  //       } else {
  //         value.push(columnLayout)
  //         return value
  //       }
  //     },
  //     []
  //   )

  //   // TOOD: Refactor
  //   return {
  //     ...state,
  //     groups: reorderedColumnLayouts
  //   }
  // } else {
  // TODO: <MOVE_INTO_HANDLE_DROP>
  /*
  console.log(
    `DROPPED in ${
      droppedColumnLayout.id
    }: removedIndex: ${removedIndex}, addedIndex: ${addedIndex}, payload: ${JSON.stringify(
      payload,
      null,
      2
    )}, element: ${element}}`
  )
  */

  // const columnLayouts = _.cloneDeep(layoutValue.columnLayouts)
  // const reorderedColumnLayouts: IColumnLayout[] = columnLayouts.reduce(
  //   (value, columnLayout) => {
  // if (columnLayout.id === droppedColumnLayout.id) {
  const reorderedColumnViews = utils.applyDragColumnLayout(
    layoutValue.columnViews,
    { removedIndex, addedIndex, payload, element } // dropResult
    // Refactored:
  )
  // value.push(reorderedColumnLayout)
  // return value
  // } else {
  //   value.push(columnLayout)
  //   return value
  // }
  //   },
  //   []
  // )

  // TOOD: Refactor
  return {
    ...state,
    layout: {
      ...state.layout,
      columnViews: reorderedColumnViews
    }
  } as IState
  // }
}

const handleDropBlock = (state: IState, action: IHandleDropBlockAction) => {
  console.log("handleDropBlock")
  const {
    addedIndex,
    droppedColumnLayout: droppedColumnLayoutView,
    element,
    payload,
    removedIndex,
    targetBlock,
    layoutValue
  } = action

  if (targetBlock) {
    // Compose the block in another.
    const reorderedColumnLayouts: ITaskLayoutColumnView[] = layoutValue.columnViews.reduce(
      (value, columnLayout) => {
        if (columnLayout.id === droppedColumnLayoutView.id) {
          const reorderedColumnLayout: IBlockLayoutColumnView = utils.applyComposeBlocks(
            columnLayout,
            { removedIndex, addedIndex, payload, element }, // dropResult
            droppedColumnLayoutView.id,
            // TODO(@mgub): [BUG] targetBlock is a split brain across this file and Layout.tsx. Move to Redux.
            targetBlock,
            // Refactored:
            state,
            action
          )
          if (reorderedColumnLayout.blockViews.length > 0) {
            value.push(reorderedColumnLayout)
          }
          return value
        } else {
          value.push(columnLayout)
          return value
        }
      },
      []
    )

    // TOOD: Refactor
    return {
      ...state,
      layout: {
        ...state.layout,
        columnViews: reorderedColumnLayouts
      }
    } as IState
  } else {
    // TODO: <MOVE_INTO_HANDLE_DROP>
    /*
    console.log(
      `DROPPED in ${
        droppedColumnLayoutView.id
      }: removedIndex: ${removedIndex}, addedIndex: ${addedIndex}, payload: ${JSON.stringify(
        payload,
        null,
        2
      )}, element: ${element}}`
    )
    */

    const columnViews = _.cloneDeep(layoutValue.columnViews)
    const reorderedColumnLayouts: ITaskLayoutColumnView[] = columnViews.reduce(
      (value, columnLayout) => {
        if (columnLayout.id === droppedColumnLayoutView.id) {
          const reorderedColumnLayout = utils.applyDragBlock(
            columnLayout,
            { removedIndex, addedIndex, payload, element } // dropResult
          )
          if (reorderedColumnLayout.blockViews.length > 0) {
            value.push(reorderedColumnLayout)
          }
          return value
        } else {
          value.push(columnLayout)
          return value
        }
      },
      []
    )

    // TOOD: Refactor
    return {
      ...state,
      layout: {
        ...state.layout,
        columnViews: reorderedColumnLayouts
      }
    } as IState
  }
}

// const applyCompose = (state: IState, action) => {
//   return
// }

// const applyDrag = (state: IState, action) => {
//   return
// }

// ----------------------------------------------------------------------------
//
//  Actions: Focus.
//
// ----------------------------------------------------------------------------

const setTargetBlockView = (state: IState, action) => {
  return {
    ...state,
    targetBlock: action.targetBlock
    // referenceBlock: action.
    // source: "POINTER_CLICK" // "POINTER_HOVER", "POINTER_DOUBLE_CLICK", "EYE_TRACKER"
  }
}

const resetTargetBlockView = (state: IState, action) => {
  return {
    ...state,
    targetBlock: null
  }
}

const setPointerReferenceBlockView = (state: IState, action) => {
  console.log("setPointerReferenceBlockView: " + action.referenceBlock)
  return {
    ...state,
    pointerReferenceBlock: action.referenceBlock
    // referenceBlock: action.
    // source: "POINTER_CLICK" // "POINTER_HOVER", "POINTER_DOUBLE_CLICK", "EYE_TRACKER"
  }
}

const resetPointerReferenceBlockView = (state: IState, action) => {
  return {
    ...state,
    pointerReferenceBlock: null
  }
}

// const setPointerReferenceBlockView = (state: IState, action) => {
//   const { view } = action
//   return {
//     ...state,
//     views: {
//       ...state.views,
//       [view.id]: {
//         ...view,
//         isPrimaryPointerReference: true
//       }
//     }
//   }
// }

// const resetPointerReferenceBlockView = (state: IState, action) => {
//   const { view } = action
//   return {
//     ...state,
//     views: {
//       ...state.views,
//       [view.id]: {
//         ...view,
//         isPrimaryPointerReference: false
//       }
//     }
//   }
// }

const setGazeReferenceBlockView = (state: IState, action) => {
  return {
    ...state,
    gazeReferenceBlock: action.referenceBlock
    // referenceBlock: action.
    // source: "POINTER_CLICK" // "POINTER_HOVER", "POINTER_DOUBLE_CLICK", "EYE_TRACKER"
  }
}

const resetGazeReferenceBlockView = (state: IState, action) => {
  return {
    ...state,
    gazeReferenceBlock: null
  }
}

const handleDropTaskColumnLayout = (
  state: IState,
  action: IHandleDropColumnLayoutAction
) => {
  // console.log(`Composing block ${JSON.stringify(payload)} in block ${JSON.stringify(this.state.targetBlock)}.`)
  // console.log(`Removing block ${JSON.stringify(payload)} from group ${}`)
  const {
    addedIndex,
    droppedColumnLayout,
    element,
    payload,
    removedIndex,
    // targetColumnLayout,
    layoutValue
  } = action

  // if (targetColumnLayout) {
  //   const reorderedColumnLayouts: IColumnLayout[] = layoutValue.columnLayouts.reduce(
  //     (value, columnLayout) => {
  //       if (columnLayout.id === droppedColumnLayout.id) {
  //         const reorderedColumnLayout = utils.applyComposeBlocks(
  //           columnLayout,
  //           { removedIndex, addedIndex, payload, element }, // dropResult
  //           droppedColumnLayout.id,
  //           // TODO(@mgub): [BUG] targetBlock is a split brain across this file and Layout.tsx. Move to Redux.
  //           targetColumnLayout,
  //           // Refactored:
  //           state,
  //           action
  //         )
  //         if (reorderedColumnLayout.blockViews.length > 0) {
  //           value.push(reorderedColumnLayout)
  //         }
  //         return value
  //       } else {
  //         value.push(columnLayout)
  //         return value
  //       }
  //     },
  //     []
  //   )

  //   // TOOD: Refactor
  //   return {
  //     ...state,
  //     groups: reorderedColumnLayouts
  //   }
  // } else {
  // TODO: <MOVE_INTO_HANDLE_DROP>
  /*
  console.log(
    `DROPPED in ${
      droppedColumnLayout.id
    }: removedIndex: ${removedIndex}, addedIndex: ${addedIndex}, payload: ${JSON.stringify(
      payload,
      null,
      2
    )}, element: ${element}}`
  )
  */

  // const columnLayouts = _.cloneDeep(layoutValue.columnLayouts)
  // const reorderedColumnLayouts: IColumnLayout[] = columnLayouts.reduce(
  //   (value, columnLayout) => {
  // if (columnLayout.id === droppedColumnLayout.id) {
  const reorderedColumnViews = utils.applyDragTaskColumnLayout(
    layoutValue.columnViews,
    { removedIndex, addedIndex, payload, element } // dropResult
    // Refactored:
  )
  // value.push(reorderedColumnLayout)
  // return value
  // } else {
  //   value.push(columnLayout)
  //   return value
  // }
  //   },
  //   []
  // )

  // TOOD: Refactor
  return {
    ...state,
    taskLayout: {
      ...state.layout,
      columnViews: reorderedColumnViews
    }
  } as IState
  // }
}

const handleDropTask = (
  state: IState,
  action: IHandleDropTaskAction
): IState => {
  console.log("handleDropTask")
  const {
    addedIndex,
    droppedColumnLayout: droppedColumnLayoutView,
    element,
    payload,
    removedIndex,
    targetTask,
    layoutValue
  } = action

  if (targetTask) {
    // Compose the block in another.
    /*
    const reorderedColumnLayouts: ITaskLayoutColumnView[] = layoutValue.columnViews.reduce(
      (value, columnLayout) => {
        if (columnLayout.id === droppedColumnLayoutView.id) {
          const reorderedColumnLayout: ITaskLayoutColumnView = utils.applyComposeBlocks(
            columnLayout,
            { removedIndex, addedIndex, payload, element }, // dropResult
            droppedColumnLayoutView.id,
            // TODO(@mgub): [BUG] targetBlock is a split brain across this file and Layout.tsx. Move to Redux.
            targetTask,
            // Refactored:
            state,
            action
          )
          if (reorderedColumnLayout.blockViews.length > 0) {
            value.push(reorderedColumnLayout)
          }
          return value
        } else {
          value.push(columnLayout)
          return value
        }
      },
      []
    )

    // TOOD: Refactor
    return {
      ...state,
      layout: {
        ...state.layout,
        columnViews: reorderedColumnLayouts
      }
    } as IState
    */
  } else {
    // TODO: <MOVE_INTO_HANDLE_DROP>
    /*
    console.log(
      `DROPPED in ${
        droppedColumnLayoutView.id
      }: removedIndex: ${removedIndex}, addedIndex: ${addedIndex}, payload: ${JSON.stringify(
        payload,
        null,
        2
      )}, element: ${element}}`
    )
    */
    console.log("Dropped task")

    const columnViews = _.cloneDeep(layoutValue.columnViews)
    const reorderedColumnLayouts: ITaskLayoutColumnView[] = columnViews.reduce(
      (value, columnLayoutView) => {
        if (columnLayoutView.id === droppedColumnLayoutView.id) {
          const reorderedColumnLayout: ITaskLayoutColumnView = utils.applyDragTask(
            columnLayoutView,
            { removedIndex, addedIndex, payload, element } // dropResult
          )
          if (reorderedColumnLayout.taskViews.length > 0) {
            value.push(reorderedColumnLayout)
          }
          return value
        } else {
          value.push(columnLayoutView)
          return value
        }
      },
      []
    )

    // TOOD: Refactor
    return {
      ...state,
      taskLayout: {
        ...state.layout,
        columnViews: reorderedColumnLayouts
      }
    }
  }
}

const handleDropNote = (
  state: IState,
  action: IHandleDropTaskAction
): IState => {
  // TODO(@mgub): Implement drop action.
  return {
    ...state
  }
}

const setTargetTaskView = (state: IState, action) => {
  return {
    ...state,
    targetTask: action.targetTask
  }
}

const resetTargetTaskView = (state: IState, action) => {
  return {
    ...state,
    targetTask: null
  }
}

const setTargetNoteView = (state: IState, action) => {
  return {
    ...state,
    targetNote: action.targetNote
  }
}

const resetTargetNoteView = (state: IState, action) => {
  return {
    ...state,
    targetTask: null
  }
}

// ----------------------------------------------------------------------------
//
//  Blocks.
//
// ----------------------------------------------------------------------------

const createBlock = (state: IState, action) => {
  const block = generateBlock()
  return {
    ...state,
    // blocks: [...state.blocks, generateBlock()]
    blocks: { ...state.blocks, [block.id]: block }
  }
}

const setFocusBlock = (state: IState, action) => {
  const { view } = action
  return {
    ...state,
    views: {
      ...state.views,
      [view.id]: {
        ...view,
        hasFocus: true
      }
    }
  }
}

const unsetFocusBlock = (state: IState, action) => {
  const { view } = action
  return {
    ...state,
    views: {
      ...state.views,
      [view.id]: {
        ...view,
        hasFocus: false
      }
    }
  }
}

const setFocusTask = (state: IState, action) => {
  const { view } = action
  return {
    ...state,
    views: {
      ...state.views,
      [view.id]: {
        ...view,
        hasFocus: true
      }
    }
  }
}

const unsetFocusTask = (state: IState, action) => {
  const { view } = action
  return {
    ...state,
    views: {
      ...state.views,
      [view.id]: {
        ...view,
        hasFocus: false
      }
    }
  }
}

const setFocusNote = (state: IState, action) => {
  const { view } = action
  return {
    ...state,
    views: {
      ...state.views,
      [view.id]: {
        ...view,
        hasFocus: true
      }
    }
  }
}

const unsetFocusNote = (state: IState, action) => {
  const { view } = action
  return {
    ...state,
    views: {
      ...state.views,
      [view.id]: {
        ...view,
        hasFocus: false
      }
    }
  }
}

// Create Redux store.
// TODO(mgub): Enable Redux store.
/* eslint-disable no-underscore-dangle */
export const store = createStore(
  reducer,
  // @ts-ignore: Unreachable code error
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
/* eslint-enable */

// Reference:
// - https://medium.com/@resir014/a-type-safe-approach-to-redux-stores-in-typescript-6474e012b81e
// export const reducers: Reducer<ApplicationState> = combineReducers<
// export const reducers: Reducer<IState> = combineReducers<IState>({
//   application: reducer
//   // router: routerReducer,
//   // chat: chatReducer,
//   // layout: layoutReducer
// })

export const getStore = () => {
  return store
}

// Initialize.
// export const initializeLayout = () => {
store.dispatch({
  type: "SET_LAYOUT",
  layout: database.fetchBlockViewLayout(5, blocks),
  taskLayout: database.fetchTaskViewLayout(4, 4, tasks),
  noteLayout: database.fetchNoteViewLayout(4, 4, notes)
})
// }
