import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getPublicCategoryData = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/public_category.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((err) => reject(err));
});

export default getPublicCategoryData;
