const admin = require("firebase-admin");
const serviceAccount = require("./e-tafakna-job-firebase-adminsdk-pvq2c-0efdace0b4.json");

const firebaseConfig = {
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "e-tafakna-job.appspot.com"
};

const app = admin.initializeApp(firebaseConfig, 'e-tafakna-job');

module.exports = app;