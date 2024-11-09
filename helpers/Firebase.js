const admin = require("firebase-admin");
const serviceAccount = require("./e-tafakna-job-firebase-adminsdk-pvq2c-c85b6e1925.json");

const firebaseConfig = {
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "e-tafakna-job.appspot.com"
};

const app = admin.initializeApp(firebaseConfig, 'e-tafakna-job');

module.exports = app;