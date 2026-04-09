import urllib.request, json

url = 'https://n8n.srv1521649.hstgr.cloud/api/v1/workflows/CmuVLKhmR5DsuRHD'
key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NDcwNDZiZi03ODc4LTQzN2YtOTc1MC1hYWUzYWY1ZGMyMmQiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiZjY4NDdkNWUtNDNmYi00ZGFiLWJhNzEtYzBkOTQwZjc0YzQzIiwiaWF0IjoxNzc0NjIzMTM0LCJleHAiOjE3NzcxNTQ0MDB9.pmT2TSOTv5RQaAyTEi9xUGXL8HndDhJeYbcngQeC-hY'

system_prompt = """أنت محلل أعمال خبير ومساعد ذكي لوكالة Vortex Digital الرقمية المتخصصة في تصميم المواقع الاحترافية وأتمتة الأعمال بالذكاء الاصطناعي في المغرب.

عند وصول عميل جديد، مهمتك إنتاج مخرجين:

═══════════════════════════════
📊 أولاً — تقرير تحليلي لصاحب الوكالة (Telegram)
═══════════════════════════════

1. 🧠 تحليل ملف العميل:
   - من هو هذا العميل؟ ما طبيعة عمله بناءً على مهنته؟
   - ما احتياجاته الحقيقية وراء الخدمة المطلوبة؟
   - ما نقاط الألم المحتملة لديه؟

2. 💰 تقييم الفرصة التجارية:
   - مدى جدية العميل: [مرتفع / متوسط / منخفض]
   - خدمات إضافية يمكن اقتراحها
   - النهج المثالي للتواصل معه

3. 🎯 توصيات فورية:
   - ماذا تقول له في أول اتصال؟
   - أسئلة مهمة يجب طرحها عليه

4. ⚡ درجة الأولوية: [عاجل جداً / عاجل / عادي]

الأسلوب: موجز، واضح، قابل للتنفيذ فوراً. استخدم الإيموجي والتنسيق المناسب لـ Telegram.

═══════════════════════════════
📧 ثانياً — رسالة ترحيب للعميل (Gmail)
═══════════════════════════════
اكتب رسالة HTML احترافية وشخصية تتضمن:
- ترحيب حار وشخصي باسمه
- إظهار أنك فهمت بالضبط ما يحتاجه بناءً على مهنته وخدمته
- شرح موجز لكيف ستساعده Vortex Digital تحديداً في حالته
- تحديد موعد التواصل خلال 24 ساعة
- call-to-action واضح (الرد على الإيميل أو WhatsApp: +212705960845)
- التوقيع باسم فريق Vortex Digital مع الرابط https://vortexagence.com

الأسلوب: احترافي، دافئ، شخصي — ليس قالباً جاهزاً بل رسالة حقيقية مكتوبة خصيصاً له.
اللغة: العربية الدارجة المغربية الراقية مع مصطلحات تقنية بالإنجليزية.

أجب دائماً بـ JSON فقط:
{"telegram": "...", "email_subject": "...", "email_html": "..."}"""

parse_code = r"""const raw = $input.first().json.output || $input.first().json.text || JSON.stringify($input.first().json);
let ai;
try {
  const match = raw.match(/\{[\s\S]*\}/);
  ai = match ? JSON.parse(match[0]) : JSON.parse(raw);
} catch(e) {
  ai = { telegram: raw, email_subject: 'تم استلام طلبك — Vortex Digital', email_html: raw };
}
const body = $('Webhook').first().json.body;
return [{ json: {
  telegram_msg: ai.telegram || '',
  email_subject: ai.email_subject || 'تم استلام طلبك — Vortex Digital',
  email_html: ai.email_html || '',
  name: body.name,
  email: body.email,
  phone: body.phone,
  role: body.role,
  service: body.service,
  contactMethod: (body.contactMethod || '').toLowerCase()
}}];"""

