import axios from 'axios';
import config from '../../api/config';
import { setTime } from '../../functions/setTime';

export const getProcedures = () => async dispatch => {


    const ID = await localStorage.getItem('user');

    const response = await axios.get(config.drupal_url+'/jsonapi/node/processus_organisationnel?include=field_proc_org_proc_metier,field_img_proc_org,field_proc_org_docs,field_proc_org_operations');

    console.log(response)

    var Procsorgs = [];

    response.data.data.forEach(order => {

        var Procedure = {};

        Procedure['code'] = order.attributes.field_code_proc_org;
        Procedure['da'] = order.attributes.field_domaine_application;
        Procedure['objet'] = order.attributes.field_objet_proc_org;
        Procedure['terminologie'] = order.attributes.field_terminologie;
        Procedure['regles'] = order.attributes.field_regles_de_gestion;
        Procedure['documents'] = [];
        Procedure['operations'] = [];
        Procedure['image'] = '';
        Procedure['processus'] = {nom: "", id: ""};
        Procedure['nom'] = order.attributes.title;
        Procedure['date'] = setTime(order.attributes.created);
        Procedure['id'] = order.id;

        var docIndex = order.relationships.field_proc_org_docs.data.length;
        var opIndex = order.relationships.field_proc_org_operations.data.length;

        response.data.included.forEach(file => {

            if (order.relationships.field_organisme.data.id === ID) {


                for (let i = 0; i < docIndex; i++) {

                    if ((file.id === order.relationships.field_proc_org_docs.data[i].id) || file.id === undefined) {

                        let document = {
                            nom: file.attributes.title,
                            file: config.drupal_url+'//sites/econseil.dd/files/'+file.attributes.title
                        };

                        Procedure.documents.push(document);

                    }


                }

                for (let i = 0; i < opIndex; i++) {

                    if ((file.id === order.relationships.field_proc_org_operations.data[i].id) || file.id === undefined) {

                        Procedure.operations.push({nom: file.attributes.title, id: file.id});

                    }
                }

                if (file.id === order.relationships.field_proc_org_proc_metier.data.id || file.id === undefined) {

                    Procedure.processus['id'] = file.id;
                    Procedure.processus['nom'] = file.attributes.title;

                }

                if (file.id === order.relationships.field_img_proc_org.data.id || file.id === undefined) {

                    Procedure.image = config.drupal_url + file.attributes.uri.url;

                }

                Procsorgs.push(Procedure);

            }
        }
        )
    }
    );

    var Procsorg = Procsorgs.reduce((unique, o) => {
        if(!unique.some(obj => obj.id === o.id)) {
          unique.push(o);
        }
        return unique;
      },[]);

    dispatch(
        {
            type: 'GET_PROCEDURES',
            payload: Procsorg
        }
    );

}

