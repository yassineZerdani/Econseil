import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProcedures } from '../../redux/procorgs/action';

const Home = (props) => {

  /* Get procedures */

  useEffect(() => {

    props.getProcedures()
    
  }, []);

  const { procorgs } = props

  console.log(procorgs)


  /*----------------*/



  /* Show procedures */

  const displayProcedures = procorgs.map((procedure, key) => {
      
      return (
        <tr>
          <td data-label="PROCÉDURE :">
            <img src="/images/proc.ico.gif" className="pd-b-7" alt="" />&nbsp;&nbsp;
            <NavLink to={'/ProcessusOrganisationnel/' + procedure.id}>{procedure.nom}</NavLink>
          </td>
          <td data-label="PROCESSUS DE RATTACHEMENT :">
            <img src="/images/busp.ico.gif" className="pd-b-7" alt="" />&nbsp;&nbsp;
            <NavLink to={'/ProcessusAchat/' + procedure.processus.id}>{procedure.processus.nom}</NavLink>
          </td>
          <td data-label="DATE DE PUBLICATION :">{procedure.date}</td>
        </tr>
      );
  });

  /*--------------*/


  return (
    <div className="content-wrapper">
      <div className="content">

        <div className="row">
          <div className="col-lg-3 col-sm-6 my-2">
            <div className="card" style={{ height: '245px' }}>
              <div className="card-header" style={{ backgroundColor: '#349beb' }}>
                <h6 style={{ textAlign: 'center' }} className="card-title mg-b-10 tx-rem-1-175 tx-center"><NavLink to='/organigramme'
                  style={{ color: 'white' }}>Organigramme</NavLink></h6>
              </div>
              <div className="home-card" style={{backgroundImage: `url("assets/images/organigramme (black).svg")`}}></div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 my-2">
            <div className="card" style={{ height: '245px' }}>
              <div className="card-header" style={{ backgroundColor: '#eb6534' }}>
                <h6 style={{ textAlign: 'center' }} className="card-title mg-b-10 tx-rem-1-175 tx-center"><NavLink to='/vue-ensemble'
                  style={{ color: 'white' }}>Vue d'ensemble</NavLink></h6>
              </div>
              <div className="home-card" style={{backgroundImage: `url("assets/images/ve.svg")`}}></div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 my-2">
            <div className="card" style={{ height: '245px' }}>
              <div className="card-header bg-success">
                <h6 style={{ textAlign: 'center' }} className="card-title mg-b-10 tx-rem-1-175 tx-center"><NavLink to='/procedures'
                  style={{ color: 'white' }}>Index des Procédures</NavLink></h6>
              </div>
              <div className="home-card" style={{backgroundImage: `url("assets/images/process.svg")`}}></div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 my-2">
            <div className="card" style={{ height: '245px' }}>
              <div className="card-header bg-secondary">
                <h6 style={{ textAlign: 'center' }} className="card-title mg-b-10 tx-rem-1-175 tx-center"><NavLink to='/documents-utiles' style={{ color: 'white' }}>Documents</NavLink></h6>
              </div>
              <div className="home-card" style={{backgroundImage: `url("assets/images/Document.svg")`}}></div>
            </div>
          </div>
        </div>
        <br />
        <br />

        <div className="row">
          <div className="col-12">

            <div className="card card-table-border-none" id="recent-Orders">
              <div className="card-header justify-content-between">
                <h2>DERNIÈRES PUBLICATIONS</h2>
              </div>
              <div className="card-body pt-0 pb-5">
              <table className="table card-table table-responsive table-responsive-large" style={{ width: '100%' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid grey' }}>
                      <th style={{ color: '#349BEB' }}>PROCÉDURE</th>
                      <th style={{ color: '#349BEB' }}>PROCESSUS DE RATTACHEMENT</th>
                      <th style={{ color: '#349BEB' }}>DATE DE PUBLICATION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayProcedures}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    procorgs: state.procorgs.procorgs
  }
}
export default connect(mapStateToProps, { getProcedures })(Home);