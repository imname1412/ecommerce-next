import React, { Children } from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

//* Ctrl + Space : Auto import

const Layout = ({children}) => {
  return (
    <div className='layout'>
      <Head>
        <title>SHOPT256 Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className='main-container'>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout