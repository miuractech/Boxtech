/* eslint-disable max-len */
import * as functions from "firebase-functions";
import fetch from "node-fetch";
export const getDistance = functions.region("asia-south1").https.onCall(async (data) => {
  const apiKey = "AIzaSyAQAen09Fg70paaU2FWaCL_t7DcJtMGXDU";
  const placeId1: string = data.placeId1;
  const placeId2: string = data.placeId2;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=place_id:${placeId1}&destinations=place_id:${placeId2}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data: any = await response.json();
    const distance: string = data.rows[0].elements[0].distance.text;
    return {distance: distance, data};
  } catch (error:any) {
    throw new functions.https.HttpsError("unknown", error.message, error);
  }
});
