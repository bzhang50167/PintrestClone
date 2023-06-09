import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import postReducer from './post';
import commentReducer from './comment';
import boardReducer from './boards';
import threadsReducer from './threads';
import messageReducer from './messages';

const rootReducer = combineReducers({
  session,
  post: postReducer,
  comments: commentReducer,
  boards: boardReducer,
  messages:messageReducer,
  threads:threadsReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
