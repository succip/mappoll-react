const firebase = require("firebase/app");
require("firebase/database");
const shortid = require("shortid");

const config = {
  apiKey: "AIzaSyBHWQI9OHyQGAAvCnLQ-RwUT20cbf7kH8U",
  authDomain: "mappoll-test-e6f18.firebaseapp.com",
  databaseURL: "https://mappoll-test-e6f18.firebaseio.com",
  projectId: "mappoll-test-e6f18",
  storageBucket: "mappoll-test-e6f18.appspot.com",
  messagingSenderId: "569468479075",
  appId: "1:569468479075:web:241ee83f16ddb6e499ba56",
  measurementId: "G-T4YWP90W01",
};

firebase.initializeApp(config);

const database = firebase.database();

const getMapPollById = (id) => {
  return database
    .ref(`mapPolls/${id}`)
    .once("value")
    .then((snap) => {
      return snap.val();
    });
};

const pushMapPoll = (mapPoll) => {
  const newId = shortid.generate();
  database
    .ref(`mapPolls/${newId}`)
    .set(mapPoll)
    .then(() => {
      console.log("Poll pushed successfully");
    })
    .catch((e) => {
      console.log("Something went wrong", e);
    });
  return newId;
};

export { firebase, pushMapPoll, getMapPollById, database as default };
