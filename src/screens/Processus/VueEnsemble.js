import React, { useEffect} from 'react';
import { faSearchPlus, faSearchMinus, faExpand,faArrowsAltV,faArrowsAltH} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { getVueEnsemble } from '../../redux/vueens/action';
import * as imageSizing from '../../functions/ImageSizing';

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
            <div className="Diag test" id="Diag1" style={{display: 'block'}} >
                <img src={Image} className="OGimg" usemap="#4E1EEDC85FF233F4" border={0} />
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
      vueensemble: state.vueensemble.vueensemble  }
    }
export default connect(mapStateToProps, { getVueEnsemble })(VueEnsemble);