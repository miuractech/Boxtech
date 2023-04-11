/* eslint-disable max-len */
import * as functions from "firebase-functions";
import fetch from "node-fetch";
import {TokenKey} from "./whatsappAccessToken";

export const addMessage = functions
    .region("asia-south1")
    .https.onCall(
        async ({
          orderId,
          name,
          storeName,
          date,
          to,
          from,
          quotationLink,
          phone,
          clientPhone,
        }) => {
          try {
            console.log(phone);
            const url = "https://graph.facebook.com/v16.0/102081939523973/messages";
            const accessToken = TokenKey;
            const payload = {
              messaging_product: "whatsapp",
              recipient_type: "individual",
              to: phone,
              type: "template",
              template: {
                name: "order_confirm",
                language: {
                  code: "en",
                },
                components: [
                  {
                    type: "header",
                    parameters: [
                      {
                        type: "text",
                        text: orderId,
                      },
                    ],
                  },
                  {
                    type: "body",
                    parameters: [
                      {
                        type: "text",
                        text: name,
                      },
                      {
                        type: "text",
                        text: storeName,
                      },
                      {
                        type: "text",
                        text: date,
                      },
                      {
                        type: "text",
                        text: to,
                      },
                      {
                        type: "text",
                        text: from,
                      },
                      {
                        type: "text",
                        text: quotationLink,
                      },
                    ],
                  },
                ],
              },
            };
            const res = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
                "Accept": "application/json",
              },
              body: JSON.stringify(payload),
            });
            const res2 = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
                "Accept": "application/json",
              },
              body: JSON.stringify({...payload, to: clientPhone}),
            });
            return {res, res2};
          } catch (error) {
            console.log({error: error});
            return {error};
          }
        }
    );
