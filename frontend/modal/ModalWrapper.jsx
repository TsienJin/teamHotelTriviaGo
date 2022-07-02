import React, { Children, useEffect } from 'react'

export default function ModalWrapper({children, closeMethod=()=>{}}) {


  useEffect(()=>{
    const handleEsc = e =>{
      if(e.keyCode === 27){
        closeMethod()
      }
    }
    window.addEventListener('keydown', handleEsc)

    return()=>{
      window.removeEventListener('keydown', handleEsc)
    }
  },[])

  return (
    <>
      <div onClick={closeMethod} className='z-10 bg-slate-400 bg-opacity-70 backdrop-saturate-[0.8] backdrop-blur-md flex flex-col absolute justify-center items-center sm:px-16 sm:py-12 top-0 left-0 right-0 bottom-0 overflow-hidden'>
        {children}
      </div>
    </>
  )
}
