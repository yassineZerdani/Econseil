import axios from 'axios';
import config from '../../api/config';

export const getProcess = () => async dispatch => {


    const ID = await localStorage.getItem('user');

    const response = await axios.get(config.drupal_url+'/jsonapi/node/processus_metier?include=field_img_proc_met,field_proc_met_proc_met_pa,field_proc_met_sous_proc_m,field_proc_metier_docs,field_proc_metier_proc_org');

    console.log(response)

    var Procsorg = [];

    response.data.data.map(order => {

        order['documents'] = [];
        order['procedures'] = [];
        order['childs'] = [];
        order['parent'] = {};
        order['image'] = {};

        var docIndex = order.relationships.field_proc_metier_docs.data.length;
        var proceduresIndex = order.relationships.field_proc_metier_proc_org.data.length
        var childsIndex = order.relationships.field_proc_met_sous_proc_m.data.length

        response.data.included.map(file => {

            if (order.relationships.field_organisme.data.id == ID) {

                for (let i = 0; i < docIndex; i++) {

                    if ((file.id === order.relationships.field_proc_metier_docs.data[i].id) || file.id === undefined) {

                        order.documents.push(file);
                        Procsorg = [...Procsorg, order];

                    }
                }

                for (let i = 0; i < proceduresIndex; i++) {

                    if ((file.id === order.relationships.field_proc_metier_proc_org.data[i].id) || file.id === undefined) {

                        order.procedures.push(file);
                        Procsorg = [...Procsorg, order];

                    }
                }

                for (let i = 0; i < childsIndex; i++) {

                    if ((file.id === order.relationships.field_proc_met_sous_proc_m.data[i].id) || file.id === undefined) {

                        order.childs.push(file);
                        Procsorg = [...Procsorg, order];

                    }
                }


                if (order.relationships.field_proc_met_proc_met_pa.data != null) {
                    if (file.id === order.relationships.field_proc_met_proc_met_pa.data.id || file.id === undefined) {

                        order.parent = file;
                        Procsorg = [...Procsorg, order];

                    }
                }

                if (file.id === order.relationships.field_img_proc_met.data.id || file.id === undefined) {

                    order.image = file
                    Procsorg = [...Procsorg, order];

                }
            }
        }
        )
        console.log(order)
    }
    );

    console.log(Procsorg)

    dispatch(
        {
            type: 'GET_PROCMET',
            payload: Procsorg
        }
    );

}

export const getOneProcess = (identifier) => async dispatch => {


    const response = await axios.get(config.drupal_url+'/jsonapi/node/processus_metier/'+identifier+'?include=field_img_proc_met,field_proc_met_proc_met_pa,field_proc_met_sous_proc_m,field_proc_metier_docs,field_proc_metier_proc_org');

    console.log(response)

    var order = response.data.data;
    var procmet = {};


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

    response.data.included.map(file => {

            for (let i = 0; i < docIndex; i++) {

                if ((file.id === order.relationships.field_proc_metier_docs.data[i].id) || file.id === undefined) {

                    procmet.documents.push(file);

                    }
                }

                for (let i = 0; i < proceduresIndex; i++) {

                    if ((file.id === order.relationships.field_proc_metier_proc_org.data[i].id) || file.id === undefined) {

                        procmet.procedures.push(file);

                    }
                }

                for (let i = 0; i < childsIndex; i++) {

                    if ((file.id === order.relationships.field_proc_met_sous_proc_m.data[i].id) || file.id === undefined) {

                        procmet.childs.push(file);

                    }
                }

                // if ((order.relationships.field_proc_met_proc_met_pa.data.id != null) && (file.id === order.relationships.field_proc_met_proc_met_pa.data.id || file.id === undefined)) {

                //     order.parent = file 
                //     Procsorg = [...Procsorg, order];

                // }

                if (file.id === order.relationships.field_img_proc_met.data.id || file.id === undefined) {

                    procmet.image = config.drupal_url + file.attributes.uri.url;

                }
        }
        );


    // var Procmet = Procsorg.reduce((unique, o) => {
    //     if(!unique.some(obj => obj.id === o.id)) {
    //       unique.push(o);
    //     }
    //     return unique;
    //   },[]);

    //   console.log(Procmet)

    dispatch(
        {
            type: 'GET_ONE_PROCMET',
            payload: procmet
        }
    );

}