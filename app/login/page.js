'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function LoginPage() {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [role, setRole] = useState('owner'); // 'owner' | 'caregiver'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;

        const userId = data.user?.id;
        if (userId) {
          const { error: insertError } = await supabase.from('users').insert({
            id: userId,
            email,
            full_name: fullName,
            role,
          });
          if (insertError) throw insertError;
        }

        setMessage({
          type: 'success',
          text: 'Cuenta creada. Revisa tu correo para confirmar tu cuenta antes de iniciar sesión.',
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.href = '/';
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Algo salió mal. Intenta de nuevo.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-6 py-12">
      <div className="w-full max-w-sm">
        <a href="/" className="font-display text-2xl font-semibold text-pine-dark">
          pawbnb
        </a>

        <div className="mt-8 flex rounded-full bg-putty p-1 text-sm font-semibold">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 rounded-full py-2 transition ${
              mode === 'login' ? 'bg-white text-ink shadow-sm' : 'text-ink/50'
            }`}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 rounded-full py-2 transition ${
              mode === 'signup' ? 'bg-white text-ink shadow-sm' : 'text-ink/50'
            }`}
          >
            Crear cuenta
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === 'signup' && (
            <>
              <TextField label="Nombre completo" value={fullName} onChange={setFullName} required />

              <div>
                <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-ink/50">
                  Voy a usar Pawbnb para...
                </span>
                <div className="flex gap-2">
                  <RoleButton
                    label="Buscar cuidador"
                    active={role === 'owner'}
                    onClick={() => setRole('owner')}
                  />
                  <RoleButton
                    label="Ser cuidador"
                    active={role === 'caregiver'}
                    onClick={() => setRole('caregiver')}
                  />
                </div>
              </div>
            </>
          )}

          <TextField label="Correo electrónico" type="email" value={email} onChange={setEmail} required />
          <TextField label="Contraseña" type="password" value={password} onChange={setPassword} required />

          {message && (
            <p
              className={`rounded-xl px-4 py-2.5 text-sm ${
                message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-pine/10 text-pine-dark'
              }`}
            >
              {message.text}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-pine py-3 text-sm font-semibold text-cream transition hover:bg-pine-dark disabled:opacity-60"
          >
            {loading ? 'Un momento...' : mode === 'login' ? 'Iniciar sesión' : 'Crear mi cuenta'}
          </button>
        </form>
      </div>
    </main>
  );
}

function TextField({ label, value, onChange, type = 'text', required = false }) {
  return (
    <label className="block rounded-xl border border-ink/10 bg-white px-4 py-2.5">
      <span className="block text-[11px] font-semibold uppercase tracking-wide text-ink/50">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full bg-transparent text-sm text-ink focus:outline-none"
      />
    </label>
  );
}

function RoleButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
        active ? 'border-pine bg-pine/10 text-pine-dark' : 'border-ink/10 bg-white text-ink/60'
      }`}
    >
      {label}
    </button>
  );
}
