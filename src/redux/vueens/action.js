import axios from 'axios';
import config from '../../api/config'

export const getVueEnsemble = () => async dispatch => {

    const ID = await localStorage.getItem('user');

    const response = await axios.get(config.drupal_url+'/jsonapi/node/vue_d_ensemble?include=field_img_vue_ens,field_vue_ens_proc_met');

    console.log(response);

    var vue_ensemble = [];

    response.data.data.map(order => {

        order['processus'] = [];
        order['image'] = {}

        var processusIndex = order.relationships.field_vue_ens_proc_met.data.length;

        response.data.included.map(file => {

            if (order.relationships.field_organisme.data.id == ID) {

                for (let i = 0; i < processusIndex; i++) {

                    if ((file.id === order.relationships.field_vue_ens_proc_met.data[i].id) || file.id === undefined) {


                        order.processus.push(file);
                        vue_ensemble = [...vue_ensemble, order];

                    }


                }


                if (file.id === order.relationships.field_img_vue_ens.data.id || file.id === undefined) {
                    order.image = config.drupal_url+file.attributes.uri.url;
                    vue_ensemble = [...vue_ensemble, order];

                }
            }
        }
        )
    }
    );

    dispatch(
        {
            type: 'GET_VUE_ENSEMBLE',
            payload: vue_ensemble
        }
    );
}