import React from 'react'

export default function IndexSectionWrapper({bgColour="", headingColour="text-black", heading="", subHeading="", children}) {
  return (
    <section className={`w-full py-8 sm:px-32 px-4 gap-y-8 flex flex-col justify-center items-center overflow-visible ${bgColour}`}>
      <div className={`${headingColour} text-center`}>
        <h2 className='font-medium text-4xl'>{heading}</h2>
        <span>{subHeading}</span>
      </div>
      <div className=''>
        {children}
      </div>
    </section>
  )
}
