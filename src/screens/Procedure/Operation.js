import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getOperations } from '../../redux/operations/action';

const Operation = (props) => {

  useEffect(() => {

    props.getOperations();
    
  }, []);

  const { operations } = props

  console.log(operations)

  var operation = {};

  operations.map( op => {
    if( op.id == props.match.params.id){
      operation = op;
    }
  });

  console.log(operations);


  /* Pager */

  // const ordersPerPage = 7;
  // const pagesVisited = pageNumber*ordersPerPage;
  // const pageCount = Math.ceil(Operation.acteurs.length/ordersPerPage);

  // const changePage = ({selected}) => {
  //     setPageNumber(selected);
  // };

  /*-------*/


/* Show Process */

// const displayProcess = Operation.acteurs.slice(pagesVisited, pagesVisited+ordersPerPage).filter(operation => {
//   if (searchTerm == "") {
//       return operation;
//   }
//   else if (operation.attributes.title.toLowerCase().includes(searchTerm.toLowerCase())) {
//       return operation;
//   }
// }).map((operation, key) => {

//   return (
//       <tr key={key} >
//           <td>
//               <NavLink to={'/ProcessusAchat/'+operation.id} className="text-dark" to={'/'}>{operation.id}</NavLink>
//           </td>
//           <td>
//               <img src="/images/busp.ico.gif"  class="pd-b-7"/>&nbsp;&nbsp;
//               <NavLink to={'/ProcessusAchat/'+operation.id}>{operation.id}</NavLink>
//           </td>
//           <td>finalité</td>
//           <td>{operation.id}</td>
//       </tr>
//   );
// } );

/*------------*/


return (
    <div>
    <h5 className="po-h">{operation.nom}</h5>

    <div className="po-table-wrapper" >
      <table className="po-table" >
        <thead>
          <tr>
            <th>Procédure détentrice</th>
            <th>Type</th>
            <th>Intervenants</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
                <img src="/images/proc.ico.gif" alt="" className="pd-b-7" />&nbsp;&nbsp;
                <NavLink to={'/ProcessusOrganisationnel/' + operation.procedure.id}>{operation.procedure.nom}</NavLink>
            </td>
            <td>{operation.type}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className= "po-table-wrapper" >
        <div>
          <h5 style={{padding: '1%', backgroundColor: '#324960', color: 'white', textAlign:"left", fontSize:"14px"}}>Description de l'opération</h5>
          <p style={{padding: '2%', color: 'grey'}}>{operation.description}</p>
        </div>
      </div>
  </div>
)
}

const mapStateToProps = (state) => {
  return {
    operations: state.operations.operations
  }
}
export default connect(mapStateToProps, { getOperations })(Operation);



