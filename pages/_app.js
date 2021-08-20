import Nav from '../components/Nav'
import { AuthUserProvider } from '../contexts/authUserContext'
import { FirestoreProvider } from '../contexts/firestoreContext'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <FirestoreProvider>
        <Nav/>
        <Component {...pageProps} />
      </FirestoreProvider>
    </AuthUserProvider>
  )
}

export default MyApp
