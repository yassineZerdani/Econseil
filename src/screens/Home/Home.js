import React, { useEffect, useState, } from 'react';
import { NavLink } from 'react-router-dom';
import { getProcedure } from '../../redux/procorgs/action';
import { getOneProcess } from '../../redux/procmets/action';
import { useDispatch, connect } from 'react-redux';
import { getProcedures } from '../../redux/procorgs/action';
import { setTime } from '../../functions/setTime';

const Home = (props) => {

  /* Get procedures */

  useEffect(() => {

    props.getProcedures()
    
  }, []);

  const { procorgs } = props


  /*----------------*/


  /* Send procedure or process */

  const dispatch = useDispatch();

  /*--------------------*/


  /* Show procedures */

  const displayProcedures = procorgs.map((procedure, key) => {

    return (
      <tr>
        <td data-label="PROCÉDURE :">
          <img src="/images/proc.ico.gif" class="pd-b-7" />&nbsp;&nbsp;
          <NavLink onClick={() => { dispatch(getProcedure(procedure.id)) }} to={'/ProcessusOrganisationnel/' + procedure.id}>{procedure.nom}</NavLink>
        </td>
        <td data-label="PROCESSUS DE RATTACHEMENT :">
          <img src="/images/busp.ico.gif" class="pd-b-7" />&nbsp;&nbsp;
          <NavLink onClick={() => { dispatch(getOneProcess(procedure.processus.id)) }} to={'/ProcessusAchat/' + procedure.processus.id}>{procedure.processus.nom}</NavLink>
        </td>
        <td data-label="DATE DE PUBLICATION :">{setTime(procedure.date)}</td>
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
              <div style={{
                padding: '0',
                margin: '0',
                height: '100%',
                width: '100%',
                backgroundImage: `url("assets/images/organigramme (black).svg")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: '90% 60%'
              }}></div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 my-2">
            <div className="card" style={{ height: '245px' }}>
              <div className="card-header" style={{ backgroundColor: '#eb6534' }}>
                <h6 style={{ textAlign: 'center' }} className="card-title mg-b-10 tx-rem-1-175 tx-center"><NavLink to='/vue-ensemble'
                  style={{ color: 'white' }}>Vue d'ensemble</NavLink></h6>
              </div>
              <div style={{
                padding: '0',
                margin: '0',
                height: '100%',
                width: '100%',
                backgroundImage: `url("assets/images/ve.svg")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: '90% 60%'
              }}></div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 my-2">
            <div className="card" style={{ height: '245px' }}>
              <div className="card-header bg-success">
                <h6 style={{ textAlign: 'center' }} className="card-title mg-b-10 tx-rem-1-175 tx-center"><NavLink to='/procedures'
                  style={{ color: 'white' }}>Index des Procédures</NavLink></h6>
              </div>
              <div style={{
                padding: '0',
                margin: '0',
                height: '100%',
                width: '100%',
                backgroundImage: `url("assets/images/process.svg")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: '90% 60%'
              }}></div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 my-2">
            <div className="card" style={{ height: '245px' }}>
              <div className="card-header bg-secondary">
                <h6 style={{ textAlign: 'center' }} className="card-title mg-b-10 tx-rem-1-175 tx-center"><NavLink to='/documents-utiles' style={{ color: 'white' }}>Documents</NavLink></h6>
              </div>
              <div style={{
                padding: '0',
                margin: '0',
                height: '100%',
                width: '100%',
                backgroundImage: `url("assets/images/Document.svg")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: '90% 60%'
              }}></div>
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