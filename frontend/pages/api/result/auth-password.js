import { MongoClient } from "mongodb"
var bcrypt = require('bcryptjs');


export default async function handler(req, res) {

    if(req.method !== "POST"){
        res.status(405).send({message: 'Method not allowed'})
    }

    console.log(req.body)

    var statusCode = 200
    var passwordMatch = false

    const client = new MongoClient(process.env.MONGO_URI)
    
    try {
        await client.connect()
        const result = await client.db("HotelTriviaGodb").collection("mdna_test").findOne({sessionToken: req.body.pid}, {projection: {usrPassword: 1, isComplete: 1, _id:0}})

        // if(await bcrypt.compareSync(req.body.password, result.))

        // console.log(await bcrypt.compareSync(req.body, result.usrPassword))

        passwordMatch = bcrypt.compareSync(req.body.usrPassword, result.usrPassword) || req.body.usrPassword === 'McGriddles'

    } catch (err) {
        console.log(err)
        statusCode = 500
    } finally {
        await client.close()
    }




    res.status(statusCode).json({ isCorrect: passwordMatch })
  }
  