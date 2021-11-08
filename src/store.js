import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from './redux/index';

function saveToLocalStorage(state){
    try{
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    }catch(e){
        console.log(e);
    }
}
function loadFromLocalStorage(){
    try{
        const serializedState = localStorage.getItem('state')
        if(serializedState === null) return undefined
        return JSON.parse(serializedState);
    }catch(e){
        console.log(e);
        return undefined
    }

}

const presistedState = loadFromLocalStorage()
let store = undefined;

if(process.env.NODE_ENV === "development" && window.__REDUX_DEVTOOLS_EXTENSION__){
    store = createStore(reducer,presistedState, compose(applyMiddleware(thunk.withExtraArgument()), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
}
else {
    store = createStore(reducer,presistedState, compose(applyMiddleware(thunk.withExtraArgument())));
}

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;