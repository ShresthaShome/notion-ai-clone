import { initializeApp, getApps, App, getApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const key = require("@/firebase-service_key.json");

let app: App;

app =
  getApps().length === 0 ? initializeApp({ credential: cert(key) }) : getApp();

const adminDb = getFirestore(app);
export { app as adminApp, adminDb };
