import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { InventoryAction, inventoryReducer, InventoryState } from "./inventory";

export type RootAction = InventoryAction;

export interface RootState {
  inventory: InventoryState;
}

export const configureStore = () => {
  const rootReducer = combineReducers<RootState, RootAction>({
    inventory: inventoryReducer
  });
  const store = createStore(
    rootReducer,
    undefined,
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
};
