// 🤖 Módulo 4: Gerador por IA
function generateAICreative() {
  const promptInput = document.getElementById('aiPrompt').value.trim();
  const mediaType = document.getElementById('aiMediaType').value;
  const targetBlock = document.getElementById('aiTargetBlock').value;
  const outputContainer = document.getElementById('aiOutputContainer');
  const preview = document.getElementById('aiPreview');

  if (!promptInput) {
    alert('Por favor, digite uma descrição para a IA.');
    return;
  }

  const generatedFileName = `IA_${mediaType.toUpperCase()}_${Date.now().toString().slice(-4)}.${mediaType === 'image' ? 'jpg' : 'mp4'}`;
  const duration = mediaType === 'image' ? 3 : 5;

  // Adiciona diretamente à esteira
  const newBlock = { id: Date.now(), name: generatedFileName, duration };
  if (targetBlock === 'gancho') ganchos.push(newBlock);
  if (targetBlock === 'corpo') corpos.push(newBlock);
  if (targetBlock === 'cta') ctas.push(newBlock);

  renderBlocks();
  updateCombinations();

  // Exibe o Preview
  if (outputContainer && preview) {
    outputContainer.classList.remove('hidden');
    preview.innerHTML = `
      <div class="p-3 text-center space-y-1">
        <div class="text-2xl">${mediaType === 'image' ? '🖼️' : '🎥'}</div>
        <p class="text-indigo-400 font-mono text-xs font-semibold">${generatedFileName}</p>
        <p class="text-[10px] text-slate-400 italic">" Prompt: ${promptInput} "</p>
        <span class="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded">Adicionado à pasta de ${targetBlock.toUpperCase()}</span>
      </div>
    `;
  }
}

// 📅 Módulo 5: Calendário e Agendador
function scheduleVideo() {
  const combo = document.getElementById('comboSelect').value;
  const day = document.getElementById('daySelect').value;
  const time = document.getElementById('scheduleTime').value;

  if (!combo) {
    alert('Selecione um vídeo da matriz para agendar!');
    return;
  }

  agenda.push({ id: Date.now(), combo, day, time });
  renderCalendar();
}

function removeSchedule(id) {
  agenda = agenda.filter(item => item.id !== id);
  renderCalendar();
}

function clearCalendar() {
  agenda = [];
  renderCalendar();
}

function renderCalendar() {
  const container = document.getElementById('calendarGrid');
  if (!container) return;

  if (agenda.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-500 italic p-3 text-center border border-slate-800/50 rounded">Nenhuma postagem agendada para esta semana.</p>`;
    return;
  }

  container.innerHTML = agenda.map(item => `
    <div class="p-2 bg-slate-950 border border-slate-800 rounded flex justify-between items-center gap-2 fade-in">
      <div class="space-y-0.5">
        <span class="text-indigo-400 font-semibold block text-[11px]">${item.day} às ${item.time}</span>
        <p class="text-slate-300 text-[10px] truncate max-w-[280px]">${item.combo}</p>
      </div>
      <button onclick="removeSchedule(${item.id})" class="text-rose-400 hover:text-rose-300 font-bold text-xs px-1">✕</button>
    </div>
  `).join('');
}