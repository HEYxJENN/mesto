export class Api {
  constructor(options) {
    this._address = options.baseUrl;
    this._headers = options.headers;
  }

  getRes(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getUser() {
    return fetch(`${this._address}/users/me`, {
      headers: this._headers,
    }).then(this.getRes);
  }

  setUser({ name, about }) {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this.getRes);
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      headers: this._headers,
    }).then(this.getRes);
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this.getRes);
  }

  addCard({ name, link }) {
    return fetch(`${this._address}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this.getRes);
  }
}

// removeCard(cardID) {
//   return fetch(`${this._address}/${this._groupId}/cards/${cardID}`, {
//     method: 'DELETE',
//     headers: this._headers,
//   })
//     .then(this.getResponse)
// }

// changeLikeCardStatus(cardID, like) {
//   return fetch(`${this._address}/${this._groupId}/cards/likes/${cardID}`, {
//     method: like ? 'PUT' : 'DELETE',
//     headers: headers: this._headers,
//   })
//     .then(this.getResponse)
// }
