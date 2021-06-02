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

export default getPersonalData;
