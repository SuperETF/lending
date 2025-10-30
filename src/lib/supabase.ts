import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || ''
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface RunningSession {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  max_participants: number
  current_participants: number
  pre_registered_count: number
  registration_open_date: string
  image_url?: string
  chat_link?: string
  created_at: string
  created_by?: string
}

export interface Participant {
  id: string
  session_id: string
  name: string
  phone: string
  email: string
  emergency_contact: string
  emergency_phone: string
  medical_conditions: string
  privacy_consent: boolean
  marketing_consent: boolean
  created_at: string
}

export interface Admin {
  id: string
  email: string
  name: string
  created_at: string
}

export interface WaitlistParticipant {
  id: string
  session_id: string
  name: string
  phone: string
  created_at: string
}
