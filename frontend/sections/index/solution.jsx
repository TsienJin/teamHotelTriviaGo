import Link from 'next/link'
import React from 'react'

import IndexSectionWrapper from '../../components/IndexSectionWrapper'


function ButtonProductCTA({text="Link Button", link="/", target="_self"}){
    return(
        <Link href={link}>
            <a className=''>
                <div className="
                bg-green-600 text-white text-md text-center py-2 px-4 rounded-lg shadow shadow-green-300 w-full
                transition-all
                hover:bg-green-500 hover:rounded
            ">
                    {text}
                </div>
            </a>
        </Link>
    )
}



function ProductFeature({text="Click me!"}){
    return(
        <div className='flex justify-start items-center gap-x-2'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-30" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className='font-light text-md text-gray-600'>{text}</span>
        </div>
    )
}



function ProductCard({tier="", description="", features=[], buttonText="", buttonLink=""}){
    return(
        <div className="rounded-lg bg-gray-50 shadow-md overflow-hidden">
            <div className='max-w-sm h-full flex flex-col justify-between'>
                <div className='p-6 pb-2 w-full bg-white'>
                    <h4 className='text-2xl font-semibold text-left mb-1'>{tier}</h4>
                    <p className='font-light text-gray-600'>{description}</p>
                </div>
                <div className='p-6 py-4 w-full flex flex-col bg-gray-50 gap-y-4 flex-grow'>
                    {features.map(item=>{
                        return(
                            <ProductFeature text={item}/>
                        )
                    })}
                </div>
                <div className='p-6'>
                    <ButtonProductCTA text={buttonText} link={buttonLink}/>
                </div>
            </div>
        </div>
    )
}

// function ProductCard({tier="", description="", features=[], buttonText="", buttonLink=""}){
//     return(
//         <div className='p-10 h-full bg-white flex-1'>
//             <p>{tier}</p>
//             <p>{description}</p>
//         </div>
//     )
// }





export default function SectionProuct({props}){

    const features = {
        // standard: ['Keyword analysis'],
        // elite: ['Keyword analysis', 'Automatic calculations'],
        supreme: ['Keyword analysis', 'Automatic calculations', 'Customisable field selection', 'Password protection for analysed results', 'Click to copy MD&A statements'],
        // enterprise: ['Keyword analysis', 'Automatic calculations', 'Customisable field selection', 'Automated MD&A drafting', 'Custom built services','99.9% SLA uptime guarenteed'],

    }

// - Automatic calculations 
// - Customisable field selection 
// - Data security ensured with password protection 
// - Fully editable files 
// - Keyword analysis 


    const headingText = {
        heading:
            "Quick and automated drafting of MD&A",
        subHeading:
            "Faster workflows, greater efficiency for legal associates",
    }

    const productDescription = {
        supreme: 
            `Automate manual data entry work for lawyers, better harness legal expertise on relevant legal issues`,
        // enterprise: 
        //     "Everything in Powered but with custom product integrations, contact us for more.",
    }

    return(
        <IndexSectionWrapper heading={headingText.heading} subHeading={headingText.subHeading} bgColour='bg-gradient-to-tl from-blue-800 to-indigo-500' headingColour='text-white'>
            <div className='flex flex-col sm:flex-row w-full gap-8 justify-center'>
                <ProductCard tier={"Generate MD&As"} features={features.supreme} description={productDescription.supreme} buttonText={"Generate MD&A now!"} buttonLink={"/solution"}/>
                {/* <ProductCard tier={"Enterprise"} features={features.enterprise} description={productDescription.enterprise} buttonText={"Experience the demo"} buttonLink={"/solution"}/> */}
            </div>
        </IndexSectionWrapper>
    )
}