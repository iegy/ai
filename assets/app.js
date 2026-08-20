const STORAGE_KEY = "moai_state_v1";
const WEBLLM_CDN = "https://esm.run/@mlc-ai/web-llm";

const MODEL_PRESETS = [
  { id: "auto", label: "Auto · Smart", family: "MOAI", vram: 0, descAr: "يختار أفضل موديل مناسب لجهازك", descEn: "Chooses the best model for your device" },
  { id: "Llama-3.2-1B-Instruct-q4f16_1-MLC", label: "Llama 3.2 · 1B", family: "Meta", vram: 879, descAr: "خفيف وسريع — الأفضل للموبايل والأجهزة المتوسطة", descEn: "Light and fast — best for mobile and mid-range devices" },
  { id: "Llama-3.2-3B-Instruct-q4f16_1-MLC", label: "Llama 3.2 · 3B", family: "Meta", vram: 2264, descAr: "توازن جيد بين الجودة والسرعة", descEn: "Good balance of quality and speed" },
  { id: "Phi-3.5-mini-instruct-q4f16_1-MLC-1k", label: "Phi 3.5 Mini", family: "Microsoft", vram: 2520, descAr: "جيد للمنطق والبرمجة على الأجهزة الأقوى", descEn: "Good reasoning and coding on stronger devices" },
  { id: "Phi-4-mini-instruct-q4f16_1-MLC", label: "Phi 4 Mini", family: "Microsoft", vram: 3438, descAr: "جودة أعلى ويتطلب ذاكرة رسومية أكبر", descEn: "Higher quality; needs more graphics memory" },
  { id: "DeepSeek-R1-Distill-Qwen-7B-q4f16_1-MLC", label: "DeepSeek R1 · 7B", family: "DeepSeek / Qwen", vram: 5107, descAr: "موديل استدلال ثقيل للأجهزة القوية", descEn: "Heavy reasoning model for high-end devices" },
];

