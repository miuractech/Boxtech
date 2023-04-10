import * as functions from "firebase-functions";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import fetch from "node-fetch";

export const addMessage = functions.region("asia-south1")
    .https.onCall(async (
        {orderId, name, storeName, date, to, from, quotationLink, phone}
    ) => {
      try {
        // eslint-disable-next-line max-len
        const url = "https://graph.facebook.com/v16.0/102081939523973/messages";
        // eslint-disable-next-line max-len
        const accessToken = "EAAChZApUx6W0BAHzFNKtsTZACm31ZAmEterg86MtLmvjWQ2fUDAaCLvpcExeiWZCg3ZAuir4Vu1kAsZA1Q6GH8agzkbWYrr9MC5qX70yySSCaZAv2i8PrvE4gWwyPEyU3UaZCGFUOPOrOyyGrLUx0DoNyJbcGNJ21u4qo68ZBhZBm9KTYlI4MKpNjeaAUtygah0DSJaf32iXmFvgZDZD";
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
        const res = fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
            "Accept": "application/json",

          },
          body: JSON.stringify(payload),
        });
        return {res};
      } catch (error) {
        console.log({error: error});
        return {error};
      }
    });
