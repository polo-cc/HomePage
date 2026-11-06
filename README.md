# DrToB Systems, Inc. (drtob.com)

**DrToB Systems, Inc.** — The Production Runtime for Enterprise AI Agents.  
Headquartered at **525 Market Street, 32nd Floor, San Francisco, CA 94105, USA**.  
Deploy autonomous agent workflows that never break. Replace unpredictable prompt chains with deterministic state machines, dual-model verification, and zero data retention.

---

## 🏛️ Enterprise Architecture & Standards

* **Entity**: DrToB Systems, Inc. (San Francisco, CA)
* **Domain**: `drtob.com`
* **Core Product**: DrToB Enterprise Platform v3.4
* **Security Substrate**: FIPS 140-3 Encryption, TLS 1.3 / ECH, Zero Third-Party Data Retention (ZDR) SLA, Hardware-Isolated Memory Enclaves
* **Compliance Standards**: SOC 2 Type II Architecture, HIPAA & GDPR Zero-Storage Alignment, 99.995% Enterprise SLA

---

## 🚀 Avant-Garde Frontend & Kinetic Interactivity Highlights

1. **60 FPS Interactive Neural Physics Mesh (`#neural-canvas`)**:
   - Real-time physics engine: particles react dynamically with fluid repulsion to cursor movements.
   - Global click shockwaves: clicking anywhere on the screen generates acoustic ripple rings that push nearby nodes and propagate data pulses.
2. **3D Kinetic Mouse Tilt with Dynamic Specular Glare (`.tilt-card`)**:
   - Cards dynamically compute 3D perspective orientation on hover (`perspective(1000px) rotateX(...) rotateY(...)`).
   - Real-time specular shimmer glare reflection follows the cursor coordinates across metallic borders.
3. **Animated SVG Circuit Bus**:
   - Visual data stream connecting the 4 pipeline stages with traveling laser pulses during consensus runs.
4. **Native Web Audio API Synthesizer (`assets/js/hardware-audio.js`)**:
   - 100% Native Web Audio synthesis (zero audio files to download, zero latency).
   - Generates tactile mechanical switch clicks, frequency chirps, and C-Major cryptographic commit arpeggio chimes.
   - Toggle audio ON/OFF in the top ticker bar.
5. **Offline Pure JS SHA-256 Engine**:
   - Computes genuine 256-bit cryptographic state proofs offline without relying on network or `crypto.subtle`.
6. **Live Interactive CLI Terminal REPL**:
   - Allows users to switch commands (`drtob verify`, `drtob cluster`, `drtob workflow`) and inspect animated live execution logs.
7. **Distinctive Non-AI Aesthetics**:
   - **Colors**: Deep Volcanic Obsidian (`#090807`) + Liquid Solar Amber (`#FF5500`) + Cyber Acid Lime (`#D4FF00`).
   - **Typography**: Tall, athletic, muscular, razor-sharp typeface (`Chivo` 900 Italic + `Space Mono`).
   - **100% Self-Contained**: ZERO blocking external CDNs. Instant rendering worldwide.

---

## 🛠️ Local Instant Preview

```bash
# In project root:
python -m http.server 3000
# Open http://localhost:3000
```
> **Browser Cache Tip**: If you had a previous version open, press **`Ctrl + F5`** to force a hard cache refresh.

---

## ☁️ Cloudflare Workers Deployment

The project is fully compatible with Cloudflare Workers / Pages for static deployment:

```bash
# Authenticate
npx wrangler login

# Simulate locally
npx wrangler dev

# Deploy globally
npx wrangler deploy
```

### Domain Binding (`drtob.com`):
Cloudflare Dashboard -> **Workers & Pages** -> `drtob-web` -> **Settings** -> **Domains & Routes** -> Add `drtob.com` and `www.drtob.com`.
