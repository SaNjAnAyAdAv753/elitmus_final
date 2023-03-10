
var admin = require("firebase-admin");

var serviceAccount = require("./elitmus-be920-firebase-adminsdk-n9lph-22bfa466b5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://elitmus-be920.firebaseio.com',
  storageBucket: 'gs://elitmus-be920.appspot.com/' 
})

module.exports = { admin }