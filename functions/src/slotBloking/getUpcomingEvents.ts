import * as functions from "firebase-functions";
import * as cors from "cors";
const corsHandler = cors({origin: true});
import {GoogleApiConfig, GOOGLE_CALENDAR_ID} from "./googleApiConfig";
import {google} from "googleapis";

const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
const GOOGLE_PRIVATE_KEY = GoogleApiConfig.private_key;
const GOOGLE_CLIENT_EMAIL = GoogleApiConfig.client_email;

const jwtClient = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL,
    "./service.json",
    GOOGLE_PRIVATE_KEY,
    SCOPES
);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const calendar = google.calendar({
  version: "v3",
  project: "1051405410171",
  auth: jwtClient,
});

export const getUpCommingEvents = functions
    .region("asia-south1")
    .https.onRequest((req, res) => {
      corsHandler(req, res, async () => {
        const present = new Date();
        const numberOfDaysToAdd = 90;
        const result = present.setDate(present.getDate() + numberOfDaysToAdd);
        return calendar.events.list(
            {
              calendarId: GOOGLE_CALENDAR_ID,
              timeMin: new Date().toISOString(),
              timeMax: new Date(result).toISOString(),
              singleEvents: true,
              orderBy: "startTime",
            },
            (error: any, result: any) => {
              if (error) {
                res.send(JSON.stringify({error: error}));
              } else {
                if (result.data.items.length) {
                  res.send({events: result.data.items});
                } else {
                  res.send(JSON.stringify(
                      {message: "No upcoming events found."}
                  ));
                }
              }
            }
        );
      });
    });

export const createEvent = functions
    .region("asia-south1")
    .https.onRequest((req, res) => {
      corsHandler(req, res, async () => {
        try {
          // console.log(req.body);
          // const {summary,
          //   location,
          //   description,
          //   startDateTime,
          //   endDateTime} = req.body;
          // const event: any = {
          //   summary: summary || "My first event!",
          //   location: location || "Hyderabad,India",
          //   description: description,
          //   start: {
          //     dateTime: startDateTime,
          //     timeZone: "Asia/Kolkata",
          //   },
          //   end: {
          //     dateTime: endDateTime,
          //     timeZone: "Asia/Kolkata",
          //   },
          //   colorId: 1,
          //   attendees: [],
          //   reminders: {
          //     useDefault: false,
          //     overrides: [
          //       {method: "email", minutes: 24 * 60},
          //       {method: "popup", minutes: 10},
          //     ],
          //   },
          // };
          const auth = new google.auth.GoogleAuth({
            keyFile: "./service.json",
            scopes: "https://www.googleapis.com/auth/calendar",
          });

          auth
              .getClient()
              .then((a: any) => {
                calendar.events.insert(
                    {
                      auth: a,
                    },
                    function(err: any, event: any) {
                      if (err) {
                        console.log(err + "dhjksvbhjksdv");
                      }

                      res.json(
                          {
                            response: "sucess",
                            message: "Event successfully created!",
                          }
                      );
                    }
                );
              })
              .catch((err: any) => {
                res.json({response: "error", error: err});
              });
        } catch (error) {
          res.json({response: "error", message: "something went wrong"});
        }
      });
    });
