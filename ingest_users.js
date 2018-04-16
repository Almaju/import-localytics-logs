const glob = require('glob');
const read = require('read-file');
const parse = require('csv-parse');

export default (db) => {
  const users = db.collection("users");

  glob('logs/*.csv', (err, files) => {
    files.map((file) => {
      read(file, 'utf8', (err, buffer) => {
        // console.log(err, buffer);
        parse(buffer, (err, output) => {
          console.log(output);
        });
      });
    })
  });
};
