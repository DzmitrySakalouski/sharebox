const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();


// firebase deploy --only functions https://firebase.google.com/docs/functions/get-started
// https://stackoverflow.com/questions/43486278/how-do-i-structure-cloud-functions-for-firebase-to-deploy-multiple-functions-fro
// https://stackoverflow.com/questions/47726099/how-to-write-data-to-firestore-through-firebase-functions