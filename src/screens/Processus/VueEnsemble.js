import React, {useState, useEffect} from 'react';
import { faSearchPlus, faSearchMinus, faExpand,faArrowsAltV,faArrowsAltH} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { getVueEnsemble } from '../../redux/vueens/action';

const VueEnsemble = (props) => {

    let Image = '';

    const { vueensemble } = props;

    /* Get Vue Ensemble */

    useEffect(() => {

        props.getVueEnsemble()

    }, []);


    var vueEnsemble = vueensemble.reduce((unique, o) => {
        if(!unique.some(obj => obj.id === o.id)) {
          unique.push(o);
        }
        return unique;
      },[]);
    
    if(vueEnsemble[0] === undefined){
        Image = '';
    }
    else{
        Image = vueEnsemble[0].image;
    }

    /*----------------*/


    return (
        <div>
            <h5 className="vde">Vue d'ensemble</h5>

            <div style={{marginLeft: '2%'}} className="veBtnContainer" role="group">
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
            <div className="test">
                <img src={Image} className="OGimg"/>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
      vueensemble: state.vueensemble.vueensemble  }
    }
export default connect(mapStateToProps, { getVueEnsemble })(VueEnsemble);