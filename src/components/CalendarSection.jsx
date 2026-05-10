import { useEffect, useState, useCallback } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { loadAppointments } from '../firebaseConfig.js'

const defaultEvents = [
  {
    title: 'Exemplo de atendimento: Técnica fio a fio',
    start: new Date().toISOString().slice(0, 10) + 'T10:00:00',
    end: new Date().toISOString().slice(0, 10) + 'T11:00:00',
    backgroundColor: '#f472b6',
    borderColor: '#f472b6'
  }
]

const availableSlotTimes = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00']

function blockedSlotsForDate(date) {
  return date.endsWith('5') || date.endsWith('0')? ['11:00', '15:00'] : ['13:00']
}

function getAvailableSlots(date) {
  const blocked = blockedSlotsForDate(date)
  return availableSlotTimes.filter((slot) =>!blocked.includes(slot))
}

function formatEvents(appointments) {
  return appointments.map((appointment) => {
    const [hour] = appointment.slot.split(':')
    const endHour = String(Number(hour) + 1).padStart(2, '0')

    return {
      id: appointment.id,
      title: `${appointment.service} • ${appointment.name}`,
      start: `${appointment.date}T${appointment.slot}:00`,
      end: `${appointment.date}T${endHour}:00`,
      backgroundColor: '#fb7185',
      borderColor: '#fb7185',
      extendedProps: {
        clientName: appointment.name,
        service: appointment.service,
        slot: appointment.slot,
        date: appointment.date,
        type: 'booking'
      }
    }
  })
}

function buildAvailableEvents(appointments, days = 14) {
  const bookedSlots = new Set(appointments.map((appointment) => `${appointment.date}|${appointment.slot}`))
  const events = []
  const today = new Date()

  for (let i = 0; i < days; i += 1) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    const isoDate = date.toISOString().slice(0, 10)

    getAvailableSlots(isoDate).forEach((slot) => {
      if (!bookedSlots.has(`${isoDate}|${slot}`)) {
        const [hour] = slot.split(':')
        const endHour = String(Number(hour) + 1).padStart(2, '0')

        events.push({
          id: `avail-${isoDate}-${slot}`,
          title: '●',
          start: `${isoDate}T${slot}:00`,
          end: `${isoDate}T${endHour}:00`,
          backgroundColor: '#10b981',
          borderColor: '#10b981',
          textColor: '#ffffff',
          extendedProps: {
            clientName: null,
            service: 'Horário disponível',
            slot,
            date: isoDate,
            type: 'available'
          }
        })
      }
    })
  }

  return events
}

function CalendarSection({ refreshTrigger }) {
  const [events, setEvents] = useState(defaultEvents)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [lastRefresh, setLastRefresh] = useState(new Date())

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const appointments = await loadAppointments()
      if (appointments.length > 0) {
        setEvents([...buildAvailableEvents(appointments),...formatEvents(appointments)])
      } else {
        const availableEvents = buildAvailableEvents([])
        setEvents([...availableEvents,...defaultEvents])
      }
      setLastRefresh(new Date())
    } catch (err) {
      console.error('Erro ao carregar agendamentos:', err)
      setError('Não foi possível carregar o calendário. Verifique a configuração do Firebase.')
      setEvents(defaultEvents)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAppointments()
  }, [fetchAppointments])

  useEffect(() => {
    if (refreshTrigger > 0) {
      fetchAppointments()
    }
  }, [refreshTrigger, fetchAppointments])

  const handleRefresh = () => {
    fetchAppointments()
  }

  const handleEventClick = (clickInfo) => {
    const { event } = clickInfo
    const isAvailable = event.extendedProps.type === 'available'
    setSelectedEvent({
      title: isAvailable? 'Horário Disponível' : event.title,
      date: event.extendedProps.date,
      slot: event.extendedProps.slot,
      clientName: isAvailable? 'Horário livre' : event.extendedProps.clientName,
      service: event.extendedProps.service
    })
  }

  const closeDetail = () => {
    setSelectedEvent(null)
  }

  return (
    <section className="rounded- border border-white/10 bg-slate-900/80 p-8 shadow-glow backdrop-blur-md">
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Calendário online</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Agenda em tempo real para clientes e agendamentos.</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="rounded-full border border-slate-700 bg-slate-950/80 px-4 py-2 text-sm text-slate-200 hover:border-cyan-400 hover:text-cyan-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading? '🔄' : '↻'} Recarregar
            </button>
            <div className="rounded-full border border-slate-700 bg-slate-950/80 px-5 py-3 text-sm text-slate-200">
              {loading? 'Carregando agenda...' : `Atualizado ${lastRefresh.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`}
            </div>
          </div>
        </div>
        <p className="max-w-3xl text-slate-300">Os horários salvos aparecem aqui em modo calendário. Quando estiver com o Firebase configurado, o painel mostra reservas reais e bloqueios automáticos.</p>
        {error && (
          <div className="rounded-3xl border border-rose-400/20 bg-rose-500/10 p-4 text-sm text-rose-200">
            {error}
            <button
              onClick={handleRefresh}
              className="ml-3 underline hover:text-rose-100"
            >
              Tentar novamente
            </button>
          </div>
        )}
        {selectedEvent && (
          <div className="mb-4 rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-5 text-slate-200 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Detalhes do agendamento</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{selectedEvent.clientName}</h3>
              </div>
              <button
                type="button"
                onClick={closeDetail}
                className="rounded-full border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-slate-200 hover:border-cyan-300"
              >
                Fechar
              </button>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                <p className="text-sm text-slate-400">Serviço</p>
                <p className="mt-2 text-lg font-semibold">{selectedEvent.service}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                <p className="text-sm text-slate-400">Horário</p>
                <p className="mt-2 text-lg font-semibold">{selectedEvent.date} · {selectedEvent.slot}</p>
              </div>
            </div>
          </div>
        )}
        <div className="rounded- border border-white/10 bg-slate-950/90 p-4 shadow-2xl">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            buttonText={{
              today: 'Hoje',
              month: 'Mês',
              week: 'Semana',
              day: 'Dia'
            }}
            events={events}
            allDaySlot={false}
            slotMinTime="08:00:00"
            slotMaxTime="19:00:00"
            height="auto"
            contentHeight={620}
            eventDisplay="block"
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              meridiem: false
            }}
            eventClick={handleEventClick}
            locale="pt-br"
          />
        </div>
      </div>
    </section>
  )
}

export default CalendarSection