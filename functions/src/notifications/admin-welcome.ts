/* eslint-disable max-len */
import * as functions from "firebase-functions";
import {UserRecord} from "firebase-admin/auth";
import * as admin from "firebase-admin";
// this function sends a greeting email to the user

export const onUserSignUp = functions.region("asia-south1").auth
    .user()
    .onCreate(async (user: UserRecord) => {
      const {email} = user;
      if (email) {
        return await admin.firestore().collection("mail").add({
          message: {
            html: `<p>${emailTemplate}</p>`,
            subject: "Revolutionize your packing and moving game with BoxTech!",
            text: emailTemplate,
          },
          to: [email],
        });
      }
      return;
    });
const emailTemplate = `
Hi,

On behalf of BoxTech, I would like to extend a warm welcome to our platform. We are excited to have you as a part of our community and to help you with all your packing and moving needs.
BoxTech is a comprehensive platform that provides a range of services for businesses like yours. Our platform offers a convenient way for you to manage your packing and moving needs, saving you time and money.
We understand that packing and moving can be a daunting task, which is why our team of experts is here to assist you every step of the way. From packing your items to transporting them to your new location, we are committed to ensuring a seamless experience for you.
As a new member of BoxTech, you can expect excellent customer service and support, personalized solutions tailored to your business needs, and access to a wide range of packing and moving tools and resources.
We are excited to work with you and help you grow your business. If you have any questions or concerns, please don't hesitate to reach out to our team. We are always here to assist you.
Once again, welcome to BoxTech. We look forward to building a long and successful relationship with your business.

Best regards,
Sanjeev,
BoxTech Team`;