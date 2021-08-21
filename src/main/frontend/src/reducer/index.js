import { combineReducers } from "redux";
import authReducer from "./authReducer";
import categoryReducer from './categoryReducer';

const rootReducer = combineReducers({
    authState: authReducer,
    categoryState: categoryReducer
})

export default rootReducer