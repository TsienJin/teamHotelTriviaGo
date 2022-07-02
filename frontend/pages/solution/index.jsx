import React, { useEffect, useState } from 'react'
import axios from 'axios'

// const { MongoClient } = require("mongodb")

import FileUpload from '../../sections/solution/fileUpload'
import FilePreview from '../../sections/solution/filePreview'
import IndexSectionWrapper from '../../components/IndexSectionWrapper'
import FileHistory from '../../sections/solution/fileHistory'

// import cacheReq from './cacheRequest/cacheReq'

export default function SolutionPage({}) {

  const bottomText = "By using this service, you agree to disclose the uploaded data to Hotel Trivia Go and its associates for the purposes of generating excerpts of the Management Discussion & Analysis."

  const [fileHistory, setFileHistory] = useState([])
  
  useEffect(()=>{
    axios.get('/api/solution/file-history',{}).then(res=>{setFileHistory(res.data.data)})
    // setFileHistory(cacheReq('/api/solution/file-history',{}))
  },[])


  return (
    <>
      <IndexSectionWrapper bottomText={bottomText} bottomTextClass="text-slate-300" heading='Upload your PDF files' subHeading='Do not upload any sensitive or privileged information as this is a proof of concept' bgColour='bg-gradient-to-tl from-blue-800 to-indigo-500' headingColour='text-white'>
        <FileUpload />
      </IndexSectionWrapper>
      <IndexSectionWrapper bgColour={`bg-slate-50 ${fileHistory.length==0?"cursor-progress":""} z-10`} heading='' subHeading={fileHistory.length>0?`Previous file analysis, showing the latest ${fileHistory.length>1?fileHistory.length:""} job${fileHistory.length>1?"s":""}`:"Loading history..."} >
        <FileHistory fileHistory={fileHistory}/>
      </IndexSectionWrapper>
    </>
  )
}