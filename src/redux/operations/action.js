import axios from 'axios';
import config from '../../api/config';

export const getOperations = () => async dispatch => {
    
    const ID = await localStorage.getItem('user');

    const response = await axios.get(config.drupal_url+'/jsonapi/node/operation?include=field_operation_acteurs,field_operation_docs,field_operation_proc_org');

      var Procsorg = [];

    response.data.data.forEach(order => {

        order['documents'] = [];
        order['acteurs'] = [];
        order['procedure'] = {};

        var documentsIndex = order.relationships.field_operation_docs.data.length;
        var acteursIndex = order.relationships.field_operation_acteurs.data.length

        response.data.included.forEach(file => {

            if (order.relationships.field_organisme.data.id === ID) {

                for (let i = 0; i < documentsIndex; i++) {

                    if ((file.id === order.relationships.field_operation_docs.data[i].id) || file.id === undefined) {

                        order.documents.push(file);
                        Procsorg = [...Procsorg, order];

                    }
                }

                for (let i = 0; i < acteursIndex; i++) {

                    if ((file.id === order.relationships.field_operation_acteurs.data[i].id) || file.id === undefined) {

                        order.acteurs.push(file);
                        Procsorg = [...Procsorg, order];

                    }
                }

                if (file.id === order.relationships.field_operation_proc_org.data.id || file.id === undefined) {

                    order.procedure = file
                    Procsorg = [...Procsorg, order];

                }
            }
        }
        )
    }
    );
  
      dispatch(
          {
              type: 'GET_OPERATIONS',
              payload: Procsorg
          }
      );
}

export const getOperation = (identifier) => async dispatch => {
    
    const response = await axios.get(config.drupal_url+'/jsonapi/node/operation/'+identifier+'?include=field_operation_acteurs,field_operation_docs,field_operation_proc_org');

      var order = response.data.data;

      console.log(order);

      var operation = {};

      operation['nom'] = order.attributes.title;
      operation['procedure'] = {nom: "", id: ""};
      operation['type'] = "";
      operation['acteurs'] = [];
      operation['documents'] = [];
      operation['description'] = "";

      var documentsIndex = order.relationships.field_operation_docs.data.length;
      var acteursIndex = order.relationships.field_operation_acteurs.data.length;

        response.data.included.forEach(file => {

                 for (let i = 0; i < documentsIndex; i++) {

                     if ((file.id === order.relationships.field_operation_docs.data[i].id) || file.id === undefined) {

                         operation.documents.push(file);

                     }
                 }

                 for (let i = 0; i < acteursIndex; i++) {

                     if ((file.id === order.relationships.field_operation_acteurs.data[i].id) || file.id === undefined) {
                         
                         var acteur = {};
                         acteur["nom"] = file.attributes.title;
                         acteur["id"] = file.id;
                         operation.acteurs.push(acteur);

                     }
                 }

                 if (file.id === order.relationships.field_operation_proc_org.data.id || file.id === undefined) {

                     operation.procedure.nom = file.attributes.title;
                     operation.procedure.id= file.id;


                 }
        }
        );
  
      dispatch(
          {
              type: 'GET_OPERATION',
              payload: operation
          }
      );
}

export const getOperationActors = (identifier) => async dispatch => {


    const ID = await localStorage.getItem('user');

    const response = await axios.get(config.drupal_url+'/jsonapi/node/acteur?include=field_acteurs_acteur_parent,field_acteur_operations,field_acteur_proc_orgs,field_acteur_sous_acteurs,field_acteur_profil&filter[field_acteur_operations.id]='+identifier);

    console.log(response)

    var actors = [];

    response.data.data.forEach(element => {

        var actor = {};

        actor['nom'] = element.attributes.title;
        actor['type'] = element.attributes.field_type_acteur;
        actor['id'] = element.id;
        actor['childs'] = [];
        actor['parent'] = {nom: "", id: ""};

        var childsIndex = element.relationships.field_acteur_sous_acteurs.data.length;

        response.data.included.forEach(file => {

            if (element.relationships.field_organisation.data.id === ID) {


                for (let i = 0; i < childsIndex; i++) {

                    if ((file.id === element.relationships.field_acteur_sous_acteurs.data[i].id)) {

                        actor.childs.push({nom: file.attributes.title, id: file.id, type: file.attributes.field_type_acteur});

                    }
                }

                if (element.relationships.field_acteurs_acteur_parent.data != null) {
                    if (file.id === element.relationships.field_acteurs_acteur_parent.data.id || file.id === undefined) {

                        actor.parent.nom = file.attributes.title;
                        actor.parent.id = file.id;

                    }
                }

                actors = [...actors, actor];
            }
        }
        )
    }
    );

    dispatch(
        {
            type: 'GET_OPERATION_ACTORS',
            payload: actors
        }
    );
}