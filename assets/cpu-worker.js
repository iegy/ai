const TRANSFORMERS_CDN = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1';

let transformers = null;
let generator = null;
let loadedModel = null;
let loadingPromise = null;

function post(type, payload = {}) {
  self.postMessage({ type, ...payload });
}

async function loadModel(modelId) {
  if (generator && loadedModel === modelId) return generator;
  if (loadingPromise && loadedModel === modelId) return loadingPromise;

  loadedModel = modelId;
  loadingPromise = (async () => {
    if (!transformers) {
      post('status', { text: 'Loading CPU/WASM runtime…' });
      transformers = await import(TRANSFORMERS_CDN);
    }

    const { pipeline } = transformers;
    generator = await pipeline('text-generation', modelId, {
      device: 'wasm',
      dtype: 'q4',
      progress_callback: (info) => {
        if (info.status === 'progress_total' && Number.isFinite(info.progress)) {
          post('progress', { progress: info.progress / 100, text: 'Downloading model…' });
        } else if (info.status === 'progress' && Number.isFinite(info.progress)) {
          post('progress', { progress: info.progress / 100, text: info.file ? `Downloading ${info.file}` : 'Downloading model…' });
        } else if (info.status === 'ready') {
          post('progress', { progress: 1, text: 'Model ready' });
        }
      },
    });
    return generator;
  })();

  try {
    return await loadingPromise;
  } finally {
    loadingPromise = null;
  }
}

async function generate(requestId, modelId, messages, options = {}) {
  const pipe = await loadModel(modelId);
  const { TextStreamer } = transformers;
  const streamer = new TextStreamer(pipe.tokenizer, {
    skip_prompt: true,
    skip_special_tokens: true,
    callback_function: (text) => {
      if (text) post('token', { requestId, text });
    },
  });

  const temperature = Number(options.temperature ?? 0.7);
  await pipe(messages, {
    max_new_tokens: Number(options.max_new_tokens ?? 256),
    do_sample: temperature > 0.05,
    temperature: Math.max(0.1, temperature),
    top_p: 0.9,
    repetition_penalty: 1.08,
    streamer,
  });
  post('done', { requestId });
}

self.addEventListener('message', async (event) => {
  const data = event.data || {};
  try {
    if (data.type === 'load') {
      await loadModel(data.modelId);
      post('ready', { modelId: data.modelId });
      return;
    }
    if (data.type === 'generate') {
      await generate(data.requestId, data.modelId, data.messages || [], data.options || {});
      return;
    }
    if (data.type === 'dispose') {
      try { await generator?.dispose?.(); } catch {}
      generator = null;
      loadedModel = null;
      post('disposed');
    }
  } catch (error) {
    post('error', {
      requestId: data.requestId || null,
      message: error?.message || String(error),
      stack: error?.stack || '',
    });
  }
});
