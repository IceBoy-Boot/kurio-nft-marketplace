
import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import {
  ArrowLeft,
  CreditCard,
  Wallet,
  ShieldCheck,
  LockKeyhole,
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useOrder } from '../context/OrderContext'

export function Checkout() {
  const { items, clearCart } = useCart()
  const { createOrder } = useOrder()
  const navigate = useNavigate()

  function handleCompleteOrder() {
    if (items.length === 0) return

    createOrder(items)
    clearCart()

    navigate({ to: '/order-confirmation' })
  }
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'card'>('wallet')

  const total = items.reduce(
    (sum, item) => sum + Number(item.price),
    0
  )

  return (
    <div className="min-h-screen bg-[#17110e] text-[#f0e6d6]">
      <main className="mx-auto max-w-6xl px-6 py-12">
        <Link
          to="/cart"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#d9954e] hover:underline"
        >
          <ArrowLeft size={18} />
          Voltar ao carrinho
        </Link>

        <div className="mb-10">
          <p className="mb-2 text-xs uppercase tracking-widest text-[#d9954e]">
            Finalização da compra
          </p>

          <h1 className="text-3xl font-bold">Pagamento</h1>

          <p className="mt-3 text-sm text-[#b7a99c]">
            Revise seu pedido e escolha a forma de pagamento.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <section className="space-y-6">
            <div className="rounded-xl border border-[#392b23] bg-[#211813] p-6">
              <h2 className="mb-6 text-xl font-semibold">
                Forma de pagamento
              </h2>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('wallet')}
                  aria-pressed={paymentMethod === 'wallet'}
                  className={`flex w-full items-center gap-4 rounded-lg border p-4 text-left transition ${
                    paymentMethod === 'wallet'
                      ? 'border-[#d9954e] bg-[#392b23]'
                      : 'border-[#554032] hover:border-[#d9954e]'
                  }`}
                >
                  <Wallet size={24} className="text-[#d9954e]" />

                  <div className="flex-1">
                    <p className="font-semibold">Carteira digital</p>
                    <p className="mt-1 text-xs text-[#b7a99c]">
                      Pagamento com Ethereum (ETH)
                    </p>
                  </div>

                  <span
                    className={`h-4 w-4 rounded-full border-2 ${
                      paymentMethod === 'wallet'
                        ? 'border-[#d9954e] bg-[#d9954e]'
                        : 'border-[#756052]'
                    }`}
                  />
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  aria-pressed={paymentMethod === 'card'}
                  className={`flex w-full items-center gap-4 rounded-lg border p-4 text-left transition ${
                    paymentMethod === 'card'
                      ? 'border-[#d9954e] bg-[#392b23]'
                      : 'border-[#554032] hover:border-[#d9954e]'
                  }`}
                >
                  <CreditCard size={24} className="text-[#d9954e]" />

                  <div className="flex-1">
                    <p className="font-semibold">Cartão de crédito</p>
                    <p className="mt-1 text-xs text-[#b7a99c]">
                      Opção demonstrativa
                    </p>
                  </div>

                  <span
                    className={`h-4 w-4 rounded-full border-2 ${
                      paymentMethod === 'card'
                        ? 'border-[#d9954e] bg-[#d9954e]'
                        : 'border-[#756052]'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-[#392b23] bg-[#211813] p-6">
              <h2 className="mb-4 text-lg font-semibold">
                {paymentMethod === 'wallet'
                  ? 'Pagamento com carteira'
                  : 'Pagamento com cartão'}
              </h2>

              {paymentMethod === 'wallet' ? (
                <div>
                  <p className="mb-5 text-sm leading-6 text-[#b7a99c]">
                    Para realizar pagamentos com Ethereum, será necessário
                    conectar uma carteira compatível.
                  </p>

                  <Link
                    to="/wallets"
                    className="inline-flex items-center gap-2 rounded border border-[#d9954e] px-5 py-3 text-sm font-semibold text-[#d9954e] hover:bg-[#392b23]"
                  >
                    <Wallet size={18} />
                    Gerenciar carteiras
                  </Link>
                </div>
              ) : (
                <p className="text-sm leading-6 text-[#b7a99c]">
                  O pagamento por cartão será integrado futuramente
                  a um provedor de pagamentos. Não solicitamos dados
                  bancários nesta demonstração.
                </p>
              )}
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-[#392b23] p-5">
              <ShieldCheck
                size={22}
                className="shrink-0 text-[#d9954e]"
              />

              <p className="text-sm leading-6 text-[#b7a99c]">
                Esta é uma demonstração do checkout. Nenhuma transação
                financeira ou transferência de NFT será realizada.
              </p>
            </div>
          </section>

          <aside className="h-fit rounded-xl border border-[#392b23] bg-[#211813] p-6">
            <h2 className="mb-6 text-xl font-semibold">
              Resumo do pedido
            </h2>

            {items.length === 0 ? (
              <p className="mb-6 text-sm text-[#b7a99c]">
                Seu carrinho está vazio.
              </p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 border-b border-[#392b23] pb-4"
                  >
                    <div>
                      <p className="text-sm font-semibold">
                        {item.name}
                      </p>
                      <p className="mt-1 text-xs text-[#b7a99c]">
                        NFT digital
                      </p>
                    </div>

                    <span className="shrink-0 text-sm text-[#d9954e]">
                      {item.price} ETH
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex items-center justify-between">
              <span className="text-[#b7a99c]">Subtotal</span>
              <span>{total.toFixed(2)} ETH</span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-[#b7a99c]">Taxas</span>
              <span className="text-sm">Não calculadas</span>
            </div>

            <div className="my-6 border-t border-[#554032]" />

            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total dos NFTs</span>
              <span className="text-[#d9954e]">
                {total.toFixed(2)} ETH
              </span>
            </div>

            

<button
  type="button"
  onClick={handleCompleteOrder}
  disabled={items.length === 0}
  className="mt-7 flex w-full items-center justify-center gap-2 rounded bg-[#d9954e] py-3 font-bold text-[#17110e] transition hover:bg-[#e8aa69] disabled:cursor-not-allowed disabled:opacity-50"
>
  <LockKeyhole size={18} />
  Concluir pedido demonstrativo
</button>



            <p className="mt-4 text-center text-xs text-[#b7a99c]">
              Nenhuma cobrança será realizada.
            </p>
          </aside>
        </div>
      </main>
    </div>
  )
}
