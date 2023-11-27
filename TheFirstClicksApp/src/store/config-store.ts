import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import{rootReducer} from './root-reducer';

export default function configStore () {
    const isProduction: boolean = process.env.NODE_ENV === 'production';
    const withImmutableStateInvariant = process.env.REACT_APP_WITH_IMMUTABLE_STATE_INVARIANT;

    const middlewares = !isProduction && withImmutableStateInvariant
        ? [require('redux-immutable-state-invariant').default(), thunkMiddleware]
        : [thunkMiddleware]; // more middleware
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const enhancers = [middlewareEnhancer]; // more enhancers
    const composedEnhancers = isProduction ? middlewareEnhancer : composeWithDevTools(...enhancers);

    const store: any = createStore(rootReducer(), composedEnhancers);
    store.asyncReducers = {};
    return store;
}
