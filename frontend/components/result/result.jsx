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



function FileTextField({statement=""}){

  const handleClick = () => {
    navigator.clipboard.writeText(statement)
  }

  return(
    <div onClick={handleClick} className='rounded overflow-hidden hover:shadow transition-all w-full'>
      <div className='w-full h-full p-2 flex flex-row justify-start items-center text-slate-600 cursor-pointer border-l-slate-300 border-l-4 hover:bg-white hover:border-l-6 hover:border-l-red-500 hover:text-slate-900 transition-all '>
        <p>{statement}</p>
      </div>
    </div>
  )
}


function FileWrapper({fileName="", statements=[]}){

  const [isExpand, setIsExpand] = useState(true)

  const handleExpand = e => {
    setIsExpand(!isExpand)
  }

  return(
    <div className='w-full max-w-prose bg-white rounded-lg  overflow-hidden'>
      <div className='topBar flex flex-row gap-2 justify-start items-center p-2'>
        <span onClick={handleExpand} className={`cursor-pointer transition-all opacity-30 sm:hover:opacity-70 ${isExpand?"rotate-90 sm:opacity-70":""}`}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
        <h4 className='text-2xl font-light text-slate-800'>{fileName}</h4>
      </div>
      <div className={`transition-all h-fit ${isExpand?"max-h-[1000vh]":"max-h-0 opacity-0"} flex flex-col justify-start items-center bg-slate-100`}>
        <span className='bg-slate-300 py-px w-full mb-2'></span>
        <div className='flex flex-col gap-y-2 p-2 w-full'>
          {statements.map(item=>{
            return(
              <FileTextField statement={item} />
            )
          })}
        </div>
      </div>
    </div>
  )

}


    
function ResultResultResult({data={}}){
  return(
      <>
    {Object.keys(data).map(name=>{
      // console.log(data[name])
      return(
        <FileWrapper fileName={name} statements={data[name]} />
      )
    })}
      </>
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