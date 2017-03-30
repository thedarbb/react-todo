import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCwzu_E4gkjxvZHFRqnldku1Kek9YqzUIM",
  authDomain: "ds-todo-app.firebaseapp.com",
  databaseURL: "https://ds-todo-app.firebaseio.com",
  storageBucket: "ds-todo-app.appspot.com",
  messagingSenderId: "857896825299"
};
firebase.initializeApp(config);

var firebaseRef = firebase.database().ref();

firebaseRef.set({
  app:{
    name: 'Todo App',
    version: '1.0.0'
  },
  isRunning: true,
  user: {
    name: 'Dustin',
    age: 27
  },
  todos:  {
    '123abc': {
      text: 'Pick up Becca'
    }
  }
});

var todosRef = firebaseRef.child('todos')

//listeners
todosRef.on('child_added', (snapshot) => {
  console.log('child_added', snapshot.key, snapshot.val());
});

todosRef.on('child_changed', (snapshot) => {
  console.log('child_changed', snapshot.key, snapshot.val());
});

todosRef.on('child_removed', (snapshot) => {
  console.log('child_removed', snapshot.key, snapshot.val());
});

todosRef.push({
  text: 'Bathe Griffin'
});

todosRef.push({
  text: 'Watch habs game'
});

console.log('Todo id', todosRef.key);

// firebaseRef.child('user').on('value', (snapshot) => {
//   console.log('User', snapshot.val());
// });
// firebaseRef.child('user').update({
//   name: 'Griffin'
// });
// firebaseRef.child('app').update({
//   name: 'Something new'
// });
// firebaseRef.child('app').once('value').then((snapshot) => {
//   console.log('Got entire db', snapshot.key, snapshot.val());
// }, (e) => {
//   console.log('Unable to fetch value', e);
// });
// firebaseRef.child('user/age').remove();
// firebaseRef.update({
//   isRunning: null
// });
// firebaseRef.update({
//   isRunning: false,
//   'app/version': '1.1.0'
// });
//
// firebaseRef.child('app').update({
//   name: 'something new'
// }).then(() => {
//   console.log('Update worked.');
// }, (e) => {
//   console.log('Update failed');
// });
