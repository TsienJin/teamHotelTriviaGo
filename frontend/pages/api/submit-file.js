import { data } from "autoprefixer"

export default async function handler(req, res) {
    if(req.method !== 'POST'){
        res.status(405).send({message: 'Only POST allowed!'})
    }

    // console.log(req.body)

    // const resAPI = await fetch(process.env.API_URL_FILEUPLOAD, {
    //     method: "POST",
    //     headers:{'Content-Type': 'multipart/form-data'},
    //     body: req.body
    // })
    // console.log(await resAPI.json())

    // res.status(200).send(await resAPI.json())

    res.status(200).send({message: 'OK'})
  }
  