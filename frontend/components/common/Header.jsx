import Link from 'next/link'
import React from 'react'


function HeaderCTA({text="Link Button", link="/", target="_self"}){
    return(
        <Link href={link}>
            <a>
                <div className="
                bg-green-600 text-white text-md text-center py-2 px-4 rounded-lg shadow shadow-green-600
                transition-all
                hover:bg-green-500 hover:rounded
            ">
                    {text}
                </div>
            </a>
        </Link>
    )
}


export default function Header() {
  return (
    <div className='z-40 px-6 py-4 sm:px-32 sm:py-4 sticky top-0 shadow-md  w-full flex flex-row justify-between items-center bg-white backdrop-blur-xl bg-opacity-80 backdrop-contrast-125 backdrop-saturate-150'>
        <div>
            <Link href={"/"}>
                <a>
                    <span className='font-base text-md text-blue-900'>
                        Team <strong>Hotel Trivia Go</strong>
                    </span>
                </a>
            </Link>
        </div>
        <HeaderCTA text={"Generate MD&A"} link={"/solution"}/>
    </div>
  )
}
