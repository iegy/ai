const TRANSFORMERS_CDN = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1';

let transformers = null;
let generator = null;
let loadedModel = null;
let loadedDtype = null;
let loadingPromise = null;

function post(type, payload = {}) {
  self.postMessage({ type, ...payload });
}

async function ensureTransformers() {
  if (transformers) return transformers;
  post('status', { text: 'Loading CPU/WASM runtime…' });
  transformers = await import(TRANSFORMERS_CDN);

  // Conservative settings to reduce peak memory on low-RAM browsers.
  try {
    const env = transformers.env;
    if (env?.backends?.onnx?.wasm) {
      env.backends.onnx.wasm.numThreads = 1;
      env.backends.onnx.wasm.proxy = false;
    }
  } catch {}

  return transformers;
}

async function loadModel(modelId, dtype = 'q4') {
  if (generator && loadedModel === modelId && loadedDtype === dtype) return generator;
  if (loadingPromise && loadedModel === modelId && loadedDtype === dtype) return loadingPromise;

  loadingPromise = (async () => {
    const tf = await ensureTransformers();

    if (generator && (loadedModel !== modelId || loadedDtype !== dtype)) {
      try { await generator.dispose?.(); } catch {}
      generator = null;
    }

    loadedModel = modelId;
    loadedDtype = dtype;
    const { pipeline } = tf;

    generator = await pipeline('text-generation', modelId, {
      device: 'wasm',
      dtype,
      progress_callback: (info) => {
        const progress = Number(info?.progress);
        if ((info?.status === 'progress_total' || info?.status === 'progress') && Number.isFinite(progress)) {
          const p = Math.max(0, Math.min(1, progress / 100));
          const text = info?.file ? `Downloading ${info.file}` : 'Downloading model…';
          post('progress', { progress: p, text });
          if (p >= 0.999) post('status', { text: 'Loading model into memory…' });
        } else if (info?.status === 'ready') {
          post('progress', { progress: 1, text: 'Model ready' });
        }
      },
    });

    return generator;
  })();

  try {
    const result = await loadingPromise;
    post('ready', { modelId, dtype });
    return result;
  } finally {
    loadingPromise = null;
  }
}

async function generate(requestId, modelId, dtype, messages, options = {}) {
  const pipe = await loadModel(modelId, dtype || 'q4');
  const { TextStreamer } = transformers;

  const streamer = new TextStreamer(pipe.tokenizer, {
    skip_prompt: true,
    skip_special_tokens: true,
    callback_function: (text) => {
      if (text) post('token', { requestId, text });
    },
  });

  const temperature = Number(options.temperature ?? 0.7);
  const maxNewTokens = Math.min(192, Math.max(32, Number(options.max_new_tokens ?? 128)));

  await pipe(messages, {
    max_new_tokens: maxNewTokens,
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
      await loadModel(data.modelId, data.dtype || 'q4');
      return;
    }
    if (data.type === 'generate') {
      await generate(data.requestId, data.modelId, data.dtype || 'q4', data.messages || [], data.options || {});
      return;
    }
    if (data.type === 'dispose') {
      try { await generator?.dispose?.(); } catch {}
      generator = null;
      loadedModel = null;
      loadedDtype = null;
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
