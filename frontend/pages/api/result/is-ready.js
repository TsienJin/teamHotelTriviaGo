import { MongoClient } from "mongodb"


export default async function handler(req, res) {

    // console.log(req.body)

//     if(req.method !== "POST"){
//         res.status(405).send({message: 'Only POST request allowed'})
//         return
//     }

//     const client = new MongoClient(process.env.MONGO_URI)
//     var isError = false

//   try {
//     await client.connect()
//     const dbCur = client.db("HotelTriviaGodb").collection("mdna_test").findOne({sessionToken: req},{projection:{_id:0, usrPassword:0}}).sort({_id:-1}).limit(10)
    
//   } catch (err) {
//     console.log(err)
//     isError = true
//   } finally {
//     console.log(result)
//     await client.close()
//   }

//   if(!isError){
//     res.status(200).json({ data: result })
//     } else {
//         res.status(400).json({message:'Error fetching data'})
//     }

    if(req.method !== "POST"){
        res.status(405).send({message: 'Method not allowed'})
    }

    // console.log(req.body)

    var statusCode = 200
    var statusState = false
    var pwdPresent = false

    const client = new MongoClient(process.env.MONGO_URI)
    
    try {
        await client.connect()
        const result = await client.db("HotelTriviaGodb").collection("mdna_test").findOne({sessionToken: req.body.pid}, {projection: {usrPassword: 1, isComplete: 1, _id:0}})
        // console.log(result)
        if(await result.isComplete){
            statusState = true
        }

        if(await result.usrPassword.length>0){
            pwdPresent = true
        }
    } catch (err) {
        console.log(err)
        statusCode = 500
    } finally {
        await client.close()
    }




    res.status(statusCode).json({ status: statusState, pwdPresent: pwdPresent })
  }
  