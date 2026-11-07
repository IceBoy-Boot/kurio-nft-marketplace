
import { useState } from 'react'
import {
  Wallet,
  Plus,
  Copy,
  Check,
  ShieldCheck,
  Trash2,
  ArrowLeft,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'

export function Wallets() {
  const [walletAddress, setWalletAddress] = useState('')
  const [walletName, setWalletName] = useState('')
  const [wallets, setWallets] = useState<
    { id: number; name: string; address: string }[]
  >([])
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [error, setError] = useState('')

  function addWallet(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    const address = walletAddress.trim()

    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      setError('Digite um endereço Ethereum válido (0x + 40 caracteres hexadecimais).')
      return
    }

    if (wallets.some((wallet) => wallet.address.toLowerCase() === address.toLowerCase())) {
      setError('Essa carteira já foi adicionada.')
      return
    }

    setWallets((current) => [
      ...current,
      {
        id: Date.now(),
        name: walletName.trim() || 'Minha carteira',
        address,
      },
    ])

    setWalletName('')
    setWalletAddress('')
  }

  async function copyAddress(id: number, address: string) {
    try {
      await navigator.clipboard.writeText(address)
      setCopiedId(id)
    } catch {
      setError('Não foi possível copiar o endereço.')
    }
  }

  function removeWallet(id: number) {
    setWallets((current) => current.filter((wallet) => wallet.id !== id))
    setCopiedId(null)
  }

  function shortenAddress(address: string) {
    return `${address.slice(0, 8)}...${address.slice(-6)}`
  }

  return (
    <div className="min-h-screen bg-[#17110e] text-[#f0e6d6]">
      <main className="mx-auto max-w-5xl px-6 py-12">
        <Link
          to="/profile"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#d9954e] hover:underline"
        >
          <ArrowLeft size={18} />
          Voltar ao perfil
        </Link>

        <div className="mb-10 flex items-center gap-4">
          <div className="rounded-lg bg-[#392b23] p-4 text-[#d9954e]">
            <Wallet size={28} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">Minhas carteiras</h1>
            <p className="mt-2 text-sm text-[#b7a99c]">
              Gerencie os endereços das suas carteiras digitais.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <section>
            <h2 className="mb-5 text-xl font-semibold">
              Carteiras adicionadas ({wallets.length})
            </h2>

            {wallets.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#554032] bg-[#211813] p-10 text-center">
                <Wallet
                  size={42}
                  className="mx-auto mb-4 text-[#d9954e]"
                />

                <h3 className="mb-2 font-semibold">
                  Nenhuma carteira adicionada
                </h3>

                <p className="text-sm text-[#b7a99c]">
                  Adicione um endereço Ethereum para começar.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {wallets.map((wallet) => (
                  <article
                    key={wallet.id}
                    className="rounded-xl border border-[#392b23] bg-[#211813] p-5"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <Wallet size={22} className="text-[#d9954e]" />

                      <div>
                        <h3 className="font-semibold">{wallet.name}</h3>
                        <p className="text-xs text-[#b7a99c]">
                          Rede Ethereum
                        </p>
                      </div>
                    </div>

                    <p className="break-all font-mono text-sm text-[#b7a99c]">
                      {shortenAddress(wallet.address)}
                    </p>

                    <div className="mt-5 flex gap-3">
                      <button
                        type="button"
                        onClick={() => copyAddress(wallet.id, wallet.address)}
                        className="inline-flex items-center gap-2 rounded border border-[#554032] px-3 py-2 text-sm hover:border-[#d9954e]"
                      >
                        {copiedId === wallet.id ? (
                          <Check size={16} />
                        ) : (
                          <Copy size={16} />
                        )}
                        {copiedId === wallet.id ? 'Copiado' : 'Copiar'}
                      </button>

                      <button
                        type="button"
                        onClick={() => removeWallet(wallet.id)}
                        className="inline-flex items-center gap-2 rounded border border-[#554032] px-3 py-2 text-sm text-red-400 hover:border-red-400"
                      >
                        <Trash2 size={16} />
                        Remover
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <aside className="h-fit rounded-xl border border-[#392b23] bg-[#211813] p-6">
            <div className="mb-5 flex items-center gap-2">
              <Plus size={20} className="text-[#d9954e]" />
              <h2 className="text-lg font-semibold">Adicionar carteira</h2>
            </div>

            <form onSubmit={addWallet} className="space-y-4">
              <label className="block text-sm">
                Apelido da carteira
                <input
                  type="text"
                  value={walletName}
                  onChange={(event) => setWalletName(event.target.value)}
                  placeholder="Ex: Carteira principal"
                  className="mt-2 w-full rounded border border-[#554032] bg-[#17110e] p-3 outline-none focus:border-[#d9954e]"
                />
              </label>

              <label className="block text-sm">
                Endereço Ethereum
                <input
                  type="text"
                  value={walletAddress}
                  onChange={(event) => setWalletAddress(event.target.value)}
                  placeholder="0x..."
                  required
                  className="mt-2 w-full rounded border border-[#554032] bg-[#17110e] p-3 outline-none focus:border-[#d9954e]"
                />
              </label>

              {error && (
                <p role="alert" className="text-sm text-red-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded bg-[#d9954e] py-3 font-bold text-[#17110e] hover:bg-[#e8aa69]"
              >
                <Plus size={18} />
                Adicionar carteira
              </button>
            </form>

            <div className="mt-6 flex items-start gap-3 border-t border-[#392b23] pt-5">
              <ShieldCheck
                size={20}
                className="shrink-0 text-[#d9954e]"
              />
              <p className="text-xs leading-5 text-[#b7a99c]">
                Nunca compartilhe sua chave privada ou frase de recuperação.
                Cadastre apenas endereços públicos.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
