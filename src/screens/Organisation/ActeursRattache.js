import React, { useState, } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactPaginate from 'react-paginate';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const ActeursRattache = () => {

    /* States */

    const [pageNumber, setPageNumber] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    /*--------*/

    /* Get actors */

    const Acteurs = useSelector(state => state.acteurs.acteurs_attached);

    console.log(Acteurs);

    /*------------*/

    const dispatch = useDispatch();

 
    /* Pager */

    const ordersPerPage = 7;
    const pagesVisited = pageNumber*ordersPerPage;
    const pageCount = Math.ceil(Acteurs.length/ordersPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    };

    /*----------*/

    /* Show actors */

    const display = Acteurs.slice(pagesVisited, pagesVisited + ordersPerPage).filter((acteur, key) => {
        if (searchTerm == "") {
            return acteur;
        }
        else if (acteur.nom.toLowerCase().includes(searchTerm.toLowerCase())) {
            return acteur;
        }
    }).map((acteur, key) => {

        return (
            <tr key={key} >
                <td data-label="Acteur :">
                    <img src="/images/orgu.ico.gif" alt="" className="pd-b-7"/>&nbsp;&nbsp;
                    <NavLink className="text-dark" to={'/acteur/'+acteur.id}>{acteur.nom}</NavLink>
                </td>
                <td data-label="Type">{acteur.type}</td>
            </tr>
        );
    } );

    /*---------*/

    return (
        <div className="content-wrapper">
            <div className="content">
                <div className="az-content-body az-content-body-dashboard-six mg-b-40 pd-l-25 pd-t-10">
                    <div className="row wd-100p">
                        <div className="col-12">
                            <h5 >Acteurs rattachés</h5>
                        </div>
                        <div className="search-box">
                            <button className="btn-search"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
                            <input type="text" className="input-search" placeholder="Rechercher..." onChange={event => {setSearchTerm(event.target.value);}}/>
                        </div>
                        <div className="table-wrapper">
                            <table id="ActeurInterneTableId" className="da-table" >
                                <thead>
                                    <tr>
                                        <th className="wd-15p">Acteur</th>
                                        <th className="wd-5p">Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {display}
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

export default ActeursRattache;