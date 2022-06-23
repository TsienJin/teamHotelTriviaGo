import React from 'react'

import IndexSectionWrapper from '../../components/IndexSectionWrapper'


function ButtonProductCTA({text="Link Button", link="/", target="_self"}){
    return(
        <a href={link} target={target}>
            <div className="
            bg-green-600 text-white text-md text-center py-2 px-4 rounded-lg shadow shadow-green-300 w-full
            transition-all
            hover:bg-green-500 hover:rounded
        ">
                {text}
            </div>
        </a>
    )
}



function ProductFeature({text="feature"}){
    return(
        <div className='flex justify-start items-center gap-x-2'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-30" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className='font-light text-md text-gray-600'>{text}</span>
        </div>
    )
}



function ProductCard({tier="", description="", features=[]}){
    return(
        <div className='w-full h-full rounded-lg bg-white shadow-md'>
            <div className='p-6 pb-2 w-full'>
                <h4 className='text-2xl font-semibold text-left mb-1'>{tier}</h4>
                <p className='font-light text-gray-600'>{description}</p>
            </div>
            <div className='p-6 py-4 w-full flex flex-col bg-gray-50 gap-y-4 flex-grow h-full'>
                {features.map(item=>{
                    return(
                        <ProductFeature text={item}/>
                    )
                })}
            </div>
            <div className="p-6 pt-0 pb-5 bg-gray-50 rounded-b-lg w-full">
                <ButtonProductCTA text='Create account'/>
            </div>
        </div>
    )
}



export default function SectionProuct({props}){

    const features = {
        standard: ['Keyword analysis'],
        elite: ['Keyword analysis', 'Automatic calculations'],
        supreme: ['Keyword analysis', 'Automatic calculations', 'Customisable results', 'Automated MD&A drafting'],
    }

    return(
        <IndexSectionWrapper heading='Our Solutions' subHeading='' bgColour='bg-blue-900' headingColour='text-white'>
            <div className='flex flex-col w-full gap-8 sm:flex-row'>
                <ProductCard tier={"Standard user"} features={features.standard} description={"Best for small businesses and students."}/>
                <ProductCard tier={"Elite user"} features={features.elite} description={"Built for businesses that value time."}/>
                <ProductCard tier={"Supreme user"} features={features.supreme} description={"Most powerful liscence available."}/>
            </div>
        </IndexSectionWrapper>
    )
}