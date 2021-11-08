import axios from 'axios';
import config from '../../api/config';


export const getData = () => async dispatch => {
    
    const ID = await localStorage.getItem('user');
    // const token = await sessionStorage.getItem('accessToken');
    const response = await axios.get(config.drupal_url+'/jsonapi/node/document?include=field_document', {
        // headers: {
        //   // eslint-disable-next-line no-template-curly-in-string
        //   Authorization: `Bearer ${token}`,
        // }
      });

    var Docs = [];

    response.data.data.forEach( order => {
        console.log(order)
        response.data.included.forEach( file => {
            if( order.relationships.field_organisme.data.id == ID){
            if ( file.id === order.relationships.field_document.data.id ){

                const newDoc = [order, config.drupal_url+'//sites/econseil.dd/files/'+file.attributes.filename];
                    Docs = [...Docs, newDoc];
                    console.log(Docs);
                    dispatch(
                        {
                            type: 'GET_DOCS',
                            payload: Docs
                        }
                    );
    
            }
        }
        }
        )
    }
    );
}