import HttpStatus from 'http-status-codes';
import nextConnect from 'next-connect';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs'

import { Blob } from 'buffer';

import middleware from '../../middleware/middleware';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  try {
    const files = req.files;
    const body = req.body;


    // do stuff with files and body
    // console.log(files, body)

    const formToSend = new FormData();
    // // const newFile = new Blob(Buffer.from(files), {
    // //   type: 'application/pdf',
    // // });
    // formToSend.append('files', files.files);
    formToSend.append('usrPassword', body.usrPassword)
    formToSend.append('sessionToken', body.sessionToken)
    files.files.forEach(item=>{formToSend.append('files', fs.createReadStream(item.filepath), item.originalFilename)})
    // files.files.forEach(item=>{console.log(item.filepath)})
    


    // const fileArray = Array.from(files.files)
    // console.log(fileArray)
    // formToSend.append('files', req.files)



    const result = await axios.post(
      'http://api.teamhotel.dev/mda/generate',
      formToSend,
    {
      headers: {
        // 'Content-Type': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      // body: JSON.stringify(body),
    }
    );

    console.log(await result.json());

    res.status(HttpStatus.OK).json({});
  } catch (err) {
    console.log(err);
    res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
