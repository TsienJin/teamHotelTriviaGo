import React, { useEffect, useState } from 'react'


async function getData({pid="", usrPassword=""}){

  const result = await fetch('/api/result/get-data', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
    usrPassword: usrPassword,
    pid: pid
      })
  })
    
  const resultJson = await result.json()
  return resultJson.mdna
}
    
    
    
    
function ResultResultLoading(){
  return(
    <div className='w-full max-w-prose rounded-lg flex flex-col justify-center items-center'>
      <iframe src="https://giphy.com/embed/BBkKEBJkmFbTG" frameBorder="0" className="giphy-embed w-full sm:max-w-prose sm:min-h-[40vh]" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/stupid-homer-simpson-monkey-BBkKEBJkmFbTG" className='text-xs font-light text-slate-100'>via GIPHY</a></p>
    </div>
  )
}



function FileTextField({statement="", index=0}){

  const [isCoppied, setIsCoppied] = useState(false)

  const handleClick = () => {
    setIsCoppied(true)
    navigator.clipboard.writeText(statement)
    setTimeout(function() {
      setIsCoppied(false)
    }, 500)
  }

  return(
    <div onClick={handleClick} key={index} className={`rounded overflow-hidden hover:shadow transition-all w-full relative ${isCoppied?"shadow":""}`}>
      <div className='w-full h-full p-2 flex flex-row justify-start items-center text-slate-600 cursor-pointer border-l-slate-300 border-l-4 hover:bg-white hover:border-l-6 hover:border-l-red-500 hover:text-slate-900 transition-all '>
        <p className='select-none'>{statement}</p>
      </div>
      {isCoppied && <div className='bg-green-300 absolute bottom-0 top-0 left-0 right-0 flex flex-col justify-center items-center opacity-80 text-white'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>}
    </div>
  )
}


function FileWrapper({fileName="", statements=[], index=0}){

  const [isExpand, setIsExpand] = useState(false)
  const [isCoppied, setIsCoppied] = useState(false)

  const handleExpand = e => {
    setIsExpand(!isExpand)
  }

  const copyAll = e => {
    e.preventDefault()
    setIsCoppied(true)
    navigator.clipboard.writeText(statements.join('\r\n\r\n'))
    setTimeout(function() {
      setIsCoppied(false)
    }, 1000)
  }

  return(
    <div key={100+index} className='w-full max-w-prose bg-white rounded-lg  overflow-hidden'>
      <div className='topBar flex flex-row gap-2 justify-between items-center p-2'>
        <div className='flex flex-row gap-2 justify-center items-center'>
          <span onClick={handleExpand} className={`cursor-pointer transition-all opacity-30 sm:hover:opacity-70 ${isExpand?"rotate-90 sm:opacity-70":""}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinejoin="round" strokeLinecap="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
          <h4 className='text-xl font-light text-slate-800 w-full'>{fileName}</h4>
        </div>
        <span onClick={copyAll} className='flex flex-row justify-center items-center gap-1 text-white px-3 py-2 bg-green-600 rounded cursor-pointer shadow-sm hover:bg-green-500 transition-all flex-shrink-0'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          {isCoppied?"Copied!":"Copy all"}
        </span>
      </div>
      <div className={`transition-all h-fit ${isExpand?"":"max-h-0 opacity-0"} flex flex-col justify-start items-center bg-slate-100`}>
        <span className='bg-slate-300 py-px w-full mb-2'></span>
        <div className='flex flex-col gap-y-2 p-2 w-full'>
          {statements.map((item, index)=>{
            return(
              <FileTextField statement={item} index={index} />
            )
          })}
        </div>
      </div>
    </div>
  )

}


    
function ResultResultResult({data={}}){
  return(
      <div className='flex flex-col w-full justify-start items-center gap-y-4'>
    {Object.keys(data).map((name, index)=>{
      // console.log(data[name])
      return(
        <FileWrapper fileName={name} statements={data[name]} index={index} />
      )
    })}
      </div>
  )
}



export default function ResultResult({usrPassword="", pid="", method=()=>{}}){
    
  const [isLoading, setIsLoading] = useState(true)
  const [mdnaData, setMdnaData] = useState({})
    
  useEffect(()=>{
      method('resultLoading')
      setIsLoading(true)
      getData({pid:pid, usrPassword:usrPassword}).then(res=>{
    console.log(res)
    if(res){
        setIsLoading(false)
        method('result')
        setMdnaData(res)
    } else {
        alert("Error! please refresh the page.")
    }
      })
  },[])
    
  return(
      <>
    {isLoading && <ResultResultLoading />}
    {!isLoading && <ResultResultResult data={mdnaData} />}
      </>
  )
    }