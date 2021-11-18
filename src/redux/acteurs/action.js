import axios from 'axios';
import config from '../../api/config';

export const getActors = () => async dispatch => {


    const ID = await localStorage.getItem('user');

    const response = await axios.get(config.drupal_url+'/jsonapi/node/acteur?include=field_acteur_parent,field_acteur_operations,field_acteur_proc_orgs,field_sous_acteurs,field_acteur_profile');

    console.log(response)

    var actors = [];

    response.data.data.forEach(element => {

        var actor = {};

        actor['email'] = element.attributes.field_email_acteur;
        actor['description'] = element.attributes.field_description_acteur;
        actor['operations'] = [];
        actor['procedures'] = [];
        actor['profile'] = '';
        actor['nom'] = element.attributes.title;
        actor['email'] = element.attributes.field_email_acteur;
        actor['type'] = element.attributes.field_type_acteur;
        actor['id'] = element.id;
        actor['childs'] = [];
        actor['parent'] = {nom: "", id: ""};

        var proceduresIndex = element.relationships.field_acteur_proc_orgs.data.length;
        var operationsIndex = element.relationships.field_acteur_operations.data.length;
        var childsIndex = element.relationships.field_sous_acteurs.data.length;

        response.data.included.forEach(file => {

            if (element.relationships.field_organisme.data.id === ID) {

                if (file.id === element.relationships.field_acteur_profile.data.id || file.id === undefined) {

                    actor.profile = file.attributes.name;
    
                }

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

                        actor.childs.push({id: file.id, nom: file.attributes.title, type: file.attributes.field_type_acteur, parent: {nom: actor.nom, id: actor.id}});

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

    var Acteurs = actors.reduce((unique, o) => {
        if(!unique.some(obj => obj.id === o.id)) {
          unique.push(o);
        }
        return unique;
    },[]);


    dispatch(
        {
            type: 'GET_ACTORS',
            payload: Acteurs
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
