
import { OrderProvider } from './context/OrderContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { CartProvider } from './context/CartContext'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
    },
  },
})

async function startApp() {
  if (import.meta.env.VITE_ENABLE_MOCKS !== 'false') {
    const { worker } = await import('./mocks/browser')

await worker.start()
  }

 ReactDOM.createRoot(
  document.getElementById('root')!
).render(
  <QueryClientProvider client={queryClient}>
    <OrderProvider>
      <CartProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </CartProvider>
    </OrderProvider>
  </QueryClientProvider>
)
}

startApp().catch(console.error)
