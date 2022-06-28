import React, { useEffect, useState } from 'react'

const { MongoClient } = require("mongodb")

import FileUpload from '../../sections/solution/fileUpload'
import FilePreview from '../../sections/solution/filePreview'
import IndexSectionWrapper from '../../components/IndexSectionWrapper'
import FileHistory from '../../sections/solution/fileHistory'

export default function SolutionPage({ fileHistory=[] }) {

  const [uploaded, setUploaded] = useState(false)
  const updateFileIsUploaded = () => {
    setUploaded(true)
  }
  const updateFileIsCleared = () => {
    setUploaded(false)
  }

  return (
    <>
      <IndexSectionWrapper heading='Upload your PDF files' subHeading='Do not upload any sensitive or privalaged information as this is a proof of concept' bgColour='bg-gradient-to-tl from-blue-800 to-indigo-500' headingColour='text-white'>
        <FileUpload method={updateFileIsUploaded}/>
      </IndexSectionWrapper>
      <IndexSectionWrapper bgColour='bg-slate-50' heading='' subHeading={`Previous file analysis, showing last ${fileHistory.length} jobs`}>
        <FileHistory fileHistory={fileHistory}/>
      </IndexSectionWrapper>
    </>
  )
}

export async function getServerSideProps(){

  const client = new MongoClient(process.env.MONGO_URI)
  const result = []

  try {
    await client.connect()
    const dbCur = client.db("HotelTriviaGodb").collection("mdna_test").find({},{projection:{_id:0, usrPassword:0}}).sort({_id:-1}).limit(20)
    await dbCur.forEach(item=>{
      result.push(item)
    })
  } catch (err) {
    console.log(err)
  } finally {
    await client.close()
  }

  return {
    props: {
      fileHistory: result
    }
  }
}
