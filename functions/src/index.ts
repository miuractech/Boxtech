import * as admin from "firebase-admin";
admin.initializeApp();

export * from "./payments";
export * from "./slotBloking";
export * from "./notifications";
export * from "./whatsapp";
