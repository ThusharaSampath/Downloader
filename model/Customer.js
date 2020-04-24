const db = require('./db');
var passwordHash = require('password-hash');


class Customer {
  constructor() {
    this.loggedIn = false;
    this.userData = {
      fname : 'Guest',
      lname : '',
      loggedIn : false
    }
  }

  async signUp(data) {
    data.password = passwordHash.generate(data.password);
    var saved = false;
    //console.log(data);
    await db.find('customer', 'email', data.email).then(function (value) {
      if (value.length) {
        console.log("user exists");
        saved = false;
      } else {
        db.save('customer', data.email, data);
        saved = true;
      }
    });
    return saved;
  }


  async login(email, pass) {
    var logged = false;

    await db.find('customer', 'email', email).then(function (value) {
      if (value.length) {
        logged = passwordHash.verify(pass, value[0].password);
      } else {
        logged = false;
      }
    });
    var data = {
      logged: logged,
      session: "secret",
      userName: email
    }
    return data;
  }

  async logBySession(email) {
    var userData;
    await db.find('customer', 'email', email).then(function (value) {

      if (value.length) {
        userData = value[0];
        userData.loggedIn = true;
      }
    });
    this.loggedIn = true;
    this.userData = userData;
  }
}

module.exports = Customer;
