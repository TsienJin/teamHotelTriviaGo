import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className='py-12 px-4 sm:px-32 flex flex-col sm:flex-row justify-center items-left sm:justify-between sm:items-center gap-8 cursor-default'>
        <div className=''>
            <h6 className='font-semibold text-slate-700'>SMU LIT Hackathon 2022</h6>
            <p className='text-slate-500 font-light'>©Team Hotel Trivia Go, 2022</p>
        </div>
        <div>
            <h6 className="font-semibold text-slate-700">Links</h6>
            <p className='text-slate-500 cursor-pointer font-light'><Link href="https://github.com/TsienJin/teamHotelTriviaGo"><a>GitHub Repo</a></Link></p>
        </div>
    </footer>
  )
}
