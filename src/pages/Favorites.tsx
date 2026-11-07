
import { Link } from '@tanstack/react-router'
import { Heart, ArrowLeft, Trash2 } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'

export function Favorites() {
  const { favorites, removeFavorite, favoriteCount } = useFavorites()

  return (
    <div className="min-h-screen bg-[#17110e] text-[#f0e6d6]">
      <main className="mx-auto max-w-7xl px-6 py-12">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 text-[#d9954e]"
        >
          <ArrowLeft size={20} />
          Voltar ao marketplace
        </Link>

        <div className="mb-10 flex items-center gap-3">
          <Heart size={32} className="text-[#d9954e]" />
          <h1 className="text-4xl font-bold">
            Meus favoritos
          </h1>
        </div>

        <p className="mb-8 text-[#b7a99c]">
          {favoriteCount} {favoriteCount === 1 ? 'NFT favorito' : 'NFTs favoritos'}
        </p>

        {favorites.length === 0 ? (
          <div className="rounded-2xl border border-[#392b23] bg-[#211813] p-12 text-center">
            <Heart
              size={56}
              className="mx-auto mb-5 text-[#d9954e]"
            />

            <h2 className="text-2xl font-bold">
              Você ainda não tem favoritos
            </h2>

            <p className="mt-3 text-[#b7a99c]">
              Explore nossa coleção e salve os NFTs que mais gostar.
            </p>

            <Link
              to="/"
              className="mt-6 inline-block rounded-lg bg-[#d9954e] px-6 py-3 font-semibold text-[#17110e]"
            >
              Explorar NFTs
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((nft) => (
              <article
                key={nft.id}
                className="overflow-hidden rounded-xl border border-[#392b23] bg-[#211813]"
              >
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="aspect-square w-full object-cover"
                />

                <div className="p-5">
                  <h2 className="text-xl font-bold">
                    {nft.name}
                  </h2>

                  <p className="mt-3 text-[#b7a99c]">
                    Preço atual
                  </p>

                  <p className="mt-1 text-xl font-bold text-[#d9954e]">
                    {nft.price} ETH
                  </p>

                  <Link
                    to="/nft/$nftId"
                    params={{ nftId: String(nft.id) }}
                    className="mt-5 block rounded-lg bg-[#d9954e] px-5 py-3 text-center font-semibold text-[#17110e]"
                  >
                    Ver NFT
                  </Link>

                  <button
                    type="button"
                    onClick={() => removeFavorite(nft.id)}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-[#554032] px-5 py-3 transition hover:bg-[#392b23]"
                  >
                    <Trash2 size={18} />
                    Remover dos favoritos
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
