const admin = require('firebase-admin');

const serviceAccount = require('./service-account/data1.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  name: serviceAccount.project_id,
  storageBucket: 'coffee-shop-project-4d852.appspot.com',
});

module.exports =  admin;