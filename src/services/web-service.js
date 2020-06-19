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

      return axios.post(`/userLogin`, {
        email: email,
        password: password
      });
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

    static updateUser (name, lastName, email) {
        return axios.put(`/user/update`, {
            name: name,
            lastName: lastName,
            email: email
        });
    }
    static uploadPhoto (photo) {
      return axios.post('/image/upload', photo);
    }

    static deletePhoto (imageName) {
      return axios.delete(`/image/delete/${imageName}`);
    }

    static getImage(imageName) {
      return axios.get(`/image/get/${imageName}`);
    }

    static updateUserPassword(newMdp, currentMdp) {
      return axios.put(`/user/update/password`, {
        password: currentMdp,
        passwordConfirm: newMdp
      });
    }

    static deleteUserAccount(currentMdp) {
      console.log('currentMdp =', currentMdp);
      return axios.delete('/user/delete', {
        data: {
          password : currentMdp
        }
      });
    }

    static getAvailableLeague() {
      return axios.get('/leagues');
    }

    static searchPlayerByName(name) {
      return axios.get(`/search/player/${name}`);
    }

    static playerStats(id) {
      return axios.get(`/player/stats/${id}`);
    }

    static teamByName(name) {
      return axios.get(`/search/team/${name}`);
    }

    static teamsOfLeague(id) {
      return axios.get(`/teams/league/${id}`);
    }

    static teamsStats(leagueId, teamId, season) {
      return axios.get(`/teams/stats/${leagueId}/${teamId}/${season}`);
    }
}
