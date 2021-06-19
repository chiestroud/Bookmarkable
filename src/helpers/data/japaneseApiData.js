import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getJapaneseData = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/japanese.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((err) => reject(err));
});

const addJapaneseData = (obj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/japanese.json`, obj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/japanese/${response.data.name}.json`, body)
        .then(() => {
          getJapaneseData().then((japaneseArray) => resolve(japaneseArray));
        });
    }).catch((err) => reject(err));
});

const updateJapaneseData = (japanese) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/japanese/${japanese.firebaseKey}.json`, japanese)
    .then(() => getJapaneseData().then((response) => resolve(response)))
    .catch((err) => reject(err));
});

const deleteJapaneseData = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/japanese/${firebaseKey}.json`)
    .then(() => getJapaneseData().then(resolve))
    .catch((err) => reject(err));
});

export {
  getJapaneseData, addJapaneseData, updateJapaneseData, deleteJapaneseData
};
