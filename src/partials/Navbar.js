import React from 'react';
import { toggleSidebar } from '../functions/styles/jquery/toggleSidebar';
import { logOut } from '../auth/logOut';


export default function Navbar() {


    return (
      <header className="main-header " id="header">
                <nav className="navbar navbar-static-top navbar-expand-lg">
                    <button onClick={toggleSidebar} id="sidebar-toggler" className="sidebar-toggle">
                        <span className="sr-only">Toggle navigation</span>
                    </button>
                    <div className="search-form d-none d-lg-inline-block">
                        <div className="input-group">
                            <button type="button" name="search" id="search-btn" className="btn btn-flat">
                                <i className="mdi mdi-magnify"></i>
                            </button>
                            <input type="text" name="query" id="search-input" className="form-control"
                                placeholder="Chercher ..." autoFocus autoComplete="off" />
                        </div>
                        <div id="search-results-container">
                            <ul id="search-results"></ul>
                        </div>
                    </div>
                    <div>
                      <button className="logout-btn" onClick={logOut}>
                        Déconnexion
                      </button>
                      <button onClick={logOut}>
                        <span className="mdi mdi-logout"></span>
                      </button>
                    </div>
                </nav>
        </header>
    )
}
