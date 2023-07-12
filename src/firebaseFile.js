import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDm9WxNtC6mfJnOfC3uieU7aDlF6wTd54U",
  authDomain: "linkedin-clone-bdb38.firebaseapp.com",
  projectId: "linkedin-clone-bdb38",
  storageBucket: "linkedin-clone-bdb38.appspot.com",
  messagingSenderId: "678479980310",
  appId: "1:678479980310:web:67e8743f6b1d6260dd1237",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;

// We need to import in this way so that we can use it.
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyDm9WxNtC6mfJnOfC3uieU7aDlF6wTd54U",
//   authDomain: "linkedin-clone-bdb38.firebaseapp.com",
//   projectId: "linkedin-clone-bdb38",
//   storageBucket: "linkedin-clone-bdb38.appspot.com",
//   messagingSenderId: "678479980310",
//   appId: "1:678479980310:web:67e8743f6b1d6260dd1237",
// };

// // Use this to initialize the firebase App
// const firebaseApp = firebase.initializeApp(firebaseConfig);

// // Use these for db & auth
// const db = firebaseApp.firestore();
// const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();
// const storage = getStorage(firebase);

// export { auth, provider, getStorage };
// export default db;