const I18N = {
  ar: {
    newChat: "محادثة جديدة", chats: "المحادثات", install: "تثبيت MOAI", settings: "الإعدادات", localPrivate: "محلي وخاص على جهازك",
    heroSubtitle: "ذكاء اصطناعي متعدد النماذج يعمل على جهازك مباشرة.", checkingDevice: "جارٍ فحص جهازك…", checkingDeviceSub: "نحدد دعم WebGPU وأفضل موديل لك.",
    suggest1: "اشرح فكرة معقدة ببساطة", suggest2: "ساعدني في كتابة كود", suggest3: "لخّص موضوعًا بسرعة", suggest4: "اقترح أفكارًا جديدة",
    preparingModel: "جارٍ تجهيز الموديل…", firstLoadHint: "أول تحميل فقط قد يكون كبيرًا، وبعده يُحفظ في كاش المتصفح.", placeholder: "اكتب رسالتك إلى MOAI…",
    disclaimer: "قد يخطئ MOAI. تحقّق من المعلومات المهمة. المعالجة تتم محليًا على جهازك.", settingsSub: "خصص تجربة MOAI على هذا الجهاز.", language: "اللغة",
    languageSub: "واجهة عربية أو إنجليزية", temperature: "الإبداع", temperatureSub: "أقل = أدق، أعلى = أكثر تنوعًا", clearData: "حذف كل البيانات",
    clearDataSub: "يمسح المحادثات والإعدادات المحلية، وليس كاش الموديلات.", delete: "حذف", cancel: "إلغاء", continue: "متابعة", noChats: "لا توجد محادثات بعد",
    you: "أنت", copied: "تم النسخ", copy: "نسخ", exportDone: "تم تصدير المحادثة", webgpuReady: "جهازك يدعم WebGPU",
    webgpuReadySub: "يمكن لـ MOAI تشغيل الموديلات محليًا بدون API أو خادم.", webgpuMissing: "WebGPU غير متاح على هذا المتصفح",
    webgpuMissingSub: "استخدم أحدث Chrome أو Edge على جهاز يدعم WebGPU. لن يتم إرسال رسائلك إلى خادم بديل.", loadingRuntime: "جارٍ تحميل محرك الذكاء الاصطناعي…",
    modelReady: "الموديل جاهز", loadingModel: "تحميل", generationError: "حدث خطأ أثناء تشغيل الموديل", modelNotSupported: "الموديل غير متاح في إصدار المحرك الحالي.",
    deleteChatTitle: "حذف المحادثة؟", deleteChatText: "سيتم حذف هذه المحادثة من هذا الجهاز نهائيًا.", clearAllTitle: "حذف كل بيانات MOAI؟",
    clearAllText: "سيتم حذف كل المحادثات والإعدادات المحفوظة على هذا الجهاز.", newChatTitle: "محادثة جديدة", untitled: "محادثة جديدة",
    firstDownloadTitle: "تحميل الموديل على جهازك", firstDownloadText: "سيتم تحميل هذا الموديل مرة واحدة وحفظه محليًا في كاش المتصفح. الحجم قد يكون كبيرًا حسب الموديل.",
    modelAuto: "اختيار تلقائي", modelLocal: "موديلات محلية", deviceMemory: "ذاكرة الجهاز", exportEmpty: "لا توجد محادثة لتصديرها", stop: "إيقاف",
    installUnavailable: "يمكن تثبيت MOAI من قائمة المتصفح بعد فتح الموقع عبر HTTPS.", modelChanged: "تم تغيير الموديل", cannotShare: "تم تنزيل نسخة Markdown بدلًا من المشاركة.",
    unsupportedModel: "هذا الموديل غير متوافق حاليًا؛ تم الرجوع إلى Llama 3.2 1B.", appName: "MOAI"
  },
  en: {
    newChat: "New chat", chats: "Chats", install: "Install MOAI", settings: "Settings", localPrivate: "Local & private on your device",
    heroSubtitle: "Multi-model AI that runs directly on your device.", checkingDevice: "Checking your device…", checkingDeviceSub: "Detecting WebGPU and the best model for you.",
    suggest1: "Explain something complex", suggest2: "Help me write code", suggest3: "Summarize a topic", suggest4: "Give me fresh ideas",
    preparingModel: "Preparing the model…", firstLoadHint: "The first download can be large. Afterwards it is cached by your browser.", placeholder: "Message MOAI…",
    disclaimer: "MOAI can make mistakes. Check important information. Processing happens locally on your device.", settingsSub: "Customize MOAI on this device.", language: "Language",
    languageSub: "Arabic or English interface", temperature: "Creativity", temperatureSub: "Lower = precise, higher = more varied", clearData: "Delete all data",
    clearDataSub: "Clears local chats and settings, not downloaded model cache.", delete: "Delete", cancel: "Cancel", continue: "Continue", noChats: "No chats yet",
    you: "You", copied: "Copied", copy: "Copy", exportDone: "Chat exported", webgpuReady: "WebGPU is supported",
    webgpuReadySub: "MOAI can run models locally without an API or server.", webgpuMissing: "WebGPU is not available in this browser",
    webgpuMissingSub: "Use the latest Chrome or Edge on a WebGPU-capable device. Your messages will not be sent to a fallback server.", loadingRuntime: "Loading AI runtime…",
    modelReady: "Model ready", loadingModel: "Loading", generationError: "An error occurred while running the model", modelNotSupported: "This model is unavailable in the current runtime version.",
    deleteChatTitle: "Delete this chat?", deleteChatText: "This chat will be permanently removed from this device.", clearAllTitle: "Delete all MOAI data?",
    clearAllText: "All local chats and saved settings will be removed from this device.", newChatTitle: "New chat", untitled: "New chat",
    firstDownloadTitle: "Download model to your device", firstDownloadText: "This model will be downloaded once and stored locally in your browser cache. The download can be large depending on the model.",
    modelAuto: "Automatic", modelLocal: "Local models", deviceMemory: "Device memory", exportEmpty: "There is no chat to export", stop: "Stop",
    installUnavailable: "MOAI can be installed from your browser menu after opening it over HTTPS.", modelChanged: "Model changed", cannotShare: "Downloaded a Markdown copy instead.",
    unsupportedModel: "This model is not currently compatible; falling back to Llama 3.2 1B.", appName: "MOAI"
  }
};

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const els = {
  html: document.documentElement, sidebar: $("#sidebar"), backdrop: $("#mobileBackdrop"), openSidebar: $("#openSidebar"), closeSidebar: $("#closeSidebar"),
  newChatBtn: $("#newChatBtn"), brandHome: $("#brandHome"), chatList: $("#chatList"), modelPickerBtn: $("#modelPickerBtn"), selectedModelLabel: $("#selectedModelLabel"),
  modelMenu: $("#modelMenu"), themeBtn: $("#themeBtn"), settingsBtn: $("#settingsBtn"), settingsDialog: $("#settingsDialog"), languageSelect: $("#languageSelect"),
  temperatureRange: $("#temperatureRange"), temperatureValue: $("#temperatureValue"), clearDataBtn: $("#clearDataBtn"), confirmDialog: $("#confirmDialog"),
  confirmTitle: $("#confirmTitle"), confirmText: $("#confirmText"), confirmOk: $("#confirmOk"), emptyState: $("#emptyState"), messages: $("#messages"),
  viewport: $("#chatViewport"), webgpuStatus: $("#webgpuStatus"), form: $("#composerForm"), prompt: $("#promptInput"), sendBtn: $("#sendBtn"), runtimeBadge: $("#runtimeBadge"),
  modelProgress: $("#modelProgress"), progressText: $("#progressText"), progressPercent: $("#progressPercent"), progressBar: $("#progressBar"),
  shareBtn: $("#shareBtn"), installBtn: $("#installBtn"), toastRegion: $("#toastRegion")
};

