const firebase = require("firebase/app");
require("firebase/database");
const shortid = require("shortid");

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
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
    .catch((e) => {
      console.log("Error: ", e);
    });
  return newId;
};

const pushResponse = (mapId, { lng, lat }, name = "Anonymous") => {
  return database
    .ref(`mapPolls/${mapId}/coords`)
    .push({ lng, lat, name })
    .then((id) => id.key)
    .catch((e) => console.log("Error: ", e));
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
          name: pt[1].name,
          location: {
            lng: pt[1].lng,
            lat: pt[1].lat,
          },
        };
        points.push(newPoint);
      });

      return points;
    });
};
export { firebase, pushMapPoll, getMapPollById, pushResponse, getResponses, database as default };
