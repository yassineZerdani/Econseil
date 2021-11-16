import { combineReducers } from 'redux'
import docsReducer from './documents/reducer';
import procedureReducer from './procorgs/reducer';
import actorsReducer from './acteurs/reducer';
import procmetsReducer from './procmets/reducer';
import vueensReducer from './vueens/reducer';
import appReducer from './application/reducer';
import diagReducer from './diagramme/reducer';
import opReducer from './operations/reducer';
import sidebarReducer from './sidebar/reducer';


export default combineReducers({

    sidebar: sidebarReducer,
    documents: docsReducer,
    procorgs: procedureReducer,
    acteurs: actorsReducer,
    procmets: procmetsReducer,
    vueensemble: vueensReducer,
    application: appReducer,
    diagramme: diagReducer,
    operations: opReducer
    
})
