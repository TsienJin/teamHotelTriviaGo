import React from 'react'
import IndexSectionWrapper from '../components/IndexSectionWrapper'




function ImageContainter({props}){

  return(
    <div className="relative w-full sm:max-w-md sm:-mt-16 sm:-mb-16 cursor-pointer">
      <a href="https://unsplash.com/photos/pAtA8xe_iVM" target={"_blank"} className='w-full relative over'>
        <img className='rounded-t-lg sm:rounded-lg sm:shadow-md object-cover object-top w-full max-h-[50vh] sm:max-h-[55vh]' src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8" alt="" />
        <div className='rounded-t-lg sm:rounded-lg absolute z-10 top-0 bottom-0 left-0 right-0 rounded-lg bg-gradient-to-t from-slate-700 to-transparent via-transparent opacity-70'></div>
        <div className="absolute bottom-4 left-8 sm:bottom-8 sm:left-8 z-20">
          <h5 className='font-semibold capitalize text-xl text-white'>Mike Wazowski</h5>
          <span className='font-light text-md text-white'>Partner, Legal Clinic Inc.</span>
        </div>
      </a>
    </div>
  )
}

function Testimony({props}){

  const testimonial = `"Our workflow is so much faster and accurate, our turnover rate as dramatically increased since we started using this product. What a game changer!"`

  return(
    <div className='p-8 w-full h-full flex flex-col justify-start flex-1 flex-grow sm:w-1/2'>
      <p className='italic text-slate-700 font-light text-xl sm:text-2xl sm:font-extralight'>{testimonial}</p>
    </div>
  )
}











export default function SocialProof() {
  return (
    <IndexSectionWrapper bgColour='bg-gray-100' heading='Testimonial' subHeading='Hear it from industry experts'>
        <div className='flex flex-col sm:flex-row sm:justify-center sm:items-center rounded-lg overflow-visable bg-white shadow-lg w-full sm:pl-12 sm:my-16 sm:mt-24'>
            <ImageContainter />
            <Testimony />
        </div>
    </IndexSectionWrapper>
  )
}
