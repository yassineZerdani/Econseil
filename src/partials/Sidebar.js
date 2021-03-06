import React from 'react';
import { NavLink } from 'react-router-dom';
import { isActive } from '../redux/sidebar/action';
import { isCollapsed } from '../redux/sidebar/subs/action';
import { useSelector, useDispatch } from 'react-redux';

const Sidebar = () => {

  const is_sidebar_active = useSelector(state => state.sidebar.is_sidebar_active);

  const is_sub_collapsed = useSelector(state => state.sidebar_collapsed.is_sub_collapsed);

  const dispatch = useDispatch();


  return (

    <aside className="left-sidebar bg-sidebar">
      <div id="sidebar" className="sidebar sidebar-with-footer">

        <div className="app-brand">
          <NavLink onClick={() => dispatch(isActive(1)) && dispatch(isCollapsed(1))} to="/">
            <svg className="brand-icon" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" width="30"
              height="33" viewBox="0 0 30 33">
              <g fill="none" fillRule="evenodd">
                <path className="logo-fill-blue" fill="#7DBCFF" d="M0 4v25l8 4V0zM22 4v25l8 4V0z" />
                <path className="logo-fill-white" fill="#FFF" d="M11 4v25l8 4V0z" />
              </g>
            </svg>
            <span className="brand-name">Tableau De Bord</span>
          </NavLink>
        </div>

        <div className='sidebar-scrollbar'>

          <ul className="nav sidebar-inner" id="sidebar-menu" >

            <li onClick={() => dispatch(isActive(1))} className={`has-sub ${is_sidebar_active[0] ? 'active' : ''}`} >
              <NavLink onClick={() => dispatch(isCollapsed(1))} exact={true} activeClassName='is-active' to='/' aria-controls="dashboard">
                <i className="mdi mdi-home"></i>
                <span className="nav-text">Home</span>
              </NavLink>
            </li>

            <li  onClick={() => dispatch(isActive(2))} className={`has-sub ${is_sidebar_active[1] ? 'active expand' : ''} ${is_sub_collapsed[1] ? 'closed' : ''}`} >
              <a onClick={() => dispatch(isCollapsed(2))} className="sidenav-item-link" data-toggle="collapse" data-target="#organisation" aria-expanded="false" aria-controls="organisation">
                <i className="mdi mdi-file-tree"></i>
                <span className="nav-text">Organisation</span> <b className="caret"></b>
              </a>
              <ul className={` ${is_sub_collapsed[1] ? '' : 'collapse'}`}  id="organisation" data-parent="#sidebar-menu">
                  <div className="sub-menu">
                    <li >
                      <NavLink to='/organigramme'>
                        <span className="nav-text">-&nbsp;&nbsp;Organigramme g??n??ral</span>
                      </NavLink>
                    </li>
                    <li >
                      <NavLink className="sidenav-item-link" to='/acteurs'>
                        <span className="nav-text">-&nbsp;&nbsp;Acteurs internes</span> 
                      </NavLink>
                    </li>                         
                  </div>
              </ul>
            </li>

            <li onClick={() => dispatch(isActive(3))} className={`has-sub ${is_sidebar_active[2] ? 'active expand' : ''}`}>
              <a onClick={() => dispatch(isCollapsed(3))} className="sidenav-item-link" data-toggle="collapse" data-target="#processus" aria-expanded="false" aria-controls="processus">
                <i className="mdi mdi-file-document-box"></i>
                <span className="nav-text">Processus</span> <b className="caret"></b>
              </a>
              <ul  className={` ${is_sub_collapsed[2] ? '' : 'collapse'}`}  id="processus" data-parent="#sidebar-menu">
                  <div className="sub-menu">
                    <li >
                      <NavLink className="sidenav-item-link" to='/vue-ensemble'>
                        <span className="nav-text">-&nbsp;&nbsp;Vue d'ensemble</span>
                      </NavLink>
                    </li>
                    <li >
                      <NavLink className="sidenav-item-link" to='/processus'>
                        <span className="nav-text">-&nbsp;&nbsp;Index de processus</span> 
                      </NavLink>
                    </li>                         
                  </div>
              </ul>
            </li>

            <li onClick={() => dispatch(isActive(4))} className={`has-sub ${is_sidebar_active[3] ? 'active expand' : ''}`}>
              <a onClick={() => dispatch(isCollapsed(4))} className="sidenav-item-link" data-toggle="collapse" data-target="#procedure" aria-expanded="false" aria-controls="procedure">
                <i className="mdi mdi-settings"></i>
                <span className="nav-text">Proc??dure</span> <b className="caret"></b>
              </a>
              <ul  className={` ${is_sub_collapsed[3] ? '' : 'collapse'}`}  id="procedure" data-parent="#sidebar-menu">
                  <div className="sub-menu">
                    <li >
                      <NavLink className="sidenav-item-link" to='/procedures'>
                        <span className="nav-text">-&nbsp;&nbsp;Index des proc??dures</span>
                      </NavLink>
                    </li>                        
                  </div>
              </ul>
            </li>

            <li onClick={() => dispatch(isActive(5))} className={`has-sub ${is_sidebar_active[4] ? 'active expand' : ''}`}>
              <a onClick={() => dispatch(isCollapsed(5))} className="sidenav-item-link" data-toggle="collapse" data-target="#documentsutiles" aria-expanded="false" aria-controls="documentsutiles">
                <i className="mdi mdi-clipboard-text"></i>
                <span className="nav-text">Documents utiles</span> <b className="caret"></b>
              </a>
              <ul  className={` ${is_sub_collapsed[4] ? '' : 'collapse'}`}  id="documentsutiles" data-parent="#sidebar-menu">
                  <div className="sub-menu">
                    <li >
                      <NavLink className="sidenav-item-link" to='/documents-utiles'>
                        <span className="nav-text">-&nbsp;&nbsp;Documents/Annexes</span>
                      </NavLink>
                    </li>                        
                  </div>
              </ul>
            </li>

          </ul>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar;