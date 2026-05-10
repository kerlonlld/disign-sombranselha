
import { useMemo, useState } from 'react'

const galleryFilters = ['Fio a Fio', 'Sombra', 'Natural', 'Luxo']

function GallerySection() {
  const [filter, setFilter] = useState('Fio a Fio')
  const [ratio, setRatio] = useState(50)

  const filterDescription = useMemo(() => {
    switch (filter) {
      case 'Sombra':
        return 'A técnica de sombreado deixa as sobrancelhas mais cheias e naturais.'
      case 'Natural':
        return 'Leveza e definição para um look sutil e elegante.'
      case 'Luxo':
        return 'Transformação premium com acabamento marcado e sofisticado.'
      default:
        return 'Fio a fio para um design super natural que valoriza o rosto.'
    }
  }, [filter])

  return (
    <section id="galeria" className="gallery-section rounded- border border-white/10 bg-slate-900/80 p-4 sm:p-8 shadow-glow backdrop-blur-md">
      <div className="grid gap-6 sm:gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-sm uppercase tracking-[0.28em] text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            Portfólio interativo
          </div>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Galeria com filtro de estilo e antes e depois.
          </h2>
          <p className="max-w-xl text-slate-300">Use a seleção de estilos para mostrar à sua cliente opções personalizadas. A barra antes/depois ilustra o resultado da transformação de forma envolvente.</p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {galleryFilters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`rounded-full px-4 py-2 text-xs sm:px-5 sm:text-sm font-semibold transition ${filter === item? 'bg-pink-500 text-white shadow-lg shadow-pink-500/20' : 'border border-slate-700 bg-slate-950/90 text-slate-200 hover:border-pink-400 hover:text-pink-300'}`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="rounded- border border-white/10 bg-slate-950/90 p-4 sm:p-6 text-slate-200">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Design selecionado</p>
            <p className="mt-3 text-xl font-semibold text-white">{filter}</p>
            <p className="mt-2 text-slate-300">{filterDescription}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="overflow-hidden rounded- border border-white/10 bg-slate-950/80 p-4 sm:p-6 shadow-2xl">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Before & After</p>
                <h3 className="text-xl sm:text-2xl font-semibold text-white">Comparação dinâmica</h3>
              </div>
              <span className="self-start rounded-full bg-white/5 px-3 py-2 text- sm:px-4 sm:text-xs font-semibold uppercase tracking-[0.24em] text-slate-200">
                Arraste para comparar
              </span>
            </div>

            <div className="relative overflow-hidden rounded-xl sm:rounded-[1.8rem] bg-slate-900/90 p-3 sm:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.14),transparent_30%)]" />
              <div className="relative flex justify-center">
                <div className="relative w-full overflow-hidden rounded-xl sm:rounded-[1.5rem] border border-white/10 bg-slate-950/90" style={{ height: 240 }}>
                  <img
                    src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1080&q=80"
                    alt="Depois"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1080&q=80"
                    alt="Antes"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ clipPath: `inset(0 ${100 - ratio}% 0 0)` }}
                  />
                  <div
                    className="absolute top-0 h-full w-0.5 bg-white shadow-lg shadow-white/50"
                    style={{ left: `${ratio}%` }}
                  >
                    <div className="absolute left-1/2 top-1/2 h-8 w-8 sm:h-10 sm:w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-slate-900/80 backdrop-blur-sm" />
                  </div>
                </div>
              </div>
              <div className="before-after-slider mt-6 sm:mt-8 space-y-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={ratio}
                  onChange={(event) => setRatio(Number(event.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs uppercase tracking-[0.22em] text-slate-400">
                  <span>Antes</span>
                  <span>Depois</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl sm:rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-4 sm:p-5 text-slate-200">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Interação</p>
              <p className="mt-3 text-base sm:text-lg font-semibold text-white">Swipe ou escolha</p>
              <p className="mt-2 text-sm text-slate-300">A ideia é permitir que a cliente avalie estilos de maneira rápida e divertida.</p>
            </div>
            <div className="rounded-xl sm:rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-4 sm:p-5 text-slate-200">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Gamificação</p>
              <p className="mt-3 text-base sm:text-lg font-semibold text-white">Sugestão de serviço</p>
              <p className="mt-2 text-sm text-slate-300">No próximo passo, você pode conectar preferências a recomendações de serviços como fio a fio ou sombra.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GallerySection