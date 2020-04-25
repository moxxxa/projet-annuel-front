var storage = window.localStorage;

export default class StorageService {

  static getMail() {
    return storage.getItem('mail');
  }

  static setMail(mail) {
    storage.setItem('mail', mail);
  }

  static removeMail() {
    storage.removeItem('mail');
  }

  static getUser() {
    let user = storage.getItem('user');
    return JSON.parse(user);
  }

  static setUser(user) {
    console.log('user =', user);
    storage.setItem('user', JSON.stringify(user));
  }

  static setToken(token) {
    storage.setItem('token', token);
  }

  static getToken() {
    return storage.getItem('token');
  }

  static removeUser() {
    storage.removeItem('user');
  }

  static removeToken() {
    storage.removeItem('token');
  }

  static getGallery() {
    return storage.getItem('gallery');
  }

  static setGallery(gallery) {
    storage.setItem('gallery', gallery);
  }

  static removeGallery() {
    storage.removeItem('gallery');
  }

  static removeAll() {
    this.removeGallery();
    this.removeMail();
    this.removeToken();
    this.removeUser();
  }

  static avatarFromProfile(profile) {
    console.log('profile =', profile);
    let prefix = 'http://localhost:8000';

    return profile.avatar ?
      (
        profile.avatar.url ?
          prefix + profile.avatar.url :
          prefix + profile.avatar
      ) :
      'static/images/d-avatar.jpg';
  }

  static mediaUrl(media) {
    let prefix = 'http://localhost:8000';

    return prefix + media.url;
  }

}