let state = loadState();
let webllm = null;
let engine = null;
let loadedModelId = null;
let generating = false;
let pendingConfirm = null;
let installPrompt = null;
let webgpuOk = false;
let compatibleModelIds = null;

function defaultState() {
  return { theme: "dark", lang: "ar", selectedModel: "auto", temperature: 0.7, chats: [], activeChatId: null, confirmedModels: {} };
}
function loadState() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { ...defaultState(), ...(raw || {}), chats: Array.isArray(raw?.chats) ? raw.chats : [], confirmedModels: raw?.confirmedModels || {} };
  } catch { return defaultState(); }
}
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function t(key) { return I18N[state.lang]?.[key] ?? key; }
function uid() { return crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`; }
function activeChat() { return state.chats.find(c => c.id === state.activeChatId) || null; }
function formatVram(mb) { return mb ? (mb >= 1000 ? `≈ ${(mb/1024).toFixed(1)} GB VRAM` : `≈ ${mb} MB VRAM`) : ""; }
function autoModelId() {
  const mem = Number(navigator.deviceMemory || 4);
  if (mem >= 12) return "Phi-4-mini-instruct-q4f16_1-MLC";
  if (mem >= 8) return "Llama-3.2-3B-Instruct-q4f16_1-MLC";
  return "Llama-3.2-1B-Instruct-q4f16_1-MLC";
}
function resolvedModelId() { return state.selectedModel === "auto" ? autoModelId() : state.selectedModel; }
function getPreset(id) { return MODEL_PRESETS.find(m => m.id === id) || MODEL_PRESETS[1]; }

function applyAppearance() {
  els.html.dataset.theme = state.theme;
  els.html.lang = state.lang;
  els.html.dir = state.lang === "ar" ? "rtl" : "ltr";
  document.title = "MOAI — Local AI Chat";
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", state.theme === "dark" ? "#111214" : "#f8f8f7");
  $$('[data-i18n]').forEach(el => { const key = el.dataset.i18n; if (I18N[state.lang][key]) el.textContent = I18N[state.lang][key]; });
  $$('[data-i18n-placeholder]').forEach(el => { const key = el.dataset.i18nPlaceholder; if (I18N[state.lang][key]) el.placeholder = I18N[state.lang][key]; });
  els.languageSelect.value = state.lang;
  els.temperatureRange.value = state.temperature;
  els.temperatureValue.textContent = Number(state.temperature).toFixed(1);
  renderModelPicker();
  renderChatList();
  renderMessages();
  updateDeviceStatus();
}

function renderModelPicker() {
  const selected = state.selectedModel === "auto" ? MODEL_PRESETS[0] : getPreset(state.selectedModel);
  els.selectedModelLabel.textContent = selected.label;
  const parts = [];
  parts.push(`<div class="model-menu-heading">${escapeHtml(t("modelAuto"))}</div>`);
  parts.push(modelOptionHtml(MODEL_PRESETS[0]));
  parts.push(`<div class="model-menu-heading">${escapeHtml(t("modelLocal"))}</div>`);
  MODEL_PRESETS.slice(1).forEach(m => parts.push(modelOptionHtml(m)));
  els.modelMenu.innerHTML = parts.join("");
  $$(".model-option").forEach(btn => btn.addEventListener("click", () => selectModel(btn.dataset.modelId)));
}
function modelOptionHtml(m) {
  const desc = state.lang === "ar" ? m.descAr : m.descEn;
  const size = m.id === "auto" ? (navigator.deviceMemory ? `${t("deviceMemory")}: ${navigator.deviceMemory} GB` : "WebGPU") : formatVram(m.vram);
  return `<button class="model-option ${state.selectedModel===m.id?'selected':''}" type="button" role="option" aria-selected="${state.selectedModel===m.id}" data-model-id="${escapeAttr(m.id)}"><strong>${escapeHtml(m.label)}</strong><small>${escapeHtml(desc)}</small><span class="model-size">${escapeHtml(size)}</span></button>`;
}

async function selectModel(id) {
  state.selectedModel = id;
  saveState(); renderModelPicker(); hideModelMenu();
  if (resolvedModelId() !== loadedModelId) {
    engine = null; loadedModelId = null; els.runtimeBadge.textContent = "WebGPU";
  }
  toast(t("modelChanged"));
}

function renderChatList() {
  els.chatList.innerHTML = "";
  if (!state.chats.length) {
    const div = document.createElement("div"); div.className = "sidebar-empty"; div.textContent = t("noChats"); els.chatList.append(div); return;
  }
  [...state.chats].sort((a,b)=>b.updatedAt-a.updatedAt).forEach(chat => {
    const row = document.createElement("div"); row.className = `chat-item ${chat.id===state.activeChatId?'active':''}`;
    const open = document.createElement("button"); open.className = "chat-open"; open.type = "button"; open.textContent = chat.title || t("untitled");
    open.addEventListener("click", () => { state.activeChatId = chat.id; saveState(); renderChatList(); renderMessages(); closeMobileSidebar(); });
    const del = document.createElement("button"); del.className = "chat-delete"; del.type="button"; del.setAttribute("aria-label", t("delete"));
    del.innerHTML = '<svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13M10 11v5m4-5v5"/></svg>';
    del.addEventListener("click", (e)=>{ e.stopPropagation(); confirmAction(t("deleteChatTitle"), t("deleteChatText"), ()=>deleteChat(chat.id)); });
    row.append(open, del); els.chatList.append(row);
  });
}
function deleteChat(id) {
  state.chats = state.chats.filter(c=>c.id!==id);
  if (state.activeChatId === id) state.activeChatId = state.chats[0]?.id || null;
  saveState(); renderChatList(); renderMessages();
}
function newChat() {
  state.activeChatId = null; saveState(); renderChatList(); renderMessages(); els.prompt.focus(); closeMobileSidebar();
}
function ensureChat() {
  let chat = activeChat();
  if (!chat) {
    chat = { id: uid(), title: t("untitled"), createdAt: Date.now(), updatedAt: Date.now(), messages: [] };
    state.chats.push(chat); state.activeChatId = chat.id; saveState(); renderChatList();
  }
  return chat;
}
function titleFrom(text) { const s = text.replace(/\s+/g," ").trim(); return s.length > 42 ? s.slice(0,42)+"…" : s || t("untitled"); }

function renderMessages() {
  const chat = activeChat();
  const has = !!chat?.messages?.length;
  els.emptyState.hidden = has;
  els.messages.hidden = !has;
  els.messages.innerHTML = "";
  if (!has) return;
  chat.messages.forEach(msg => els.messages.append(createMessageEl(msg)));
  requestAnimationFrame(()=>{ els.viewport.scrollTop = els.viewport.scrollHeight; });
}
function createMessageEl(msg) {
  const wrap = document.createElement("article"); wrap.className = `message ${msg.role}`; wrap.dataset.messageId = msg.id;
  const avatar = document.createElement("div"); avatar.className = `avatar ${msg.role==='user'?'user-avatar':''}`;
  if (msg.role === "assistant") avatar.innerHTML = '<img src="./assets/logo.svg" alt="MOAI">'; else avatar.textContent = state.lang === "ar" ? "أنت" : "You";
  const body = document.createElement("div");
  const head = document.createElement("div"); head.className="message-head";
  const name = document.createElement("strong"); name.textContent = msg.role === "assistant" ? "MOAI" : t("you");
  const actions = document.createElement("div"); actions.className="message-actions";
  const copy = document.createElement("button"); copy.type="button"; copy.className="copy-message"; copy.textContent=t("copy"); copy.addEventListener("click", async()=>{ await copyText(msg.content); toast(t("copied")); });
  actions.append(copy); head.append(name, actions);
  const content = document.createElement("div"); content.className="message-content"; content.innerHTML = renderMarkdownSafe(msg.content || "");
  if (msg.streaming) { const cur=document.createElement("span"); cur.className="typing-cursor"; content.append(cur); }
  body.append(head, content); wrap.append(avatar, body); return wrap;
}

function escapeHtml(s="") { return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function escapeAttr(s="") { return escapeHtml(s); }
function renderMarkdownSafe(text="") {
  const blocks = [];
  let safe = String(text).replace(/```([^\n`]*)\n?([\s\S]*?)```/g, (_, lang, code) => {
    const token = `@@MOAIBLOCK${blocks.length}@@`;
    blocks.push(`<pre><code>${escapeHtml(code.replace(/\n$/, ""))}</code></pre>`); return token;
  });
  safe = escapeHtml(safe);
  safe = safe.replace(/^### (.+)$/gm,'<h3>$1</h3>').replace(/^## (.+)$/gm,'<h2>$1</h2>').replace(/^# (.+)$/gm,'<h1>$1</h1>');
  safe = safe.replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/`([^`\n]+)`/g,'<code class="inline-code">$1</code>');
  safe = safe.replace(/^&gt; (.+)$/gm,'<blockquote>$1</blockquote>');
  safe = safe.split(/\n{2,}/).map(chunk => {
    if (/^<(h\d|blockquote)/.test(chunk) || /@@MOAIBLOCK\d+@@/.test(chunk)) return chunk.replace(/\n/g,"<br>");
    if (/^(?:[-*] .+(?:\n|$))+/.test(chunk)) return `<ul>${chunk.split('\n').filter(Boolean).map(x=>`<li>${x.replace(/^[-*] /,'')}</li>`).join('')}</ul>`;
    if (/^(?:\d+\. .+(?:\n|$))+/.test(chunk)) return `<ol>${chunk.split('\n').filter(Boolean).map(x=>`<li>${x.replace(/^\d+\. /,'')}</li>`).join('')}</ol>`;
    return `<p>${chunk.replace(/\n/g,"<br>")}</p>`;
  }).join("");
  blocks.forEach((block,i)=>{ safe=safe.replace(`@@MOAIBLOCK${i}@@`,block); });
  return safe;
}

async function initWebGPU() {
  webgpuOk = !!navigator.gpu;
  updateDeviceStatus();
  if (webgpuOk) {
    try {
      const adapter = await navigator.gpu.requestAdapter();
      webgpuOk = !!adapter;
    } catch { webgpuOk = false; }
  }
  updateDeviceStatus();
  els.sendBtn.disabled = !webgpuOk;
}
function updateDeviceStatus() {
  if (!els.webgpuStatus) return;
  if (webgpuOk) {
    els.webgpuStatus.className="status-card good";
    els.webgpuStatus.innerHTML = `<span class="status-spinner"></span><div><strong>${escapeHtml(t("webgpuReady"))}</strong><small>${escapeHtml(t("webgpuReadySub"))} ${navigator.deviceMemory ? `· ${escapeHtml(t("deviceMemory"))}: ${navigator.deviceMemory} GB` : ''}</small></div>`;
  } else if (navigator.gpu === undefined) {
    els.webgpuStatus.className="status-card bad";
    els.webgpuStatus.innerHTML = `<span class="status-spinner"></span><div><strong>${escapeHtml(t("webgpuMissing"))}</strong><small>${escapeHtml(t("webgpuMissingSub"))}</small></div>`;
  }
}

async function ensureRuntime() {
  if (!webgpuOk) throw new Error(t("webgpuMissing"));
  if (!webllm) {
    showProgress(0, t("loadingRuntime"));
    webllm = await import(WEBLLM_CDN);
    compatibleModelIds = new Set((webllm.prebuiltAppConfig?.model_list || []).map(m=>m.model_id));
  }
  let modelId = resolvedModelId();
  if (compatibleModelIds && !compatibleModelIds.has(modelId)) {
    modelId = "Llama-3.2-1B-Instruct-q4f16_1-MLC";
    state.selectedModel = modelId; saveState(); renderModelPicker(); toast(t("unsupportedModel"));
  }
  if (engine && loadedModelId === modelId) return engine;

  const preset = getPreset(modelId);
  if (!state.confirmedModels[modelId]) {
    const ok = await askConfirm(t("firstDownloadTitle"), `${t("firstDownloadText")} ${formatVram(preset.vram)}.`);
    if (!ok) throw new Error("MODEL_DOWNLOAD_CANCELLED");
    state.confirmedModels[modelId] = true; saveState();
  }

  engine = await webllm.CreateMLCEngine(modelId, {
    initProgressCallback: (report) => {
      const p = Math.max(0, Math.min(1, Number(report.progress || 0)));
      showProgress(p, report.text || t("loadingModel"));
    }
  });
  loadedModelId = modelId;
  hideProgress();
  els.runtimeBadge.textContent = preset.label;
  toast(`${t("modelReady")}: ${preset.label}`);
  return engine;
}

function showProgress(value=0, text=t("preparingModel")) {
  els.modelProgress.hidden=false; const pct=Math.round(value*100); els.progressText.textContent=text; els.progressPercent.textContent=`${pct}%`; els.progressBar.style.width=`${pct}%`;
}
function hideProgress() { els.modelProgress.hidden=true; }

async function sendMessage(text) {
  const clean = text.trim(); if (!clean || generating) return;
  const chat = ensureChat();
  const isFirst = chat.messages.length === 0;
  const userMsg = { id: uid(), role:"user", content: clean, createdAt: Date.now() };
  const aiMsg = { id: uid(), role:"assistant", content:"", createdAt: Date.now(), streaming:true };
  chat.messages.push(userMsg, aiMsg); if (isFirst) chat.title=titleFrom(clean); chat.updatedAt=Date.now(); saveState(); renderChatList(); renderMessages();
  els.prompt.value=""; autoResize(); setGenerating(true);

  try {
    const eng = await ensureRuntime();
    const system = state.lang === "ar"
      ? "أنت MOAI، مساعد ذكاء اصطناعي مفيد ودقيق. أجب بلغة المستخدم. إذا لم تكن متأكدًا فقل ذلك بوضوح. استخدم Markdown عند الحاجة."
      : "You are MOAI, a helpful and precise AI assistant. Reply in the user's language. If uncertain, say so clearly. Use Markdown when useful.";
    const history = chat.messages.filter(m=>m.id!==aiMsg.id).slice(-14).map(m=>({role:m.role,content:m.content}));
    const stream = await eng.chat.completions.create({ messages: [{role:"system",content:system}, ...history], temperature: Number(state.temperature), stream: true });
    for await (const chunk of stream) {
      const delta = chunk.choices?.[0]?.delta?.content || "";
      if (delta) { aiMsg.content += delta; patchStreamingMessage(aiMsg); }
    }
    aiMsg.streaming=false; chat.updatedAt=Date.now(); saveState(); renderMessages(); renderChatList();
  } catch (err) {
    if (String(err?.message) === "MODEL_DOWNLOAD_CANCELLED") {
      chat.messages = chat.messages.filter(m=>m.id!==aiMsg.id);
    } else {
      aiMsg.streaming=false;
      aiMsg.content = `${t("generationError")}\n\n${err?.message || String(err)}`;
      toast(t("generationError"));
    }
    saveState(); renderMessages();
  } finally { hideProgress(); setGenerating(false); }
}
function patchStreamingMessage(msg) {
  const el = document.querySelector(`[data-message-id="${CSS.escape(msg.id)}"] .message-content`);
  if (!el) return;
  el.innerHTML = renderMarkdownSafe(msg.content) + '<span class="typing-cursor"></span>';
  els.viewport.scrollTop=els.viewport.scrollHeight;
}
function setGenerating(v) { generating=v; els.sendBtn.classList.toggle("generating",v); els.sendBtn.setAttribute("aria-label", v?t("stop"):"Send"); }
async function stopGeneration() { try { await engine?.interruptGenerate?.(); } catch {} }

function autoResize() { els.prompt.style.height="auto"; els.prompt.style.height=`${Math.min(els.prompt.scrollHeight,180)}px`; }
function toggleModelMenu() { const hidden=els.modelMenu.hidden; els.modelMenu.hidden=!hidden; els.modelPickerBtn.setAttribute("aria-expanded", String(hidden)); }
function hideModelMenu() { els.modelMenu.hidden=true; els.modelPickerBtn.setAttribute("aria-expanded","false"); }
function openMobileSidebar(){ els.sidebar.classList.remove("closed"); els.backdrop.hidden=false; }
function closeMobileSidebar(){ if(innerWidth<=820){ els.sidebar.classList.add("closed"); els.backdrop.hidden=true; } }
function toast(text) { const el=document.createElement("div"); el.className="toast"; el.textContent=text; els.toastRegion.append(el); setTimeout(()=>el.remove(),3000); }
async function copyText(text) { try { await navigator.clipboard.writeText(text); } catch { const ta=document.createElement('textarea'); ta.value=text; document.body.append(ta); ta.select(); document.execCommand('copy'); ta.remove(); } }

function confirmAction(title, text, action) { pendingConfirm=action; els.confirmTitle.textContent=title; els.confirmText.textContent=text; els.confirmDialog.showModal(); }
function askConfirm(title, text) {
  return new Promise(resolve => {
    els.confirmTitle.textContent=title; els.confirmText.textContent=text; els.confirmDialog.showModal();
    const onClose=()=>{ els.confirmDialog.removeEventListener("close",onClose); resolve(els.confirmDialog.returnValue==="default"); };
    els.confirmDialog.addEventListener("close",onClose);
  });
}

function exportChat() {
  const chat=activeChat(); if(!chat?.messages?.length){toast(t("exportEmpty"));return;}
  let md=`# ${chat.title}\n\n> MOAI Local AI Chat\n\n`;
  for(const m of chat.messages){md+=`## ${m.role==='assistant'?'MOAI':t('you')}\n\n${m.content}\n\n`;}
  const blob=new Blob([md],{type:"text/markdown;charset=utf-8"}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=`MOAI-${slug(chat.title)}.md`; a.click(); URL.revokeObjectURL(url); toast(t("exportDone"));
}
function slug(s){return s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu,'-').replace(/^-|-$/g,'').slice(0,50)||'chat';}

