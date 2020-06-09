import axios from 'axios';
const qs = require('querystring')
import StorageService from './storage-service';

var token = StorageService.getToken();

var apiHost = 'http://localhost:8080';
if (process && process.env && process.env.NODE_ENV === 'development') {
    apiHost = 'http://localhost:8080';
}

axios.defaults.baseURL = apiHost;
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default class WebService {

    static setAuthorization(token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    static login (email, password) {
      const requestBody = {
        email: email,
        password : password
      };
      const config = {
        headers: {
          'Content-Type': 'msapplication/x-www-form-urlencoded'
        }
      };
      return axios.post(`/login`, qs.stringify(requestBody), config);
    }
    static registre (email, password, nom, prenom) {
        return axios.post(`/register`, {
            email: email,
            password: password,
            lastName: prenom,
            name: nom
        });
    }

    static googleRegistre(idToken) {
      return axios.post(`/googleregistre`, idToken);
    }

    static updateUser (firstName, lastName) {
        return axios.put(`/api/user/profile`, {
            first_name: firstName,
            last_name: lastName
        });
    }
    static uploadPhoto (photo) {
      return axios.post('/upload-user-photo', photo);
    }


    static checkIfProfileIsCompleted() {
      return axios.get('/api/user/profile/is-completed');
    }


    static insertPhotoIntoUser(photoUrl) {
      return axios.put('/api/user/profile', {
        avatar_base64: photoUrl
      });
    }

    static getUserProfile() {
      return axios.get('/api/user/profile');
    }

    static getUser(id) {
      return axios.get(`/api​/users​/${id}`);
    }

    static updateUserName(name) {
      return axios.put('/api/user/profile', {
        first_name: name
      });
    }

    static updateUserLastName(prenom) {
      return axios.put('/api/user/profile', {
        last_name: prenom
      });
    }

    static updateUserEmail(email, id) {
      return axios.put(`/api/users/${id}`, {
        email: email
      });
    }
    static updateUserPassword(newMdp, currentMdp, userId) {
      return axios.put(`/api/users/${userId}`, {
        current_password: currentMdp,
        password: newMdp
      });
    }

    static deleteUserAccount(currentMdp, userId) {
      console.log('currentMdp =', currentMdp);
      return axios.delete(`/api/users/${userId}`, {
        data: {
          current_password: currentMdp
        }
      });
    }

    static getTeamsOfLeague(code, yearMinusOne, currentYear) {
      return axios.get(`https://raw.githubusercontent.com/openfootball/football.json/master/${yearMinusOne}-${currentYear}/${code}.1.clubs.json`);
    }

    static getAvailableLeague() {
      return axios.get('');
    }
}
