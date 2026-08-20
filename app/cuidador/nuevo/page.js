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
    supabase.auth.getUser().then(function (result) {
      setUser(result.data.user ? result.data.user : null);
      setCheckingSession(false);
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);

    const species = [];
    if (acceptsDog) species.push('dog');
    if (acceptsCat) species.push('cat');

    if (species.length === 0) {
      setMessage({ type: 'error', text: 'Elige al menos un tipo de mascota que puedas cuidar.' });
      return;
    }

    setLoading(true);
    try {
      const result = await supabase.from('listings').insert({
        caregiver_id: user.id,
        title: title,
        city: city,
        price_per_night: Number(pricePerNight),
        max_pets: Number(maxPets),
        accepts_species: species,
      });
      if (result.error) throw result.error;

      setMessage({ type: 'success', text: 'Tu espacio ya esta publicado.' });
      setTitle('');
      setCity('');
      setPricePerNight('');
      setMaxPets('1');
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Algo salio mal. Intenta de nuevo.' });
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
        <p className="font-display text-2xl text-ink">Primero inicia sesion</p>
        <p className="max-w-sm text-sm text-ink/60">
          Necesitas tener una cuenta y haber iniciado sesion para publicar un espacio de cuidado.
        </p>
        <a href="/login" className="rounded-full bg-pine px-6 py-2.5 text-sm font-semibold text-cream hover:bg-pine-dark">
          Ir a iniciar sesion
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
          Cuentanos sobre el lugar donde vas a cuidar perros y gatos.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <TextField label="Titulo de tu espacio" placeholder="Ej. Casa con patio en Mejicanos" value={title} onChange={setTitle} required />
          <TextField label="Ciudad" placeholder="San Salvador" value={city} onChange={setCity} required />

          <div className="grid grid-cols-2 gap-3">
            <TextField label="Precio por noche" type="number" value={pricePerNight} onChange={setPricePerNight} required />
            <TextField label="Max de mascotas" type="number" value={maxPets} onChange={setMaxPets} required />
          </div>

          <div>
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-ink/50">
              Puedo cuidar
            </span>
            <div className="flex gap-2">
              <ToggleChip label="Perros" active={acceptsDog} onClick={function () { setAcceptsDog(!acceptsDog); }} />
              <ToggleChip label="Gatos" active={acceptsCat} onClick={function () { setAcceptsCat(!acceptsCat); }} />
            </div>
          </div>

          {message && (
            <p className={message.type === 'error' ? 'rounded-xl px-4 py-2.5 text-sm bg-red-50 text-red-700' : 'rounded-xl px-4 py-2.5 text-sm bg-pine/10 text-pine-dark'}>
              {message.text}
            </p>
          )}

          <button type="submit" disabled={loading} className="w-full rounded-xl bg-amber py-3 text-sm font-semibold text-ink transition hover:bg-amber-dark disabled:opacity-60">
            {loading ? 'Publicando...' : 'Publicar espacio'}
          </button>
        </form>
      </div>
    </main>
  );
}

function TextField(props) {
  return (
    <label className="block rounded-xl border border-ink/10 bg-white px-4 py-2.5">
      <span className="block text-[11px] font-semibold uppercase tracking-wide text-ink/50">
        {props.label}
      </span>
      <input
        type={props.type || 'text'}
        value={props.value}
        placeholder={props.placeholder || ''}
        onChange={function (e) { props.onChange(e.target.value); }}
        required={props.required || false}
        className="w-full bg-transparent text-sm text-ink placeholder:text-ink/30 focus:outline-none"
      />
    </label>
  );
}

function ToggleChip(props) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={props.active ? 'flex-1 rounded-xl border px-3 py-2.5 text-sm font-medium transition border-pine bg-pine/10 text-pine-dark' : 'flex-1 rounded-xl border px-3 py-2.5 text-sm font-medium transition border-ink/10 bg-white text-ink/40'}
    >
      {props.label}
    </button>
  );
}
