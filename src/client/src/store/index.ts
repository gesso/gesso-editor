import * as _ from "lodash"
import { createStore } from "redux"
import { generateBlock } from "../model"
import * as database from "../services/store"
import {
  IBlockLayoutColumnView,
  IHandleDropBlockAction,
  IHandleDropColumnLayoutAction,
  IState,
  IBlock,
  ITask,
  ModeType
} from "../types"
import * as utils from "../utils"

// Actions

const blocks: IBlock[] = database.fetchBlocks(20)
const tasks: ITask[] = database.fetchTasks(20)

const initialState: IState = {
  blocks,
  tasks,
  layout: null,
  taskLayout: null,
  targetBlock: null,
  pointerReferenceBlock: null,
  targetTask: null,
  views: null,
  mode: "block",
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
    case "SET_LAYOUT":
      return setLayout(state, action)
    case "SET_MODE":
      return setMode(state, action)
    case "HANDLE_DROP_BLOCK_COLUMN_LAYOUT":
      return handleDropColumnLayout(state, action)
    case "CREATE_BLOCK":
      return createBlock(state, action)
    case "SET_FOCUS_BLOCK":
      return setFocusBlock(state, action)
    case "UNSET_FOCUS_BLOCK":
      return unsetFocusBlock(state, action)
    case "SET_FOCUS_TASK":
      return setFocusTask(state, action)
    case "UNSET_FOCUS_TASK":
      return unsetFocusTask(state, action)
    case "HANDLE_DROP_BLOCK":
      return handleDropBlock(state, action)
    case "SET_TARGET_BLOCK_VIEW":
      return setTargetBlockView(state, action)
    case "RESET_TARGET_BLOCK_VIEW":
      return resetTargetBlockView(state, action)
    case "SET_POINTER_REFERENCE_BLOCK_VIEW":
      return setPointerReferenceBlockView(state, action)
    case "RESET_POINTER_REFERENCE_BLOCK_VIEW":
      return resetPointerReferenceBlockView(state, action)
    case "SET_TARGET_TASK_VIEW":
      return setTargetTaskView(state, action)
    case "RESET_TARGET_TASK_VIEW":
      return resetTargetTaskView(state, action)
    case "OPEN_MENU":
      return openMenu(state, action)
    case "CLOSE_MENU":
      return closeMenu(state, action)
    case "OPEN_MODAL":
      return openModal(state, action)
    case "CLOSE_MODAL":
      return closeModal(state, action)
    default:
      return state
  }
}

// ----------------------------------------------------------------------------
//
//  Layout.
//
// ----------------------------------------------------------------------------

const setMode = (state: IState, action) => {
  const { mode } = action
  return {
    ...state,
    mode
  }
}

const setLayout = (state: IState, action) => {
  return {
    ...state,
    layout: action.layout,
    taskLayout: action.taskLayout,
    views: {
      ...state.views,
      ...action.layout.views,
      ...action.taskLayout.views
    }
  }
}

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

const handleDropColumnLayout = (
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
    const reorderedColumnLayouts: IBlockLayoutColumnView[] = layoutValue.columnViews.reduce(
      (value, columnLayout) => {
        if (columnLayout.id === droppedColumnLayoutView.id) {
          const reorderedColumnLayout = utils.applyComposeBlocks(
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
    const reorderedColumnLayouts: IBlockLayoutColumnView[] = columnViews.reduce(
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

// Create Redux store.
// TODO(mgub): Enable Redux store.
export const store = createStore(
  reducer
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export const getStore = () => {
  return store
}

// Initialize.
// export const initializeLayout = () => {
store.dispatch({
  type: "SET_LAYOUT",
  layout: database.fetchBlockViewLayout(10, blocks),
  taskLayout: database.fetchTaskViewLayout(4, 4, tasks)
})
// }
