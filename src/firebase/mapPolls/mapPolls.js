import database from "../../firebase/database/database";
const shortid = require("shortid");

export const getMapPollById = (id) => {
  return database
    .ref(`mapPolls/${id}`)
    .once("value")
    .then((snap) => snap.val());
};

export const pushMapPoll = (mapPoll) => {
  const newId = shortid.generate();
  database
    .ref(`mapPolls/${newId}`)
    .set(mapPoll)
    .catch((e) => console.log("Error: ", e));
  return newId;
};