workflow = {
    "name": "Vortex Digital — Form Leads + AI",
    "nodes": [
        {
            "parameters": {"httpMethod": "POST", "path": "vortex-lead", "responseMode": "responseNode", "options": {}},
            "id": "node-webhook", "name": "Webhook",
            "type": "n8n-nodes-base.webhook", "typeVersion": 2,
            "position": [0, 304], "webhookId": "vortex-lead"
        },
        {
            "parameters": {
                "systemMessage": system_prompt,
                "inputSource": "jsonInput",
                "jsonInput": "={{ JSON.stringify($json.body) }}",
                "options": {}
            },
            "id": "2bbb2aad-3022-4353-9599-ebabfff99e60", "name": "AI Agent",
            "type": "@n8n/n8n-nodes-langchain.agent", "typeVersion": 3.1,
            "position": [220, 304]
        },
        {
            "parameters": {"options": {}},
            "id": "36ff17b3-e44b-4c32-a8d8-3c0b506220d0", "name": "OpenRouter Chat Model",
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenRouter", "typeVersion": 1,
            "position": [80, 520],
            "credentials": {"openRouterApi": {"id": "iFeJuImGbezQWzs8", "name": "OpenRouter account"}}
        },
        {
            "parameters": {"jsCode": parse_code},
            "id": "node-parse", "name": "Parse AI Response",
            "type": "n8n-nodes-base.code", "typeVersion": 2,
            "position": [480, 304]
        },
        {
            "parameters": {
                "conditions": {
                    "options": {"caseSensitive": False},
                    "conditions": [{
                        "leftValue": "={{ $json.contactMethod }}",
                        "rightValue": "email",
                        "operator": {"type": "string", "operation": "contains"}
                    }],
                    "combinator": "and"
                }
            },
            "id": "node-if-email", "name": "Contact by Email?",
            "type": "n8n-nodes-base.if", "typeVersion": 2.2,
            "position": [740, 480]
        },
        {
            "parameters": {"chatId": "YOUR_CHAT_ID", "text": "={{ $json.telegram_msg }}", "additionalFields": {"parse_mode": "Markdown"}},
            "id": "node-telegram", "name": "Telegram",
            "type": "n8n-nodes-base.telegram", "typeVersion": 1,
            "position": [740, 160]
        },
        {
            "parameters": {"sendTo": "={{ $json.email }}", "subject": "={{ $json.email_subject }}", "emailType": "html", "message": "={{ $json.email_html }}", "options": {}},
            "id": "node-gmail", "name": "Gmail",
            "type": "n8n-nodes-base.gmail", "typeVersion": 2,
            "position": [1000, 480]
        },
        {
            "parameters": {
                "operation": "append",
                "documentId": {"__rl": True, "mode": "id", "value": "YOUR_SHEET_ID"},
                "sheetName": {"__rl": True, "mode": "name", "value": "Leads"},
                "columns": {
                    "mappingMode": "defineBelow",
                    "value": {
                        "Date": "={{ $now.format('dd/MM/yyyy HH:mm') }}",
                        "Name": "={{ $json.name }}",
                        "Email": "={{ $json.email }}",
                        "Phone": "={{ $json.phone }}",
                        "Role": "={{ $json.role }}",
                        "Service": "={{ $json.service }}",
                        "Contact": "={{ $json.contactMethod }}",
                        "Status": "جديد"
                    }
                },
                "options": {}
            },
            "id": "node-sheets", "name": "Google Sheets",
            "type": "n8n-nodes-base.googleSheets", "typeVersion": 4,
            "position": [740, 304]
        },
        {
            "parameters": {"respondWith": "json", "responseBody": "={ \"success\": true }", "options": {}},
            "id": "node-respond", "name": "Respond to Webhook",
            "type": "n8n-nodes-base.respondToWebhook", "typeVersion": 1,
            "position": [1000, 200]
        }
    ],
    "connections": {
        "Webhook": {"main": [[{"node": "AI Agent", "type": "main", "index": 0}]]},
        "OpenRouter Chat Model": {"ai_languageModel": [[{"node": "AI Agent", "type": "ai_languageModel", "index": 0}]]},
        "AI Agent": {"main": [[{"node": "Parse AI Response", "type": "main", "index": 0}]]},
        "Parse AI Response": {"main": [[
            {"node": "Telegram", "type": "main", "index": 0},
            {"node": "Google Sheets", "type": "main", "index": 0},
            {"node": "Contact by Email?", "type": "main", "index": 0}
        ]]},
        "Contact by Email?": {"main": [
            [{"node": "Gmail", "type": "main", "index": 0}],
            []
        ]},
        "Google Sheets": {"main": [[{"node": "Respond to Webhook", "type": "main", "index": 0}]]}
    },
    "settings": {"executionOrder": "v1"}
}

data = json.dumps(workflow, ensure_ascii=False).encode('utf-8')
req = urllib.request.Request(url, data=data, method='PUT')
req.add_header('X-N8N-API-KEY', key)
req.add_header('Content-Type', 'application/json; charset=utf-8')

try:
    with urllib.request.urlopen(req) as r:
        resp = json.loads(r.read())
        print('SUCCESS — Nodes:', len(resp.get('nodes', [])))
        for n in resp.get('nodes', []):
            print(' -', n['name'])
except urllib.error.HTTPError as e:
    print('ERROR', e.code, e.read().decode()[:500])
