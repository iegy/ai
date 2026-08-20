# MOAI

**MOAI** is a private, multi-model AI chat that runs LLMs directly inside the browser with WebGPU.

No backend, no database, no API keys, and no paid hosting are required.

## Included

- Multi-model selector + automatic device-aware mode
- Llama 3.2 1B / 3B
- Phi 3.5 Mini / Phi 4 Mini
- DeepSeek R1 Distill Qwen 7B
- Streaming responses
- Arabic RTL + English LTR
- Dark / Light themes
- Local chat history
- Markdown/code rendering
- Export chat to Markdown
- PWA install support
- Responsive mobile/desktop interface
- GitHub Pages deployment workflow
- No analytics and no external AI API

## Publish on GitHub Pages

1. Upload all files in this folder to the **root** of a GitHub repository.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Push/upload the files. The included workflow deploys MOAI automatically.

That is all the code setup required.

## Browser requirements

MOAI uses WebGPU. A recent Chromium-based browser such as Chrome or Edge is recommended. Model files are downloaded on first use and cached by the browser. Large models require more GPU/system memory.

## Privacy

Chat messages are saved only in the browser's `localStorage`. AI inference runs locally using WebLLM. MOAI has no backend endpoint for conversations.

## Technology

- HTML / CSS / JavaScript (static)
- WebLLM (`@mlc-ai/web-llm`) loaded as an ES module from its CDN
- WebGPU
- Browser Cache API for model artifacts (managed by WebLLM)
- GitHub Pages

## License

MIT
