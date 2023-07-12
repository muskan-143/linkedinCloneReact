import { auth, provider } from "../firebaseFile.js";
import {
  SET_USER,
  SET_LOADING_STATUS,
  GET_ARTICLES,
  GET_LIKE,
} from "./actionType.js";

import db from "../firebaseFile.js";
import { storage } from "../firebaseFile.js";
import { set } from "firebase/firebase-database.js";

export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});

export const setLoading = (status) => ({
  type: SET_LOADING_STATUS,
  status: status,
});

export const getArticle = (payload) => ({
  type: GET_ARTICLES,
  payload: payload,
});

export const getLike = (payload) => ({
  type: GET_LIKE,
  like: payload,
});
// Function to SignIN

export function signInAPI() {
  return (dispatch) => {
    auth
      .signInWithPopup(provider)
      .then((payload) => {
        console.log(payload);
        dispatch(setUser(payload.user));
      })
      .catch((error) => alert(error.message));
  };
}

export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
}

// Function to signOut

export function signOutAPI() {
  return (dispatch) => {
    auth
      .signOut()
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

// Function to upload the image and video in the firebase.

export function postArticleAPI(payload) {
  return (dispatch) => {
    // keep spinning until the file is upload and hence in the start it is true and ones done we are making it false
    dispatch(setLoading(true));

    if (payload.image !== "") {
      const upload = storage
        .ref(`images/${payload.image.name}`)
        .put(payload.image);

      upload.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log(`Progress: ${progress}%`);
          if (snapshot.state === "RUNNING") {
            console.log(`Progress: ${progress}%`);
          }
        },
        (error) => console.log(error.code),
        async () => {
          const downloadURL = await upload.snapshot.ref.getDownloadURL();
          db.collection("articles").add({
            actor: {
              description: payload.user.email,
              title: payload.user.displayName,
              image: payload.user.photoURL,
              time: payload.time,
              date: payload.date,
            },
            video: payload.video,
            sharedImg: downloadURL,
            comments: 0,
            like: 0,
            description: payload.description,
          });

          dispatch(setLoading(false));
        }
      );
    } else if (payload.video) {
      dispatch(setLoading(true));
      db.collection("articles").add({
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          image: payload.user.photoURL,
          time: payload.time,
          date: payload.date,
        },
        video: payload.video,
        sharedImg: "",
        comments: 0,
        like: 0,
        description: payload.description,
      });
      dispatch(setLoading(false));
    }
  };
}

// Function to get the article from the database.

export function getArticleAPI() {
  return (dispatch) => {
    let payload;
    let value;
    let timePass = [];
    db.collection("articles")
      .orderBy("actor.date", "desc")
      .onSnapshot((snapshot) => {
        payload = snapshot.docs.map((doc) => doc.data());
        dispatch(getArticle(payload));
      });
  };
}

// This function is used to dispatch the action.
export function getLikeValue() {
  return (dispatch) => {
    dispatch(getLike(0));
  };
}
