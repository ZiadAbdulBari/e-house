import { CartProvider } from '@/contaxt/CartContext'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
  <CartProvider>
    <Component {...pageProps} />
  </CartProvider>
  )
}
