import database from "../database/database";

export const pushResponse = (mapId, { lng, lat }, name = "Anonymous") => {
  return database
    .ref(`mapPolls/${mapId}/coords`)
    .push({ lng, lat, name })
    .then((id) => id.key)
    .catch((e) => console.log("Error: ", e));
};

export const updateResponse = (mapId, { lng, lat }, key) => {
  return database.ref(`mapPolls/${mapId}/coords/${key}`).update({ lng, lat });
};

export const getResponses = (mapPollId) => {
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
