import * as _ from "lodash";
import { createStore } from "redux";
import { generateBlock } from "../model";
import * as database from "../services/database";
import { IBlock, IColumnLayout, IState } from "../types";

// Actions

const blocks = database.fetchBlocks(20);

const initialState: IState = {
  blocks,
  layout: database.fetchLayout(10, blocks),
  targetBlock: null
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
    case "CREATE_BLOCK":
      return createBlock(state, action);
    case "HANDLE_DROP":
      return handleDrop(state, action);
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

const handleDrop = (state, action) => {
  return {
    ...state,
    groups: action.reorderedBoards
  };
};

// Create Redux store.
// TODO(mgub): Enable Redux store.
export const store = createStore(reducer);

export const getStore = () => {
  return store;
};
