import { faArrowsAltH, faArrowsAltV, faExpand, faSearchMinus, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import * as imageSizing from '../../functions/ImageSizing';
import Tree, { withStyles } from 'react-vertical-tree-react-17';
import { useDispatch, connect } from 'react-redux';
import { getActors, getActor, getSubActors } from '../../redux/acteurs/action';
import { useEffect, useState, } from 'react';
import { useHistory } from "react-router-dom";


const OrganigrammeGeneral = (props) => {

    const styles = {
        lines: {
          color: '#1890ff',
          height: '90px',
        },
        node: {
          backgroundColor: '#4C84FF',
          border: '1px solid #1890ff',
        },
        text: {
          color: 'white',
        }
      }

    const StyledTree = withStyles(styles)(Tree)

    const history = useHistory();

    const dispatch = useDispatch();

    /* Get actors */

    useEffect(() => {
            
        props.getActors()

    },[]);


    const { acteurs } = props
    console.log(acteurs)

    var Acteurs = acteurs.reduce((unique, o) => {
        if(!unique.some(obj => obj.id === o.id)) {
          unique.push(o);
        }
        return unique;
      },[]);
  
  
      console.log(Acteurs);

    /*-------------*/

    // data have to be below structure

    const dataa = [];


    Acteurs.map( acteur => {

        var actor = {};

        actor["id"] = acteur.id;
        actor["name"] = acteur.nom;
        actor["parent"] = {id: acteur.parent.id};
        actor["children"] = [];

        dataa.push(actor);

    });

    console.log(dataa);

     dataa.map( acteur => {

         dataa.map( actor => {

             if( actor.parent.id == acteur.id ){
                 acteur.children.push(actor);
             };
         });
     });

     const final = [];

     dataa.map( acteur => {
        if(acteur.parent.id == ''){
            final.push(acteur);
        }
     })

     console.log(dataa);


    return (
        <div>
            <h5 className="vde">Organigramme général</h5>

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
                <img className="OGimg" usemap="#4E1EEDC85FF233F4" border={0} style={{alignItems: "center", marginLeft: "26%"}}/>
                <StyledTree className="Diag" id="Diag1" style={{display: 'block'}} data={final} direction onClick={ item => {
                    dispatch(getActor(item.id));
                    history.push("/acteur/"+item.id)
                    } } />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      acteurs: state.acteurs.acteurs  }
  }
  export default connect(mapStateToProps, { getActors })(OrganigrammeGeneral);