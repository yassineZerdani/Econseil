import { faArrowsAltH, faArrowsAltV, faExpand, faSearchMinus, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setTime } from '../../functions/setTime';
import { getOperation } from '../../redux/operations/action';
import { getOperationActors } from '../../redux/operations/action';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react';


const ProcessusOrganisationnel = () => {

  const [isActiveOne, setIsActiveOne] = useState(true);
  const [isActiveTwo, setIsActiveTwo] = useState(false);
  const [isActiveThree, setIsActiveThree] = useState(false);
  const [isActiveFour, setIsActiveFour] = useState(false);
  const [isActiveFive, setIsActiveFive] = useState(false);
  const [isActiveSix, setIsActiveSix] = useState(false);
  const [isActiveSeven, setIsActiveSeven] = useState(false);

  const isActivee = (n) => {

    if(n === 1){
      setIsActiveOne(true);
      setIsActiveTwo(false);
      setIsActiveThree(false);
      setIsActiveFour(false);
      setIsActiveFive(false);
      setIsActiveSix(false);
      setIsActiveSeven(false);
    };
    if(n === 2){
      setIsActiveOne(false);
      setIsActiveTwo(true);
      setIsActiveThree(false);
      setIsActiveFour(false);
      setIsActiveFive(false);
      setIsActiveSix(false);
      setIsActiveSeven(false);
    };
    if(n === 3){
      setIsActiveOne(false);
      setIsActiveTwo(false);
      setIsActiveThree(true);
      setIsActiveFour(false);
      setIsActiveFive(false);
      setIsActiveSeven(false);
    };
    if(n === 4){
      setIsActiveOne(false);
      setIsActiveTwo(false);
      setIsActiveThree(false);
      setIsActiveFour(true);
      setIsActiveFive(false);
      setIsActiveSix(false);
      setIsActiveSeven(false);
    };
    if(n === 5){
      setIsActiveOne(false);
      setIsActiveTwo(false);
      setIsActiveThree(false);
      setIsActiveFour(false);
      setIsActiveFive(true);
      setIsActiveSix(false);
      setIsActiveSeven(false);
    };
    if(n === 6){
      setIsActiveOne(false);
      setIsActiveTwo(false);
      setIsActiveThree(false);
      setIsActiveFour(false);
      setIsActiveFive(false);
      setIsActiveSix(true);
      setIsActiveSeven(false);
    };
    if(n === 7){
      setIsActiveOne(false);
      setIsActiveTwo(false);
      setIsActiveThree(false);
      setIsActiveFour(false);
      setIsActiveFive(false);
      setIsActiveSix(false);
      setIsActiveSeven(true);
    };
  }

  const Proc = useSelector(state => state.procorgs.procorg);

  console.log(Proc);

  /* States */

  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  /*--------*/

  /* Get procedure */

  //const Proc = useSelector(state => state.procorgs.procorg);

  /*---------------*/


    const dispatch = useDispatch();

    /* Pager */

    const ordersPerPage = 7;
    const pagesVisited = pageNumber*ordersPerPage;
    const pageCount = Math.ceil(Proc.length/ordersPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    };

    /*--------*/


    /* Show documents */


  const displayDocs = Proc.documents.slice(pagesVisited, pagesVisited+ordersPerPage).filter(document => {
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
            <a download><img src="/images/extr.ico.gif" class="pd-b-7"/>&nbsp;&nbsp;{document.nom}</a>
          </td>
          <td data-label="CATÉGORIE :"></td>
          <td data-label="RÉFÉRENCE :"></td>
        </tr>
      );
    } 
  );

  /*----------------*/

  /* Show operations */

  const displayOps = Proc.operations.slice(pagesVisited, pagesVisited+ordersPerPage).filter(operation => {
    if (searchTerm == "") {
        return operation;
    }
    else if (operation.attributes.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return operation;
    }
    }).map((operation, key) => {

     return (
       <tr>
         <td data-label="OPÉRATION :">
           <NavLink onClick={() => { dispatch(getOperation(operation.id)) }} to={'/operation/'+operation.id}>
             <img src="/images/op.gif" class="pd-b-7"/>&nbsp;&nbsp;
             {operation.attributes.title}
           </NavLink>
         </td>
         <td data-label="ACTEURS :">
            <NavLink onClick={() => { dispatch(getOperationActors(operation.id)) }} to={'/operation-acteurs/'+operation.id}>
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
      <h3 className="po-h">{Proc.nom}</h3>
      <div>
        <ul className="nav-po-org">
          <li onClick={() => isActivee(1)} className={`nlpo ${isActiveOne ? 'nlpo-active' : ''}`}>Diagramme</li>
          <li onClick={() => isActivee(2)}  className={`nlpo ${isActiveTwo ? 'nlpo-active' : ''}`}>Fiche procédure</li>
          <li onClick={() => isActivee(3)} className={`nlpo ${isActiveThree ? 'nlpo-active' : ''}`}>Objet</li>
          <li onClick={() => isActivee(4)}  className={`nlpo ${isActiveFour ? 'nlpo-active' : ''}`}>Terminologie</li>
          <li onClick={() => isActivee(5)} className={`nlpo ${isActiveFive ? 'nlpo-active' : ''}`}>Règles de gestion</li>
          <li onClick={() => isActivee(6)}  className={`nlpo ${isActiveSix ? 'nlpo-active' : ''}`}>Opérations</li>
          <li onClick={() => isActivee(7)} className={`nlpo ${isActiveSeven ? 'nlpo-active' : ''}`}>Documents associés</li>
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
                <th>Code</th>
                <th>Processus de rattachement</th>
                <th>Date de publication</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{Proc.code}</td>
                <td><img src="/images/busp.ico.gif"  class="pd-b-7"/>&nbsp;&nbsp;<NavLink to={'/ProcessusAchat/'+Proc.processus.id}>{Proc.processus.nom}</NavLink></td>
                <td>{Proc.date}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={`po-table-wrapper ${isActiveTwo ? 'po-table-wrapper' : 'po-table-wrapper-b'}`} >
        <div>
          <h5 style={{padding: '1%', backgroundColor: '#324960', color: 'white', textAlign:"left", fontSize:"14px"}}>Domaine d'application</h5>
          <p style={{padding: '2%', color: 'grey'}}>{Proc.da}</p>
        </div>
      </div>
      <div className={` ${isActiveThree ? '' : 'po-table-wrapper-b'}`}>
        <div className="po-table-wrapper">
          <br/>
          <h5 style={{padding: '1% 0 1% 2% ', backgroundColor: '#324960', color: 'white', textAlign:"left", fontSize:"14px"}}>Objet</h5>
          <p style={{padding: '2%', color: 'grey'}}>{Proc.objet}</p>
        </div>
      </div>
      <div className={` ${isActiveFour ? 'po-table-wrapper' : 'po-table-wrapper-b'}`}>
        <table className="po-table" >
          <thead>
            <tr>
              <th>Terminologie</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{Proc.terminologie}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={`po-table-wrapper ${isActiveFive ? 'po-table-wrapper' : 'po-table-wrapper-b'}`} >
        <br/>
        <div>
          <h5 style={{padding: '1% 0 1% 2% ', backgroundColor: '#324960', color: 'white', textAlign:"left", fontSize:"14px"}}>Règles de gestion</h5>
          <p style={{padding: '2%', color: 'grey'}}>{Proc.regles}</p>
        </div>
      </div>
      <div className={` ${isActiveSix ? '' : 'po-table-wrapper-b'}`}>
        <div className="search-box" style={{position: 'absolute', top:'215px'}}>
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
      <div className={` ${isActiveSeven ? '' : 'po-table-wrapper-b'}`} >
        <div className="search-box" style={{position: 'absolute', top:'215px'}}>
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


