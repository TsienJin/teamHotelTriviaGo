import React from 'react'

import Link from 'next/link'



export default function CommonButtonProductCTA({text="Link Button", link="/", target="_self", style="bg-green-600 text-white shadow shadow-green-900 hover:bg-green-500 hover:rounded", style2=''}){
    return(
        <Link href={link}>
            <a className=''>
                <div className={`
                text-white text-md text-center py-2 px-4 rounded-lg
                transition-all
                ${style} ${style2}
            `}>
                    {text}
                </div>
            </a>
        </Link>
    )
}