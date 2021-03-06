import React, { useEffect, useRef, useState } from 'react'

import { v4 as uuidv4 } from 'uuid'
import hashPassword from '../../passwords/hash'
import checkHashPassword from '../../passwords/checkHash'
import ModalWrapper from '../../modal/ModalWrapper'

import { useRouter } from 'next/router'


function FilePreviewFrame({file={}}){

    const [fileSrc, setFileSrc] = useState(null)

    const reader = new FileReader()
    reader.onload = r => {setFileSrc(r.target.result)}

    const fileURL = reader.readAsDataURL(file)
    // console.log(fileURL)

    return(
        <>
            <div onClick={e=>{}} className='bg-white rounded-t-lg flex flex-row justify-between items-center overflow-hidden z-50 w-full'>
                <div className='py-2 px-3 '>
                    <span className='text-slate-500'>{file.name}</span>
                </div>
                <div className='py-2 px-8 h-full bg-slate-400 text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
            <iframe src={fileSrc} frameborder="0" className='w-full h-full rounded-b-lg z-50 sm:max-h-[90vh]'></iframe>
        </>
    )
}



function FileName({file={name:"document", size:0}}){

    console.log(file)

    const [modalActive, setModalActive] = useState(false)

    const [fileSrc, setFileSrc] = useState(null)

    const reader = new FileReader()
    reader.onload = r => {setFileSrc(r.target.result)}

    const fileURL = reader.readAsDataURL(file)

    const openModal = () => {
        setModalActive(true)
        console.log(file)
    }

    const closeModal = () => {
        setModalActive(false)
    }

    

    return(
        <>
            <div onClick={openModal} className='flex flex-row justify-between items-center bg-blue-100 text-blue-800 py-2 px-3 rounded cursor-default select-none hover:bg-blue-600 hover:text-white hover:shadow hover:shadow-blue-800 transition-all'>
                <span>{file.name}</span>
                <span className='text-sm font-thin opacity-70'>{(file.size/1000000).toFixed(2)} Mb</span>
            </div>
            {modalActive && <ModalWrapper closeMethod={closeModal}><FilePreviewFrame file={file}/></ModalWrapper>}
        </>
    )
}

function FileNameContainer({fileList=[]}){

    return(
        <div className='flex flex-col gap-y-1'>
            <div className='mb-1 flex flex-row gap-1 justify-start items-center text-slate-500'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className='font-light'>Click on file to preview. Maximum 3 Mb total upload size.</span>
            </div>
            {fileList.map(item=>{
                return(
                    <FileName file={item}/>
                )
            })}
        </div>
    )
}

function FileSubmitButton({isSending=false, methodSubmit=()=>{console.log('Method missing! FileSubmitButton')}, methodClear=()=>{console.log('Method missing! FileSubmitButtonClear')}}){

    return(
        <div className='w-full flex flex-row justify-end items-center gap-x-2 z-0'>
            <button onClick={methodClear} className='z=0 flex flex-row gap-x-1 px-4 py-2 rounded box-border bg-white border-2 border-red-600 text-red-600 transition-colors hover:bg-red-600 hover:text-white z-50'>
                Clear files
            </button>
            <button type='submit' onClick={methodSubmit} className='z-0'>
                <div className={`flex flex-row gap-x-1 bg-green-600 text-white px-4 py-2 rounded shadow border-2 border-green-600 hover:bg-green-500 hover:border-green-500 transition-colors ${isSending?"cursor-progress bg-slate-600 border-slate-600 hover:bg-slate-600 hover:border-slate-600":""}`}>
                    {isSending?<span>Sending...</span>:<span>Submit</span>}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </div>
            </button>
        </div>
    )
}


function FilePasswordField({methodPassword=()=>{}}){

    return(
        <div className='w-full flex flex-col gap-y-1'>
            <label htmlFor='filePasswordField'>
                <span className='text-slate-500 font-light'>(Optional) Password or catch phrase</span>
            </label>
            <input type="password" onChange={methodPassword} id='filePasswordField' className='w-full outline-1 outline-blue-400 px-3 py-2 border-2 border-slate-300 rounded' placeholder='Password'/>
        </div>
    )
}

