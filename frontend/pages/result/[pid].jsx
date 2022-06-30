import React, { useEffect, useState } from 'react'
import IndexSectionWrapper from '../../components/IndexSectionWrapper'
import ResultLoading from '../../components/result/loading'
import ResultPassword from '../../components/result/password'
import ResultResult from '../../components/result/result'











export default function ResultPage({pid}) {

  const stateText = {
    loading: "Fetching data from server",
    password: "Enter password to view",
    resultLoading: "Loading data from database...",
    result: "Click on statements to copy!",
  }

  const [isReady, setIsReady] = useState(false)
  const [state, setState] = useState('loading')
  const [usrPassword, setUsrPassword] = useState('')

  const passableStateUpdater = (toUpdate) => {
    setState(toUpdate)
  }

  const passablePasswordUpdater = e => {
    setUsrPassword(e)
  }

  return (
    <IndexSectionWrapper bgColour='bg-gradient-to-tl from-blue-800 to-indigo-500' headingColour='text-white' heading='Analysis' subHeading={`${stateText[state]}`}>
      {state==="loading" && <ResultLoading method={passableStateUpdater} pid={pid} />}
      {state==="password" && <ResultPassword method={passableStateUpdater} passwordMethod={passablePasswordUpdater} pid_={pid} />}
      {(state==="result" || state==="resultLoading") && <ResultResult method={passableStateUpdater} usrPassword={usrPassword} pid={pid} />}
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