import axios from 'axios';
import StorageService from './storage-service';

var token = StorageService.getToken();

var apiHost = 'https://feelee-webapp.azurewebsites.net';
if (process && process.env && process.env.NODE_ENV === 'development') {
    apiHost = 'http://localhost:8000';
}

axios.defaults.baseURL = apiHost;
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default class WebService {

    static setAuthorization(token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    static login (email, password) {
        return axios.post(`/api/login`, {
            email: email,
            password: password
        });
    }
    static registre (email, password) {
        return axios.post(`/api/register`, {
            email: email,
            password: password
        });
    }
    static updateUser (firstName, lastName) {
        return axios.put(`/api/user/profile`, {
            first_name: firstName,
            last_name: lastName
        });
    }
    static uploadPhoto (photo) {
      return axios.post('api/uploads', photo);
    }
    static updateUserAdresse (latitudeUser, longitudeUser) {
      return axios.put('/api/user/profile', {
        latitude: latitudeUser,
        longitude: longitudeUser
      });
    }
    static checkIfProfileIsCompleted() {
      return axios.get('/api/user/profile/is-completed');
    }
    static insertPhotoIntoUser(photoUrl) {
      return axios.put('/api/user/profile', {
        avatar_base64: photoUrl
      });
    }
    static updateUserGenderAndBirthday(s, p, b) {
      return axios.put('/api/user/profile', {
        birthday: b,
        gender: s,
        country: p
      });
    }
    static getUserProfile() {
      return axios.get('/api/user/profile');
    }
    static profileGallery() {
      return axios.get('/api/user/profile/gallery');
    }
    static deleteFromGallery(id) {
      return axios.delete('/api/user/profile/gallery', id);
    }
    static updateGallery(b64) {
      console.log('b64 =', b64);
      return axios.put('/api/user/profile/gallery', {
        media_base64: b64
      });
    }
    static deleteFromGallery(idPhoto) {
      return axios.delete('/api/user/profile/gallery', {
        data: {
          media_id: idPhoto
        }
      });
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

    static updateUserCountry(country) {
      return axios.put('/api/user/profile', {
        country: country
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

    static findMatchs(options) {
      return axios.post('/api/matchs/find', options);
    }

    static getGalleryById(userId) {
      return axios.get(`/api/users/${userId}/profile/gallery`);
    }

    static likeMatch(matchId) {
      return axios.put('/api/liked', {
        match_id: matchId,
      });
    }

    // static updateUserAbout(about) {
    //   return axios.put('/api/user/profile', {
    //     about: about
    //   });
    // }
    //
    // static updateSchool_curriculum(school_curriculum) {
    //   return axios.put('/api/user/profile', {
    //     school_curriculum: school_curriculum
    //   });
    // }
    //
    // static updateWork_status(work_status) {
    //   return axios.put('/api/user/profile', {
    //     work_status: work_status
    //   });
    // }
    //
    // static updateMother_tongue(mother_tongue) {
    //   return axios.put('/api/user/profile', {
    //     mother_tongue: mother_tongue
    //   });
    // }
    //
    // static updateMarital_status(marital_status) {
    //   return axios.put('/api/user/profile', {
    //     marital_status: marital_status
    //   });
    // }

    static updateUserSection1(about, school_curriculum, work_status, mother_tongue, marital_status) {
      return axios.put('/api/user/profile', {
        marital_status: marital_status,
        about: about,
        mother_tongue: mother_tongue,
        work_status: work_status,
        school_curriculum: school_curriculum
      });
    }


    static updateUserSection2(ethnicity, morphology, size, hair_color) {
      return axios.put('/api/user/profile', {
        ethnicity: ethnicity,
        morphology: morphology,
        size: size,
        hair_color: hair_color
      });
    }

    static updateUserSection3(live_with, car, smoker, travel, religion, alcool) {
      return axios.put('/api/user/profile', {
        live_with: live_with,
        car: car,
        smoker: smoker,
        travel: travel,
        religion: religion,
        alcool: alcool
      });
    }

  static fetchLiked(page, pageSize) {
    return axios.get('/api/liked', {
      params: { page, pageSize }
    });
  }

  static dislikeMatch(matchId) {
    return axios.delete('/api/liked', {
      data: {
        match_id: matchId,
      }
    });
  }

  static fetchMatchs(page, pageSize) {
    return axios.get('/api/matchs', {
      params: { page, pageSize }
    });
  }

  static unmatch(match_id) {
    return axios.delete('/api/matchs', {
      data: { match_id }
    });
  }

  static fetchLikes(page, pageSize) {
    return axios.get('/api/likes', {
      params: { page, pageSize }
    });
  }

  static fetchNotifications() {
    return axios.get('/api/notifications');
  }

  static markNotifAsSeen(notifId) {
    return axios.post(`/api/notifications/${notifId}/mark-as-seen`);
  }

  static swipeProfileGallery(mediaId) {
    return axios.post(`/api/user/medias/${mediaId}/set-avatar`);
  }

  static getStranger(stangerId) {
    return axios.get(`/api/users/${stangerId}/profile`);
  }

  static getStrangerGallery(strangerId) {
    return axios.get(`/api/users/${strangerId}/profile/gallery`);
  }
}
