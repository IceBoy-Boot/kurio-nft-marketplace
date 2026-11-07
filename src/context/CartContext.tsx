
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export type CartNFT = {
  id: number
  name: string
  price: string
  image: string
}

type CartContextType = {
  items: CartNFT[]
  addToCart: (nft: CartNFT) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  total: number
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(
  undefined
)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartNFT[]>(() => {
    try {
      const saved = localStorage.getItem('nft-cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('nft-cart', JSON.stringify(items))
  }, [items])

  function addToCart(nft: CartNFT) {
    setItems((current) => {
      const exists = current.some((item) => item.id === nft.id)

      if (exists) {
        return current
      }

      return [...current, nft]
    })
  }

  function removeFromCart(id: number) {
    setItems((current) =>
      current.filter((item) => item.id !== id)
    )
  }

  function clearCart() {
    setItems([])
  }

  const total = items.reduce(
    (sum, item) => sum + Number(item.price),
    0
  )

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        total,
        itemCount: items.length,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart deve ser usado dentro de CartProvider')
  }

  return context
}
