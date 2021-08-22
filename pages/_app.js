import Layout from '../components/Layout'
import Nav from '../components/Nav'
import { AuthUserProvider } from '../contexts/authUserContext'
import { FirestoreProvider } from '../contexts/firestoreContext'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <FirestoreProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </FirestoreProvider>
    </AuthUserProvider>
  )
}

export default MyApp
