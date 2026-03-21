import { createClient } from '@supabase/supabase-js';

// ─── Config (all secrets via .env file) ───────────────────────────────────────
const SUPABASE_URL     = process.env.SUPABASE_URL     || 'https://eulwmomwiehdmmwfmcax.supabase.co';
const SUPABASE_KEY     = process.env.SUPABASE_KEY;
const ANTHROPIC_KEY    = process.env.ANTHROPIC_API_KEY;
const TELEGRAM_TOKEN   = process.env.TELEGRAM_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '305104060';

if (!SUPABASE_KEY || !ANTHROPIC_KEY || !TELEGRAM_TOKEN) {
  console.error('❌ חסרים משתני סביבה. צור קובץ .env עם SUPABASE_KEY, ANTHROPIC_API_KEY, TELEGRAM_TOKEN');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── Step 1: שליפת נתוני היום מ-Supabase ──────────────────────────────────────
async function fetchTodaySessions() {
  const today = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase
    .from('learning_sessions')
    .select('*')
    .gte('created_at', `${today}T00:00:00Z`)
    .lte('created_at', `${today}T23:59:59Z`)
    .order('created_at', { ascending: true });

  if (error) throw new Error(`Supabase error: ${error.message}`);
  return data;
}

// ─── Step 2: ניתוח עם Claude API ──────────────────────────────────────────────
async function analyzeWithClaude(sessions) {
  const sessionsText = sessions.map(s =>
    `- רמה ${s.level_number} (${s.level_name}), פעילות: ${s.activity_type}, ` +
    `זמן: ${s.duration_seconds} שניות, תוצאה: ${s.items_correct}/${s.items_total}, ציון: ${s.score}`
  ).join('\n');

  const totalMinutes = Math.round(sessions.reduce((sum, s) => sum + s.duration_seconds, 0) / 60);
  const avgScore = Math.round(sessions.reduce((sum, s) => sum + s.score, 0) / sessions.length);

  const prompt = `אתה מורה מומחה ללמידת עברית לילדים. 
מעיין בת 4 למדה היום. הנה הנתונים:

${sessionsText}

סה"כ זמן: ${totalMinutes} דקות
ציון ממוצע: ${avgScore}/100
מספר פעילויות: ${sessions.length}

כתוב ניתוח קצר בעברית עם:
1. במה מעיין הצליחה היום (משפט אחד)
2. מה צריך תרגול נוסף (משפט אחד)  
3. המלצה ספציפית למחר (משפט אחד)

תשובה קצרה ועניינית, ללא כותרות.`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 300,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await response.json();
  return {
    analysis: data.content[0].text,
    totalMinutes,
    avgScore,
    sessionCount: sessions.length
  };
}

// ─── Step 3: שליחת דוח לטלגרם ─────────────────────────────────────────────────
async function sendTelegramReport({ analysis, totalMinutes, avgScore, sessionCount }) {
  const today = new Date().toLocaleDateString('he-IL');

  const message = [
    `📚 *דוח למידה יומי — מעיין*`,
    `📅 ${today}`,
    ``,
    `⏱️ זמן למידה: ${totalMinutes} דקות`,
    `🎮 פעילויות: ${sessionCount}`,
    `⭐ ציון ממוצע: ${avgScore}/100`,
    ``,
    `🤖 *ניתוח:*`,
    analysis,
    ``,
    `— הצוות של מעיין 🏫`
  ].join('\n');

  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown'
    })
  });

  const result = await res.json();
  if (!result.ok) throw new Error(`Telegram error: ${result.description}`);
  console.log('✅ דוח נשלח בהצלחה לטלגרם!');
}

// ─── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🤖 סוכן הדוח מתחיל...');

  const sessions = await fetchTodaySessions();

  if (sessions.length === 0) {
    console.log('📭 אין סשנים להיום — לא נשלח דוח.');
    return;
  }

  console.log(`📊 נמצאו ${sessions.length} סשנים היום`);
  const report = await analyzeWithClaude(sessions);
  console.log('💬 ניתוח Claude:', report.analysis);
  await sendTelegramReport(report);
}

main().catch(console.error);
