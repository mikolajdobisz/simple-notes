import Head from 'next/head'

import 'material-icons/iconfont/material-icons.css'
import '../styles/globals.scss'

import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
