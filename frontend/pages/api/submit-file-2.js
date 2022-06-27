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

    // console.log(files, body)

    const formToSend = new FormData();
    formToSend.append('usrPassword', body.usrPassword)
    formToSend.append('sessionToken', body.sessionToken)
    formToSend.append('time', body.time)
    
    if(files.files.length){
      files.files.forEach(item=>{formToSend.append('files', fs.createReadStream(item.filepath), item.originalFilename)})
    } else {
      formToSend.append('files', fs.createReadStream(files.files.filepath), files.files.originalFilename)
    }

    console.log(files)
    


    // const fileArray = Array.from(files.files)
    // console.log(fileArray)
    // formToSend.append('files', req.files)



    const result = await axios.post(
      // 'http://api.teamhotel.dev/mda/generate',
      // 'http://127.0.0.1:5000/mda/generate',
      process.env.API_URL_FILEUPLOAD,
      formToSend,
    {
      headers: {
        // 'Content-Type': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    }
    );

    console.log(await result.data);

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
