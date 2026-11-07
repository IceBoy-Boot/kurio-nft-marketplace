
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export type FavoriteNFT = {
  id: number
  name: string
  price: string
  image: string
}

type FavoritesContextType = {
  favorites: FavoriteNFT[]
  addFavorite: (nft: FavoriteNFT) => void
  removeFavorite: (id: number) => void
  toggleFavorite: (nft: FavoriteNFT) => void
  isFavorite: (id: number) => boolean
  favoriteCount: number
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
)

export function FavoritesProvider({
  children,
}: {
  children: ReactNode
}) {
  const [favorites, setFavorites] = useState<FavoriteNFT[]>(() => {
    try {
      const saved = localStorage.getItem('nft-favorites')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('nft-favorites', JSON.stringify(favorites))
  }, [favorites])

  function addFavorite(nft: FavoriteNFT) {
    setFavorites((current) => {
      if (current.some((item) => item.id === nft.id)) {
        return current
      }

      return [...current, nft]
    })
  }

  function removeFavorite(id: number) {
    setFavorites((current) =>
      current.filter((item) => item.id !== id)
    )
  }

  function toggleFavorite(nft: FavoriteNFT) {
    setFavorites((current) => {
      const exists = current.some((item) => item.id === nft.id)

      if (exists) {
        return current.filter((item) => item.id !== nft.id)
      }

      return [...current, nft]
    })
  }

  function isFavorite(id: number) {
    return favorites.some((item) => item.id === id)
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
        favoriteCount: favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)

  if (!context) {
    throw new Error(
      'useFavorites deve ser usado dentro de FavoritesProvider'
    )
  }

  return context
}
