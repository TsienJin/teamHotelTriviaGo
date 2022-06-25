import React, { useEffect, useRef, useState } from 'react'




function FileName({name="Document.pdf"}){
    return(
        <div className='bg-blue-200 text-blue-800 p-2 rounded cursor-default select-none'>
            <span>{name}</span>
        </div>
    )
}

function FileNameContainer({fileList=[]}){

    return(
        <div className='flex flex-col gap-y-1'>
            {fileList.map(item=>{
                return(
                    <FileName name={item.name}/>
                )
            })}
        </div>
    )
}

function FileSubmitButton({methodSubmit=()=>{console.log('Method missing! FileSubmitButton')}, methodClear=()=>{console.log('Method missing! FileSubmitButtonClear')}}){

    return(
        <div className='w-full flex flex-row justify-end items-center gap-x-2'>
            <button onClick={methodClear} className='flex flex-row gap-x-1 px-4 py-2 rounded box-border bg-white border-2 border-red-600 text-red-600 transition-colors hover:bg-red-600 hover:text-white z-50'>
                Clear files
            </button>
            <button onClick={methodSubmit} className='flex flex-row gap-x-1 bg-green-600 text-white px-4 py-2 rounded shadow border-2 border-green-600 hover:bg-green-500 hover:border-green-500 transition-colors z-50'>
                Preview
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </button>
        </div>
    )
}

function FileSubmissionContainer({fileList=[], methodSubmit=()=>{}, methodClear=()=>{}}){

    return(
        <div className='flex flex-col gap-y-6'>
            <FileNameContainer fileList={fileList} />
            <FileSubmitButton methodSubmit={methodSubmit} methodClear={methodClear}/>
        </div>
    )
}



export default function FileUpload({method=()=>{console.log('Method missing! FileUpload!')}}) {

    const inputRef = useRef(null)
    const [dragActive, setDragActive] = useState(false)
    const [file, setFile] = useState([])

    const buttonClick = e =>{
        inputRef.current.click()
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
    }

    const handleDrag = e => {
        e.preventDefault()
        e.stopPropagation()

        if(!dragActive && (e.type === "dragenter" || e.type === "dragover")) {
            setDragActive(true)
        } else if (e.type === "dragleave" || e.type === "drop") {
            setDragActive(false)
        }
    }

    const handleDrop = e => {
        e.preventDefault()
        console.log(e.dataTransfer.files)
        setFile(Array.from(e.dataTransfer.files))
    }

    const handleDropChange = e => {
        e.preventDefault()
        console.log(e.target.files)
        setFile(Array.from(e.target.files))
    }

    const clearFile = e => {
        e.preventDefault()
        setFile([])
    }

    const submitFile = e => {
        e.preventDefault()

        if(file){
            alert(file)
            const formData = new FormData()
            const blob = new Blob(file, {type:'application/pdf'})
            formData.append("files", blob)
            console.log(formData)
        } else {
            alert("No file found! Please let us know how you got this message.")
        }
    }

    useEffect(()=>{
        console.log(file)
    }, [file])

    return (
        <div className='bg-white rounded-xl w-[40rem] max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-16rem)] transition-all'>
            <div className='w-full p-4 flex flex-col gap-y-4'>
                <div className={`${file.length?"outline-4 outline-dashed outline-slate-300":"outline-4 outline-dashed outline-slate-300"} rounded-md`}>
                    <form action="" id="fileUploadForm" onDragEnter={e=>{handleDrag(e)}} onDrop={handleDrop} className={`w-full h-full relative`}>
                        <input onChange={handleDropChange} type={"file"} id={"fileUploader"} multiple={"true"} className="hidden" accept='application/pdf' ref={inputRef} />
                        <div htmlFor="fileUploader" className={`p-12  ${file.length?"":""}`}>
                            <div className="flex flex-col w-full justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <p className='text-slate-700 font-medium'>Drag and drop file from your device</p>
                                <div className='flex flex-row justify-center items-center gap-x-5 mt-3'>
                                    <div className='p-px h-px bg-slate-400 w-[80px] opacity-30'></div>
                                    <span className='font-light text-slate-400'>or</span>
                                    <div className='p-px h-px bg-slate-400 w-[80px] opacity-30'></div>
                                </div>
                            </div>
                            <div className='w-full flex flex-col justify-center items-center mt-3'>
                                <button className={`bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-500 transition-colors z-50 ${file.length?"bg-white text-green-600 border-2 border-green-600 hover:border-green-500 hover:text-white":""}`} onClick={buttonClick}>Choose a file</button>
                            </div>
                        </div>
                        <label id="drag-file-element" htmlFor='fileUploader' className={`absolute top-0 bottom-0 left-0 right-0  ${file.length?"":""}`}onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></label>
                    </form>
                </div>
                { file.length?<FileSubmissionContainer fileList={file} methodSubmit={submitFile} methodClear={clearFile} />:""}
            </div>
        </div>
    )
}

