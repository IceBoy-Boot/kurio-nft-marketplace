
import { useFavorites } from '../context/FavoritesContext'
import { Link, useParams } from '@tanstack/react-router'
import { ArrowLeft, ShoppingCart, Heart, ShieldCheck } from 'lucide-react'
import { useCart } from '../context/CartContext'

const nftImages: Record<number, string> = {
  1: '/images/hero-ape.png',
  2: '/images/ape-purple.png',
  3: '/images/ape-suit.png',
  4: '/images/ape-purple.png',
  5: '/images/ape-purple.png',
  6: '/images/ape-gold.png',
}

const nftDetails = [
  { id: 1, name: 'Original Ape #001', price: '1.18', category: 'Arte digital' },
  { id: 2, name: 'Royal Ape #002', price: '1.45', category: 'Avatares' },
  { id: 3, name: 'Rare Vision #003', price: '1.30', category: 'Colecionáveis' },
  { id: 4, name: 'Classic Ape #004', price: '1.25', category: 'Arte digital' },
  { id: 5, name: 'Urban Ape #005', price: '1.32', category: 'Avatares' },
  { id: 6, name: 'Golden Ape #006', price: '2.10', category: 'Colecionáveis' },
]


export function NFTDetails() {
  const { nftId } = useParams({ strict: false })
  const { addToCart, items } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()

  const nft = nftDetails.find((item) => item.id === Number(nftId))

  const isInCart = nft
    ? items.some((item) => item.id === nft.id)
    : false
    const favorited = nft ? isFavorite(nft.id) : false


  if (!nft) {
    return (
      <main className="min-h-screen bg-[#17110e] p-10 text-white">
        <h1 className="text-3xl font-bold">NFT não encontrado</h1>
        <Link to="/" className="mt-6 inline-block text-[#d9954e]">
          Voltar ao marketplace
        </Link>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-[#17110e] text-[#f0e6d6]">
      <main className="mx-auto max-w-7xl px-6 py-12">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 text-[#d9954e]"
        >
          <ArrowLeft size={20} />
          Voltar ao mercado
        </Link>

        <div className="grid items-center gap-12 md:grid-cols-2">
          <img
            src={nftImages[nft.id]}
            alt={nft.name}
            className="w-full rounded-2xl object-cover"
          />

          <div>
            <p className="mb-3 text-sm uppercase tracking-widest text-[#d9954e]">
              {nft.category}
            </p>

            <h1 className="text-4xl font-bold md:text-5xl">
              {nft.name}
            </h1>

            <p className="mt-6 leading-7 text-[#b7a99c]">
              Uma peça exclusiva da nossa coleção de arte digital.
              Explore a criatividade e a identidade deste NFT.
            </p>

            <div className="mt-8 rounded-xl border border-[#392b23] bg-[#211813] p-6">
              <p className="text-sm text-[#b7a99c]">Preço atual</p>
              <h2 className="mt-2 text-4xl font-bold text-[#d9954e]">
                {nft.price} ETH
              </h2>

              
                <button
                type="button"
                disabled={isInCart}
                onClick={() => {
                    if (!nft) return

                    addToCart({
                    id: nft.id,
                    name: nft.name,
                    price: nft.price,
                    image: nftImages[nft.id],
                    })
                }}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#d9954e] px-6 py-4 font-bold text-[#17110e] transition hover:bg-[#e8aa69] disabled:cursor-not-allowed disabled:opacity-60"
                >
                <ShoppingCart size={20} />
                {isInCart ? 'Adicionado ao carrinho ✓' : 'Adicionar ao carrinho'}
           </button>     
<button
  type="button"
  onClick={() => {
    toggleFavorite({
      id: nft.id,
      name: nft.name,
      price: nft.price,
      image: nftImages[nft.id],
    })
  }}
  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-[#554032] px-6 py-4 transition hover:bg-[#392b23]"
>
  <Heart
    size={20}
    fill={favorited ? '#d9954e' : 'none'}
    className={favorited ? 'text-[#d9954e]' : ''}
  />
  {favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
</button>

            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-[#b7a99c]">
              <ShieldCheck size={20} className="text-[#d9954e]" />
              Item digital de demonstração
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
