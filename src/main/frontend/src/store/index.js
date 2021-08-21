import rootReducer from '../reducer'
import {applyMiddleware, createStore} from "redux"
import createSagaMiddleware from '@redux-saga/core';
import {composeWithDevTools} from "redux-devtools-extension"
import {rootSaga} from '../saga'

const sagaMiddleware = createSagaMiddleware()

const configureStore = () => {
    const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(sagaMiddleware))
    )

    sagaMiddleware.run(rootSaga)

    return store
}

export default configureStore