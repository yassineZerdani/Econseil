import React from 'react';
import Tree, { withStyles } from 'react-vertical-tree-react-17';
import { useDispatch, connect } from 'react-redux';
import { getActors, getActor } from '../../redux/acteurs/action';
import { useEffect } from 'react';
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

    var Acteurs = acteurs.reduce((unique, o) => {
        if(!unique.some(obj => obj.id === o.id)) {
          unique.push(o);
        }
        return unique;
      },[]);
  

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
            acteur.parent = null;
            final.push(acteur);
        }
     })

     console.log(final);


    return (
        <div>
            <h5 className="vde">Organigramme général</h5>

            <div className="organigramme" >
                <StyledTree data={final} direction onClick={ item => {
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