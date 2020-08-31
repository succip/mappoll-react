import * as firebase from "firebase";

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

export { firebase, database as default };
