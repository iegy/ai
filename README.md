# MOAI

**MOAI** is a private, multi-model AI chat that runs models directly inside the browser. Version 1.1 adds an automatic **CPU/WASM fallback**, so a visitor can still use MOAI when WebGPU is unavailable.

No backend, database, API key, or paid AI service is required.

## Included

- Automatic runtime detection: WebGPU when available, CPU/WASM fallback otherwise
- Explicit **Download & prepare model** button with progress percentage
- CPU fallback: Qwen 2.5 0.5B Instruct via Transformers.js + ONNX Runtime Web
- WebGPU models: Llama 3.2 1B / 3B, Phi 3.5 Mini, Phi 4 Mini, DeepSeek R1 Distill Qwen 7B
- Streaming responses on both runtimes
- Arabic RTL + English LTR
- Dark / Light themes
- Local chat history
- Markdown/code rendering
- Export chat to Markdown
- PWA install support
- Responsive mobile/desktop interface
- GitHub Pages deployment workflow
- No analytics and no external conversation API

## Publish on GitHub Pages

1. Upload all files in this folder to the **root** of a GitHub repository.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Push/upload the files. The included workflow deploys MOAI automatically.

## How runtime selection works

- If WebGPU is available, **Auto** selects a WebGPU model based on reported device memory.
- If WebGPU is unavailable, **Auto** selects **Qwen 2.5 0.5B** in CPU/WASM mode.
- GPU-only models are visibly disabled when WebGPU is unavailable.
- CPU/WASM is slower than WebGPU, but it keeps inference local and requires no server.

The CPU model is downloaded from Hugging Face the first time it is prepared and is cached by the browser. The q4 model download is roughly 800 MB plus small tokenizer/config files.

## Privacy

Chat messages are stored only in the browser's local storage. Inference happens locally in the browser. Model/runtime files are fetched from their public CDNs/model hosts; conversation text is not sent to an AI inference endpoint.

## Technology

- HTML / CSS / JavaScript (static)
- WebLLM for WebGPU models
- Transformers.js 3.8.1 + ONNX Runtime Web for CPU/WASM fallback
- Web Worker for CPU generation so the UI stays responsive
- Browser caching for downloaded model artifacts
- GitHub Pages

## License

MIT


## v1.2 low-memory fix

- Auto CPU fallback now uses MOAI Lite (SmolLM2 135M q4, about 182 MB) instead of Qwen 0.5B (~786 MB q4).
- Qwen remains optional on devices reporting at least 8 GB memory.
- CPU/WASM is forced to one thread to reduce peak memory.
- CPU chat history and generated token limits are reduced to keep memory stable.
