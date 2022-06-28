import React from 'react'



function FileHistoryJob({job}){

    console.log(job)

    return(
        <div className='w-full flex flex-col bg-white px-3 py-2 rounded-lg shadow'>

        </div>
    )

}





export default function FileHistory({ fileHistory=[] }) {

    return (
        <div className='flex flex-col max-w-prose gap-y-3'>
            {fileHistory.map(item=>{
                return(
                    <FileHistoryJob job={item} />
                )
            })}
        </div>
    )
}





