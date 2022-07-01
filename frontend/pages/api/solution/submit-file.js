import { data } from 'autoprefixer';

const multiparty = require('multiparty');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST allowed!' });
  }

  const resAPI = await fetch(process.env.API_URL_FILEUPLOAD, {
    method: 'POST',
    // headers: { 'Content-Type': 'multipart/form-data' },
    body: req.body,
  });
  const resAPIData = await resAPI.json();
  // console.log(await resAPIData);

  res.status(200).send(await resAPIData);
}
