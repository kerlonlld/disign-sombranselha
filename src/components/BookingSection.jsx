import { useMemo, useState } from 'react'
import { saveAppointment } from '../firebaseConfig.js'

const allSlots = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00']
const serviceOptions = ['Técnica fio a fio', 'Sombreado suave', 'Correção de design', 'Micropigmentação']

function BookingSection({ onAppointmentSaved }) {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date()
    return today.toISOString().slice(0, 10)
  })
  const [selectedSlot, setSelectedSlot] = useState('10:00')
  const [selectedService, setSelectedService] = useState(serviceOptions[0])
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [saving, setSaving] = useState(false)

  const availableSlots = useMemo(() => {
    const blocked = selectedDate.endsWith('5') || selectedDate.endsWith('0')
      ? ['11:00', '15:00']
      : ['13:00']
    return allSlots.filter((slot) => !blocked.includes(slot))
  }, [selectedDate])

  const canSave = name.trim().length > 0

  const handleConfirm = async () => {
    if (!canSave) {
      setStatus('Informe seu nome para prosseguir com o agendamento.')
      return
    }

    setSaving(true)
    setStatus('Salvando agendamento...')

    try {
      const appointment = {
        name: name.trim(),
        date: selectedDate,
        slot: selectedSlot,
        service: selectedService,
        createdAt: new Date().toISOString()
      }

      // Timeout de 10 segundos para evitar travamento
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout: operação demorou muito')), 10000)
      )

      const savePromise = saveAppointment(appointment)
      await Promise.race([savePromise, timeoutPromise])

      setStatus('✅ Agendamento salvo com sucesso!')

      // Limpar campos após sucesso
      setName('')
      setSelectedSlot('10:00')

      // Notificar componente pai para atualizar calendário
      if (onAppointmentSaved) {
        onAppointmentSaved()
      }

      // Limpar status após 3 segundos
      setTimeout(() => {
        setStatus('')
      }, 3000)

    } catch (error) {
      console.error('Erro ao salvar:', error)
      if (error.message.includes('Timeout')) {
        setStatus('❌ Tempo limite excedido. Verifique sua conexão e tente novamente.')
      } else {
        setStatus('❌ Falha ao salvar. Verifique a configuração do Firebase e tente novamente.')
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <section id="agendamento" className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-glow backdrop-blur-md">
      <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr]">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.28em] text-pink-300">Agenda online</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Reserve seu horário com confirmação instantânea.
          </h2>
          <p className="max-w-xl text-slate-300">
            Selecione data, horário e técnica com facilidade. Nosso fluxo é pensado para clientes que chegam pelo Instagram ou WhatsApp e querem fechar o atendimento na hora.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
              <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Duração</p>
              <p className="mt-3 text-2xl font-semibold">60 min</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
              <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Atendimento</p>
              <p className="mt-3 text-2xl font-semibold">Feminino</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
              <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Local</p>
              <p className="mt-3 text-2xl font-semibold">Estúdio VIP</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-950/90 p-6 shadow-2xl">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-300">Nome completo</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Seu nome"
              className="w-full rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-pink-400"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-300">
              Data
              <input
                type="date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
                className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-amber-400"
              />
            </label>
            <label className="block text-sm font-medium text-slate-300">
              Técnica
              <select
                value={selectedService}
                onChange={(event) => setSelectedService(event.target.value)}
                className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400"
              >
                {serviceOptions.map((service) => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-5">
            <h3 className="text-lg font-semibold text-white">Horários disponíveis</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {availableSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`rounded-3xl border px-4 py-3 text-left text-sm font-medium transition ${selectedSlot === slot ? 'border-amber-400 bg-amber-400/10 text-amber-200' : 'border-white/10 bg-slate-950/90 text-slate-300 hover:border-slate-400'}`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3 rounded-[1.75rem] border border-pink-500/20 bg-pink-500/10 p-5 text-sm text-slate-200">
            <p>Seu agendamento será salvo como rascunho. Em um site completo, o próximo passo seria integrar com Firebase, Google Calendar ou Calendly para confirmação automática.</p>
            <p className="font-semibold">Escolhido:</p>
            <p>{name || 'Nome não informado'} · {selectedDate} · {selectedSlot} · {selectedService}</p>
          </div>
          {status && <p className="text-sm text-slate-200">{status}</p>}
          <button
            type="button"
            onClick={handleConfirm}
            disabled={saving}
            className="w-full rounded-full bg-gradient-to-r from-pink-500 to-amber-400 px-5 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-950 transition hover:from-pink-400 hover:to-amber-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? 'Salvando...' : 'Confirmar agendamento'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default BookingSection
