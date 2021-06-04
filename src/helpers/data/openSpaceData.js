import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getPublicBookmarks = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/public_bookmark.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((err) => reject(err));
});

const addPublicBookmarks = (dataObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/public_bookmark.json`, dataObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/public_bookmark/${response.data.name}.json`, body)
        .then(() => {
          getPublicBookmarks().then((returnedArray) => resolve(returnedArray));
        });
    }).catch((err) => reject(err));
});

export { getPublicBookmarks, addPublicBookmarks };
