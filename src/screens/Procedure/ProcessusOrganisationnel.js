import { faExpand, faSearchMinus, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getOperationActors } from '../../redux/operations/action';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';
import React, { useState } from 'react';
import * as imageSizing from '../../functions/ImageSizing';
import { download } from '../../functions/downloadDocuments';
import { isActive } from '../../redux/navbar/procorg/action';
import { isCollapsed } from '../../redux/sidebar/subs/action';
import { getOperations } from '../../redux/operations/action';


const ProcessusOrganisationnel = (props) => {

  const isactive = useSelector(state => state.procorg_sidebar.isactive);

  const dispatch = useDispatch();

  /* Get Actor */

  const procedures = useSelector(state => state.procorgs.procorgs);

  var Procedure = {};

  procedures.map( procedure => {
      if( procedure.id == props.match.params.id){
        Procedure = procedure;
      }
  });

  /*-----------*/

  console.log(Procedure)

  const yo = () => {
    dispatch(getOperations());
    dispatch(isActive(4));
  }

  /* States */

  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  /*--------*/

  /* Get procedure */

  //const Proc = useSelector(state => state.procorgs.procorg);

  /*---------------*/


    /* Pager */

    const ordersPerPage = 7;
    const pagesVisited = pageNumber*ordersPerPage;
    const pageCount = Math.ceil(Procedure.length/ordersPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    };

    /*--------*/


    /* Show documents */


  const displayDocs = Procedure.documents.slice(pagesVisited, pagesVisited+ordersPerPage).filter((document, key) => {
    if (searchTerm == "") {
        return document;
    }
    else if (document.nom.toLowerCase().includes(searchTerm.toLowerCase())) {
        return document;
    }
    }).map((document, key) => {

     return (
        <tr>
          <td data-label="DOCUMENT :">
            <button onClick={()=>download(document.file)}><img src="/images/extr.ico.gif" alt="" className="pd-b-7" />&nbsp;&nbsp;{document.nom}</button>
          </td>
          <td data-label="CATÉGORIE :"></td>
          <td data-label="RÉFÉRENCE :"></td>
        </tr>
      );
    } 
  );

  /*----------------*/

  /* Show operations */

  const displayOps = Procedure.operations.slice(pagesVisited, pagesVisited+ordersPerPage).filter(operation => {
    if (searchTerm == "") {
        return operation;
    }
    else if (operation.nom.toLowerCase().includes(searchTerm.toLowerCase())) {
        return operation;
    }
    }).map((operation, key) => {

     return (
       <tr>
         <td data-label="OPÉRATION :">
           <NavLink onClick={yo} to={'/operation/'+operation.id}>
             <img src="/images/op.gif" alt="" className="pd-b-7"/>&nbsp;&nbsp;
             {operation.nom}
           </NavLink>
         </td>
         <td data-label="ACTEURS :">
            <NavLink to={'/operation-acteurs/'+operation.id}>
             Acteurs
            </NavLink>
         </td>
         <td data-label="DESCRIPTION :"></td>
       </tr>
     );
   } );

  /*------------------*/




  return (
    <div>
      <h3 className="po-h">{Procedure.nom}</h3>
      <div>
        <ul className="nav-po-org">
          <li onClick={() => dispatch(isActive(1))} className={`nlpo ${isactive[0] ? 'nlpo-active' : ''}`}>Diagramme</li>
          <li onClick={() => dispatch(isActive(2))}  className={`nlpo ${isactive[1] ? 'nlpo-active' : ''}`}>Fiche procédure</li>
          <li onClick={() => dispatch(isActive(3))} className={`nlpo ${isactive[2] ? 'nlpo-active' : ''}`}>Objet</li>
          <li onClick={() => dispatch(isActive(4))}  className={`nlpo ${isactive[3] ? 'nlpo-active' : ''}`}>Terminologie</li>
          <li onClick={() => dispatch(isActive(5))} className={`nlpo ${isactive[4] ? 'nlpo-active' : ''}`}>Règles de gestion</li>
          <li onClick={() => dispatch(isActive(6))}  className={`nlpo ${isactive[5] ? 'nlpo-active' : ''}`}>Opérations</li>
          <li onClick={() => dispatch(isActive(7))} className={`nlpo ${isactive[6] ? 'nlpo-active' : ''}`}>Documents associés</li>
        </ul>
      </div>
      <div className={` ${isactive[0] ? '' : 'po-table-wrapper-b'}`}>
        <br/>
        <div className="veBtnContainer" role="group">
          <button type="button" className="btn btn-icon" onClick={() => imageSizing.ZoomInMultipleView()}>
            <FontAwesomeIcon icon={faSearchPlus}></FontAwesomeIcon>
          </button>
          <button type="button" className="btn btn-icon" onClick={() => imageSizing.ZoomOutMultipleView()}>
            <FontAwesomeIcon icon={faSearchMinus}></FontAwesomeIcon>
          </button>
          <button type="button" className="btn btn-icon" onClick={() => imageSizing.OriginalSizeMultipleView()}>
            <FontAwesomeIcon icon={faExpand}></FontAwesomeIcon>
          </button>
        </div>
        <br/>
        <div className="Diag" id="Diag1" style={{display: 'block'}} >
          <img src={Procedure.image} usemap="#4E1EEDC85FF233F4" alt="" className="" border={0} style={{alignItems: "center", marginLeft: "26%"}}/>
        </div>
      </div>

    




      <div className={` ${isactive[1] ? '' : 'po-table-wrapper-b'}`}>
        
        <div className="po-table-wrapper">
          <table className="po-table" >
            <thead>
              <tr>
                <th>Code</th>
                <th>Processus de rattachement</th>
                <th>Date de publication</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{Procedure.code}</td>
                <td><img src="/images/busp.ico.gif" alt="" className="pd-b-7"/>&nbsp;&nbsp;<NavLink to={'/ProcessusAchat/'+Procedure.processus.id}>{Procedure.processus.nom}</NavLink></td>
                <td>{Procedure.date}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={`po-table-wrapper ${isactive[1] ? 'po-table-wrapper' : 'po-table-wrapper-b'}`} >
        <div>
          <h5 style={{padding: '1%', backgroundColor: '#324960', color: 'white', textAlign:"left", fontSize:"14px"}}>Domaine d'application</h5>
          <p style={{padding: '2%', color: 'grey'}}>{Procedure.da}</p>
        </div>
      </div>
      <div className={` ${isactive[2] ? '' : 'po-table-wrapper-b'}`}>
        <div className="po-table-wrapper">
          <br/>
          <h5 style={{padding: '1% 0 1% 2% ', backgroundColor: '#324960', color: 'white', textAlign:"left", fontSize:"14px"}}>Objet</h5>
          <p style={{padding: '2%', color: 'grey'}}>{Procedure.objet}</p>
        </div>
      </div>
      <div className={` ${isactive[3] ? 'po-table-wrapper' : 'po-table-wrapper-b'}`}>
        <table className="po-table" >
          <thead>
            <tr>
              <th>Terminologie</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{Procedure.terminologie}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={`po-table-wrapper ${isactive[4] ? 'po-table-wrapper' : 'po-table-wrapper-b'}`} >
        <br/>
        <div>
          <h5 style={{padding: '1% 0 1% 2% ', backgroundColor: '#324960', color: 'white', textAlign:"left", fontSize:"14px"}}>Règles de gestion</h5>
          <p style={{padding: '2%', color: 'grey'}}>{Procedure.regles}</p>
        </div>
      </div>
      <div className={` ${isactive[5] ? '' : 'po-table-wrapper-b'}`}>
        <div className="search-box search-box-responsive" style={{position: 'absolute', top:'215px'}}>
          <button className="btn-search"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
          <input type="text" className="input-search" placeholder="Rechercher..." onChange={event => {setSearchTerm(event.target.value);}}/>
        </div>
        <div className="table-wrapper" style={{width: '95%', marginLeft: '2.5%'}}>
          <table className="da-table" >
            <thead>
              <tr>
                <th>OPÉRATION</th>
                <th>ACTEURS</th>
                <th>DESCRIPTION</th>
              </tr>
            </thead>
            <tbody>
                {displayOps}
            </tbody>
            <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              pageCount={1}
              
              containerClassName={"page"}
              previousClassName={"page__btn"}
              nextClassName={"page__btn"}
              disabledClassName={"page__numbers"}
              activeClassName={"page__numbers active"}
            />
          </table>
        </div>
      </div>
      <div className={` ${isactive[6] ? '' : 'po-table-wrapper-b'}`} >
        <div className="search-box search-box-responsive" style={{position: 'absolute', top:'215px'}}>
          <button className="btn-search"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
          <input type="text" className="input-search" placeholder="Rechercher..." onChange={event => {setSearchTerm(event.target.value);}}/>
        </div>
        <div className="table-wrapper" style={{width: '95%', marginLeft: '2.5%'}}>
          <table className="da-table" >
            <thead>
              <tr>
                <th>DOCUMENT</th>
                <th>CATÉGORIE</th>
                <th>RÉFÉRENCE</th>
              </tr>
            </thead>
            <tbody>
              {displayDocs}
            </tbody>
            <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              pageCount={pageCount}
              onPageChange={changePage} 
              containerClassName={"page"}
              previousClassName={"page__btn"}
              nextClassName={"page__btn"}
              disabledClassName={"page__numbers"}
              activeClassName={"page__numbers active"}
            />
          </table>
        </div>
      </div>
    </div>
  )
}

export default ProcessusOrganisationnel;


