import React, { useEffect, useState, } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactPaginate from 'react-paginate';
import { NavLink } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { getActors, getSubActors } from '../../redux/acteurs/action';



const ActeursInternes = (props) => {

    const dispatch = useDispatch();

    /* Get actors */

    useEffect(() => {
            
        props.getActors()

    },[]);


    const { acteurs } = props


    /*-------------*/

    console.log(acteurs);

 
    /* Pager */

    
    const [pageNumber, setPageNumber] = useState(0);


    const ordersPerPage = 7;
    const pagesVisited = pageNumber*ordersPerPage;
    const pageCount = Math.ceil(acteurs.length/ordersPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    };

    /*-------*/

    /* States */

    const [searchTerm, setSearchTerm] = useState('');

    /*--------*/


    /* Show actors */

    const display = acteurs.slice(pagesVisited, pagesVisited+ordersPerPage).filter((acteur, key) => {
        if (searchTerm == "") {
            return acteur;
        }
        else if (acteur.nom.toLowerCase().includes(searchTerm.toLowerCase())) {
            return acteur;
        }
    }).map((acteur, key) => {

        console.log(acteur);

        if(acteur.childs[0] !== undefined){

            if( acteur.parent.nom !== "" ){


            return (
                <tr key={key} >
                    <td data-label="Acteur :">
                        <img src="/images/orgu.ico.gif" alt=""  className="pd-b-7"/>&nbsp;&nbsp;
                        <NavLink className="text-dark" to={'/acteur/'+acteur.id}>{acteur.nom}</NavLink>
                    </td>
                    <td data-label="Type :">{acteur.type}</td>
                    <td data-label="Rattachement :">
                        <img src="/images/orgu.ico.gif" alt="" className="pd-b-7"/>&nbsp;&nbsp;
                        <NavLink className="text-dark" to={'/acteur/'+acteur.parent.id}>{acteur.parent.nom}</NavLink>
                    </td>
                    <td data-label="Acteurs rattach??s :">
                        <NavLink onClick={() => { dispatch(getSubActors(acteur.childs)) }} className="text-dark" to={'/acteurs-rattache/'+acteur.id}>Rattachement</NavLink>
                    </td>
                </tr>
            );}

            return (
                <tr key={key} >
                    <td data-label="Acteur :">
                        <img src="/images/orgu.ico.gif" alt="" class="pd-b-7"/>&nbsp;&nbsp;
                        <NavLink className="text-dark" to={'/acteur/'+acteur.id}>{acteur.nom}</NavLink>
                    </td>
                    <td data-label="Type :">{acteur.type}</td>
                    <td data-label="Rattachement :">Pas d'acteur parent</td>
                    <td data-label="Acteurs rattach??s :">
                        <NavLink onClick={() => { dispatch(getSubActors(acteur.childs)) }} className="text-dark" to={'/acteurs-rattache/'+acteur.id}>Rattachement</NavLink>
                    </td>
                </tr>
            );

        }

        else {

            if( acteur.parent.nom !== "" ){

            return (
                <tr key={key} >
                    <td data-label="Acteur :">
                        <img src="/images/orgu.ico.gif" alt="" className="pd-b-7"/>&nbsp;&nbsp;
                        <NavLink className="text-dark" to={'/acteur/'+acteur.id}>{acteur.nom}</NavLink>
                    </td>
                    <td data-label="Type :">{acteur.type}</td>
                    <td data-label="Rattachement :">
                        <img src="/images/orgu.ico.gif" alt="" className="pd-b-7"/>&nbsp;&nbsp;
                        <NavLink className="text-dark" to={'/acteur/'+acteur.parent.id}>{acteur.parent.nom}</NavLink>
                    </td>
                    <td data-label="Acteurs rattach??s :">Pas de sous acteurs</td>
                </tr>
            );}

            return (
                <tr key={key} >
                    <td data-label="Acteur :">
                        <img src="/images/orgu.ico.gif" alt="" className="pd-b-7"/>&nbsp;&nbsp;
                        <NavLink className="text-dark" to={'/acteur/'+acteur.id}>{acteur.nom}</NavLink>
                    </td>
                    <td data-label="Type :">{acteur.type}</td>
                    <td data-label="Rattachement :">Pas d'acteur parent</td>
                    <td data-label="Acteurs rattach??s :">Pas de sous acteurs</td>
                </tr>
            );
            
        }


    } );

    /*--------*/

    
    return (
        <div className="content-wrapper">
            <div className="content">
                <div className="az-content-body az-content-body-dashboard-six mg-b-40 pd-l-25 pd-t-10">
                    <div className="row wd-100p">
                        <div className="col-12">
                            <h5 >Acteurs internes</h5>
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
                                        <th className="wd-15p">Rattachement</th>
                                        <th className="wd-20p">Acteurs rattach??s </th>
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

const mapStateToProps = (state) => {
    return {
      acteurs: state.acteurs.acteurs  }
  }
  export default connect(mapStateToProps, { getActors })(ActeursInternes);