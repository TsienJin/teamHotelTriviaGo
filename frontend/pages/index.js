import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import SectionProuct from '../sections/index/solution'
import SocialProof from '../sections/socialProof'

export default function Home() {
  return (
    <>
      <SectionProuct />
      <SocialProof />
    </>
  )
}
