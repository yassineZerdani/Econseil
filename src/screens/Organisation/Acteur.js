import { faExpand, faSearchMinus, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as imageSizing from '../../functions/ImageSizing';
import { isActive } from '../../redux/navbar/acteur/action';

export default function Acteur(props) {

  const isactive = useSelector(state => state.actor_sidebar.isactive);

  const dispatch = useDispatch();

  /* Get Actor */

  const acteurs = useSelector(state => state.acteurs.acteurs);

  var Acteurs = acteurs.reduce((unique, o) => {
    if(!unique.some(obj => obj.id === o.id)) {
      unique.push(o);
    }
    return unique;
  },[]);

  var Actor = {};

  Acteurs.map( acteur => {
      if( acteur.id == props.match.params.id){
        Actor = acteur;
      }
  });

  /*-----------*/

  console.log(Actor);


  return (
    <div>

 
      <h5 className="po-h">{Actor.nom}</h5>
      <div>
        <ul className="nav-po">
          <li onClick={() => dispatch(isActive(1))} className={`nlpo ${isactive[0] ? 'nlpo-active' : ''}`}>Définition</li>
          <li onClick={() => dispatch(isActive(2))}  className={`nlpo ${isactive[1] ? 'nlpo-active' : ''}`}>Diagramme</li>
        </ul>
      </div>

      <div className={` ${isactive[1] ? '' : 'po-table-wrapper-b'}`}>
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
              <img src="assets/images/93bf9d395db42247_c_fa10fac95ff2442d.png" alt="" className="OGimg" usemap="#4E1EEDC85FF233F4" border={0}/>
            </div>
      </div>

      <div  className={`po-table-wrapper ${isactive[0] ? 'po-table-wrapper' : 'po-table-wrapper-b'}`} >
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
              <td style={{color:'grey', fontWeight: '500'}}>{Actor.type}</td>
              <td>{Actor.profile}</td>
              <td>{Actor.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={`po-table-wrapper ${isactive[1] ? 'po-table-wrapper' : 'po-table-wrapper-b'}`} >
        <div>
          <h5 style={{padding: '1%', backgroundColor: '#324960', color: 'white', textAlign:"left", fontSize:"14px"}}>Description</h5>
          <p style={{padding: '2%', color: 'grey'}}>{Actor.description}</p>
        </div>
      </div>
    </div>
  )
}



