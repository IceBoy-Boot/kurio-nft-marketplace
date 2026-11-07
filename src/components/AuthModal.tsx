
import { useState } from 'react'
import { Eye, EyeOff, X } from 'lucide-react'

type AuthModalProps = {
  onClose: () => void
}

export function AuthModal({ onClose }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const isRegister = mode === 'register'

  function changeMode(nextMode: 'login' | 'register') {
    setMode(nextMode)
    setError('')
    setMessage('')
    setPassword('')
    setConfirmPassword('')
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setMessage('')

    if (isRegister) {
      if (password !== confirmPassword) {
        setError('As senhas não coincidem.')
        return
      }

      if (password.length < 6) {
        setError('A senha deve ter pelo menos 6 caracteres.')
        return
      }

      setMessage('Cadastro validado! A criação da conta será conectada depois.')
      return
    }

    setMessage('Login de demonstração. A autenticação será conectada depois.')
  }

  const inputClass =
    'w-full rounded border border-[#554032] bg-[#17110e] p-3 text-sm text-[#f0e6d6] outline-none placeholder:text-[#8f7b6a] focus:border-[#d9954e]'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        className="relative my-auto w-full max-w-md rounded-lg border border-[#392b23] bg-[#211813] p-8 text-[#f0e6d6] shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar janela"
          className="absolute right-4 top-4 text-[#d9954e] transition hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="mb-6 flex items-center justify-center gap-2 text-xl">
          <button
            type="button"
            onClick={() => changeMode('login')}
            className={mode === 'login' ? 'font-bold text-[#d9954e]' : 'text-[#b7a99c]'}
          >
            Entrar
          </button>

          <span className="text-[#554032]">|</span>

          <button
            type="button"
            onClick={() => changeMode('register')}
            className={isRegister ? 'font-bold text-[#d9954e]' : 'text-[#b7a99c]'}
          >
            Criar conta
          </button>
        </div>

        <h2 id="auth-title" className="sr-only">
          {isRegister ? 'Criar conta' : 'Entrar'}
        </h2>

        <p className="mb-6 text-center text-sm text-[#b7a99c]">
          {isRegister
            ? 'Crie seu perfil para explorar NFTs e conectar uma carteira.'
            : 'Entre para gerenciar sua carteira, coleção e perfil.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          {isRegister && (
            <input
              key="username"
              type="text"
              placeholder="Nome de usuário"
              aria-label="Nome de usuário"
              autoComplete="username"
              required
              className={inputClass}
            />
          )}

          <input
            type="email"
            placeholder="Seu e-mail"
            aria-label="Seu e-mail"
            autoComplete="email"
            required
            className={inputClass}
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Sua senha"
              aria-label="Sua senha"
              autoComplete={isRegister ? 'new-password' : 'current-password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className={`${inputClass} pr-12`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              className="absolute right-3 top-3 text-[#d9954e]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {isRegister && (
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirmar senha"
                aria-label="Confirmar senha"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
                className={`${inputClass} pr-12`}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Ocultar confirmação' : 'Mostrar confirmação'}
                className="absolute right-3 top-3 text-[#d9954e]"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          )}

          {!isRegister && (
            <p className="text-right text-xs text-[#d9954e]">
              Esqueceu a senha?
            </p>
          )}

          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}

          {message && (
            <p role="status" className="text-sm text-[#d9954e]">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="mt-3 w-full rounded bg-[#d9954e] py-3 font-bold text-[#17110e] transition hover:bg-[#e8aa69]"
          >
            {isRegister ? 'Criar conta' : 'Entrar'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="mb-3 text-xs text-[#b7a99c]">Ou continue com</p>

          <div className="space-y-2">
            <button
              type="button"
              disabled
              className="w-full rounded border border-[#554032] px-4 py-2 text-sm opacity-60"
            >
              Continuar com Google (em breve)
            </button>

            <button
              type="button"
              disabled
              className="w-full rounded border border-[#554032] px-4 py-2 text-sm opacity-60"
            >
              Continuar com Facebook (em breve)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
