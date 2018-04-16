const glob = require('glob');
const gunzip = require('gunzip-file');
const read = require('read-file');

export default (db) => {
  const tokens = db.collection("tokens");

  glob('logs/**/*.gz', function(err, files) {
    files.map((file) => {
      let extractedFile = file.replace('.gz', '');

      gunzip(file, extractedFile);

      // gunzip(file, extractedFile, () => {
      //     read(extractedFile, 'utf8', function(err, buffer) {
      //       console.log(extractedFile);
      //       let content = buffer.split("\n");
      //       content.map((c) => {
      //         if(c)
      //           try{
      //             let data = JSON.parse(c);
      //             tokens.update({'device_uuid': data.device_uuid}, data, {upsert: true});
      //           }
      //           catch(e){
      //             console.log(typeof c, JSON.stringify(c), e);
      //           }
      //       })
      //     });
      // });
    })
  });
};
