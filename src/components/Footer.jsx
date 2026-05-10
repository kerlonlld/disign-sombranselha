function Footer() {
  return (
    <footer className="mt-12 rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 text-slate-300 shadow-glow">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">© 2026 Design de Sobrancelhas — Site criado para agendamento online e marcação premium.</p>
        <div className="flex flex-wrap gap-3 text-sm text-slate-400">
          <span>Mobile first</span>
          <span>Design moderno</span>
          <span>Agendamento rápido</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
