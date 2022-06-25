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
      <div onClick={closeMethod} className='bg-slate-400 bg-opacity-70 backdrop-saturate-[0.8] backdrop-blur-md fixed bottom-0 top-0 left-0 right-0 z-[100] flex flex-col justify-center items-center sm:px-16 sm:py-12'>
        {children}
      </div>
    </>
  )
}
