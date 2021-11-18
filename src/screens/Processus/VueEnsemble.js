import React, {useEffect} from 'react';

import { connect } from 'react-redux';
import { getProcess } from '../../redux/procmets/action';
import { useHistory } from "react-router-dom";
import Tree, { withStyles } from 'react-vertical-tree-react-17';



const VueEnsemble = (props) => {

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

    /* Get Process */

    useEffect(() => {

        props.getProcess()

    },[]);

    const { procmets } = props

    var Procmets = procmets.reduce((unique, o) => {
        if(!unique.some(obj => obj.id === o.id)) {
          unique.push(o);
        }
        return unique;
      },[]);

    /*-------------*/

    console.log(Procmets);

    // data have to be below structure

    const dataa = [];


    Procmets.map( process => {

        var processus = {};

        processus["id"] = process.id;
        processus["name"] = process.nom;
        processus["parent"] = {id: process.parent.id};
        processus["children"] = [];

        dataa.push(processus);

    });

    console.log(dataa);


     dataa.map( process => {

         dataa.map( actor => {

             if( actor.parent.id === process.id ){
                process.children.push(actor);
             };
         });
     });

     const final = [];

     dataa.map( process => {
        if(process.parent.id === undefined){
            process.parent = null;
            final.push(process);
        }
     })

     console.log(final);



    return (
        <div>
            <h5 className="vde">Vue d'ensemble</h5>

            <div className="organigramme" >
                <StyledTree data={final} direction onClick={ item => {
                    history.push("/ProcessusAchat/"+item.id)
                    } } />
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
      procmets: state.procmets.procmets 
    }
}
export default connect(mapStateToProps, { getProcess })(VueEnsemble);