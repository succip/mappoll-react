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
      console.log("Error: ", e);
    });
  return newId;
};

const pushResponse = (mapPollId, { lng, lat }) => {
  return database
    .ref(`mapPolls/${mapPollId}/coords`)
    .push({ lng, lat })
    .then((id) => {
      console.log("Response pushed successfully");
      return id.key;
    })
    .catch((e) => {
      console.log("Error: ", e);
    });
};

const getResponses = (mapPollId) => {
  return database
    .ref(`mapPolls/${mapPollId}/coords`)
    .once("value")
    .then((snapshot) => {
      const entries = Object.entries(snapshot.val());
      let points = [];
      entries.forEach((pt) => {
        const newPoint = {
          id: pt[0],
          location: pt[1],
        };
        points.push(newPoint);
      });

      return points;
    });
};
export { firebase, pushMapPoll, getMapPollById, pushResponse, getResponses, database as default };
