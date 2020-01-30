import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { NgModule } from '@angular/core';
import { applyMiddleware, combineReducers, createStore, Action } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { inventoryReducer, InventoryState } from './inventory';

export interface RootState {
  inventory: InventoryState;
}

const configureStore = () => {
  const rootReducer = combineReducers<RootState, Action<any>>({
    inventory: inventoryReducer
  });
  const store = createStore(
    rootReducer,
    undefined,
    composeWithDevTools(applyMiddleware(thunk))
  );
  return { store };
};

@NgModule({
  imports: [NgReduxModule]
})
export class StoreModule {
  constructor(ngRedux: NgRedux<RootState>) {
    ngRedux.provideStore(configureStore().store);
  }
}
