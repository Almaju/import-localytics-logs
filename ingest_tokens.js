import { Tokens } from './collections';

const glob = require('glob');
const archive = require('ls-archive');
const gunzip = require('gunzip-file');
const read = require('read-file');

export default () => {
  const recurse = (file) => {
    console.log(file);
    file.recurse = file.pattern.glob.indexOf('**') !== -1;
    return file;
  }

  glob('tests/**/*.gz', function(err, files) {
    files.map((file) => {
      let extractedFile = file.replace('.gz', '');

      gunzip(file, extractedFile, () => {
          read(extractedFile, 'utf8', function(err, buffer) {
            let content = buffer.split("\n");
            content.map((c) => {
              try{
                let json = JSON.parse(c);
                console.log(json);
                Tokens.upsert(json);
              }
              catch(e){}
            })
          });
           
      });
    })
  });
};
