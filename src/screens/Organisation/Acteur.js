import { faArrowsAltH, faArrowsAltV, faExpand, faSearchMinus, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as imageSizing from '../../functions/ImageSizing';

export default function Acteur() {

  const [isActiveOne, setIsActiveOne] = useState(true);
  const [isActiveTwo, setIsActiveTwo] = useState(false);

  const isActivee = (n) => {

    if(n === 1){
      setIsActiveOne(true);
      setIsActiveTwo(false);
    };
    if(n === 2){
      setIsActiveOne(false);
      setIsActiveTwo(true);
    };
  }

  /* Get Actor */

  const Acteur = useSelector(state => state.acteurs.acteur);

  /*-----------*/


  return (
    <div>

 
      <h5 className="po-h">{Acteur.nom}</h5>
      <div>
        <ul className="nav-po">
          <li onClick={() => isActivee(1)} className={`nlpo ${isActiveOne ? 'nlpo-active' : ''}`}>Définition</li>
          <li onClick={() => isActivee(2)}  className={`nlpo ${isActiveTwo ? 'nlpo-active' : ''}`}>Diagramme</li>
        </ul>
      </div>

      <div className={` ${isActiveTwo ? '' : 'po-table-wrapper-b'}`}>
      <div  className="veBtnContainer" role="group">
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
            <div className="Diag" id="Diag1" style={{display: 'block'}} >
              <img src="assets/images/93bf9d395db42247_c_fa10fac95ff2442d.png" className="OGimg" usemap="#4E1EEDC85FF233F4" border={0}/>
            </div>
      </div>

      <div  className={`po-table-wrapper ${isActiveOne ? 'po-table-wrapper' : 'po-table-wrapper-b'}`} >
        <table className="po-table" >
          <thead>
            <tr>
              <th>Type</th>
              <th>Interne/Externe</th>
              <th>Adresse electronique</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{color:'grey', fontWeight: '500'}}>{Acteur.type}</td>
              <td>{Acteur.profile}</td>
              <td>{Acteur.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={`po-table-wrapper ${isActiveOne ? 'po-table-wrapper' : 'po-table-wrapper-b'}`} >
        <div>
          <h5 style={{padding: '1%', backgroundColor: '#324960', color: 'white', textAlign:"left", fontSize:"14px"}}>Description</h5>
          <p style={{padding: '2%', color: 'grey'}}>{Acteur.description}</p>
        </div>
      </div>
    </div>
  )
}



