import HttpStatus from 'http-status-codes';
import nextConnect from 'next-connect';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs'

const { MongoClient } = require("mongodb")

import middleware from '../../../middleware/middleware';
const handler = nextConnect();
handler.use(middleware);



async function writeToMongo(body){

  const mongoDataToInsert = {
    isComplete: false,
    isError: false,
    sessionToken: body.sessionToken,
    usrPassword: body.usrPassword,
    usrKeyword: body.usrKeyword,
    time: body.time,
    mdna: {}
  }

  const client = new MongoClient(process.env.MONGO_URI)
  
  try {
    await client.connect()
    await client.db("HotelTriviaGodb").collection("mdna_test").insertOne(mongoDataToInsert).then(e=>{console.log(e)})
  } catch (err) {
    console.log(err)
  } finally {
    await client.close()
  }

  return
}





handler.post(async (req, res) => {

  var resCode = 200
  var resMessage = "file received"

  try {
    const files = req.files;
    const body = req.body;

    writeToMongo(body)

    const formToSend = new FormData();
    formToSend.append('usrPassword', body.usrPassword)
    formToSend.append('usrKeyword', body.usrKeyword)
    formToSend.append('sessionToken', body.sessionToken)
    formToSend.append('time', body.time)
    
    if(files.files.length){
      files.files.forEach(item=>{formToSend.append('files', fs.createReadStream(item.filepath), item.originalFilename)})
    } else {
      formToSend.append('files', fs.createReadStream(files.files.filepath), files.files.originalFilename)
    }

    const result = await axios.post( process.env.API_URL_FILEUPLOAD, formToSend, {headers:{'Content-Type':'multipart/form-data',},})

  } catch (err) {
    console.log(err)
    resCode = 500
    resMessage = "Error occured"
  } finally {
    console.log("here")
    res.status(resCode).json({message: resMessage})
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
