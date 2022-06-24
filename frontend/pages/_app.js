import Head from 'next/head'

import Footer from '../components/common/Footer'
import Header from '../components/common/Header'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return(
    <>
      <Head>
        <title>Team Hotel Trivia Go</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head> 
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
