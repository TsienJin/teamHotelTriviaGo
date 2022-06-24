import Link from 'next/link'
import React from 'react'


function HeaderCTA({text="Link Button", link="/", target="_self"}){
    return(
        <Link href={link}>
            <a>
                <div className="
                bg-green-600 text-white text-md text-center py-2 px-4 rounded-lg shadow shadow-green-300
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
    <div className='px-6 py-4 sm:px-32 sm:py-4 sticky top-0 z-50 shadow-md bg-white w-full flex flex-row justify-between items-center'>
        <div>
            <Link href={"/"}>
                <a>
                    <span className='font-base text-md text-blue-900'>
                        Team <strong>Hotel Triva Go</strong>
                    </span>
                </a>
            </Link>
        </div>
        <HeaderCTA text={"Demo"}/>
    </div>
  )
}
