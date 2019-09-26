import { createStore } from "redux";

import reducer from "./todoReducer";

const store = createStore(reducer);

export default store;
