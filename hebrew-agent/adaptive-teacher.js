import { createClient } from '@supabase/supabase-js';

// ─── Config ───────────────────────────────────────────────────────────────────
const SUPABASE_URL   = process.env.SUPABASE_URL;
const SUPABASE_KEY   = process.env.SUPABASE_KEY;
const ANTHROPIC_KEY  = process.env.ANTHROPIC_API_KEY;
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── Step 1: שליפת היסטוריית למידה (7 ימים אחרונים) ──────────────────────────
async function fetchLearningHistory(childName) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data, error } = await supabase
    .from('learning_sessions')
    .select('*')
    .eq('child_name', childName)
    .gte('created_at', sevenDaysAgo.toISOString())
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Supabase error: ${error.message}`);
  return data;
}

// ─── Step 2: ניתוח עם Claude → תוכנית מחר ────────────────────────────────────
async function buildAdaptivePlan(sessions, childName) {
  if (sessions.length === 0) return null;

  // סיכום סטטיסטי לפני שליחה ל-Claude
  const byLevel = {};
  for (const s of sessions) {
    if (!byLevel[s.level_number]) byLevel[s.level_number] = { scores: [], activities: [] };
    byLevel[s.level_number].scores.push(s.score);
    byLevel[s.level_number].activities.push(s.activity_type);
  }

  const levelSummary = Object.entries(byLevel).map(([level, data]) => {
    const avg = Math.round(data.scores.reduce((a, b) => a + b, 0) / data.scores.length);
    return `רמה ${level}: ציון ממוצע ${avg}/100 (${data.scores.length} פעילויות)`;
  }).join('\n');

  const prompt = `אתה מורה מומחה ללמידת עברית לילדים בגיל 4.
הנה סיכום ביצועי ${childName} ב-7 הימים האחרונים:

${levelSummary}

מבנה הרמות באפליקציה:
- רמה 1: אותיות ראשונות (א ש ל מ ב)
- רמה 2: עוד אותיות (ד ה י ת ר)
- רמה 3: תנועה ראשונה — קמץ/פתח
- רמה 4: אותיות נוספות (ח כ נ ע פ ג ז ו)
- רמה 5: תנועות נוספות — חיריק/סגול
- רמה 6: השלמת האלף-בית
- רמה 7: מילים ותמונות
- רמה 8: כל התנועות

ענה ב-JSON בלבד (ללא markdown, ללא \`\`\`):
{
  "recommended_level": <מספר רמה>,
  "recommended_activities": ["activity_type_1", "activity_type_2"],
  "weak_areas": ["תיאור קצר של חולשה 1", "חולשה 2"],
  "strong_areas": ["תיאור קצר של חוזקה 1", "חוזקה 2"],
  "ai_reasoning": "משפט אחד שמסביר את ההחלטה"
}

סוגי פעילויות אפשריים: tap-the-letter, match-pairs, listen-and-choose, word-picture-match`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await response.json();
  const text = data.content[0].text.trim();

  try {
    return JSON.parse(text);
  } catch {
    console.error('שגיאה בפענוח JSON מ-Claude:', text);
    return null;
  }
}

// ─── Step 3: שמירת התוכנית ב-Supabase ─────────────────────────────────────────
async function savePlan(childName, plan) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const planDate = tomorrow.toISOString().split('T')[0];

  const { error } = await supabase
    .from('adaptive_plan')
    .upsert({
      child_name: childName,
      plan_date: planDate,
      recommended_level: plan.recommended_level,
      recommended_activities: plan.recommended_activities,
      weak_areas: plan.weak_areas,
      strong_areas: plan.strong_areas,
      ai_reasoning: plan.ai_reasoning,
      applied: false
    }, { onConflict: 'child_name,plan_date' });

  if (error) throw new Error(`שגיאה בשמירת תוכנית: ${error.message}`);
  console.log(`✅ תוכנית נשמרה ל-${childName} לתאריך ${planDate}`);
}

// ─── Step 4: שליחת עדכון לטלגרם ───────────────────────────────────────────────
async function notifyParent(chatId, childName, plan) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateStr = tomorrow.toLocaleDateString('he-IL');

  const weakList  = plan.weak_areas.map(w => `• ${w}`).join('\n');
  const strongList = plan.strong_areas.map(s => `• ${s}`).join('\n');

  const message = [
    `🎯 *תוכנית למידה — ${childName}*`,
    `📅 מחר ${dateStr}`,
    ``,
    `📚 רמה מומלצת: *${plan.recommended_level}*`,
    ``,
    `💪 חזק ב:`,
    strongList,
    ``,
    `🔧 צריך תרגול:`,
    weakList,
    ``,
    `🤖 ${plan.ai_reasoning}`
  ].join('\n');

  const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' })
  });

  const result = await res.json();
  if (!result.ok) throw new Error(`Telegram error: ${result.description}`);
  console.log(`📱 עדכון נשלח לטלגרם עבור ${childName}`);
}

// ─── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🧠 סוכן המורה מתחיל...');

  // שליפת כל ההורים הפעילים
  const { data: parents } = await supabase
    .from('parents')
    .select('*')
    .eq('active', true);

  for (const parent of parents) {
    console.log(`\n📊 מנתח: ${parent.child_name}...`);

    const history = await fetchLearningHistory(parent.child_name);
    if (history.length === 0) {
      console.log(`📭 אין היסטוריה עבור ${parent.child_name} — מדלג`);
      continue;
    }

    console.log(`📚 נמצאו ${history.length} סשנים ב-7 ימים אחרונים`);
    const plan = await buildAdaptivePlan(history, parent.child_name);

    if (!plan) {
      console.log(`⚠️ לא הצלחתי לבנות תוכנית עבור ${parent.child_name}`);
      continue;
    }

    console.log(`💡 תוכנית: רמה ${plan.recommended_level} — ${plan.ai_reasoning}`);
    await savePlan(parent.child_name, plan);
    await notifyParent(parent.telegram_chat_id, parent.child_name, plan);
  }

  console.log('\n✅ סוכן המורה סיים!');
}

main().catch(console.error);
