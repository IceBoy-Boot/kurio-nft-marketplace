
import { Link } from '@tanstack/react-router'
import {
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  ArrowLeft,
} from 'lucide-react'
import { useOrder } from '../context/OrderContext'

export function OrderConfirmation() {
  const { order } = useOrder()

  // Impede a exibição de uma confirmação sem pedido registrado.
  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#17110e] px-6 text-[#f0e6d6]">
        <div className="w-full max-w-md rounded-xl border border-[#392b23] bg-[#211813] p-8 text-center">
          <ShoppingBag
            size={56}
            className="mx-auto mb-5 text-[#d9954e]"
          />

          <h1 className="text-2xl font-bold">
            Nenhum pedido encontrado
          </h1>

          <p className="mt-4 text-sm leading-6 text-[#b7a99c]">
            Para visualizar uma confirmação, primeiro conclua
            um pedido demonstrativo pelo checkout.
          </p>

          <Link
            to="/"
            className="mt-7 inline-flex items-center gap-2 rounded bg-[#d9954e] px-6 py-3 font-bold text-[#17110e] hover:bg-[#e8aa69]"
          >
            <ArrowLeft size={18} />
            Explorar NFTs
          </Link>
        </div>
      </div>
    )
  }

  const formattedDate = new Date(order.createdAt).toLocaleString('pt-BR', {
    dateStyle: 'long',
    timeStyle: 'short',
  })

  return (
    <div className="min-h-screen bg-[#17110e] text-[#f0e6d6]">
      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-10 text-center">
          <CheckCircle2
            size={72}
            className="mx-auto mb-6 text-[#d9954e]"
          />

          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#d9954e]">
            Pedido demonstrativo
          </p>

          <h1 className="text-3xl font-bold md:text-4xl">
            Pedido simulado com sucesso!
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#b7a99c]">
            Você concluiu a demonstração do processo de compra.
            Nenhum pagamento foi realizado e nenhum NFT foi transferido.
          </p>
        </div>

        <section className="rounded-xl border border-[#392b23] bg-[#211813] p-6 md:p-8">
          <div className="mb-7 flex items-center gap-3 border-b border-[#392b23] pb-6">
            <ShoppingBag size={24} className="text-[#d9954e]" />

            <div>
              <h2 className="text-xl font-bold">
                Resumo do pedido
              </h2>

              <p className="mt-1 text-xs text-[#b7a99c]">
                Visualização demonstrativa
              </p>
            </div>
          </div>

          <div className="mb-7 grid gap-4 rounded-lg border border-[#392b23] bg-[#17110e] p-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs text-[#b7a99c]">
                Número do pedido
              </p>

              <p className="break-all text-sm font-semibold text-[#d9954e]">
                {order.id}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs text-[#b7a99c]">
                Data do pedido
              </p>

              <p className="text-sm font-semibold">
                {formattedDate}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 border-b border-[#392b23] pb-4"
              >
                <div>
                  <p className="font-semibold">
                    {item.name}
                  </p>

                  <p className="mt-1 text-xs text-[#b7a99c]">
                    NFT digital
                  </p>
                </div>

                <span className="shrink-0 font-semibold text-[#d9954e]">
                  {Number(item.price).toFixed(2)} ETH
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <span className="text-lg font-bold">
              Total demonstrativo
            </span>

            <span className="text-xl font-bold text-[#d9954e]">
              {order.total.toFixed(2)} ETH
            </span>
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-lg border border-[#554032] p-4">
            <ShieldCheck
              size={20}
              className="shrink-0 text-[#d9954e]"
            />

            <p className="text-xs leading-6 text-[#b7a99c]">
              Este comprovante é apenas uma simulação para fins
              de demonstração. Ele não representa uma compra real,
              uma transação blockchain ou uma confirmação financeira.
            </p>
          </div>
        </section>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded bg-[#d9954e] px-6 py-3 font-bold text-[#17110e] hover:bg-[#e8aa69]"
          >
            Continuar explorando
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/profile"
            className="inline-flex items-center gap-2 rounded border border-[#554032] px-6 py-3 text-sm hover:border-[#d9954e]"
          >
            Meu perfil
          </Link>
        </div>
      </main>
    </div>
  )
}
