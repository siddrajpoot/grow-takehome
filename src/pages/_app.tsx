import { type AppType } from 'next/dist/shared/lib/utils'
import '@/styles/globals.scss'

import { Lora } from 'next/font/google'

const lora = Lora({
  subsets: ['latin'],
})

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={lora.className}>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
