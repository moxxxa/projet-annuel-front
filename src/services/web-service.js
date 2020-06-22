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

    static teamById(team_id) {
      return axios.get(`/teams/${team_id}`)
    }

    static teamsOfLeague(id) {
      return axios.get(`/teams/league/${id}`);
    }

    static teamsStats(leagueId, teamId, season) {
      return axios.get(`/teams/stats/${leagueId}/${teamId}/${season}`);
    }

    static pronostics(prediction, date, token) {
      return axios.post('/pronostics/predict', {
        awayTeamId: prediction.awayTeam.teamId,
        awayTeamLeagueId: prediction.awayTeam.leagueId,
        awayTeamName: prediction.awayTeam.teamName,
        awayTeamLeagueName: prediction.awayTeam.leagueName,
        homeTeamId: prediction.homeTeam.teamId,
        homeTeamLeagueId: prediction.homeTeam.leagueId,
        homeTeamName: prediction.homeTeam.teamName,
        homeTeamLeagueName: prediction.homeTeam.leagueName,
        imageHome: prediction.homeTeam.teamImage,
        imageAway: prediction.awayTeam.teamImage,
        date : date,
        token: token,
        status: "Pending"
      });
    }

    static storeStatistique(type, currentLeague_id, currentLeague_year, team_id, player_id, date, teamName, playerName, image, token) {
      return axios.post('/statistique/save' , {
        type: type,
        teamId: team_id,
        leagueId: currentLeague_id,
        year: currentLeague_year,
        playerId: player_id,
        date: date,
        teamName: teamName,
        playerName: playerName,
        image: image,
        token: token
      });
    }

    static getStatistique() {
      return axios.get('/statistique/all');
    }

    static getPronostics() {
      return axios.get('/pronostics/all');
    }

    static saveTournament(tournament, token, date) {
      tournament = tournament.map(val => parseInt(val, 10));
      return axios.post(`/tournament/save`, {
        tournament: tournament,
        token: token,
        date : date,
        status: "Pending"
      });
    };

    static getTournaments() {
      return axios.get('/tournament/all');
    }
}
