import axios from 'axios';
import config from '../../api/config';

export const getData = () => async dispatch => {
    

    // const token = await sessionStorage.getItem('accessToken');
    const response = await axios.get(config.drupal_url+'/jsonapi/node/diagramme', {
        // headers: {
        //   // eslint-disable-next-line no-template-curly-in-string
        //   Authorization: `Bearer ${token}`,
        // }
      })
    

    dispatch(
        {
            type: 'GET_DIAG',
            payload: response.data
        }
    )
}