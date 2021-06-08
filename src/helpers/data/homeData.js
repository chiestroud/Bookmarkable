import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getJapaneseTrivia = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/japanese.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((err) => reject(err));
});

const getGoodReads = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/public_bookmark.json?orderBy="categoryId"&equalTo="-CSp80snAQlYP0BTgzJo"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((err) => reject(err));
});

const getGoodTutorials = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/public_bookmark.json?orderBy="categoryId"&equalTo="-CSWQanrj5ySNb66vcaC"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((err) => reject(err));
});

const getOtherResources = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/public_bookmark.json?orderBy="categoryId"&equalTo="-CSLBQwC4gt1aBHkt3vA"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((err) => reject(err));
});

export {
  getJapaneseTrivia, getGoodReads, getGoodTutorials, getOtherResources
};
