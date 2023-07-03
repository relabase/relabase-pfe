import admin from "firebase-admin";
import serviceAccount from "privatekey.json";

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
