import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import IndexSectionWrapper from '../../components/IndexSectionWrapper'




function ResultLoading({}){

  return(
    <div className='w-full max-w-prose flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-6 cursor-progress'>
      <img src="/loading/Bean Eater-1s-200px.svg" alt="Loading..." />
    </div>
  )
}

function ResultPassword({}){


  return(
    <div>
      Password
    </div>
  )
}


function ResultResult({}){

  return(
    <div>
      result
    </div>
  )
}










export default function ResultPage({pid}) {

  const stateText = {
    loading: "Fetching data from server",
    password: "Enter password to view",
    result: "Click on statements to copy!",
  }


  const [isReady, setIsReady] = useState(false)
  const [state, setState] = useState('loading')

  return (
    <IndexSectionWrapper bgColour='bg-gradient-to-tl from-blue-800 to-indigo-500' headingColour='text-white' heading='Analysis' subHeading={`${stateText[state]}`}>
      {state==="loading" && <ResultLoading />}
      {state==="password" && <ResultPassword />}
      {state==="result" && <ResultResult />}

    </IndexSectionWrapper>
  )
}

export async function getServerSideProps({query}){

  return{
    props: {
      pid: query.pid
    }
  }
}