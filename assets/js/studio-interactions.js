/**
 * DrToB Systems — Studio Controller, 3D Kinetic Tilt & Interactive Terminal
 * 100% Clean, Rigorous Enterprise Copy & Cryptographic State Machine
 */

// 1. Pure JS SHA-256 Engine (Guaranteed to work in non-secure file:/// context)
function computeSha256(ascii) {
  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }
  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  let lengthProperty = 'length';
  let i, j;
  let result = '';
  let words = [];
  let asciiBitLength = ascii[lengthProperty] * 8;
  let hash = [];
  let k = [];
  let primeCounter = 0;
  let isComposite = {};

  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) {
        isComposite[i] = candidate;
      }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }

  ascii += '\x80';
  while ((ascii[lengthProperty] % 64) - 56) ascii += '\x00';
  for (i = 0; i < ascii[lengthProperty]; i++) {
    j = ascii.charCodeAt(i);
    words[i >> 2] |= j << (((3 - i) % 4) * 8);
  }
  words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
  words[words[lengthProperty]] = asciiBitLength;

  for (j = 0; j < words[lengthProperty];) {
    let w = words.slice(j, (j += 16));
    let oldHash = hash;
    hash = hash.slice(0, 8);

    for (i = 0; i < 64; i++) {
      let w15 = w[i - 15], w2 = w[i - 2];
      let s0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3);
      let s1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10);
      let ch = (hash[4] & hash[5]) ^ (~hash[4] & hash[6]);
      let maj = (hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2]);
      let temp1 = hash[7] + (rightRotate(hash[4], 6) ^ rightRotate(hash[4], 11) ^ rightRotate(hash[4], 25)) + ch + k[i] + (w[i] = (i < 16) ? w[i] : (w[i - 16] + s0 + w[i - 7] + s1) | 0);
      let temp2 = (rightRotate(hash[0], 2) ^ rightRotate(hash[0], 13) ^ rightRotate(hash[0], 22)) + maj;

      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
    }
    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }

  for (i = 0; i < 8; i++) {
    for (let b = 3; b >= 0; b--) {
      let byte = (hash[i] >> (b * 8)) & 255;
      result += (byte < 16 ? '0' : '') + byte.toString(16);
    }
  }
  return '0x' + result;
}

