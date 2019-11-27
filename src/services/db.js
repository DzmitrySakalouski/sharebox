const Datastore = require('nedb')
    ,db = new Datastore({ filename: '../userData.db' });
db.loadDatabase(function (err) {    // Callback is optional
    // Now commands will be executed
});

export default db;