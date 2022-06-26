import HttpStatus from 'http-status-codes'
import nextConnect from 'next-connect';

import middleware from '../../middleware/middleware';

const handler = nextConnect();

handler.use(middleware);

handler.post(async(req, res) => {
	try {
		const files = req.files
		const body = req.body

		// do stuff with files and body
        // console.log(files, body)

        // const formToSend = new FormData()
        // // formToSend.append('files', files)
        // formToSend.append('body', body)

        const result = await fetch("http://api.teamhotel.dev/mda/generate", {
            method: "POST",
            headers:{
                'Content-Type': 'multipart/form-data'
            },
            body: body,
            files: files,
        })

        console.log(await result)


		res.status(HttpStatus.OK).json({});
	} catch (err) {
        console.log(err)
		res.status(HttpStatus.BAD_REQUEST).json({error: err.message});
	}
});

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler;