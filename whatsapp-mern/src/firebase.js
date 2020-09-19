import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyAxwfaauAn4KyL7dKhMwZuYb9ZGeDcPQoI",
    authDomain: "whatsapp-mern-e6b35.firebaseapp.com",
    databaseURL: "https://whatsapp-mern-e6b35.firebaseio.com",
    projectId: "whatsapp-mern-e6b35",
    storageBucket: "whatsapp-mern-e6b35.appspot.com",
    messagingSenderId: "689958462908",
    appId: "1:689958462908:web:1dd171cc8976f0ab8077b9"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;