import Footer from '../components/common/Footer'
import Header from '../components/common/Header'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return(
    <html>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </html>
  )
}

export default MyApp
