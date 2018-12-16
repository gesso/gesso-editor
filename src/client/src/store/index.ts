import * as _ from "lodash"
import { createStore } from "redux"
import { generateBlock } from "../model"
import * as database from "../services/store"
import {
  IColumnLayout,
  IHandleDropBlockAction,
  IHandleDropColumnLayoutAction,
  IState
} from "../types"
import * as utils from "../utils"

// Actions

const blocks = database.fetchBlocks(100)

const initialState: IState = {
  blocks,
  layout: null,
  targetBlock: null,
  views: null,
  mode: null,
  menu: {
    isVisible: true
  },
  modal: {
    isVisible: false
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
    case "HANDLE_DROP_COLUMN_LAYOUT":
      return handleDropColumnLayout(state, action)
    case "CREATE_BLOCK":
      return createBlock(state, action)
    case "SET_FOCUS_BLOCK":
      return setFocusBlock(state, action)
    case "UNSET_FOCUS_BLOCK":
      return unsetFocusBlock(state, action)
    case "HANDLE_DROP_BLOCK":
      return handleDropBlock(state, action)
    case "SET_TARGET_BLOCK_VIEW":
      return setTargetBlockView(state, action)
    case "RESET_TARGET_BLOCK_VIEW":
      return resetTargetBlockView(state, action)
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

const setLayout = (state: IState, action) => {
  // console.log("Setting layout.")
  return {
    ...state,
    layout: action.layout,
    views: {
      ...state.views,
      ...action.layout.views
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
      isVisible: true
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
  console.log(
    `DROPPED in ${
      droppedColumnLayout.id
    }: removedIndex: ${removedIndex}, addedIndex: ${addedIndex}, payload: ${JSON.stringify(
      payload,
      null,
      2
    )}, element: ${element}}`
  )

  // const columnLayouts = _.cloneDeep(layoutValue.columnLayouts)
  // const reorderedColumnLayouts: IColumnLayout[] = columnLayouts.reduce(
  //   (value, columnLayout) => {
  // if (columnLayout.id === droppedColumnLayout.id) {
  const reorderedColumnLayouts = utils.applyDragColumnLayout(
    layoutValue.columnLayouts,
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
      columnLayouts: reorderedColumnLayouts
    }
  } as IState
  // }
}

const handleDropBlock = (state: IState, action: IHandleDropBlockAction) => {
  // console.log(`Composing block ${JSON.stringify(payload)} in block ${JSON.stringify(this.state.targetBlock)}.`)
  // console.log(`Removing block ${JSON.stringify(payload)} from group ${}`)
  const {
    addedIndex,
    droppedColumnLayout,
    element,
    payload,
    removedIndex,
    targetBlock,
    layoutValue
  } = action

  if (targetBlock) {
    const reorderedColumnLayouts: IColumnLayout[] = layoutValue.columnLayouts.reduce(
      (value, columnLayout) => {
        if (columnLayout.id === droppedColumnLayout.id) {
          const reorderedColumnLayout = utils.applyComposeBlocks(
            columnLayout,
            { removedIndex, addedIndex, payload, element }, // dropResult
            droppedColumnLayout.id,
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
        columnLayouts: reorderedColumnLayouts
      }
    } as IState
  } else {
    // TODO: <MOVE_INTO_HANDLE_DROP>
    console.log(
      `DROPPED in ${
        droppedColumnLayout.id
      }: removedIndex: ${removedIndex}, addedIndex: ${addedIndex}, payload: ${JSON.stringify(
        payload,
        null,
        2
      )}, element: ${element}}`
    )

    const columnLayouts = _.cloneDeep(layoutValue.columnLayouts)
    const reorderedColumnLayouts: IColumnLayout[] = columnLayouts.reduce(
      (value, columnLayout) => {
        if (columnLayout.id === droppedColumnLayout.id) {
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
        columnLayouts: reorderedColumnLayouts
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
  }
}

const resetTargetBlockView = (state: IState, action) => {
  return {
    ...state,
    targetBlock: null
  }
}

// ----------------------------------------------------------------------------
//
//  Blocks.
//
// ----------------------------------------------------------------------------

const createBlock = (state: IState, action) => {
  console.log("Creating block")
  console.log(`block: ${JSON.stringify(state.blocks, null, 2)}`)
  const block = generateBlock()
  return {
    ...state,
    // blocks: [...state.blocks, generateBlock()]
    blocks: { ...state.blocks, [block.id]: block }
  }
}

const setFocusBlock = (state: IState, action) => {
  console.log(action)
  const { view } = action
  view.hasFocus = true
  return {
    ...state,
    views: {
      ...state.views,
      [action.view.id]: action.view
    }
  }
}

const unsetFocusBlock = (state: IState, action) => {
  action.view.hasFocus = false
  const { view } = action
  view.hasFocus = false
  return {
    ...state,
    views: {
      ...state.views,
      [action.view.id]: action.view
    }
  }
}

// Create Redux store.
// TODO(mgub): Enable Redux store.
export const store = createStore(reducer)

export const getStore = () => {
  return store
}

// Initialize.
store.dispatch({
  type: "SET_LAYOUT",
  layout: database.fetchLayout(10, blocks)
})
