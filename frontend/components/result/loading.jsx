import React, { useEffect, useState } from 'react'

async function checkIfReady({pid}){
    const result = await fetch("/api/result/is-ready", {
      method: "POST",
      headers: {'Content-Type': "application/json",},
      body: JSON.stringify({pid: pid})
    })
    const { status, pwdPresent } = await result.json()
    // console.log(await status, await pwdPresent)
    return({isReady: status, pwdPresent: pwdPresent})
  }
  
  
  export default function ResultLoading({ method=()=>{}, pid="" }){
  
    const [isReady, setIsReady] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
  
    const fetchUpdate = () => {
      setIsLoading(true)
  
      checkIfReady({pid:pid})
      .then(res=>{
        if(res.isReady){
          setIsLoading(false)
          if(res.pwdPresent){
            method('password')
          } else {
            method('result')
          }
        } else {
          setIsLoading(false)
        }
      })
    }
  
    useEffect(()=>{
      fetchUpdate()
    },[])
  
    return(
      <div className='w-full max-w-prose flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-6 cursor-progress relative'>
        <img src="/loading/Bean Eater-1s-200px.svg" alt="Loading..." className='-mr-[18%] sm:-mr-[9%]' />
        <div onClick={fetchUpdate} className='transition-all absolute bottom-2 right-2 rounded text-slate-600 font-light z-50 py-2 px-4 cursor-pointer hover:bg-slate-400 hover:text-white hover:shadow-lg'>
          <span>
            {isLoading?"Loading...":"Force refresh"}
          </span>
        </div>
      </div>
    )
  }