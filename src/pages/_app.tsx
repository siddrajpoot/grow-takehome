import { type AppType } from 'next/dist/shared/lib/utils'
import '@/styles/globals.scss'

import { Lora, Poppins } from 'next/font/google'
import { MantineProvider } from '@mantine/core'

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
})

export const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal'],
})

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <div className={`${lora.variable} ${poppins.variable}`}>
        <Component {...pageProps} />
      </div>
    </MantineProvider>
  )
}

export default MyApp
