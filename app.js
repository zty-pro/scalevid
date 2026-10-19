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