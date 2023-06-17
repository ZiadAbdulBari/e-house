import { CartProvider } from '@/contaxt/CartContext'
import { AuthProvider } from '@/contaxt/AuthContext'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
    </AuthProvider>
  )
}