function FileKeywordField({methodKeyword=()=>{}}){

    return(
        <div className='w-full flex flex-col gap-y-1'>
            <label htmlFor='fileKeywordField'>
                <span className='text-slate-500 font-light'>(Optional) Keywords separated by commas</span>
            </label>
            <input type="text" onChange={methodKeyword} id='fileKeywordField' className='w-full outline-1 outline-blue-400 px-3 py-2 border-2 border-slate-300 rounded' placeholder='Keywords'/>
        </div>
    )
}

function FileSubmissionContainer({fileList=[], isSending=false, methodSubmit=()=>{}, methodClear=()=>{}, methodPassword=()=>{}, methodKeyword=()=>{}}){

    return(
        <div className='flex flex-col gap-y-6 z-0'>
            <FileNameContainer fileList={fileList} />
            <FilePasswordField methodPassword={methodPassword}/>
            <FileKeywordField methodKeyword={methodKeyword} />
            <FileSubmitButton methodSubmit={methodSubmit} methodClear={methodClear} isSending={isSending} />
        </div>
    )
}



export default function FileUpload({method=()=>{console.log('Method missing! FileUpload!')}}) {

    const inputRef = useRef(null)
    const router = useRouter()

    const [dragActive, setDragActive] = useState(false)
    const [isSending, setIsSending] = useState(false)

    const [file, setFile] = useState([])
    const [fileArray, setFileArray] = useState([])
    const [usrPassword, setUsrPassword] = useState('')
    const [sessionToken, setSessionToken] = useState(uuidv4())
    const [usrKeyword, setUsrKeyword] = useState('')

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
        setFile(e.dataTransfer.files)
        setFileArray(Array.from(e.dataTransfer.files))
    }

    const handleDropChange = e => {
        e.preventDefault()
        console.log(e.target.files)
        setFile(e.target.files)
        setFileArray(Array.from(e.target.files))
        // console.log(file)
    }

    const handlePassword = e => {
        setUsrPassword(hashPassword(e.target.value))
    }

    const handleKeyword = e => {
        setUsrKeyword(e.target.value)
    }

    const clearFile = e => {
        e.preventDefault()
        setFile([])
    }

    const submitFile = e => {
        e.preventDefault()

        if(file && !isSending){
            setIsSending(true)
            const formData = new FormData()
            fileArray.forEach((f) => {
              formData.append('files', f)
            })
            formData.append("usrPassword", usrPassword)
            formData.append("sessionToken", sessionToken)
            formData.append("usrKeyword", usrKeyword)
            formData.append("time", new Date().toLocaleString("en-SG", {timeZone: "Asia/Singapore"}),)

            fetch(`/api/solution/submit-file-2`, {
              method: 'POST',
              body: formData,
              cache: 'no-cache',
            }).then((res) => {
              if (
                res.status >= 200 &&
                res.status < 300 &&
                sessionToken.length
              ) {
                router.push(`/result/${sessionToken}`);
              } else {
                alert('Error submitting file. Press "OK" to reload the page.');
                router.reload();
              }
            });
        }
    }

    useEffect(()=>{
        console.log(file)
    }, [file])

    return (
        <div className='bg-white rounded-xl w-[40rem] max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-16rem)] transition-all'>
            <form action="" id="fileUploadForm" className='w-full p-4 flex flex-col gap-y-4'>
                <div className={`${file.length?"outline-4 outline-dashed outline-slate-300":"outline-4 outline-dashed outline-slate-300"} rounded-md`}>
                    <div onDragEnter={e=>{handleDrag(e)}} onDrop={handleDrop} className={`w-full h-full relative`}>
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
                                <button className={` transition-colors rounded px-4 py-2 ${file.length>0?"bg-white text-green-600 border-2 border-green-600":"bg-green-600 text-white shadow hover:bg-green-500"}`} onClick={buttonClick}>Choose a file</button>
                            </div>
                        </div>
                        <label id="drag-file-element" htmlFor='fileUploader' className={`absolute top-0 bottom-0 left-0 right-0  ${file.length?"":""}`}onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></label>
                    </div>
                </div>
                { file.length>0 && <FileSubmissionContainer fileList={fileArray} methodSubmit={submitFile} methodClear={clearFile} methodPassword={handlePassword} methodKeyword={handleKeyword} isSending={isSending} />}
            </form>
        </div>
    )
}

