import Footer from '../components/common/Footer'
import Header from '../components/common/Header'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return(
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
