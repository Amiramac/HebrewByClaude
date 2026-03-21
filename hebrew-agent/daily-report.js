import { createClient } from '@supabase/supabase-js';

// ─── Config (secrets via .env) ────────────────────────────────────────────────
const SUPABASE_URL   = process.env.SUPABASE_URL;
const SUPABASE_KEY   = process.env.SUPABASE_KEY;
const ANTHROPIC_KEY  = process.env.ANTHROPIC_API_KEY;
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN; // @hebrew_by_claude_bot

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── Step 1: שליפת כל ההורים הפעילים ─────────────────────────────────────────
async function fetchActiveParents() {
  const { data, error } = await supabase
    .from('parents')
    .select('*')
    .eq('active', true);
  if (error) throw new Error(`Supabase parents error: ${error.message}`);
  return data;
}

// ─── Step 2: שליפת סשני היום לפי שם הילד ─────────────────────────────────────
async function fetchTodaySessions(childName) {
  const today = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase
    .from('learning_sessions')
    .select('*')
    .eq('child_name', childName)
    .gte('created_at', `${today}T00:00:00Z`)
    .lte('created_at', `${today}T23:59:59Z`)
    .order('created_at', { ascending: true });
  if (error) throw new Error(`Supabase sessions error: ${error.message}`);
  return data;
}

// ─── Step 3: ניתוח עם Claude ──────────────────────────────────────────────────
async function analyzeWithClaude(sessions, childName) {
  const sessionsText = sessions.map(s =>
    `- רמה ${s.level_number} (${s.level_name}), פעילות: ${s.activity_type}, ` +
    `זמן: ${s.duration_seconds} שניות, תוצאה: ${s.items_correct}/${s.items_total}, ציון: ${s.score}`
  ).join('\n');

  const totalMinutes = Math.round(sessions.reduce((sum, s) => sum + s.duration_seconds, 0) / 60);
  const avgScore = Math.round(sessions.reduce((sum, s) => sum + s.score, 0) / sessions.length);

  const prompt = `אתה מורה מומחה ללמידת עברית לילדים.
${childName} למדה היום. הנה הנתונים:

${sessionsText}

סה"כ זמן: ${totalMinutes} דקות
ציון ממוצע: ${avgScore}/100
מספר פעילויות: ${sessions.length}

כתוב ניתוח קצר בעברית עם:
1. במה ${childName} הצליחה היום (משפט אחד)
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
  return { analysis: data.content[0].text, totalMinutes, avgScore, sessionCount: sessions.length };
}

// ─── Step 4: שליחה לטלגרם ─────────────────────────────────────────────────────
async function sendTelegramReport(chatId, childName, { analysis, totalMinutes, avgScore, sessionCount }) {
  const today = new Date().toLocaleDateString('he-IL');
  const stars = avgScore >= 90 ? '🌟🌟🌟' : avgScore >= 70 ? '🌟🌟' : '🌟';

  const message = [
    `📚 *דוח למידה יומי — ${childName}*`,
    `📅 ${today}`,
    ``,
    `⏱️ זמן למידה: ${totalMinutes} דקות`,
    `🎮 פעילויות: ${sessionCount}`,
    `${stars} ציון ממוצע: ${avgScore}/100`,
    ``,
    `🤖 *ניתוח:*`,
    analysis,
    ``,
    `— הצוות של ${childName} 🏫`
  ].join('\n');

  const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' })
  });

  const result = await res.json();
  if (!result.ok) throw new Error(`Telegram error: ${result.description}`);
  console.log(`✅ דוח נשלח ל-${childName} (chat_id: ${chatId})`);
}

// ─── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🤖 סוכן הדוח מתחיל...');

  const parents = await fetchActiveParents();
  console.log(`👨‍👩‍👧 נמצאו ${parents.length} הורים פעילים`);

  for (const parent of parents) {
    console.log(`\n📊 מעבד: ${parent.child_name}...`);
    const sessions = await fetchTodaySessions(parent.child_name);

    if (sessions.length === 0) {
      console.log(`📭 אין סשנים היום עבור ${parent.child_name} — מדלג`);
      continue;
    }

    const report = await analyzeWithClaude(sessions, parent.child_name);
    await sendTelegramReport(parent.telegram_chat_id, parent.child_name, report);
  }

  console.log('\n✅ כל הדוחות נשלחו!');
}

main().catch(console.error);
