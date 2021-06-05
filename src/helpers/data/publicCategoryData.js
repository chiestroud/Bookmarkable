import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getPublicCategoryData = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/public_category.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((err) => reject(err));
});

const findPublicCategory = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/public_category.json?orderBy="firebaseKey"&equalTo="${firebaseKey}`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((err) => reject(err));
});

export { getPublicCategoryData, findPublicCategory };
