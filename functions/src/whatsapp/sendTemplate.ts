import * as functions from "firebase-functions";
import fetch from "node-fetch";


export const addMessage = functions.region("asia-south1")
    .https.onCall(async (data) => {
      try {
        // eslint-disable-next-line max-len
        const url = "https://graph.facebook.com/v16.0/FROM_PHONE_NUMBER_ID/messages";
        const accessToken = "ACCESS_TOKEN";
        const payload = {
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: "PHONE_NUMBER",
          type: "template",
          template: {
            name: "TEMPLATE_NAME",
            language: {
              code: "LANGUAGE_AND_LOCALE_CODE",
            },
            components: [
              {
                type: "body",
                parameters: [
                  {
                    type: "text",
                    text: "text-string",
                  },
                  {
                    type: "",
                    currency: {
                      fallback_value: "VALUE",
                      code: "USD",
                      amount_1000: "NUMBER",
                    },
                  },
                  {
                    type: "date_time",
                    date_time: {
                      fallback_value: "DATE",
                    },
                  },
                ],
              },
            ],
          },
        };
        const res = fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
          body: JSON.stringify(payload),
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    });
