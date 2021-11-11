import axios from 'axios';
import config from '../../api/config';
import { setTime } from '../../functions/setTime';

export const getProcedures = () => async dispatch => {


    const ID = await localStorage.getItem('user');

    const response = await axios.get(config.drupal_url+'/jsonapi/node/processus_organisationnel?include=field_proc_org_proc_metier,field_img_proc_org,field_proc_org_docs,field_proc_org_operations');

    console.log(response)

    var Procsorgs = [];

    response.data.data.map(order => {

        var Procedure = {};

        Procedure['processus'] = {nom: "", id: ""};
        Procedure['nom'] = order.attributes.title;
        Procedure['date'] = setTime(order.attributes.created);
        Procedure['id'] = order.id;

        response.data.included.map(file => {

            if (order.relationships.field_organisme.data.id == ID) {


                if (file.id === order.relationships.field_proc_org_proc_metier.data.id || file.id === undefined) {

                    Procedure.processus.nom = file.attributes.title;
                    Procedure.processus.id = file.id;
                    Procsorgs = [...Procsorgs, Procedure];

                }
            }
        }
        )
    }
    );

    dispatch(
        {
            type: 'GET_PROCEDURES',
            payload: Procsorgs
        }
    );

}

export const getProcedure = (identifier) => async dispatch => {


    const ID = await localStorage.getItem('user');

    const response = await axios.get(config.drupal_url+'/jsonapi/node/processus_organisationnel/'+identifier+'?include=field_proc_org_proc_metier,field_img_proc_org,field_proc_org_docs,field_proc_org_operations');

    console.log(response)

    var Procedure = {};

    let order = response.data.data;

    Procedure['nom'] = order.attributes.title;
    Procedure['code'] = order.attributes.field_code_proc_org;
    Procedure['date'] = order.attributes.created;
    Procedure['da'] = order.attributes.field_domaine_application;
    Procedure['objet'] = order.attributes.field_objet_proc_org;
    Procedure['terminologie'] = order.attributes.field_terminologie;
    Procedure['regles'] = order.attributes.field_regles_de_gestion;
    Procedure['documents'] = [];
    Procedure['operations'] = [];
    Procedure['processus'] = {};
    Procedure['image'] = '';

    var docIndex = order.relationships.field_proc_org_docs.data.length;
    var opIndex = order.relationships.field_proc_org_operations.data.length;

        response.data.included.map(file => {

            if (order.relationships.field_organisme.data.id == ID) {

                for (let i = 0; i < docIndex; i++) {

                    if ((file.id === order.relationships.field_proc_org_docs.data[i].id) || file.id === undefined) {

                        let document = {
                            nom: file.attributes.title
                        };

                        Procedure.documents.push(document);

                    }


                }

                for (let i = 0; i < opIndex; i++) {

                    if ((file.id === order.relationships.field_proc_org_operations.data[i].id) || file.id === undefined) {

                        Procedure.operations.push(file);

                    }
                }

                if (file.id === order.relationships.field_proc_org_proc_metier.data.id || file.id === undefined) {

                    Procedure.processus['id'] = file.id;
                    Procedure.processus['nom'] = file.attributes.title;

                }

                if (file.id === order.relationships.field_img_proc_org.data.id || file.id === undefined) {

                    Procedure.image = config.drupal_url + file.attributes.uri.url;

                }
            }
        }
        );
    
        console.log(Procedure)

    dispatch(
        {
            type: 'GET_PROCEDURE',
            payload: Procedure
        }
    );

}

