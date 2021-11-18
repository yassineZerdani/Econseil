import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { getProcedures } from '../../redux/procorgs/action';
import { NavLink } from 'react-router-dom';


import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactPaginate from 'react-paginate';


const IndexProcedure = (props) => {

    /* Get procedures */

    useEffect(() => {
        
        props.getProcedures()

    },[]);

    const { procorgs } = props

    console.log(procorgs);

    /*---------------*/

    /* States */

    const [pageNumber, setPageNumber] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    /*-------*/

 
    /* Pager */

    const proceduresPerPage = 7;
    const pagesVisited = pageNumber*proceduresPerPage;
    const pageCount = Math.ceil(procorgs.length/proceduresPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    };

    /*-------*/

    /* Show procedures */

    const displayProcedures = procorgs.slice(pagesVisited, pagesVisited+proceduresPerPage).filter((procedure, key)  => {
        if (searchTerm == "") {
            return procedure;
        }
        else if (procedure.nom.toLowerCase().includes(searchTerm.toLowerCase())) {
            return procedure;
        }
    }).map((procedure, key) => {

        return (
            <tr key={key} >
                <td data-label="Procédure">
                    <img src="/images/proc.ico.gif" alt="" className="pd-b-7" />&nbsp;&nbsp;
                    <NavLink to={'/ProcessusOrganisationnel/' + procedure.id}>{procedure.nom}</NavLink>
                </td>
                <td data-label="Référence">
                    
                </td>
                <td data-label="Processus de rattachement">
                    <img src="/images/busp.ico.gif" alt="" className="pd-b-7"/>&nbsp;&nbsp;
                    <NavLink to={'/ProcessusAchat/'+procedure.processus.id}>{procedure.processus.nom}</NavLink>
                </td>
                <td data-label="Activité de rattachement">

                </td>
                <td data-label="Date d'application">{procedure.date}</td>
            </tr>
        );
    } );

    /*--------------*/


    return (
        <div className="content-wrapper">
            <div className="content">
                <div className="az-content-body az-content-body-dashboard-six mg-b-40 pd-l-25 pd-t-10">
                    <div className="row wd-100p">
                        <div className="col-12">
                            <h5 >Index des procédures</h5>
                        </div>
                        <div className="search-box">
                            <button className="btn-search"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
                            <input type="text" className="input-search" placeholder="Rechercher..." onChange={event => {setSearchTerm(event.target.value);}}/>
                        </div>
                        <div className="table-wrapper">
                            <table id="ActeurInterneTableId" className="da-table" >
                                <thead>
                                    <tr>
                                        <th >Procédure</th>
                                        <th >Référence</th>
                                        <th >Processus de rattachement</th>
                                        <th >Activité de rattachement</th>
                                        <th >Date d'application</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayProcedures}
                                </tbody>
                                <ReactPaginate
                                    previousLabel={'<'}
                                    nextLabel={'>'}
                                    pageCount={pageCount}
                                    onPageChange={changePage}
                                    containerClassName={"page"}
                                    previousClassName={"page__btn"}
                                    nextClassName={"page__btn"}
                                    disabledClassName={"page__numbers"}
                                    activeClassName={"page__numbers active"}
                                />
                            </table>           
                        </div>
                        <br/>
                        <br/>
                        <br/>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      procorgs: state.procorgs.procorgs  
    }
}
export default connect(mapStateToProps, { getProcedures })(IndexProcedure);