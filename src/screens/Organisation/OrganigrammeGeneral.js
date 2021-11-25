import React from 'react';
import Tree, { withStyles } from 'react-vertical-tree-react-17';
import { connect } from 'react-redux';
import { getActors } from '../../redux/acteurs/action';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";


const OrganigrammeGeneral = (props) => {

    const styles = {
        lines: {
          color: '#00A4BF',
          height: '80px',
        },
        node: {
          backgroundColor: '#00A4BF',
          border: 'solid #00A4BF',
          borderRadius: '0px',
          width: '20vh',
          backgroundImage: `url("images/ml.jpg")`,
          backgroundRepeat: 'no-repeat'
        },
        text: {
          color: 'white',
        }
      }

    const StyledTree = withStyles(styles)(Tree)

    const history = useHistory();

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


     dataa.forEach( acteur => {

         dataa.forEach( actor => {

             if( actor.parent.id === acteur.id ){
                 acteur.children.push(actor);
             };
         });
     });

     const final = [];

     dataa.forEach( acteur => {
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