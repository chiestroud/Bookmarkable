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

const addPublicCategoryData = (obj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/public_category.json`, obj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/public_category/${response.data.name}.json`, body)
        .then(() => {
          getPublicCategoryData().then((returnedCategory) => resolve(returnedCategory));
        });
    }).catch((err) => reject(err));
});

const deletePublicCategoryData = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/public_category/${firebaseKey}.json`)
    .then(() => getPublicCategoryData().then((response) => resolve(response)))
    .catch((err) => reject(err));
});

export { getPublicCategoryData, addPublicCategoryData, deletePublicCategoryData };
