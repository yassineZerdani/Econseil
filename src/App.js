import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './screens/LogIn/Login';
import Navbar from './partials/Navbar';
import Sidebar from './partials/Sidebar';
import VueEnsemble from './screens/Processus/VueEnsemble';
import IndexProcessus from './screens/Processus/IndexProcessus';
import Home from './screens/Home/Home';
import DocumentsAnnex from './screens/DocumentsUtiles/DocumentsAnnex';
import ActeursInternes from './screens/Organisation/ActeursInternes';
import Acteur from './screens/Organisation/Acteur';
import OrganigrammeGeneral from './screens/Organisation/OrganigrammeGeneral';
import IndexProcedure from './screens/Procedure/IndexProcedure';
import ProcessusOrganisationnel from './screens/Procedure/ProcessusOrganisationnel';
import ProcessusAchat from './screens/Processus/ProcessusAchat';
import Operation from './screens/Procedure/Operation';
import ActeursRattache from './screens/Organisation/ActeursRattache';
import OperationActeurs from './screens/Procedure/OperationActeurs';


function App() {

  const token = localStorage.getItem("token");

  if(!token){
    return(
      <Login />
    )
  }

  return (
    <Router>
      <div className="mobile-sticky-body-overlay"></div>
      <Sidebar/>
      <div className="page-wrapper">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/documents-utiles">
            <DocumentsAnnex />
          </Route>
          <Route path="/acteurs">
            <ActeursInternes />
          </Route>
          <Route path="/organigramme">
            <OrganigrammeGeneral />
          </Route>
          <Route path="/procedures">
            <IndexProcedure />
          </Route>
          <Route path="/processus">
            <IndexProcessus />
          </Route>
          <Route path="/vue-ensemble">
            <VueEnsemble />
          </Route>
          <Route path="/ProcessusOrganisationnel/:id" component={ProcessusOrganisationnel}></Route>
          <Route path="/ProcessusAchat/:id" component={ProcessusAchat}></Route>
          <Route path="/acteur/:id" component={Acteur}></Route>
          <Route path="/acteurs-rattache/:id" component={ActeursRattache}></Route>
          <Route path="/operation/:id" component={Operation}></Route>
          <Route path="/operation-acteurs/:id" component={OperationActeurs}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
