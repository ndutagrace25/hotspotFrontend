import {
    applyMiddleware,
    createStore
} from 'redux';
import rootReducer from '../components/reducers';
import thunk from 'redux-thunk';
const middleware = [thunk];

const testStore = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
    return createStoreWithMiddleware(rootReducer, initialState);
}
export default testStore;