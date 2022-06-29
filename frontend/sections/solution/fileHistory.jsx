import React, { useEffect, useState } from 'react'


function FileHistoryJob({job}){

    const niceDate = new Date(job.time).toLocaleString("en-SG")

    const [isExpand, setIsExpand] = useState(false)

    const handleExpand = e => {
        setIsExpand(!isExpand)
    }
    

    return(
        <div className='w-full flex flex-col bg-white px-4 py-4 rounded-lg overflow-hidden shadow'>
            <div className="topBar w-full flex flex-row justify-between items-center gap-x-2 text-slate-900">
                <span onClick={handleExpand} className={`cursor-pointer transition-all opacity-30 sm:hover:opacity-70 ${isExpand?"rotate-90 sm:opacity-70":""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </span>
                <span className='w-full select-none text-lg font-light'>{niceDate}</span>
                <a href={`/result/${job.sessionToken}`} target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </div>
            <div className={`${isExpand?"max-h-[50vh] pt-3 opacity-100":"max-h-0 opacity-0"} overflow-hidden transition-all flex flex-col`}>
                <span className='bg-slate-200 py-px w-full mb-3'></span>
                <div className=''>
                    {Object.keys(job.mdna).map(name=>{
                        return(
                            <p className='text-slate-500 font-light text-lg px-2'>{name}</p>
                        )
                    })}
                </div>
            </div>
        </div>
    )

}


export default function FileHistory({fileHistory=[]}) {

    return (
        <div className='w-full flex flex-col max-w-prose gap-y-3'>
            {fileHistory.map(item=>{
                return(
                    <FileHistoryJob job={item} />
                )
            })}
        </div>
    )
}





