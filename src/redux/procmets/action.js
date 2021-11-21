import axios from 'axios';
import config from '../../api/config';
import { setTime } from '../../functions/setTime'

export const getProcess = () => async dispatch => {


    const ID = await localStorage.getItem('user');

    const response = await axios.get(config.drupal_url+'/jsonapi/node/processus_metier?include=field_img_proc_met,field_proc_met_proc_met_pa,field_proc_met_sous_proc_m,field_proc_metier_docs,field_proc_metier_proc_org');

    console.log(response)

    var Procsorg = [];

    response.data.data.forEach(order => {

        var procmet = {};

        procmet['id'] = order.id;
        procmet['nom'] = order.attributes.title;
        procmet['code'] = order.attributes.field_code_proc_metier;
        procmet['documents'] = [];
        procmet['procedures'] = [];
        procmet['childs'] = [];
        procmet['parent'] = {};
        procmet['image'] = {};

        var docIndex = order.relationships.field_proc_metier_docs.data.length;
        var proceduresIndex = order.relationships.field_proc_metier_proc_org.data.length
        var childsIndex = order.relationships.field_proc_met_sous_proc_m.data.length

        response.data.included.forEach(file => {

            if (order.relationships.field_organisme.data.id === ID) {

                for (let i = 0; i < docIndex; i++) {

                    if ((file.id === order.relationships.field_proc_metier_docs.data[i].id) || file.id === undefined) {

                        procmet.documents.push({id: file.id, nom: file.attributes.title, date: setTime(file.attributes.created), file: config.drupal_url+'//sites/econseil.dd/files/'+file.attributes.title});
                        Procsorg = [...Procsorg, procmet];

                    }
                }

                for (let i = 0; i < proceduresIndex; i++) {

                    if ((file.id === order.relationships.field_proc_metier_proc_org.data[i].id) || file.id === undefined) {

                        procmet.procedures.push({id: file.id, nom: file.attributes.title, date: setTime(file.attributes.created)});
                        Procsorg = [...Procsorg, procmet];

                    }
                }

                for (let i = 0; i < childsIndex; i++) {

                    if ((file.id === order.relationships.field_proc_met_sous_proc_m.data[i].id) || file.id === undefined) {

                        procmet.childs.push({id: file.id, nom: file.attributes.title});
                        Procsorg = [...Procsorg, procmet];

                    }
                }


                if (order.relationships.field_proc_met_proc_met_pa.data != null) {
                    if (file.id === order.relationships.field_proc_met_proc_met_pa.data.id || file.id === undefined) {

                        procmet.parent = {id: file.id, nom: file.attributes.title};
                        Procsorg = [...Procsorg, procmet];

                    }
                }

                if (file.id === order.relationships.field_img_proc_met.data.id || file.id === undefined) {

                    procmet.image = config.drupal_url + file.attributes.uri.url
                    Procsorg = [...Procsorg, procmet];

                }
            }
        }
        )
    }
    );

    var Procmets = Procsorg.reduce((unique, o) => {
        if(!unique.some(obj => obj.id === o.id)) {
          unique.push(o);
        }
        return unique;
      },[]);


    dispatch(
        {
            type: 'GET_PROCMET',
            payload: Procmets
        }
    );

}