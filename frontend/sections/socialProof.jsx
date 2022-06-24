import React from 'react'
import IndexSectionWrapper from '../components/IndexSectionWrapper'

import {useRouter} from 'next/router'


function ImageContainter({props}){

  // <a href="https://unsplash.com/photos/pAtA8xe_iVM" target={"_blank"} rel="noopener noreferrer">

  const router = useRouter()
  const handleClick = e => {
    e.preventDefault()
    window.open("https://unsplash.com/photos/pAtA8xe_iVM")
  }

  return(
    <div className="min-h-[40vh] sm:w-1/2 sm:ml-12 sm:-mt-16 sm:-mb-16 sm:min-h-[60vh] sm:max-w-[30vw] bg-cover bg-top rounded-lg relative overflow-hidden
    bg-[url(https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8)]" onClick={e=>{handleClick(e)}}>
      <div className='absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent via-transparent opacity-80'></div>
      <div className="absolute bottom-6 left-6">
        <p className='font-semibold capitalize text-xl text-white'>Mike Wazowski</p>
        <p className='font-light text-md text-white'>Partner, Legal Clinic Inc.</p>
      </div>
    </div>
  )
}

function Testimony({props}){

  const testimonial = `"Our workflow is so much faster and accurate, our turnover rate as dramatically increased since we started using this product. What a game changer!"`

  return(
    <div className='p-8 w-full h-full flex flex-col justify-start flex-1 flex-grow'>
      <p className='italic text-slate-700 font-light text-xl sm:text-2xl sm:font-extralight'>{testimonial}</p>
    </div>
  )
}











export default function SocialProof() {
  return (
    <IndexSectionWrapper bgColour='bg-gray-100' heading='Testimonial' subHeading='Hear it from industry experts'>
        <div className='bg-white flex flex-col sm:flex-row sm:my-24 sm:justify-center sm:items-center'>
            <ImageContainter />
            <Testimony />
        </div>
    </IndexSectionWrapper>
  )
}
