import ingest_tokens from './ingest_tokens';
import ingest_users from './ingest_users';

const MongoClient = require('mongodb').MongoClient;
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'localytics';
 
// Use connect method to connect to the server
MongoClient.connect(url, (err, client) => {
  if(client){
    console.log("Mongo: Connected successfully to server");
 
    const db = client.db(dbName);

    const tokens = db.collection('tokens');
    const users = db.collection('users');

    const header = [
      'push_token', // users.push_id
      'advertising_id', // join key
      'hardware_id', // tokens.device_uuid
      'email', // tokens...
      'language', // tokens.language
      'platform', // tokens.platform
      'os_version', // tokens.os_ver
      'app_version', // tokens.app_ver
      'timezone' // tokens.device_timezone
    ];

    // console.log(tokens.findOne({}, {}, (e, d) => { console.log('token', d) }));
    
    users.find({}).limit(5).forEach((d) => {

      console.log('hi');
      tokens.findOne(
        {$or: [
          {advertising_id: d.Advertising_id},
          {device_uuid: d.Device_uuid},
        ]},
        {sort: {at: -1}}, 
        (e, t) => {
          console.log('users', d, t) 
        }
      );
    });
    

    // db.createCollection("tokens", (err, res) => {
    //   ingest_tokens(db);
    // });
    // db.createCollection("users", (err, res) => {
    //   ingest_users(db);
    // });
  }
  else
    console.log("Mongo: Connection failed");
});
