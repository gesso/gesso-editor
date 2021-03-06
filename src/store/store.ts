import * as _ from "lodash";
import { createStore } from "redux";
import { generateBlock } from "../model";
import * as database from "../services/database";
import { IBlock, IColumnLayout, IState } from "../types";
import * as utils from "../utils";

// Actions

const blocks = database.fetchBlocks(20);

const initialState: IState = {
  blocks,
  layout: null,
  targetBlock: null,
  views: null
};
console.log(`Initial state: ${JSON.stringify(initialState, null, 2)}`);

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
const reducer = (state: IState = initialState, action /*: ActionType */) => {
  switch (action.type) {
    case "SET_LAYOUT":
      return setLayout(state, action);
    case "CREATE_BLOCK":
      return createBlock(state, action);
    case "HANDLE_DROP":
      return handleDrop(state, action);
    case "SET_TARGET_BLOCK_VIEW":
      return setTargetBlockView(state, action);
    case "RESET_TARGET_BLOCK_VIEW":
      return resetTargetBlockView(state, action);
    default:
      return state;
  }
};

const createBlock = (state: IState, action) => {
  console.log("Creating block");
  console.log(`block: ${JSON.stringify(state.blocks, null, 2)}`);
  return {
    ...state,
    blocks: [...state.blocks, generateBlock()]
  };
};

const setLayout = (state: IState, action) => {
  console.log("Setting layout.");
  return {
    ...state,
    layout: action.layout,
    views: {
      ...state.views,
      ...action.layout.views
    }
  };
};

const handleDrop = (state: IState, action) => {
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
  } = action;

  if (targetBlock) {
    const reorderedColumnLayouts: IColumnLayout[] = layoutValue.columnLayouts.reduce(
      (value, groupState) => {
        if (groupState.id === droppedColumnLayout.id) {
          const reorderedColumnLayout = utils.applyCompose(
            groupState,
            { removedIndex, addedIndex, payload, element }, // dropResult
            droppedColumnLayout.id,
            // TODO(@mgub): [BUG] targetBlock is a split brain across this file and Layout.tsx. Move to Redux.
            targetBlock,
            // Refactored:
            state,
            action
          );
          if (reorderedColumnLayout.blockViews.length > 0) {
            value.push(reorderedColumnLayout);
          }
          return value;
        } else {
          value.push(groupState);
          return value;
        }
      },
      []
    );

    // TOOD: Refactor
    return {
      ...state,
      groups: reorderedColumnLayouts
    };
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
    );

    const reorderedColumnLayouts: IColumnLayout[] = layoutValue.columnLayouts.reduce(
      (value, columnLayout) => {
        if (columnLayout.id === droppedColumnLayout.id) {
          const reorderedColumnLayout = utils.applyDrag(
            columnLayout,
            { removedIndex, addedIndex, payload, element }, // dropResult
            // Refactored:
            state,
            action
          );
          if (reorderedColumnLayout.blockViews.length > 0) {
            value.push(reorderedColumnLayout);
          }
          return value;
        } else {
          value.push(columnLayout);
          return value;
        }
      },
      []
    );

    // TOOD: Refactor
    return {
      ...state,
      groups: reorderedColumnLayouts
    };
  }
};

const applyCompose = (state: IState, action) => {
  return;
};

const applyDrag = (state: IState, action) => {
  return;
};

const setTargetBlockView = (state: IState, action) => {
  return {
    ...state,
    targetBlock: action.targetBlock
  };
};

const resetTargetBlockView = (state: IState, action) => {
  return {
    ...state,
    targetBlock: null
  };
};

// Create Redux store.
// TODO(mgub): Enable Redux store.
export const store = createStore(reducer);

export const getStore = () => {
  return store;
};

// Initialize.
store.dispatch({
  type: "SET_LAYOUT",
  layout: database.fetchLayout(10, blocks)
});
