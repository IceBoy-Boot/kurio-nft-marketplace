
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'

type OrderItem = {
  id: string | number
  name: string
  price: string | number
}

type Order = {
  id: string
  items: OrderItem[]
  total: number
  createdAt: string
}

type OrderContextType = {
  order: Order | null
  createOrder: (items: OrderItem[]) => void
  clearOrder: () => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useState<Order | null>(null)

  function createOrder(items: OrderItem[]) {
    if (items.length === 0) return

    const newOrder: Order = {
      id: `KURIO-${Date.now()}`,
      items: items.map((item) => ({ ...item })),
      total: items.reduce((sum, item) => sum + Number(item.price), 0),
      createdAt: new Date().toISOString(),
    }

    setOrder(newOrder)
  }

  function clearOrder() {
    setOrder(null)
  }

  return (
    <OrderContext.Provider value={{ order, createOrder, clearOrder }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrder() {
  const context = useContext(OrderContext)

  if (!context) {
    throw new Error('useOrder deve ser usado dentro de OrderProvider')
  }

  return context
}
