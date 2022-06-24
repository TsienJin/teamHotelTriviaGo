import React from 'react'
import IndexSectionWrapper from '../../components/IndexSectionWrapper'
import CommonButtonProductCTA from '../../components/CTALinkButton'
import Link from 'next/link'
import { useRouter } from 'next/router'




function CTAComponent({props}){

    return(
        <div className='bg-white rounded-lg p-6 flex flex-row justify-center items-center gap-4 sm:gap-8'>
            <div className=''>
                <h5>Give it a shot!</h5>
                <p>Experience our free demo and step into a faster workflow!</p>
            </div>
            <CommonButtonProductCTA text='Demo'/>
        </div>
    )
}



function StepCard({stepNo=0, title='title', body=''}){

    return(
        <div className="bg-white rounded-lg p-6 w-full hover:bg-green-600 hover:text-white transition-colors shadow-md cursor-default">
            <h4 className='font-medium text-xl mb-2 select-none'><span className='opacity-40'>{stepNo}.</span> {title}</h4>
            <p className='font-light text-lg'>{body}</p>
        </div>
    )
}

function CTACard({props}){
    const router = useRouter()

    const handleClick = e => {
        e.preventDefault()
        router.push("/solution")
    }

    return(
        <div onClick={e=>{handleClick(e)}} className='bg-green-600 text-white rounded-lg px-6 py-3 sm:py-6 w-full hover:bg-white hover:text-green-800 transition-colors shadow-md cursor-pointer flex flex-row justify-center items-center gap-2'>
            <span className='font-base text-2xl'>Try the demo</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
        </div>
    )
}

function VideoDemo({props}){

    return(
        <iframe className='w-full h-48 sm:h-96 rounded-lg shadow-lg' src="https://www.youtube.com/embed/xm3YgoEiEDc" title="TeamTriviaGo Demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    )
}




export default function SolutionWriteUp({props}) {

    const copyText = {
        upload: "Upload any document through our portal. Ensure that the file uploaded is correct by looking at the file preview.",
        analyse: "We utilise machine learning and natural language processing to pick out the relavent information we need to process.",
        copy: "The analysed data is then formatted and displayed into easy to copy text fields for you.",
    }

  return (
    <IndexSectionWrapper heading='How it works' subHeading='Overview of our solution' headingColour='text-white' bgColour='bg-gradient-to-tl from-blue-900 to-blue-700'>
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col-reverse sm:flex-col gap-4 '>
                <div className='flex flex-col lg:flex-row w-full gap-4'>
                    <StepCard stepNo={1} title='Upload' body={copyText.upload} />
                    <StepCard stepNo={2} title='Analyse' body={copyText.analyse} />
                    <StepCard stepNo={3} title='Copy' body={copyText.copy} />
                </div>
                <VideoDemo />
            </div>
            <CTACard />
        </div>
    </IndexSectionWrapper>
  )
}
