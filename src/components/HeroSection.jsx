function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded- border border-white/10 bg-slate-900/80 p-4 sm:p-8 shadow-glow sm:p-12">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
        <div className="max-w-2xl space-y-6 lg:w-2/5 lg:shrink-0">
          <span className="inline-flex rounded-full border border-pink-400/30 bg-pink-500/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.28em] text-pink-300">
            Agende online
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Design de sobrancelhas com estilo premium e agendamento rápido.
          </h1>
          <p className="max-w-xl text-slate-300 sm:text-lg">
            Uma experiência visual moderna, focada no público mobile, com agenda dinâmica, portfólio estilizado e serviço sob medida para realçar sua beleza.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a href="#agendamento" className="inline-flex items-center justify-center rounded-full bg-pink-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-400">
              Agendar agora
            </a>
            <a href="#galeria" className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-pink-400 hover:text-pink-300">
              Ver portfólio
            </a>
          </div>
        </div>

        <div className="relative flex h-[40rem] w-full flex-1 items-center justify-center rounded- bg-gradient-to-br from-fuchsia-600/20 via-transparent to-amber-500/10 p-2 shadow-2xl backdrop-blur-sm sm:h-[44rem] lg:h-[36rem]">
          <div className="absolute inset-0 rounded- bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.18),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(248,113,113,0.12),transparent_30%)]" />
          <div className="relative z-10 grid h-full w-full grid-cols-1 grid-rows-4 gap-3 sm:grid-cols-2 sm:grid-rows-2 sm:gap-2 text-sm text-slate-200">

            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-950/80 shadow-lg">
              <img
                src="/foto-son.png"
                alt="Microblading"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-3 text-left">
                <span className="text-xs uppercase tracking-[0.3em] text-pink-300">Especialidades</span>
                <p className="mt-1 text-lg font-semibold text-white">Microblading</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-950/80 shadow-lg">
              <img
                src="/antes-depois.png"
                alt="Antes e Depois"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-3 text-left">
                <span className="text-xs uppercase tracking-[0.3em] text-amber-300">Visual</span>
                <p className="mt-1 text-lg font-semibold text-white">Antes e Depois</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-950/80 shadow-lg">
              <img
                src="/sobrancelha-hero.png"
                alt="Design premium"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-3 text-left">
                <span className="text-xs uppercase tracking-[0.3em] text-cyan-300">Estilo</span>
                <p className="mt-1 text-lg font-semibold text-white">Design Premium</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-950/80 shadow-lg">
              <img
                src="/calendario.png"
                alt="Agenda inteligente"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-3 text-left">
                <span className="text-xs uppercase tracking-[0.3em] text-violet-300">Online</span>
                <p className="mt-1 text-lg font-semibold text-white">Agenda inteligente</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection