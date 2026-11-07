
import { Link } from '@tanstack/react-router'
import {
  ArrowLeft,
  ShoppingCart,
  Trash2,
  X,
} from 'lucide-react'
import { useCart } from '../context/CartContext'

export function Cart() {
  const {
    items,
    removeFromCart,
    clearCart,
    total,
    itemCount,
  } = useCart()

  return (
    <div className="min-h-screen bg-[#17110e] text-[#f0e6d6]">
      <main className="mx-auto max-w-6xl px-6 py-12">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 text-[#d9954e]"
        >
          <ArrowLeft size={20} />
          Continuar explorando
        </Link>

        <div className="mb-10 flex items-center gap-3">
          <ShoppingCart size={32} className="text-[#d9954e]" />
          <h1 className="text-4xl font-bold">
            Meu carrinho
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-[#392b23] bg-[#211813] p-12 text-center">
            <ShoppingCart
              size={56}
              className="mx-auto mb-5 text-[#d9954e]"
            />

            <h2 className="text-2xl font-bold">
              Seu carrinho está vazio
            </h2>

            <p className="mt-3 text-[#b7a99c]">
              Explore nossa coleção e adicione seus NFTs favoritos.
            </p>

            <Link
              to="/"
              className="mt-6 inline-block rounded-lg bg-[#d9954e] px-6 py-3 font-semibold text-[#17110e]"
            >
              Explorar NFTs
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <section>
              <div className="mb-5 flex items-center justify-between">
                <p className="text-[#b7a99c]">
                  {itemCount} {itemCount === 1 ? 'item' : 'itens'}
                </p>

                <button
                  type="button"
                  onClick={clearCart}
                  className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300"
                >
                  <Trash2 size={16} />
                  Esvaziar carrinho
                </button>
              </div>

              <div className="space-y-4">
                {items.map((nft) => (
                  <article
                    key={nft.id}
                    className="flex items-center gap-5 rounded-xl border border-[#392b23] bg-[#211813] p-4"
                  >
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="h-24 w-24 rounded-lg object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <Link
                        to="/nft/$nftId"
                        params={{ nftId: String(nft.id) }}
                        className="font-bold hover:text-[#d9954e]"
                      >
                        {nft.name}
                      </Link>

                      <p className="mt-2 font-semibold text-[#d9954e]">
                        {nft.price} ETH
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(nft.id)}
                      aria-label={`Remover ${nft.name}`}
                      className="rounded-lg border border-[#554032] p-2 hover:bg-[#392b23]"
                    >
                      <X size={20} />
                    </button>
                  </article>
                ))}
              </div>
            </section>

            <aside className="h-fit rounded-xl border border-[#392b23] bg-[#211813] p-6">
              <h2 className="text-xl font-bold">
                Resumo do pedido
              </h2>

              <div className="mt-6 flex justify-between text-[#b7a99c]">
                <span>Itens</span>
                <span>{itemCount}</span>
              </div>

              <div className="mt-4 flex justify-between text-[#b7a99c]">
                <span>Subtotal</span>
                <span>{total.toFixed(2)} ETH</span>
              </div>

              <div className="my-6 border-t border-[#392b23]" />

              <div className="flex items-center justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-bold text-[#d9954e]">
                  {total.toFixed(2)} ETH
                </span>
              </div>

              
<Link
  to="/checkout"
  className="mt-6 block w-full rounded-lg bg-[#d9954e] px-6 py-4 text-center font-bold text-[#17110e] transition hover:bg-[#e8aa69]"
>
  Finalizar compra
</Link>

<p className="mt-3 text-center text-xs text-[#b7a99c]">
  Você será direcionado para a página de pagamento.
</p>

            </aside>
          </div>
        )}
      </main>
    </div>
  )
}
