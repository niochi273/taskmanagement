import {
  Inter,
  Montserrat,
  Reddit_Mono,
  Open_Sans,
  Roboto
} from 'next/font/google'

export const inter = Inter({ subsets: ['latin'] })
export const reddit_mono = Reddit_Mono({
  subsets: ['latin'],
  variable: '--font-redditMono'
})
export const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['300', '400', '500', '700']
})
export const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat'
})
export const open_sans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-openSans'
})
