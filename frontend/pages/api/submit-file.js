import { data } from 'autoprefixer';

const multiparty = require('multiparty');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST allowed!' });
  }

//   console.log(new FormData(req.body))

//   const resAPI = await fetch(process.env.API_URL_FILEUPLOAD, {
//     method: 'POST',
//     headers: { 'Content-Type': 'multipart/form-data' },
//     body: req.body,
//   });
//   const resAPIData = await resAPI.json();
//   console.log(await resAPIData);

//   res.status(200).send(await resAPIData);


  const form = new multiparty.Form()

  /// Errors may be emitted
// Note that if you are listening to 'part' events, the same error may be
// emitted from the `form` and the `part`.
form.on('error', function(err) {
    console.log('Error parsing form: ' + err.stack);
  });
  
  // Parts are emitted when parsing the form
  form.on('part', function(part) {
    // You *must* act on the part by reading it
    // NOTE: if you want to ignore it, just call "part.resume()"
  
    if (part.filename === undefined) {
      // filename is not defined when this is a field and not a file
      console.log('got field named ' + part.name);
      // ignore field's content
      part.resume();
    }
  
    if (part.filename !== undefined) {
      // filename is defined when this is a file
      count++;
      console.log('got file named ' + part.name);
      // ignore file's content here
      part.resume();
    }
  
    part.on('error', function(err) {
      // decide what to do
    });
  });
  
  // Close emitted after form parsed
  form.on('close', function() {
    console.log('Upload completed!');
    res.setHeader('text/plain');
    res.end('Received ' + count + ' files');
  });
  
  // Parse req
  form.parse(req, function(err, fields, files) {
    Object.keys(fields).forEach(function(name) {
      console.log('got field named ' + name);
    });
  
    Object.keys(files).forEach(function(name) {
      console.log('got file named ' + name);
    });
  
    console.log('Upload completed!');
  });

  res.status(200).send({message: 'OK'})


}
