import { faArrowsAltH, faArrowsAltV, faExpand, faSearchMinus, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const OrganigrammeGeneral = () => {


    return (
        <div>
            <h5 className="vde">Organigramme général</h5>

            <div  className="veBtnContainer" role="group">
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
            <div>
            <img className="OGimg" src="assets/images/93bf9d395db42247_c_fa10fac95ff2442d.png" alt="../images/93bf9d395db42247_c_fa10fac95ff2442d.png" usemap="#FA10FAC95FF2442D" border="0" />
            </div>
        </div>
    )
}

export default OrganigrammeGeneral;