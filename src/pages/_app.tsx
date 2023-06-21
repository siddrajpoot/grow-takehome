import { type AppType } from 'next/dist/shared/lib/utils'
import '@/styles/globals.scss'

import { Lora, Poppins } from 'next/font/google'

const lora = Lora({
  subsets: ['latin'],
})

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
})

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={lora.className}>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
