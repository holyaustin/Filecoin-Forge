import '../styles/globals.css'
import { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'



function MyApp({ Component, pageProps }) {

  const [theme, setTheme] = useState(null)

  useEffect(() => {
    async function get() {
      await import('@gnosis.pm/safe-react-components').then(val => {
        console.log(val.theme)
        setTheme(val.theme)
      })
    }
    get()
  }, [])
  if (theme === null) return (<div>Loading...</div>)
  const getLayout = Component.getLayout ?? ((page) => page)


  return (
    <ThemeProvider theme={theme}>
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  )
}

export default MyApp
