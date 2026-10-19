// Termos sensíveis e proibidos (Compliance TikTok / Redes Sociais)
const PROHIBITED_WORDS = ['cura', 'emagrece', 'milagroso', 'renda garantida', 'dinheiro fácil', 'fique rico'];
const REDIRECT_WORDS = ['whatsapp', 'telegram', 'link na bio', 'chama no pv'];

// Estado Inicial dos Blocos
let ganchos = [{ id: 1, name: 'Gancho_01.mp4', duration: 4 }];
let corpos = [{ id: 1, name: 'Corpo_01.mp4', duration: 15 }];
let ctas = [{ id: 1, name: 'CTA_01.mp4', duration: 5 }];

// Inicialização após o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
  renderBlocks();
  updateCombinations();
  setupScriptValidator();
});

// Adicionar novo bloco de mídia
function addBlock(type) {
  const nameInput = prompt(`Nome do arquivo de vídeo para ${type.toUpperCase()}:`, `${type}_${Date.now().toString().slice(-4)}.mp4`);
  if (!nameInput) return;

  const durationInput = prompt(`Duração estimada em segundos (ex: 5):`, '5');
  const duration = parseInt(durationInput) || 5;

  const newBlock = { id: Date.now(), name: nameInput, duration };

  if (type === 'gancho') ganchos.push(newBlock);
  if (type === 'corpo') corpos.push(newBlock);
  if (type === 'cta') ctas.push(newBlock);

  renderBlocks();
  updateCombinations();
}

// Remover bloco de mídia
function removeBlock(type, id) {
  if (type === 'gancho') ganchos = ganchos.filter(b => b.id !== id);
  if (type === 'corpo') corpos = corpos.filter(b => b.id !== id);
  if (type === 'cta') ctas = ctas.filter(b => b.id !== id);

  renderBlocks();
  updateCombinations();
}

// Renderizar os botões de blocos na tela
function renderBlocks() {
  const containerG = document.getElementById('listGanchos');
  const containerC = document.getElementById('listCorpos');
  const containerCTA = document.getElementById('listCtas');

  if (containerG) containerG.innerHTML = renderBlockList(ganchos, 'gancho');
  if (containerC) containerC.innerHTML = renderBlockList(corpos, 'corpo');
  if (containerCTA) containerCTA.innerHTML = renderBlockList(ctas, 'cta');
}

function renderBlockList(list, type) {
  if (list.length === 0) return `<p class="text-xs text-slate-500 italic">Nenhum clipe adicionado.</p>`;
  return list.map(item => `
    <div class="flex justify-between items-center bg-slate-950 px-3 py-1.5 rounded border border-slate-800/80 text-xs text-slate-300 fade-in">
      <span>📹 ${item.name} <strong class="text-slate-500">(${item.duration}s)</strong></span>
      <button onclick="removeBlock('${type}', ${item.id})" class="text-rose-400 hover:text-rose-300 ml-2 font-bold">×</button>
    </div>
  `).join('');
}

// Atualizar a Matriz de Combinações (Produto Cartesiano)
function updateCombinations() {
  const container = document.getElementById('matrixResults');
  const counter = document.getElementById('totalCombos');
  if (!container) return;

  const total = ganchos.length * corpos.length * ctas.length;
  if (counter) counter.innerText = `${total} combinações`;

  if (total === 0) {
    container.innerHTML = `<p class="text-xs text-slate-500 p-4 text-center">Adicione pelo menos 1 clipe em cada pasta para gerar combinações.</p>`;
    return;
  }

  let html = '';
  let comboIndex = 1;

  ganchos.forEach((g, idxG) => {
    corpos.forEach((c, idxC) => {
      ctas.forEach((cta, idxCta) => {
        const duracaoTotal = g.duration + c.duration + cta.duration;

        // Etiqueta de Originalidade
        let status = 'Original';
        let badgeStyle = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
        let rec = 'Poste primeiro';

        if (idxG > 0 && idxC > 0 && idxCta > 0) {
          status = 'Bem parecido';
          badgeStyle = 'bg-rose-500/10 text-rose-400 border-rose-500/30';
          rec = 'Não recomendado postar';
        } else if (idxG > 0 || idxC > 0) {
          status = 'Repete um pouco';
          badgeStyle = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
          rec = 'Diferencie a headline';
        }

        html += `
          <div class="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-1.5 fade-in">
            <div class="flex justify-between items-center text-xs">
              <span class="font-mono text-indigo-400 font-semibold">Vídeo #${comboIndex++}</span>
              <span class="px-2 py-0.5 rounded border text-[10px] font-medium ${badgeStyle}">
                ${status}
              </span>
            </div>
            <div class="text-[11px] text-slate-300 font-mono space-y-0.5">
              <div><span class="text-slate-500">1. Gancho:</span> ${g.name}</div>
              <div><span class="text-slate-500">2. Corpo:</span> ${c.name}</div>
              <div><span class="text-slate-500">3. CTA:</span> ${cta.name}</div>
            </div>
            <div class="flex justify-between items-center text-[10px] pt-1.5 border-t border-slate-900 text-slate-400">
              <span>Duração: <strong class="${duracaoTotal >= 8 && duracaoTotal <= 60 ? 'text-emerald-400' : 'text-rose-400'}">${duracaoTotal}s</strong></span>
              <span class="italic text-slate-500">${rec}</span>
            </div>
          </div>
        `;
      });
    });
  });

  container.innerHTML = html;
}

// Validador de Roteiro e Compliance em Tempo Real
function setupScriptValidator() {
  const scriptInput = document.getElementById('scriptInput');
  const alertsContainer = document.getElementById('alertsContainer');
  if (!scriptInput || !alertsContainer) return;

  scriptInput.addEventListener('input', (e) => {
    const text = e.target.value.toLowerCase();
    alertsContainer.innerHTML = '';

    if (!text.trim()) return;

    let hasAlerts = false;

    PROHIBITED_WORDS.forEach(word => {
      if (text.includes(word)) {
        hasAlerts = true;
        alertsContainer.innerHTML += `
          <div class="p-2 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded text-xs flex items-center gap-1.5">
            <span>⚠️</span> <span>Termo sensível detectado: <strong>"${word}"</strong></span>
          </div>`;
      }
    });

    REDIRECT_WORDS.forEach(word => {
      if (text.includes(word)) {
        hasAlerts = true;
        alertsContainer.innerHTML += `
          <div class="p-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded text-xs flex items-center gap-1.5">
            <span>🚫</span> <span>Direcionamento externo: <strong>"${word}"</strong> (no TikTok Shop a venda é no carrinho)</span>
          </div>`;
      }
    });

    if (!hasAlerts) {
      alertsContainer.innerHTML = `
        <div class="p-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded text-xs">
          ✅ Roteiro limpo e de acordo com as diretrizes!
        </div>`;
    }
  });
}