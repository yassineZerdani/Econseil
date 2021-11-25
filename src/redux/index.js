import { combineReducers } from 'redux'
import docsReducer from './documents/reducer';
import procedureReducer from './procorgs/reducer';
import actorsReducer from './acteurs/reducer';
import procmetsReducer from './procmets/reducer';
import vueensReducer from './vueens/reducer';
import opReducer from './operations/reducer';
import sidebarReducer from './sidebar/reducer';
import actorSidebarReducer from './navbar/acteur/reducer';
import procmetSidebarReducer from './navbar/procmet/reducer';
import procorgSidebarReducer from './navbar/procorg/reducer';
import subReducer from './sidebar/subs/reducer';
import sidebarToggleReducer from './sidebar/toggle/reducer';

export default combineReducers({
    sidebar_toggle: sidebarToggleReducer,
    actor_sidebar: actorSidebarReducer,
    procmet_sidebar: procmetSidebarReducer,
    procorg_sidebar: procorgSidebarReducer,
    sidebar: sidebarReducer,
    documents: docsReducer,
    procorgs: procedureReducer,
    acteurs: actorsReducer,
    procmets: procmetsReducer,
    vueensemble: vueensReducer,
    operations: opReducer,
    sidebar_collapsed: subReducer,
    
})