function wireEvents() {
  els.form.addEventListener("submit", e=>{e.preventDefault(); if(generating){stopGeneration();return;} sendMessage(els.prompt.value);});
  els.prompt.addEventListener("input",autoResize);
  els.prompt.addEventListener("keydown", e=>{ if(e.key==="Enter"&&!e.shiftKey&&!e.isComposing){e.preventDefault(); if(!generating) sendMessage(els.prompt.value);} });
  els.newChatBtn.addEventListener("click",newChat); els.brandHome.addEventListener("click",newChat);
  els.modelPickerBtn.addEventListener("click",e=>{e.stopPropagation();toggleModelMenu();}); document.addEventListener("click",e=>{if(!els.modelMenu.contains(e.target)&&!els.modelPickerBtn.contains(e.target))hideModelMenu();});
  els.themeBtn.addEventListener("click",()=>{state.theme=state.theme==='dark'?'light':'dark';saveState();applyAppearance();});
  els.settingsBtn.addEventListener("click",()=>{els.settingsDialog.showModal();closeMobileSidebar();});
  els.languageSelect.addEventListener("change",()=>{state.lang=els.languageSelect.value;saveState();applyAppearance();});
  els.temperatureRange.addEventListener("input",()=>{state.temperature=Number(els.temperatureRange.value);els.temperatureValue.textContent=state.temperature.toFixed(1);saveState();});
  els.clearDataBtn.addEventListener("click",()=>confirmAction(t("clearAllTitle"),t("clearAllText"),()=>{localStorage.removeItem(STORAGE_KEY);state=defaultState();applyAppearance();els.settingsDialog.close();toast(t("delete"));}));
  els.confirmDialog.addEventListener("close",()=>{if(els.confirmDialog.returnValue==="default"&&pendingConfirm){const fn=pendingConfirm;pendingConfirm=null;fn();}else pendingConfirm=null;});
  els.shareBtn.addEventListener("click",exportChat);
  els.openSidebar.addEventListener("click",openMobileSidebar); els.closeSidebar.addEventListener("click",closeMobileSidebar); els.backdrop.addEventListener("click",closeMobileSidebar);
  $$(".suggestion").forEach(btn=>btn.addEventListener("click",()=>{els.prompt.value=state.lang==='ar'?btn.dataset.promptAr:btn.dataset.promptEn;autoResize();els.prompt.focus();}));
  window.addEventListener("resize",()=>{if(innerWidth>820){els.sidebar.classList.remove("closed");els.backdrop.hidden=true;}else if(!els.backdrop.hidden){}else els.sidebar.classList.add("closed");});
  window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();installPrompt=e;els.installBtn.hidden=false;});
  els.installBtn.addEventListener("click",async()=>{if(installPrompt){installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;els.installBtn.hidden=true;}else toast(t("installUnavailable"));});
}

async function boot() {
  applyAppearance(); wireEvents(); autoResize();
  if(innerWidth<=820) els.sidebar.classList.add("closed");
  if('serviceWorker' in navigator) { try { await navigator.serviceWorker.register('./sw.js'); } catch(e) { console.warn('SW',e); } }
  await initWebGPU();
}
boot();
