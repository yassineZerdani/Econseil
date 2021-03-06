import { faExpand, faSearchMinus, faSearchPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import React, {useState} from 'react';
import * as imageSizing from '../../functions/ImageSizing';
import { isActive } from '../../redux/navbar/procmet/action';
import { download } from '../../functions/downloadDocuments';
import { isCollapsed } from '../../redux/sidebar/subs/action';


const ProcessusAchat = (props) => {

  const isactive = useSelector(state => state.procmet_sidebar.isactive);

  const dispatch = useDispatch();

  /* Get Process */

  const Procs = useSelector(state => state.procmets.procmets);

  var Proc = {};

  Procs.map( procedure => {
      if( procedure.id == props.match.params.id){
        Proc = procedure;
      }
  });

  /*-----------*/

  console.log(Proc);

  /* States */

  const [docsNumber, setDocsNumber] = useState(0);
  const [procNumber, setProcNumber] = useState(0);
  const [childsNumber, setChildsNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  /*--------*/

  /* Pagers */

  const elementsPerPage = 7;

  const pagesVisitedChilds = childsNumber*elementsPerPage;
  const pagesVisitedDocs = docsNumber*elementsPerPage;
  const pagesVisitedProc = procNumber*elementsPerPage;

  const childsCount = Math.ceil(Proc.childs.length/elementsPerPage);
  const docsCount = Math.ceil(Proc.documents.length/elementsPerPage);
  const procCount = Math.ceil(Proc.procedures.length/elementsPerPage);

 
  /*-------*/



  const displayChilds = Proc.childs.slice(pagesVisitedChilds, pagesVisitedChilds+elementsPerPage).filter((process, key) => {
    if (searchTerm == "") {
        return process;
    }
    else if (process.nom.toLowerCase().includes(searchTerm.toLowerCase())) {
        return process;
    }
    }).map( (process, key) => {

     return(
       <tr>
         <td data-label="SOUS PROCESSUS :">
           <img src="/images/busp.ico.gif" alt="" className="pd-b-7" />&nbsp;&nbsp;
           <NavLink to={'/ProcessusAchat/' + process.id}>{process.nom}</NavLink>
         </td>
         <td data-label="FINALIT?? :"></td>
       </tr>
     );
   });

  const displayDocs = Proc.documents.slice(pagesVisitedDocs, pagesVisitedDocs+elementsPerPage).filter((document, key) => {
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
         <td data-label="R??F??RENCE :"></td>
         <td data-label="TYPE :"></td>
         <td data-label="DATE DE PUBLICATION :">{document.date}</td>
       </tr>
     );
   } 
 );

 const displayProcedures = Proc.procedures.slice(pagesVisitedProc, pagesVisitedProc+elementsPerPage).filter((procedure, key) => {
  if (searchTerm == "") {
      return procedure;
  }
  else if (procedure.nom.toLowerCase().includes(searchTerm.toLowerCase())) {
      return procedure;
  }
  }).map((procedure, key) => {

  return (
     <tr>
       <td data-label="PROC??DURE :">
          <img src="/images/proc.ico.gif" alt=""  className="pd-b-7"/>&nbsp;&nbsp;
          <NavLink to={'/ProcessusOrganisationnel/' + procedure.id}>{procedure.nom}</NavLink>
        </td>
       <td data-label="R??F??RENCE :"></td>
       <td data-label="ACTIVIT?? DE RATTACHEMENT :"></td>
       <td data-label="DATE D'APPLICATION :">{procedure.date}</td>
     </tr>
   );
 } 
);

  return (
    <div>
      <h5 className="po-h">{Proc.nom}</h5>
      <div>
        <ul className="nav-po-achat">
          <li onClick={() => dispatch(isActive(1))} className={`nlpo ${isactive[0] ? 'nlpo-active' : ''}`}>Diagramme</li>
          <li onClick={() => dispatch(isActive(2))}  className={`nlpo ${isactive[1] ? 'nlpo-active' : ''}`}>D??finition</li>
          <li onClick={() => dispatch(isActive(3))} className={`nlpo ${isactive[2] ? 'nlpo-active' : ''}`}>Activit??s</li>
          <li onClick={() => dispatch(isActive(4))}  className={`nlpo ${isactive[3] ? 'nlpo-active' : ''}`}>Proc??dures</li>
          <li onClick={() => dispatch(isActive(5))} className={`nlpo ${isactive[4] ? 'nlpo-active' : ''}`}>Documents annexes</li>
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
          <img src={Proc.image} usemap="#4E1EEDC85FF233F4" alt="" className="" border={0} style={{alignItems: "center", marginLeft: "26%"}}/>
        </div>
      </div>
      <div className={` ${isactive[1] ? '' : 'po-table-wrapper-b'}`}>
      <div className="po-table-wrapper">
        <table className="po-table" >
          <thead>
            <tr>
              <th>Code du processus</th>
              <th>Finalit??</th>
              <th>Principales activit??s</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{width: "1000px"}}>{Proc.code}</td>
              <td style={{width: "1000px"}}>test</td>
              <td style={{width: "1000px"}}>test</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
      <div className={` ${isactive[2] ? '' : 'po-table-wrapper-b'}`}>
        <div className="search-box search-box-responsive-achat" style={{position: 'absolute', top:'209px'}}>
          <button className="btn-search"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
          <input type="text" className="input-search" placeholder="Rechercher..." onChange={event => {setSearchTerm(event.target.value);}}/>
        </div>
        <div className="table-wrapper" style={{width: '95%', marginLeft: '2.5%'}}>
          <table className="da-table" >
            <thead>
              <tr>
                <th>SOUS PROCESSUS</th>
                <th>FINALIT??</th>
              </tr>
            </thead>
            <tbody>
              {displayChilds}
            </tbody>
            <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              pageCount={childsCount}
              containerClassName={"page"}
              previousClassName={"page__btn"}
              nextClassName={"page__btn"}
              disabledClassName={"page__numbers"}
              activeClassName={"page__numbers active"}
            />
          </table>
        </div>
      </div>
      <div className={` ${isactive[3] ? '' : 'po-table-wrapper-b'}`}>
        <div className="search-box search-box-responsive-achat" style={{position: 'absolute', top:'209px'}}>
          <button className="btn-search"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
          <input type="text" className="input-search" placeholder="Rechercher..." onChange={event => {setSearchTerm(event.target.value);}}/>
        </div>
      <div className="table-wrapper" style={{width: '95%', marginLeft: '2.5%'}}>
        <table className="da-table" >
          <thead>
            <tr>
              <th>PROC??DURE</th>
              <th>R??F??RENCE</th>
              <th>ACTIVIT?? DE RATTACHEMENT</th>
              <th>DATE D'APPLICATION</th>
            </tr>
          </thead>
          <tbody>
            {displayProcedures}
          </tbody>
          <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              pageCount={procCount}
              containerClassName={"page"}
              previousClassName={"page__btn"}
              nextClassName={"page__btn"}
              disabledClassName={"page__numbers"}
              activeClassName={"page__numbers active"}
            />
        </table>
      </div>
      </div>
      <div className={` ${isactive[4] ? '' : 'po-table-wrapper-b'}`}>
        <div className="search-box search-box-responsive-achat" style={{position: 'absolute', top:'209px'}}>
          <button className="btn-search"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
          <input type="text" className="input-search" placeholder="Rechercher..." onChange={event => {setSearchTerm(event.target.value);}}/>
        </div>
        <div className="table-wrapper" style={{width: '95%', marginLeft: '2.5%'}}>
          <table className="da-table" >
            <thead>
              <tr>
                <th>DOCUMENT</th>
                <th>R??F??RENCE</th>
                <th>TYPE</th>
                <th>DATE DE PUBLICATION</th>
              </tr>
            </thead>
            <tbody>
              {displayDocs}
            </tbody>
            <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              pageCount={docsCount}
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

export default ProcessusAchat;


