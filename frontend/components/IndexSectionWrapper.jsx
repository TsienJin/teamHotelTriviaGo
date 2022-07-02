import React from 'react'

export default function IndexSectionWrapper({bgColour="", headingColour="text-black", heading="", subHeading="", bottomText="", bottomTextClass="",children}) {
  return (
    <section className={`w-full pb-16 pt-12 sm:px-32 px-4 gap-y-16 flex flex-col justify-center items-center overflow-visible relative ${bgColour}`}>
      <div className={`${headingColour} text-center ${(heading.length==0 && subHeading.length==0)?"hidden":""}`}>
        {heading.length>0 && <h2 className='font-medium text-3xl sm:text-5xl cursor-default'>{heading}</h2>}
        {subHeading.length>0 && <h4 className='font-light text-2xl sm:text-2xl opacity-70 mt-2 cursor-default max-w-prose'>{subHeading}</h4>}
      </div>
      <div className='w-full flex justify-center items-center'>
        {children}
      </div>
    {bottomText.length>0 && <span className={`max-w-prose w-full text-center text-sm font-light ${bottomTextClass}`}>{bottomText}</span>}
    </section>
  )
}
