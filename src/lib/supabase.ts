import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://eulwmomwiehdmmwfmcax.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1bHdtb213aWVoZG1td2ZtY2F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNTQ3MjgsImV4cCI6MjA4OTYzMDcyOH0.VIRKLxEAPODI8e2f_xaqh7QxHszaPFcWANjXYSDYm9c'
)

export async function logLearningSession(data: {
  level_number: number
  level_name?: string
  activity_type?: string
  duration_seconds: number
  items_correct: number
  items_total: number
}) {
  const score = data.items_total > 0
    ? Math.round((data.items_correct / data.items_total) * 100)
    : 0

  await supabase.from('learning_sessions').insert({
    child_name: 'מעיין',
    level_number: data.level_number,
    level_name: data.level_name,
    activity_type: data.activity_type,
    duration_seconds: data.duration_seconds,
    items_correct: data.items_correct,
    items_total: data.items_total,
    score,
  })
}
