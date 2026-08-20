'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

export default function NewListingPage() {
  const [checkingSession, setCheckingSession] = useState(true);
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [pricePerNight, setPricePerNight] = useState('');
  const [maxPets, setMaxPets] = useState('1');
  const [acceptsDog, setAcceptsDog] = useState(true);
  const [acceptsCat, setAcceptsCat] = useState(true);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setCheckingSession(false);
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);

    const species = [
      ...(acceptsDog ? ['dog'] : []),
      ...(acceptsCat ? ['cat'] : []),
    ];

    if (species.length === 0) {
      setMessage({ type: 'error', text: 'Elige al menos un tipo de mascota que puedas cuidar.' });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from('listings').insert({
        caregiver_id: user.id,
        title,
        city,
        price_per_night: Number(pricePerNight),
        max_pets: Number(maxPets),
        accepts_species: species,
      });
      if (error) throw error;

      setMessage({ type: 'success', text: '¡Tu espacio ya está publicado!' });
      setTitle('');
      setCity('');
      setPricePerNight('');
      setMaxPets('1');
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Algo salió mal. Intenta de nuevo.' });
    } finally {
      setLoading(false);
    }
  }

  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream">
        <p className="text-sm text-ink/50">Un momento...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream px-6 text-center">
        <p className="font-display text-2xl text-ink">Primero inicia sesión</p>
        <p className="max-w-sm text-sm text-ink/60">
          Necesitas tener una cuenta y haber iniciado sesión para publicar un espacio de cuidado.
        </p>
        
          href="/login"
          className="rounded-full bg-pine px-6 py-2.5 text-sm font-semibold text-cream hover:bg-pine-dark"
        >
          Ir a iniciar sesión
        </a>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen justify-center bg-cream px-6 py-12">
      <div className="w-full max-w-md">
        <a href="/" className="font-display text-2xl font-semibold text-pine-dark">
          pawbnb
        </a>
        <h1 className="mt-6 font-display text-3xl text-ink">Publica tu espacio</h1>
        <p className="mt-2 text-sm text-ink/60">
          Cuéntanos sobre el lugar donde vas a cuidar perros y gatos.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <TextField
            label="Título de tu espacio"
            placeholder="Ej. Casa con patio en Mejicanos"
            value={title}
            onChange={setTitle}
            required
          />
          <TextField label="Ciudad" placeholder="San Salvador" value={city} onChange={setCity} required />

          <div className="grid grid-cols-2 gap-3">
            <TextField
              label="Precio por noche ($)"
              type="number"
              value={pricePerNight}
              onChange={setPricePerNight}
              required
            />
            <TextField
              label="Máx. de mascotas"
              type="number"
              value={maxPets}
              onChange={setMaxPets}
              required
            />
          </div>

          <div>
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-ink/50">
              Puedo cuidar
            </span>
            <div className="flex gap-2">
              <ToggleChip label="Perros" active={acceptsDog} onClick={() => setAcceptsDog((v) => !v)} />
              <ToggleChip label="Gatos" active={acceptsCat} onClick={() => setAcceptsCat((v) => !v)} />
            </div>
          </div>

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
            className="w-full rounded-xl bg-amber py-3 text-sm font-semibold text-ink transition hover:bg-amber-dark disabled:opacity-60"
          >
            {loading ? 'Publicando...' : 'Publicar espacio'}
          </button>
        </form>
      </div>
    </main>
  );
}

function TextField({ label, value, onChange, type = 'text', placeholder = '', required = false }) {
  return (
    <label className="block rounded-xl border border-ink/10 bg-white px-4 py-2.5">
      <span className="block text-[11px] font-semibold uppercase tracking-wide text-ink/50">
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full bg-transparent text-sm text-ink placeholder:text-ink/30 focus:outline-none"
      />
    </label>
  );
}

function ToggleChip({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
        active ? 'border-pine bg-pine/10 text-pine-dark' : 'border-ink/10 bg-white text-ink/40'
      }`}
    >
      {label}
    </button>
  );
}
