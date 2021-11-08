import axios from 'axios';
import config from '../../api/config';

export const getActors = () => async dispatch => {


    const ID = await localStorage.getItem('user');

    const response = await axios.get(config.drupal_url+'/jsonapi/node/acteur?include=field_acteur_parent,field_acteur_operations,field_acteur_proc_orgs,field_sous_acteurs,field_acteur_profile');

    console.log(response)

    var actors = [];

    response.data.data.map(element => {

        var actor = {};

        actor['nom'] = element.attributes.title;
        actor['type'] = element.attributes.field_type_acteur;
        actor['id'] = element.id;
        actor['childs'] = [];
        actor['parent'] = {nom: "", id: ""};

        var childsIndex = element.relationships.field_sous_acteurs.data.length;

        response.data.included.map(file => {

            if (element.relationships.field_organisme.data.id == ID) {


                for (let i = 0; i < childsIndex; i++) {

                    if ((file.id === element.relationships.field_sous_acteurs.data[i].id)) {

                        actor.childs.push({nom: file.attributes.title, id: file.id, type: file.attributes.field_type_acteur});

                    }
                }

                if (element.relationships.field_acteur_parent.data != null) {
                    if (file.id === element.relationships.field_acteur_parent.data.id || file.id === undefined) {

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
            type: 'GET_ACTORS',
            payload: actors
        }
    );
}

export const getActor = (identifier) => async dispatch => {


    const ID = await localStorage.getItem('user');

    const response = await axios.get(config.drupal_url+'/jsonapi/node/acteur/' + identifier + '?include=field_acteur_parent,field_acteur_operations,field_acteur_proc_orgs,field_sous_acteurs,field_acteur_profile');

    console.log(response)

    var Procsorg = [];

    let element = response.data.data;
    let actor = {};

    actor['nom'] = element.attributes.title;
    actor['type'] = element.attributes.field_type_acteur;
    actor['email'] = element.attributes.field_email_acteur;
    actor['description'] = element.attributes.field_description_acteur;
    actor['operations'] = [];
    actor['procedures'] = [];
    actor['childs'] = [];
    actor['parent'] = {};
    actor['profile'] = '';


    var proceduresIndex = element.relationships.field_acteur_proc_orgs.data.length;
    var operationsIndex = element.relationships.field_acteur_operations.data.length;
    var childsIndex = element.relationships.field_sous_acteurs.data.length;


    response.data.included.map(file => {

        if (element.relationships.field_organisme.data.id == ID) {

            for (let i = 0; i < proceduresIndex; i++) {

                if ((file.id === element.relationships.field_acteur_proc_orgs.data[i].id)) {


                    actor.procedures.push(file);

                }
            }

            for (let i = 0; i < operationsIndex; i++) {

                if ((file.id === element.relationships.field_acteur_operations.data[i].id)) {

                    actor.operations.push(file);

                }


            }

            for (let i = 0; i < childsIndex; i++) {

                if ((file.id === element.relationships.field_sous_acteurs.data[i].id)) {

                    actor.childs.push(file);

                }


            }

            if (element.relationships.field_acteur_parent.data != null) {
                if (file.id === element.relationships.field_acteur_parent.data.id || file.id === undefined) {

                    actor.parent = file

                }
            }

            if (file.id === element.relationships.field_acteur_profile.data.id || file.id === undefined) {

                actor.profile = file.attributes.name;

            }
        }
    }
    );

    dispatch(
        {
            type: 'GET_ACTOR',
            payload: actor
        }
    );

}

export const getSubActors = (list) => async dispatch => {

    dispatch(
        {
            type: 'GET_SUB_ACTORS',
            payload: list
        }
    );
}
