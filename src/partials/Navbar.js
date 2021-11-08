import React, { useState } from 'react';
import { toggleSidebar } from '../functions/styles/jquery/toggleSidebar';
import { logOut } from '../auth/logOut';


export default function Navbar() {


    return (
      <header class="main-header " id="header">
                <nav class="navbar navbar-static-top navbar-expand-lg">
                    <button onClick={toggleSidebar} id="sidebar-toggler" class="sidebar-toggle">
                        <span class="sr-only">Toggle navigation</span>
                    </button>
                    <div class="search-form d-none d-lg-inline-block">
                        <div class="input-group">
                            <button type="button" name="search" id="search-btn" class="btn btn-flat">
                                <i class="mdi mdi-magnify"></i>
                            </button>
                            <input type="text" name="query" id="search-input" class="form-control"
                                placeholder="Chercher ..." autofocus autocomplete="off" />
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
