import React, { useEffect, useState } from 'react'


async function checkPassword({pid="", usrPassword=""}){
    const result = await fetch('/api/result/auth-password',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        usrPassword: usrPassword,
        pid: pid
      })
    })
  
    const { isCorrect } = await result.json()
  
    return(isCorrect)
  }
  
export default function ResultPassword({ method=()=>{}, passwordMethod=()=>{}, pid_="" }){
  
    const [usrPwdInput, setUsrPwdInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
  
  
    const handleSubmit = e => {
      e.preventDefault()
      
      checkPassword({pid: pid_, usrPassword: usrPwdInput}).then(res=>{
        setIsLoading(false)
        setIsError(false)
        if(res){
          method('result')
        } else {
          setIsError(true)
        }
      })
    }
  
    const handleUsrPwd = e => {
      e.preventDefault()
      setUsrPwdInput(e.target.value)
      passwordMethod(e.target.value)
    }
  
    return(
      <div className='w-full max-w-prose flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-6 transition-all'>
        <form className='w-full flex flex-col' metho="POST" onSubmit={e=>{handleSubmit}}>
          <label htmlFor='password' className='mb-2'>
            <span className='font-light text-slate-500'>This analysis is password protected</span>
          </label>
          <div className='flex flex-col sm:flex-row justify-center gap-3 sm:gap-2'>
            <input type="password" id="password" onChange={handleUsrPwd} className={`w-full px-3 py-2 border-2 border-slate-400 rounded ${isError?"border-red-700":""}`} placeholder='Password' />
            <button value="submit" type="submit" onClick={handleSubmit} className="bg-green-600 hover:bg-green-500 shadow rounded px-3 py-2 text-white transition-all">Submit</button>
          </div>
          { isError && <span className='text-sm font-light text-red-700'>Password is incorrect!</span> }
        </form>
      </div>
    )
  }