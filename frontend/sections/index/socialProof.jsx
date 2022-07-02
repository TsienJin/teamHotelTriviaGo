import React from 'react'
import IndexSectionWrapper from '../../components/IndexSectionWrapper'

import {useRouter} from 'next/router'



function ImageContainter({props}){

  const router = useRouter()
  const handleClick = e => {
    e.preventDefault()
    window.open("https://unsplash.com/photos/pAtA8xe_iVM")
  }

  return(
    <div className="min-h-[60vh] sm:w-1/2 sm:ml-12 sm:-mt-16 sm:-mb-16 sm:min-h-[60vh] sm:max-w-[30vw] bg-cover bg-top rounded-t-lg sm:rounded-lg relative overflow-hidden cursor-default
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


function VideoDemo({props}){

  return(
    <iframe className='w-full h-48 sm:h-[60vh]' src="https://www.youtube.com/embed/ePtYqfwluSI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  )
}

export default function SocialProof() {
  return (
    <IndexSectionWrapper bgColour='bg-gray-100' heading='Watch our demo' subHeading="We'd love to be part of your success story!" headingColour='text-slate-900'>
        {/* <div className='bg-white flex flex-col sm:flex-row sm:my-12 sm:justify-center sm:items-center rounded-lg shadow-lg'>
            <ImageContainter />
            <Testimony />
        </div> */}
        <VideoDemo />
    </IndexSectionWrapper>
  )
}
