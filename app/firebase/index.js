import firebase from 'firebase';

try {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCwzu_E4gkjxvZHFRqnldku1Kek9YqzUIM",
    authDomain: "ds-todo-app.firebaseapp.com",
    databaseURL: "https://ds-todo-app.firebaseio.com",
    storageBucket: "ds-todo-app.appspot.com",
    messagingSenderId: "857896825299"
  };

  firebase.initializeApp(config);
} catch (e) {
  console.log(e);
}

export var firebaseRef = firebase.database().ref();
export default firebase;
