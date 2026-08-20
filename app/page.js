export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-display text-2xl font-semibold text-pine-dark">
          pawbnb
        </span>
        <nav className="hidden items-center gap-8 text-sm font-medium text-ink/70 md:flex">
          <a href="#como-funciona" className="hover:text-ink">Cómo funciona</a>
          <a href="#cuidadores" className="hover:text-ink">Para cuidadores</a>
          <a href="/login"" className="hover:text-ink">Iniciar sesión</a>
        </nav>
        <a
          href="#buscar"
          className="rounded-full bg-pine px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-pine-dark"
        >
          Reservar ahora
        </a>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl gap-14 px-6 pb-20 pt-8 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-putty px-3 py-1 text-xs font-semibold uppercase tracking-wide text-pine-dark">
            Exclusivo para perros y gatos
          </p>
          <h1 className="font-display text-4xl leading-[1.1] text-ink sm:text-5xl">
            Tranquilidad real, no solo la promesa de un cuidador.
          </h1>
          <p className="mt-5 max-w-md text-base text-ink/70">
            Cuidadores verificados con IA y una cámara que te muestra, en vivo,
            cómo juega, descansa, come e hidrata tu mascota — no solo fotos
            que te manden de vez en cuando.
          </p>

          {/* Search card */}
          <div
            id="buscar"
            className="mt-9 rounded-card border border-ink/10 bg-white p-3 shadow-[0_20px_50px_-25px_rgba(31,74,62,0.35)]"
          >
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Field label="Ubicación" placeholder="San Salvador" />
              <Field label="Fechas" placeholder="Elige fechas" />
              <Field label="Mascota" placeholder="Perro o gato" />
              <Field label="Tamaño" placeholder="Pequeño, mediano, grande" />
            </div>
            <button className="mt-3 w-full rounded-xl bg-amber py-3 text-sm font-semibold text-ink transition hover:bg-amber-dark sm:w-auto sm:px-8">
              Buscar cuidadores
            </button>
          </div>
        </div>

        {/* Signature element: live monitoring card */}
        <MonitorCard />
      </section>

      {/* Features */}
      <section id="como-funciona" className="border-t border-ink/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-3xl text-ink">
            Cómo cuidamos a tu mascota
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Feature
              title="Verificación con IA"
              text="Comparamos identidad, antecedentes y diplomados antes de aprobar a cualquier cuidador."
            />
            <Feature
              title="Monitoreo en vivo"
              text="Cámara con visión por computadora que detecta juego, descanso, comida y agua."
            />
            <Feature
              title="Score de bienestar"
              text="Un puntaje de 0 a 100 calculado automáticamente durante toda la estancia."
            />
            <Feature
              title="Pagos protegidos"
              text="El dinero se retiene hasta que el servicio termina, para tu tranquilidad."
            />
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 py-10 text-sm text-ink/50">
        © {new Date().getFullYear()} Pawbnb. Hecho con cariño para perros y gatos.
      </footer>
    </main>
  );
}

function Field({ label, placeholder }) {
  return (
    <label className="block rounded-xl px-4 py-2.5 transition hover:bg-putty/60">
      <span className="block text-[11px] font-semibold uppercase tracking-wide text-ink/50">
        {label}
      </span>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-ink placeholder:text-ink/40 focus:outline-none"
      />
    </label>
  );
}

function Feature({ title, text }) {
  return (
    <div>
      <div className="mb-3 h-9 w-9 rounded-full bg-putty" aria-hidden="true" />
      <h3 className="font-display text-lg text-ink">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{text}</p>
    </div>
  );
}

function MonitorCard() {
  const score = 92;
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative mx-auto w-full max-w-sm rounded-card border border-ink/10 bg-pine-dark p-5 text-cream shadow-[0_30px_60px_-25px_rgba(31,74,62,0.5)]">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-cream/70">
          <span className="h-2 w-2 animate-pulse rounded-full bg-amber" />
          En vivo · Estancia de Luna
        </span>
        <span className="font-mono text-[11px] text-cream/50">Cam 01</span>
      </div>

      <div className="mt-4 flex h-40 items-center justify-center rounded-2xl bg-pine/40">
        <span className="text-sm text-cream/60">Vista de cámara del cuidador</span>
      </div>

      <div className="mt-5 flex items-center gap-4">
        <svg width="88" height="88" viewBox="0 0 96 96" className="shrink-0 -rotate-90">
          <circle cx="48" cy="48" r="42" fill="none" stroke="rgba(255,253,248,0.15)" strokeWidth="8" />
          <circle
            cx="48"
            cy="48"
            r="42"
            fill="none"
            stroke="#E8A33D"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="-ml-16 rotate-0">
          <p className="font-display text-2xl">{score}</p>
          <p className="text-[11px] uppercase tracking-wide text-cream/60">Bienestar</p>
        </div>

        <div className="ml-auto grid grid-cols-2 gap-x-5 gap-y-2 text-xs text-cream/80">
          <MetricRow label="Juego" value="1h 40m" />
          <MetricRow label="Descanso" value="3h 10m" />
          <MetricRow label="Agua" value="4 visitas" />
          <MetricRow label="Comida" value="2 de 2" />
        </div>
      </div>
    </div>
  );
}

function MetricRow({ label, value }) {
  return (
    <div>
      <p className="text-cream/50">{label}</p>
      <p className="font-medium text-cream">{value}</p>
    </div>
  );
}
