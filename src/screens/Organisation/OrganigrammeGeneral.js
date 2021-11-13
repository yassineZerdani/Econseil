import { faArrowsAltH, faArrowsAltV, faExpand, faSearchMinus, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import * as imageSizing from '../../functions/ImageSizing';

const OrganigrammeGeneral = () => {


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
            </div>
        </div>
    )
}

export default OrganigrammeGeneral;