import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
// export default function configureStore(initialState) {
//     const store = createStore(rootReducer);
//     return store;
// };
export default createStore(
    rootReducer,
    applyMiddleware(thunk)
);
