
import { useState } from 'react'
import {
  UserRound,
  Wallet,
  ShoppingCart,
  Heart,
  LogOut,
  Save,
  Eye,
  EyeOff,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'

export function Profile() {
  const [showPassword, setShowPassword] = useState(false)
  const [saved, setSaved] = useState(false)

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaved(true)
  }

  return (
    <div className="min-h-screen bg-[#17110e] text-[#f0e6d6]">
      <main className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-[220px_1fr]">
        <aside className="h-fit rounded-lg bg-[#211813] p-5">
          <h2 className="mb-6 text-lg font-bold">Meu perfil</h2>

          <nav className="flex flex-col gap-5 text-sm">
            <span className="flex items-center gap-3 text-[#d9954e]">
              <UserRound size={18} />
              Dados do perfil
            </span>

            <Link
  to="/wallets"
  className="flex items-center gap-3 text-[#b7a99c] hover:text-[#d9954e]"
>
  <Wallet size={18} />
  Carteiras
</Link>

            <Link to="/cart" className="flex items-center gap-3 hover:text-[#d9954e]">
              <ShoppingCart size={18} />
              Atividade / Carrinho
            </Link>

            <Link to="/favorites" className="flex items-center gap-3 hover:text-[#d9954e]">
              <Heart size={18} />
              Lista de interesse
            </Link>

            <button
              type="button"
              className="flex items-center gap-3 text-left text-[#b7a99c]"
              disabled
            >
              <LogOut size={18} />
              Sair (em breve)
            </button>
          </nav>
        </aside>

        <section>
          <h1 className="mb-8 text-2xl font-bold">
            Perfil do colecionador
          </h1>

          <form onSubmit={handleSave} className="max-w-3xl">
            <div className="grid gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm">
                Nome de exibição *
                <input
                  required
                  placeholder="Seu nome de exibição"
                  className="rounded border border-[#554032] bg-[#211813] p-3 outline-none focus:border-[#d9954e]"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm">
                Nome de usuário *
                <input
                  required
                  placeholder="Seu nome de usuário"
                  className="rounded border border-[#554032] bg-[#211813] p-3 outline-none focus:border-[#d9954e]"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm">
                E-mail *
                <input
                  type="email"
                  required
                  placeholder="seu@email.com"
                  className="rounded border border-[#554032] bg-[#211813] p-3 outline-none focus:border-[#d9954e]"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm">
                Nome ENS
                <input
                  placeholder="seunome.eth"
                  className="rounded border border-[#554032] bg-[#211813] p-3 outline-none focus:border-[#d9954e]"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm">
                Apelido da carteira *
                <input
                  required
                  placeholder="Minha carteira"
                  className="rounded border border-[#554032] bg-[#211813] p-3 outline-none focus:border-[#d9954e]"
                />
              </label>
            </div>

            <h2 className="mb-5 mt-10 text-lg font-bold">
              Alterar senha
            </h2>

            <div className="grid max-w-sm gap-4">
              {['Senha atual', 'Nova senha', 'Confirmar nova senha'].map((label) => (
                <label key={label} className="flex flex-col gap-2 text-sm">
                  {label}

                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder={label}
                      className="w-full rounded border border-[#554032] bg-[#211813] p-3 pr-12 outline-none focus:border-[#d9954e]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Ocultar senhas' : 'Mostrar senhas'}
                      className="absolute right-3 top-3 text-[#d9954e]"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </label>
              ))}
            </div>

            <button
              type="submit"
              className="mt-8 flex items-center gap-2 rounded bg-[#d9954e] px-8 py-3 font-bold text-[#17110e]"
            >
              <Save size={18} />
              Salvar
            </button>

            {saved && (
              <p role="status" className="mt-4 text-sm text-[#d9954e]">
                Formulário validado! O salvamento dos dados será implementado depois.
              </p>
            )}
          </form>
        </section>
      </main>
    </div>
  )
}
