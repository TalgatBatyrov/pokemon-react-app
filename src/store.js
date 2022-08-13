import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import mainReducer from "./redux/mainReducer";

const reducers = combineReducers({
    mainPage: mainReducer
})

const store = createStore(reducers, applyMiddleware(thunk));
window.__store__ = store
export default store;