// 2. 3D Kinetic Tilt with Smooth Interpolation
function init3DTilt() {
  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach(card => {
    if (!card.querySelector('.specular-glare')) {
      const glare = document.createElement('div');
      glare.className = 'specular-glare';
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

// 3. Four-Step Enterprise Agent Pipeline Definition
const studioSteps = [
  {
    step: '01',
    name: 'Multi-Modal Ingestion',
    sub: 'Schema Parsing & Intent Routing',
    latency: '2.8 ms',
    color: '#FF5500',
    tag: 'Schema Parsed',
    specs: {
      runtime: 'DrToB Intent Router',
      memory: '2.8 MB',
      protocol: 'gRPC / OpenAPI 3.1',
      validation: 'Strict Schema Match'
    },
    payload: {
      "transaction_id": "tx_drtob_8829104",
      "workflow_target": "financial_treasury_settlement",
      "assigned_agents": ["agent_risk_primary", "agent_aml_compliance"],
      "dispatch_overhead_ms": 2.8
    }
  },
  {
    step: '02',
    name: 'Privacy Shield & Sandbox',
    sub: 'Context Grounding & PII Redaction',
    latency: '1.9 ms',
    color: '#D4FF00',
    tag: 'Zero Data Storage',
    specs: {
      runtime: 'Confidential Memory Sandbox',
      memory: '1.8 MB',
      encryption: 'FIPS-140-3 Compliant',
      data_retention_sla: 'ZERO_STORAGE_GUARANTEE'
    },
    payload: {
      "sanitized_tokens": 142,
      "pii_risk_score": 0.0000,
      "memory_quarantine": "ISOLATED_CLEAR_ON_EXIT",
      "third_party_persistence": false
    }
  },
  {
    step: '03',
    name: 'Dual-Agent Verification',
    sub: 'Adversarial Cross-Check & Fact Grounding',
    latency: '7.2 ms',
    color: '#FF9900',
    tag: 'Zero Hallucination',
    specs: {
      runtime: 'Multi-Model Consensus Arbiter',
      memory: '5.4 MB',
      divergence_tolerance: '0.00%',
      arbitration_rule: 'Dual-Blind Quorum Agreement'
    },
    payload: {
      "models_cross_verified": ["agent_primary_risk", "agent_shadow_compliance"],
      "discrepancy_delta": 0.0000,
      "consensus_unanimous": true,
      "verdict": "TRANSACTION_APPROVED"
    }
  },
  {
    step: '04',
    name: 'Deterministic Audit Commit',
    sub: 'Invariant Bounds & Cryptographic State Proof',
    latency: '1.6 ms',
    color: '#00FF88',
    tag: 'Immutable Receipt',
    specs: {
      runtime: 'Deterministic AST Verifier',
      memory: '2.2 MB',
      rollback_ready: 'ACID-Compliant',
      total_wall_clock: '13.5 ms'
    },
    payload: {
      "ledger_proof_hash": "0x89f41b9921e4a77bc89d201cba64f8e91",
      "total_latency_ms": 13.5,
      "state_commitment": "IMMUTABLE_DELIVERED",
      "receipt_token": "rcpt_drtob_77189a"
    }
  }
];

let activeStepIdx = 0;
let isPipelineRunning = false;

function initPipelineStudio() {
  renderPipelineTiles();
  selectPipelineStep(0);
}

function renderPipelineTiles() {
  const container = document.getElementById('pipeline-tiles-container');
  if (!container) return;

  container.innerHTML = studioSteps.map((s, idx) => `
    <div
      id="node-tile-${idx}"
      onclick="selectPipelineStep(${idx})"
      class="node-tile tilt-card ${idx === activeStepIdx ? 'active' : ''}"
    >
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span style="font-family: var(--font-mono); font-size: 10px; font-weight: 700; color: var(--accent-solar);">[STEP ${s.step}]</span>
        <span style="font-family: var(--font-mono); font-size: 10px; color: ${s.color}; font-weight: 700;">${s.latency}</span>
      </div>
      <div style="font-weight: 800; color: var(--text-ivory); font-size: 13px; font-family: var(--font-hero); text-transform: uppercase;">${s.name}</div>
      <div style="font-size: 11px; color: var(--text-dim); margin-top: 4px;">${s.sub}</div>

      <div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid var(--border-line); display: flex; justify-content: space-between; font-size: 10px; font-family: var(--font-mono); color: var(--text-dim);">
        <span style="display: flex; align-items: center; gap: 5px;">
          <span style="width: 5px; height: 5px; border-radius: 50%; background: ${s.color};"></span>
          ${s.tag}
        </span>
        <span style="color: var(--text-ivory);">&rarr;</span>
      </div>
    </div>
  `).join('');

  init3DTilt();
}

function selectPipelineStep(index) {
  activeStepIdx = index;
  const s = studioSteps[index];

  studioSteps.forEach((_, idx) => {
    const el = document.getElementById(`node-tile-${idx}`);
    if (el) {
      if (idx === index) el.classList.add('active');
      else el.classList.remove('active');
    }
  });

  const nameEl = document.getElementById('inspect-step-name');
  const subEl = document.getElementById('inspect-step-sub');
  const latEl = document.getElementById('inspect-step-lat');
  const rtEl = document.getElementById('inspect-step-rt');
  const memEl = document.getElementById('inspect-step-mem');
  const jsonEl = document.getElementById('inspect-step-json');

  if (nameEl) nameEl.innerText = `[STEP ${s.step}] ${s.name}`;
  if (subEl) subEl.innerText = `${s.sub} • ${s.tag}`;
  if (latEl) latEl.innerText = s.latency;
  if (rtEl) rtEl.innerText = s.specs.runtime;
  if (memEl) memEl.innerText = s.specs.memory;
  if (jsonEl) jsonEl.innerText = JSON.stringify(s.payload, null, 2);

  if (window.playHapticBlip) {
    window.playHapticBlip(720, 0.04);
  }
}

async function runLivePipeline() {
  if (isPipelineRunning) return;
  isPipelineRunning = true;

  const btn = document.getElementById('btn-run-pipeline');
  const beacon = document.getElementById('workbench-beacon');
  const statusLabel = document.getElementById('workbench-status-label');
  const circuitBus = document.getElementById('circuit-bus-path');

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span>Verifying Workflow...</span>`;
  }
  if (beacon) beacon.className = 'beacon-dot orange';
  if (statusLabel) statusLabel.innerText = 'VERIFICATION_IN_PROGRESS';
  if (circuitBus) circuitBus.classList.add('active');

  // Trigger background neural mesh gravitational implosion
  if (window.triggerParticleImplosion) {
    window.triggerParticleImplosion();
  }

  for (let i = 0; i < studioSteps.length; i++) {
    selectPipelineStep(i);
    const tile = document.getElementById(`node-tile-${i}`);
    if (tile) tile.classList.add('firing');

    if (window.playHapticBlip) {
      window.playHapticBlip(440 + i * 140, 0.08);
    }

    await new Promise(r => setTimeout(r, 400));
    if (tile) tile.classList.remove('firing');
  }

  // Play C Major success chime
  if (window.playSuccessChime) {
    window.playSuccessChime();
  }

  // Compute live cryptographic SHA-256 hash
  const realHash = computeSha256(`DRTOB-AGENT-RUN-${Date.now()}`);
  studioSteps[3].payload.ledger_proof_hash = realHash;
  selectPipelineStep(3);

  if (beacon) beacon.className = 'beacon-dot';
  if (statusLabel) statusLabel.innerText = 'VERIFIED & COMMITTED // 13.5ms';
  if (circuitBus) circuitBus.classList.remove('active');

  if (btn) {
    btn.disabled = false;
    btn.innerHTML = `<span>Execute Live Pipeline</span>`;
  }

  isPipelineRunning = false;
}

// 4. Live Interactive CLI Terminal REPL
const cliCommands = {
  test: `$ drtob verify --strict-quorum --workflow treasury
[INIT] Dispatching verification across 3 isolated model enclaves...
[NODE 01] RiskEvaluator: 0.00 anomaly score [PASS]
[NODE 02] AMLCompliance: Zero rule violations [PASS]
[NODE 03] StateAuditor: Schema bounds validated [PASS]
[SUCCESS] Multi-model consensus reached in 12.4ms. Hash: 0x89f41b...committed.`,

  status: `$ drtob cluster --status --all
WORKLOAD                    ACCURACY   AGENTS   QUORUM    STATE
Treasury Reconciliation     99.99%     3/3      STRICT    ACTIVE_OK
Regulatory & AML Audit      100%       4/4      STRICT    ACTIVE_OK
Cloud Infrastructure AIOps  98.4%      2/2      BALANCED  ACTIVE_OK
Supply Chain Balancing      99.2%      3/3      STRICT    ACTIVE_OK
Contract Invariant Engine   100%       3/3      STRICT    ACTIVE_OK`,

  reconcile: `$ drtob workflow dispatch --file ./settlement.json
[INGRESS] Transaction payload parsed and validated in 2.8ms.
[SHIELD] 142 tokens de-identified. Zero third-party persistence.
[CONSENSUS] Cross-model reconciliation verified (discrepancy: 0.0000).
[AUDIT] Immutable proof transmitted to enterprise VPC webhook (HTTP 200).`
};

function switchCliCommand(cmd) {
  ['test', 'status', 'reconcile'].forEach(c => {
    const btn = document.getElementById(`cli-btn-${c}`);
    if (btn) {
      if (c === cmd) btn.classList.add('active');
      else btn.classList.remove('active');
    }
  });

  const term = document.getElementById('cli-output-text');
  if (term) {
    term.textContent = cliCommands[cmd];
  }
}

// 5. Enterprise Workload Benchmarks Matrix
const enterpriseWorkloads = [
  { code: 'TREASURY', name: 'Financial Reconciliation', metric: '99.99%', tag: '0.00% DRIFT' },
  { code: 'COMPLIANCE', name: 'AML & Regulatory Audit', metric: '100%', tag: 'REAL-TIME' },
  { code: 'AIOPS', name: 'Cloud Incident Auto-Heal', metric: '2.1 MIN', tag: 'MTTR REDUCED' },
  { code: 'OPERATIONS', name: 'Supply Chain Resiliency', metric: '99.4%', tag: '-42% STOCKOUT' },
  { code: 'CONTRACTS', name: 'Legal Invariant Engine', metric: '100%', tag: 'SCHEMA BOUND' },
  { code: 'ROUTING', name: 'Model Routing & Cost Arbiter', metric: '-64%', tag: 'TOKEN SAVINGS' }
];

function initWorkloadMatrix() {
  const container = document.getElementById('workload-matrix-container');
  if (!container) return;

  container.innerHTML = enterpriseWorkloads.map((w, i) => `
    <div class="flight-card tilt-card">
      <div>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <span style="color: var(--accent-solar); font-weight: 700;">[0${i + 1}]</span>
          <span style="font-weight: 800; color: var(--text-ivory); font-size: 13px;">${w.code}</span>
        </div>
        <div style="color: var(--text-dim); font-size: 11px;">${w.name}</div>
      </div>
      <div style="text-align: right;">
        <div style="font-weight: 800; color: var(--accent-acid); font-size: 15px; font-family: var(--font-hero);">${w.metric}</div>
        <div style="font-size: 10px; color: var(--text-dim); border: 1px solid var(--border-line); padding: 1px 6px; border-radius: 4px; margin-top: 2px;">${w.tag}</div>
      </div>
    </div>
  `).join('');

  init3DTilt();
}

// 6. Multi-Language Code Sandbox
const codeSnippets = {
  ts: `import { DrToBKernel, EnclavePolicy } from '@drtob/runtime';

export default {
  async handleTransaction(req: Request): Promise<Response> {
    // 1. Initialize deterministic enterprise state runtime
    const kernel = new DrToBKernel({
      apiKey: process.env.DRTOB_SECRET_KEY,
      strictQuorum: true,
      idempotencyKey: req.headers.get('x-idempotency-key')
    });

    // 2. Execute parallel consensus across agent cluster
    const receipt = await kernel.arbitrate({
      workflow: 'cross_border_treasury_settlement',
      maxLatencyMs: 200,
      payload: await req.json()
    });

    // 3. Return cryptographically attested state proof
    return Response.json({
      committed: true,
      proofHash: receipt.sha256Proof,
      verdict: receipt.state
    });
  }
};`,
  py: `import os
from drtob import DrToBClient

# Initialize client with strict zero data retention policy
client = DrToBClient(
    api_key=os.environ["DRTOB_SECRET_KEY"],
    strict_consensus=True,
    zero_retention=True
)

@client.workflow("treasury_settlement")
async def handle_treasury_transaction(payload: dict) -> dict:
    session = await client.orchestrate(
        task="financial_reconciliation",
        timeout_ms=300,
        payload=payload
    )
    return {
        "status": session.verdict,
        "proof_hash": session.sha256_attestation,
        "latency_ms": session.trace_latency
    }`,
  curl: `curl -X POST https://api.drtob.com/v1/consensus/orchestrate \\
  -H "Authorization: Bearer drtob_live_sec_99182" \\
  -H "Content-Type: application/json" \\
  -H "X-Idempotency-Key: idemp_88291024" \\
  -d '{
    "workflow": "cross_border_treasury_settlement",
    "enclave": "hardware_attested",
    "quorum": "byzantine_strict",
    "zero_retention": true
  }'`
};

function switchCodeTab(lang) {
  ['ts', 'py', 'curl'].forEach(l => {
    const btn = document.getElementById(`tab-btn-${l}`);
    if (btn) {
      if (l === lang) btn.classList.add('active');
      else btn.classList.remove('active');
    }
  });

  const display = document.getElementById('code-display-block');
  if (display) {
    display.textContent = codeSnippets[lang];
  }
}

function copyCodeSnippet() {
  const display = document.getElementById('code-display-block');
  if (!display) return;

  navigator.clipboard.writeText(display.textContent);
  const copyBtn = document.getElementById('code-copy-text');
  if (copyBtn) {
    copyBtn.innerText = 'Copied!';
    setTimeout(() => {
      copyBtn.innerText = 'Copy Code';
    }, 2000);
  }
}

// 7. Modal Handling
function openContactModal() {
  const modal = document.getElementById('contact-modal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeContactModal() {
  const modal = document.getElementById('contact-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeContactModal();
});

function handleModalSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('modal-form');
  const ack = document.getElementById('modal-ack');

  if (form && ack) {
    form.style.display = 'none';
    ack.style.display = 'block';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  init3DTilt();
  initPipelineStudio();
  initWorkloadMatrix();
});

window.selectPipelineStep = selectPipelineStep;
window.runLivePipeline = runLivePipeline;
window.switchCliCommand = switchCliCommand;
window.switchCodeTab = switchCodeTab;
window.copyCodeSnippet = copyCodeSnippet;
window.openContactModal = openContactModal;
window.closeContactModal = closeContactModal;
window.handleModalSubmit = handleModalSubmit;
