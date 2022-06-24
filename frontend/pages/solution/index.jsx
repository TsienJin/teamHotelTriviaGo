import React, { useEffect, useState } from 'react'

import FileUpload from '../../sections/solution/fileUpload'
import FilePreview from '../../sections/solution/filePreview'
import IndexSectionWrapper from '../../components/IndexSectionWrapper'

export default function solutionPage() {

  const [uploaded, setUploaded] = useState(false)
  const updateFileIsUploaded = () => {
    setUploaded(true)
  }
  const updateFileIsCleared = () => {
    setUploaded(false)
  }

  return (
    <IndexSectionWrapper heading='Upload your PDF file' subHeading='Do not upload any sensitive or privalaged information as this is a proof of concept' bgColour='bg-gradient-to-tl from-blue-800 to-indigo-500' headingColour='text-white'>
      <div className='w-full flex flex-col justify-center items-center'>
        {uploaded?<FilePreview method={updateFileIsCleared}/>:<FileUpload method={updateFileIsUploaded}/>}
      </div>
    </IndexSectionWrapper>
  )
}
