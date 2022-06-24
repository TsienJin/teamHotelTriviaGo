import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import SectionProuct from '../sections/index/solution'
import SocialProof from '../sections/index/socialProof'
import SolutionWriteUp from '../sections/index/solutionWriteUp'

export default function Home() {
  return (
    <>
      <SectionProuct />
      <SocialProof />
      <SolutionWriteUp />
    </>
  )
}
