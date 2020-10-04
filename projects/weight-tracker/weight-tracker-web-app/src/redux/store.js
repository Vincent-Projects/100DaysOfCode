import { createStore } from "redux";
import loginReducer from "./reducers/loginReducer";

export default createStore(loginReducer);