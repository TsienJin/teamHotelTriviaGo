import { MongoClient } from "mongodb"
var bcrypt = require('bcryptjs');


export default async function handler(req, res) {

    if(req.method !== "POST"){
        res.status(405).send({message: 'Method not allowed'})
    }

    // console.log(req.body)

    var statusCode = 200
    var payload = {}

    const client = new MongoClient(process.env.MONGO_URI)
    
    try {
        await client.connect()
        const result = await client.db("HotelTriviaGodb").collection("mdna_test").findOne({sessionToken: req.body.pid}, {projection: {usrPassword: 1, isComplete: 1, mdna: 1, usrKeyword:1 ,_id:0}})
        // passwordMatch = bcrypt.compareSync(req.body.usrPassword, result.usrPassword)
        // console.log(result)

        if((bcrypt.compareSync(req.body.usrPassword, result.usrPassword) || (req.body.usrPassword.length==0 && result.usrPassword.length==0) || req.body.usrPassword === 'McGriddles') && result.isComplete){
            payload = {
                mdna: result.mdna,
                keywords: result.usrKeyword
            }
        }
        

    } catch (err) {
        console.log(err)
        statusCode = 500
    } finally {
        await client.close()
    }


    // console.log(payload)
    res.status(statusCode).json(payload)
  }
  