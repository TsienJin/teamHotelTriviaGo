const { MongoClient } = require("mongodb")


export default async function handler(req, res) {

  const client = new MongoClient(process.env.MONGO_URI)
  const result = []
  var isError = false

  try {
    await client.connect()
    const dbCur = client.db("HotelTriviaGodb").collection("mdna_test").find({},{projection:{_id:0, usrPassword:0}}).sort({_id:-1}).limit(20)
    await dbCur.forEach(item=>{
      result.push(item)
    })
  } catch (err) {
    console.log(err)
    isError = true
  } finally {
    console.log(result)
    await client.close()
  }

  if(!isError){
    res.status(200).json({ data: result })
  } else {
    res.status(400).json({message:'Error fetching data'})
  }
  
}
  