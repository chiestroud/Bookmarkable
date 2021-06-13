import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getPersonalCategoryData = (user) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/personal_category.json?orderBy="uid"&equalTo="${user.uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((err) => reject(err));
});

const addPersonalCategoryData = (categoryObj, user) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/personal_category.json`, categoryObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/personal_category/${response.data.name}.json`, body)
        .then(() => {
          getPersonalCategoryData(user).then((returnedArray) => resolve(returnedArray));
        });
    }).catch((err) => reject(err));
});

const deletePersonalCategoryData = (firebaseKey, user) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/personal_category/${firebaseKey}.json/`)
    .then(() => getPersonalCategoryData(user).then(resolve))
    .catch((err) => reject(err));
});

export { getPersonalCategoryData, addPersonalCategoryData, deletePersonalCategoryData };
