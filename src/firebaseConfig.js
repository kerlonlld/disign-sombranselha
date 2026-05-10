import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'YOUR_API_KEY',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'YOUR_AUTH_DOMAIN',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'YOUR_PROJECT_ID',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'YOUR_STORAGE_BUCKET',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'YOUR_MESSAGING_SENDER_ID',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'YOUR_APP_ID'
}

// Cache local para evitar múltiplas chamadas desnecessárias
let appointmentsCache = null
let cacheTimestamp = 0
const CACHE_DURATION = 30000 // 30 segundos

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const appointmentsCollection = collection(db, 'appointments')

export async function saveAppointment(appointment) {
  try {
    // Timeout de 8 segundos para salvar
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout: operação demorou muito')), 8000)
    )

    const savePromise = addDoc(appointmentsCollection, appointment)
    const docRef = await Promise.race([savePromise, timeoutPromise])

    // Limpar cache após salvar
    appointmentsCache = null
    cacheTimestamp = 0

    return docRef.id
  } catch (error) {
    console.error('Erro ao salvar agendamento:', error)
    throw error
  }
}

export async function loadAppointments() {
  try {
    // Verificar cache
    const now = Date.now()
    if (appointmentsCache && (now - cacheTimestamp) < CACHE_DURATION) {
      return appointmentsCache
    }

    // Timeout de 5 segundos para carregar
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout: carregamento demorou muito')), 5000)
    )

    // Query simplificada - ordena apenas por data (não requer índice composto)
    // Se precisar ordenar por slot também, faremos isso no JavaScript
    const appointmentsQuery = query(appointmentsCollection, orderBy('date'))
    const loadPromise = getDocs(appointmentsQuery)

    const snapshot = await Promise.race([loadPromise, timeoutPromise])
    let appointments = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

    // Ordenação adicional por slot no JavaScript (mais eficiente que índice composto)
    appointments.sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date)
      if (dateCompare !== 0) return dateCompare
      return a.slot.localeCompare(b.slot)
    })

    // Atualizar cache
    appointmentsCache = appointments
    cacheTimestamp = now

    return appointments
  } catch (error) {
    console.error('Erro ao carregar agendamentos:', error)
    // Se houver erro, retornar cache antigo se existir
    if (appointmentsCache) {
      console.warn('Retornando dados em cache devido a erro de carregamento')
      return appointmentsCache
    }
    throw error
  }
}

// Função para limpar cache manualmente (útil para debugging)
export function clearAppointmentsCache() {
  appointmentsCache = null
  cacheTimestamp = 0
}
