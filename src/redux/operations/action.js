import axios from 'axios';
import config from '../../api/config';
import { setTime } from '../../functions/setTime';

export const getOperations = () => async dispatch => {
    
    const ID = await localStorage.getItem('user');

    const response = await axios.get(config.drupal_url+'/jsonapi/node/operation?include=field_operation_acteurs,field_operation_docs,field_operation_proc_org');

    var operations = [];

    response.data.data.map( element => {

        var operation = {};

        operation['id'] = element.id;
        operation['nom'] = element.attributes.title;
        operation['type'] = element.attributes.field_type_operation;
        operation['description'] = element.attributes.field_description_operation;
        operation['date'] = element.attributes.created;
        operation['procedure'] = {};
        operation['documents'] = [];
        operation['acteurs'] = [];

        var documentsIndex = element.relationships.field_operation_docs.data.length;
        var acteursIndex = element.relationships.field_operation_acteurs.data.length

        response.data.included.map( file => {

            if (element.relationships.field_organisme.data.id === ID) {

                for (let i = 0; i < documentsIndex; i++) {

                    if ((file.id === element.relationships.field_operation_docs.data[i].id) || file.id === undefined) {

                        operation.documents.push(file);
                    }
                }

                for (let i = 0; i < acteursIndex; i++) {

                    if ((file.id === element.relationships.field_operation_acteurs.data[i].id) || file.id === undefined) {

                        operation.acteurs.push(file);
                    }
                }

                if (file.id === element.relationships.field_operation_proc_org.data.id || file.id === undefined) {

                    operation.procedure = {id: file.id, nom: file.attributes.title}
                }

                operations = [...operations, operation];

            }
        }
        )
    }
    );

    console.log(operations)
  
      dispatch(
          {
              type: 'GET_OPERATIONS',
              payload: operations
          }
      );
}

export const getOperationActors = (identifier) => async dispatch => {


    const ID = await localStorage.getItem('user');

    const response = await axios.get(config.drupal_url+'/jsonapi/node/acteur?include=field_acteurs_acteur_parent,field_acteur_operations,field_acteur_proc_orgs,field_acteur_sous_acteurs,field_acteur_profil&filter[field_acteur_operations.id]='+identifier);

    console.log(response)

    var actors = [];

    response.data.data.map(element => {

        var actor = {};

        actor['nom'] = element.attributes.title;
        actor['type'] = element.attributes.field_type_acteur;
        actor['id'] = element.id;
        actor['childs'] = [];
        actor['parent'] = {nom: "", id: ""};

        var childsIndex = element.relationships.field_acteur_sous_acteurs.data.length;

        response.data.included.map(file => {

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