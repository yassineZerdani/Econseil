import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getData } from '../../redux/documents/action';
import { setTime } from '../../functions/setTime';
import { download } from '../../functions/downloadDocuments';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactPaginate from 'react-paginate';


const DocumentsAnnex = (props) => {

    /* Get documents */

    useEffect(() => {

        props.getData()

    }, []);

    const { documents } = props;

    console.log(documents);

    /*---------------*/

    /* States */

    const [searchTerm, setSearchTerm] = useState('');
    const [pageNumber, setPageNumber] = useState(0);

    /*--------*/

    /* Pager */

    const documentsPerPage = 7;
    const pagesVisited = pageNumber * documentsPerPage;
    const pageCount = Math.ceil(documents.length / documentsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    /*-------*/


    /* Show documents */

    const displayDocuments = documents.slice(pagesVisited, pagesVisited + documentsPerPage).filter((document, key) => {
        if (searchTerm == "") {
            return document;
        }
        else if (document[0].attributes.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return document;
        }
    }).map((document, key) => {

        if(documents === []){
            return (
                <tr key={key} >
                    <td data-label="il n'y a pas de résultats">
                        il n'y a pas de résultats
                    </td>
                </tr>
            )
        }

        return (
            <tr key={key} >
                <td data-label="Document :">
                    <button onClick={()=>download(document[1])}><img src="/images/extr.ico.gif" alt="" className="pd-b-7" />&nbsp;&nbsp;{document[0].attributes.title}</button>
                </td>
                <td data-label="Référence :"></td>
                <td data-label="Type :"></td>
                <td data-label="Date de publication :">{setTime(document[0].attributes.created)}</td>
            </tr>
        );
    });

    /*-----------------*/


    return (
        <div className="content-wrapper">
            <div className="content">
                <div className="az-content-body az-content-body-dashboard-six mg-b-40 pd-l-25 pd-t-10">
                    <div className="row wd-100p">
                        <div className="col-12">
                            <h5 >Documents/Annexes</h5>
                        </div>
                        <div className="search-box">
                            <button className="btn-search"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
                            <input type="text" className="input-search" placeholder="Rechercher..." onChange={event => { setSearchTerm(event.target.value) }} />
                        </div>
                        <div className="table-wrapper">
                            <table className="da-table">
                                <thead>
                                    <tr>
                                        <th scope="col">Document</th>
                                        <th scope="col">Référence</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Date de publication</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayDocuments}
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
                        <br />
                        <br />
                        <br />
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        documents: state.documents.documents
    }
}
export default connect(mapStateToProps, { getData })(DocumentsAnnex);