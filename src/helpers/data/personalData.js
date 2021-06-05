import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getPersonalData = (user) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/personal_bookmark.json?orderBy="uid"&equalTo="${user.uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((err) => reject(err));
});

const addPersonalData = (dataObj, user) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/personal_bookmark.json`, dataObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/personal_bookmark/${response.data.name}.json`, body)
        .then(() => {
          getPersonalData(user).then((returnedArray) => resolve(returnedArray));
        });
    }).catch((err) => reject(err));
});

const deletePersonalData = (firebaseKey, user) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/personal_bookmark/${firebaseKey}.json`)
    .then(() => getPersonalData(user).then((journalArray) => resolve(journalArray)))
    .catch((err) => reject(err));
});

export { getPersonalData, addPersonalData, deletePersonalData };
