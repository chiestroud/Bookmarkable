import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getPersonalData = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/personal_bookmark.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((err) => reject(err));
});

const addPersonalData = (dataObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/personal_bookmark.json`, dataObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/personal_bookmark/${response.data.name}.json`, body)
        .then(() => {
          getPersonalData().then((returnedArray) => resolve(returnedArray));
        });
    }).catch((err) => reject(err));
});

export { getPersonalData, addPersonalData };
