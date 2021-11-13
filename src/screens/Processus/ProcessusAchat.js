import { faArrowsAltH, faArrowsAltV, faExpand, faSearchMinus, faSearchPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import $ from "jquery";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getOneProcess } from '../../redux/procmets/action';
import { getProcedure } from '../../redux/procorgs/action';
import ReactPaginate from 'react-paginate';
import {useState} from 'react'


const ProcessusAchat = () => {

  const [isActiveOne, setIsActiveOne] = useState(true);
  const [isActiveTwo, setIsActiveTwo] = useState(false);
  const [isActiveThree, setIsActiveThree] = useState(false);
  const [isActiveFour, setIsActiveFour] = useState(false);
  const [isActiveFive, setIsActiveFive] = useState(false);

  const isActivee = (n) => {

    if(n === 1){
      setIsActiveOne(true);
      setIsActiveTwo(false);
      setIsActiveThree(false);
      setIsActiveFour(false);
      setIsActiveFive(false);
    };
    if(n === 2){
      setIsActiveOne(false);
      setIsActiveTwo(true);
      setIsActiveThree(false);
      setIsActiveFour(false);
      setIsActiveFive(false);
    };
    if(n === 3){
      setIsActiveOne(false);
      setIsActiveTwo(false);
      setIsActiveThree(true);
      setIsActiveFour(false);
      setIsActiveFive(false);
    };
    if(n === 4){
      setIsActiveOne(false);
      setIsActiveTwo(false);
      setIsActiveThree(false);
      setIsActiveFour(true);
      setIsActiveFive(false);
    };
    if(n === 5){
      setIsActiveOne(false);
      setIsActiveTwo(false);
      setIsActiveThree(false);
      setIsActiveFour(false);
      setIsActiveFive(true);
    };
  }

  /* Get Process */

  const Proc = useSelector(state => state.procmets.procmet);

  /*-------------*/

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

  const dispatch = useDispatch();


  const displayChilds = Proc.childs.map( (process, key) => {

     return(
       <tr>
         <td data-label="SOUS PROCESSUS :">
           <img src="/images/busp.ico.gif" class="pd-b-7" />&nbsp;&nbsp;
           <NavLink onClick={() => { dispatch(getOneProcess(process.id)) }} to={'/ProcessusAchat/' + process.id}>{process.attributes.title}</NavLink>
         </td>
         <td data-label="FINALITÉ :"></td>
       </tr>
     );
   });

  const displayDocs = Proc.documents.slice(pagesVisitedDocs, pagesVisitedDocs+elementsPerPage).filter(document => {
    if (searchTerm == "") {
        return document;
    }
    else if (document.attributes.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return document;
    }
    }).map((document, key) => {

    return (
       <tr>
         <td data-label="DOCUMENT :">
           <a download><img src="/images/extr.ico.gif" class="pd-b-7"/>&nbsp;&nbsp;{document.attributes.title}</a>
         </td>
         <td data-label="RÉFÉRENCE :"></td>
         <td data-label="TYPE :"></td>
         <td data-label="DATE DE PUBLICATION :"></td>
       </tr>
     );
   } 
 );

 const displayProcedures = Proc.procedures.slice(pagesVisitedProc, pagesVisitedProc+elementsPerPage).filter(procedure => {
  if (searchTerm == "") {
      return procedure;
  }
  else if (procedure.attributes.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return procedure;
  }
  }).map((procedure, key) => {

  return (
     <tr>
       <td data-label="PROCÉDURE :">
          <img src="/images/proc.ico.gif"  class="pd-b-7"/>&nbsp;&nbsp;
          <NavLink onClick={() => { dispatch(getProcedure(procedure.id)) }} to={'/ProcessusOrganisationnel/' + procedure.id}>{procedure.attributes.title}</NavLink>
        </td>
       <td data-label="RÉFÉRENCE :"></td>
       <td data-label="ACTIVITÉ DE RATTACHEMENT :"></td>
       <td data-label="DATE D'APPLICATION :"></td>
     </tr>
   );
 } 
);

  return (
    <div>
      <h5 className="po-h">{Proc.nom}</h5>
      <div>
        <ul className="nav-po-achat">
          <li onClick={() => isActivee(1)} className={`nlpo ${isActiveOne ? 'nlpo-active' : ''}`}>Diagramme</li>
          <li onClick={() => isActivee(2)}  className={`nlpo ${isActiveTwo ? 'nlpo-active' : ''}`}>Définition</li>
          <li onClick={() => isActivee(3)} className={`nlpo ${isActiveThree ? 'nlpo-active' : ''}`}>Activités</li>
          <li onClick={() => isActivee(4)}  className={`nlpo ${isActiveFour ? 'nlpo-active' : ''}`}>Procédures</li>
          <li onClick={() => isActivee(5)} className={`nlpo ${isActiveFive ? 'nlpo-active' : ''}`}>Documents annexes</li>
        </ul>
      </div>
      <div className={` ${isActiveOne ? '' : 'po-table-wrapper-b'}`}>
        <br/>
        <div className="veBtnContainer" role="group">
          <button type="button" className="btn btn-icon" onclick="ZoomIn(1)">
            <FontAwesomeIcon icon={faSearchPlus}></FontAwesomeIcon>
          </button>
          <button type="button" className="btn btn-icon" onclick="ZoomOut(1)">
            <FontAwesomeIcon icon={faSearchMinus}></FontAwesomeIcon>
          </button>
          <button type="button" className="btn btn-icon" onclick="OriginalSize(1);">
            <FontAwesomeIcon icon={faExpand}></FontAwesomeIcon>
          </button>
          <button type="button" className="btn btn-icon" onclick="SizeToWidth(1);">
            <FontAwesomeIcon icon={faArrowsAltV}></FontAwesomeIcon>
          </button>
          <button type="button" className="btn btn-icon" onclick="SizeToHeight(1);">
            <FontAwesomeIcon icon={faArrowsAltH}></FontAwesomeIcon>
          </button>
        </div>
        <br/>
        <img style={{height: '700px'}} className="po-pic" src={Proc.image}></img>
      </div>
      <div className={` ${isActiveTwo ? '' : 'po-table-wrapper-b'}`}>
      <div className="po-table-wrapper">
        <table className="po-table" >
          <thead>
            <tr>
              <th>Code du processus</th>
              <th>Finalité</th>
              <th>Principales activités</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{Proc.code}</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
      <div className={` ${isActiveThree ? '' : 'po-table-wrapper-b'}`}>
        <div className="search-box search-box-responsive-achat" style={{position: 'absolute', top:'156px'}}>
          <button className="btn-search"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
          <input type="text" className="input-search" placeholder="Rechercher..." onChange={event => {setSearchTerm(event.target.value);}}/>
        </div>
        <div className="table-wrapper" style={{width: '95%', marginLeft: '2.5%'}}>
          <table className="da-table" >
            <thead>
              <tr>
                <th>SOUS PROCESSUS</th>
                <th>FINALITÉ</th>
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
      <div className={` ${isActiveFour ? '' : 'po-table-wrapper-b'}`}>
        <div className="search-box search-box-responsive-achat" style={{position: 'absolute', top:'156px'}}>
          <button className="btn-search"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
          <input type="text" className="input-search" placeholder="Rechercher..." onChange={event => {setSearchTerm(event.target.value);}}/>
        </div>
      <div className="table-wrapper" style={{width: '95%', marginLeft: '2.5%'}}>
        <table className="da-table" >
          <thead>
            <tr>
              <th>PROCÉDURE</th>
              <th>RÉFÉRENCE</th>
              <th>ACTIVITÉ DE RATTACHEMENT</th>
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
      <div className={` ${isActiveFive ? '' : 'po-table-wrapper-b'}`}>
        <div className="search-box search-box-responsive-achat" style={{position: 'absolute', top:'156px'}}>
          <button className="btn-search"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
          <input type="text" className="input-search" placeholder="Rechercher..." onChange={event => {setSearchTerm(event.target.value);}}/>
        </div>
        <div className="table-wrapper" style={{width: '95%', marginLeft: '2.5%'}}>
          <table className="da-table" >
            <thead>
              <tr>
                <th>DOCUMENT</th>
                <th>RÉFÉRENCE</th>
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


