
import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'

import { OrderConfirmation } from './pages/OrderConfirmation'
import { Checkout } from './pages/Checkout'
import { Wallets } from './pages/Wallets'
import { Profile } from './pages/Profile'
import { Home } from './pages/Home'
import { NFTDetails } from './pages/NFTDetails'
import { Cart } from './pages/Cart'
import { Favorites } from './pages/Favorites'


const rootRoute = createRootRoute()

// Página inicial
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

// Página de detalhes dos NFTs
const nftDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/nft/$nftId',
  component: NFTDetails,
})

// Página do carrinho
const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: Cart,
})

// Página de favoritos
const favoritesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/favorites',
  component: Favorites,
})
// Página de perfil do colecionador
const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: Profile,
})

const walletsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/wallets',
  component: Wallets,
})

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/checkout',
  component: Checkout,
})

const orderConfirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/order-confirmation',
  component: OrderConfirmation,
})

// Registrar todas as rotas************************************************************************************************************
const routeTree = rootRoute.addChildren([
  homeRoute,
  nftDetailsRoute,
  cartRoute,
  favoritesRoute,
  profileRoute,
  walletsRoute,
  checkoutRoute,
  orderConfirmationRoute,
])

const router = createRouter({
  routeTree,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  return <RouterProvider router={router} />
}

export default App
