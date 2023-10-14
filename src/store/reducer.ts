import {combineReducers} from "redux";
import {mapSlice} from "components/Map/slice";
import {panelSlice} from "components/Panel/slice";

export const createRootReducer = () => combineReducers({
    map: mapSlice.reducer,
    panel: panelSlice.reducer
});