
import { AuthModal } from '../components/AuthModal'
import { useFavorites } from '../context/FavoritesContext'
import { Link } from '@tanstack/react-router'
import { useCart } from '../context/CartContext'
import { useState } from 'react'
import { useNFTs } from '../api/nfts'

import {
  Search,
  ShoppingCart,
  UserRound,
  SlidersHorizontal,
  ArrowRight,
  Heart,
  Menu,
  X,
} from 'lucide-react'
// Imagens locais dos NFTs, seguindo a ordem dos cards atuais.
const nftImages: Record<number, string> = {
  1: '/images/hero-ape.png',
  2: '/images/ape-purple.png',
  3: '/images/ape-suit.png',
  4: '/images/ape-purple.png',
  5: '/images/ape-purple.png',
  6: '/images/ape-gold.png',
}

const categories = [
  'Arte digital',
  'Fotografia',
  'Música',
  'Avatares',
  'Colecionáveis',
]

export function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { favoriteCount } = useFavorites()
  const { itemCount } = useCart()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sort, setSort] = useState('')
  const [page, setPage] = useState(1)

  const filters = {
    search,
    category,
    maxPrice,
    sort,
    page,
  }

  const {
    data: nfts = [],
    isPending,
    isError,
    refetch,
  } = useNFTs(filters)

  function resetPage() {
    setPage(1)
  }

  function clearFilters() {
    setSearch('')
    setCategory('')
    setMaxPrice('')
    setSort('')
    setPage(1)
  }

  return (
    <div className="min-h-screen bg-[#17110e] text-[#f0e6d6]">
      <header className="border-b border-[#392b23]">
  <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-5 sm:px-6">
    <a href="/" className="text-xl font-bold tracking-widest">
  KURIO<span className="text-[#d9954e]">.</span>
  </a>

    <nav className="hidden gap-8 text-sm md:flex">
      <a href="/" className="text-[#d9954e]">Início</a>
      <a href="#catalogo">Mercado</a>
      <a href="#colecoes">Coleções</a>
      <a href="#sobre">Artistas</a>
    </nav>

    <div className="flex items-center gap-3 sm:gap-5">
      <Search size={19} className="hidden md:block" />

      <Link
        to="/favorites"
        className="relative transition hover:text-[#d9954e]"
        aria-label="Meus favoritos"
      >
        <Heart size={19} />
        {favoriteCount > 0 && (
          <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#d9954e] px-1 text-[10px] font-bold text-[#17110e]">
            {favoriteCount}
          </span>
        )}
      </Link>

      <Link
        to="/cart"
        className="relative inline-flex items-center text-[#f0e6d6] transition hover:text-[#d9954e]"
        aria-label={`Abrir carrinho com ${itemCount} itens`}
      >
        <ShoppingCart size={19} />
        {itemCount > 0 && (
          <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d9954e] px-1 text-xs font-bold text-[#17110e]">
            {itemCount}
          </span>
        )}
      </Link>

      <Link
        to="/profile"
        aria-label="Meu perfil"
        title="Meu perfil"
        className="hidden items-center transition hover:text-[#d9954e] sm:inline-flex"
      >
        <UserRound size={19} />
      </Link>

      <button
        type="button"
        onClick={() => setIsAuthOpen(true)}
        className="hidden rounded bg-[#d9954e] px-4 py-2 text-sm font-semibold text-[#17110e] sm:block"
      >
        Entrar
      </button>

      <button
        type="button"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={isMobileMenuOpen}
        className="rounded-lg border border-[#554032] bg-[#211813] p-2.5 text-[#d9954e] transition hover:border-[#d9954e] md:hidden"
      >
        {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </div>
  </div>

  {isMobileMenuOpen && (
    <nav className="border-t border-[#392b23] bg-[#211813] px-6 py-5 shadow-xl md:hidden">
      <div className="flex flex-col gap-5 text-base">
        <a href="/" onClick={() => setIsMobileMenuOpen(false)}>
          Início
        </a>
        <a href="/#catalogo" onClick={() => setIsMobileMenuOpen(false)}>
          Mercado
        </a>
        <a href="/#colecoes" onClick={() => setIsMobileMenuOpen(false)}>
          Coleções
        </a>
        <a href="/#sobre" onClick={() => setIsMobileMenuOpen(false)}>
          Artistas
        </a>

        <Link
          to="/profile"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Meu perfil
        </Link>

        <button
          type="button"
          onClick={() => {
            setIsMobileMenuOpen(false)
            setIsAuthOpen(true)
          }}
          className="w-fit rounded bg-[#d9954e] px-5 py-2 font-semibold text-[#17110e]"
        >
          Entrar
        </button>
      </div>
    </nav>
  )}
</header>

      <main className="mx-auto max-w-7xl px-6">
        <section className="grid items-center gap-6 py-8 sm:gap-10 md:grid-cols-2 md:py-16">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-[#d9954e]">
              Bem-vindo à nova era digital
            </p>

            <h1 className="max-w-xl text-3xl font-bold uppercase leading-tight sm:text-4xl md:text-6xl">
  Seja dono do futuro da arte digital
</h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-[#b7a99c]">
              Descubra NFTs exclusivos de artistas emergentes e consagrados.
              Explore nossa coleção e encontre sua próxima obra de arte.
            </p>

            <a
              href="#catalogo"
              className="mt-8 inline-flex items-center gap-2 rounded bg-[#d9954e] px-6 py-3 font-semibold text-[#17110e]"
            >
              Explorar mercado <ArrowRight size={18} />
            </a>
          </div>

          <div className="overflow-hidden rounded-2xl">
            <img
          src="/images/hero-ape.png"
          alt="Macaco NFT com óculos e jaqueta verde"
          className="mx-auto aspect-square w-full max-w-[320px] object-cover sm:max-w-none"
          />
          </div>
        </section>

        <section id="catalogo" className="py-6 sm:py-12">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 sm:mb-8 sm:gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#d9954e]">
                Descubra
              </p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
  Explore os NFTs
</h2>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="flex items-center justify-center gap-2 rounded-lg border border-[#554032] px-3 py-2 text-xs transition hover:border-[#d9954e] sm:px-4 sm:py-3 sm:text-sm"
            >
              <SlidersHorizontal size={17} />
              Limpar filtros
            </button>
          </div>

          <div className="mb-4 sm:mb-6">
            <label htmlFor="nft-search" className="mb-2 block text-sm">
              Buscar NFTs
            </label>

            <input
              id="nft-search"
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value)
                resetPage()
              }}
              placeholder="Digite o nome de um NFT..."
              className="w-full rounded-lg border border-[#554032] bg-[#211813] px-4 py-3 text-white outline-none focus:border-[#d9954e]"
            />
          </div>

          <div className="grid gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-[220px_1fr]">
            <aside className="h-fit rounded-xl border border-[#392b23] bg-[#211813] p-3 sm:p-5">
              <h3 className="mb-5 font-semibold">Coleções</h3>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setCategory('')
                    resetPage()
                  }}
                  className={`block text-sm ${
                    category === ''
                      ? 'text-[#d9954e]'
                      : 'text-[#b7a99c]'
                  }`}
                >
                  Todas
                </button>

                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setCategory(item)
                      resetPage()
                    }}
                    className={`block text-sm transition hover:text-[#d9954e] ${
                      category === item
                        ? 'font-semibold text-[#d9954e]'
                        : 'text-[#b7a99c]'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="my-6 border-t border-[#392b23]" />

              <label
                htmlFor="max-price"
                className="mb-3 block font-semibold"
              >
                Preço máximo (ETH)
              </label>

              <input
                id="max-price"
                type="number"
                min="0"
                step="0.01"
                value={maxPrice}
                onChange={(event) => {
                  setMaxPrice(event.target.value)
                  resetPage()
                }}
                placeholder="Ex: 1.50"
                className="w-full rounded border border-[#554032] bg-[#211813] p-2 text-sm text-white"
              />

              <div className="my-6 border-t border-[#392b23]" />

              <label
                htmlFor="sort"
                className="mb-3 block font-semibold"
              >
                Ordenar por
              </label>

              <select
                id="sort"
                value={sort}
                onChange={(event) => {
                  setSort(event.target.value)
                  resetPage()
                }}
                className="w-full rounded border border-[#554032] bg-[#211813] p-2 text-sm text-white"
              >
                <option value="">Padrão</option>
                <option value="price_asc">Menor preço</option>
                <option value="price_desc">Maior preço</option>
              </select>
            </aside>

            <div>
              {isPending ? (
                <p role="status">Carregando NFTs...</p>
              ) : isError ? (
                <div role="alert">
                  <p>Não foi possível carregar os NFTs.</p>
                  <button
                    type="button"
                    onClick={() => refetch()}
                    className="mt-3 rounded bg-[#d9954e] px-4 py-2 text-black"
                  >
                    Tentar novamente
                  </button>
                </div>
              ) : nfts.length === 0 ? (
                <div>
                  <p>Nenhum NFT encontrado.</p>
                  {page > 1 && (
                    <button
                      type="button"
                      onClick={() => setPage(1)}
                      className="mt-3 text-[#d9954e] underline"
                    >
                      Voltar à primeira página
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-2 sm:gap-5 xl:grid-cols-3">
                    {nfts.map((nft) => (
                      <article
                        key={nft.id}
                        className="overflow-hidden rounded-xl border border-[#392b23] bg-[#211813]"
                      >
                        <div className="aspect-square overflow-hidden bg-[#38281e]">
                          <img
                            src={nftImages[Number(nft.id)] ?? '/images/hero-ape.png'}
                            alt={nft.name}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>

                        <div className="p-2 sm:p-4">
  <h3 className="text-xs font-semibold sm:text-base">
    {nft.name}
  </h3>

                          <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                            <span className="text-sm text-[#b7a99c]">
                              Preço atual
                            </span>
                            <span className="whitespace-nowrap text-sm font-bold text-[#d9954e] sm:text-base">
                              {nft.price} ETH
                            </span>
                          </div>

                          
                            <Link
                              to="/nft/$nftId"
                              params={{ nftId: String(nft.id) }}
                              className="mt-4 block w-full rounded bg-[#d9954e] py-2 text-center font-semibold text-[#17110e] transition hover:bg-[#e8aa69]"
                            >
                              Ver NFT
                            </Link>

                        </div>
                      </article>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center justify-center gap-5">
                    <button
                      type="button"
                      disabled={page === 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className="rounded border border-[#554032] px-4 py-2 disabled:opacity-40"
                    >
                      Anterior
                    </button>

                    <span>Página {page}</span>

                    <button
                      type="button"
                      disabled={nfts.length < 6}
                      onClick={() => setPage((p) => p + 1)}
                      className="rounded border border-[#554032] px-4 py-2 disabled:opacity-40"
                    >
                      Próxima
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      {isAuthOpen && (
  <AuthModal onClose={() => setIsAuthOpen(false)} />
)}
    </div>
  )
}
