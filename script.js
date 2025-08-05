class PatoPontinhoScoring {
  constructor() {
    this.players = [];
    this.maxPlayers = 10;
    this.winningScore = 100;
    
    this.modal = document.getElementById('playerModal');
    this.addPlayerBtn = document.getElementById('addPlayer');
    this.confirmBtn = document.getElementById('confirmPlayer');
    this.cancelBtn = document.getElementById('cancelPlayer');
    this.playerNameInput = document.getElementById('playerName');
    this.colorOptions = document.querySelectorAll('.color-option');
    this.lanesContainer = document.getElementById('lanesContainer');
    this.scoringInputs = document.getElementById('scoringInputs');
    this.applyScoresBtn = document.getElementById('applyScores');
    this.resetBtn = document.getElementById('resetGame');
    this.activeCountSpan = document.getElementById('activeCount');
    
    this.selectedColor = null;
    this.usedColors = new Set();
    
    this.init();
  }
  
  init() {
    this.addPlayerBtn.addEventListener('click', () => this.openModal());
    this.confirmBtn.addEventListener('click', () => this.addPlayer());
    this.cancelBtn.addEventListener('click', () => this.closeModal());
    this.applyScoresBtn.addEventListener('click', () => this.applyScores());
    this.resetBtn.addEventListener('click', () => this.resetGame());
    
    this.colorOptions.forEach(option => {
      option.addEventListener('click', () => this.selectColor(option));
    });
    
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.closeModal();
    });
    
    this.updateUI();
  }
  
  openModal() {
    if (this.players.length >= this.maxPlayers) {
      alert('Máximo de 10 jogadores permitido!');
      return;
    }
    
    this.modal.style.display = 'block';
    this.playerNameInput.value = '';
    this.selectedColor = null;
    this.updateColorOptions();
  }
  
  closeModal() {
    this.modal.style.display = 'none';
    this.clearSelection();
  }
  
  selectColor(option) {
    this.colorOptions.forEach(opt => opt.classList.remove('selected'));
    option.classList.add('selected');
    this.selectedColor = option.dataset.color;
  }
  
  updateColorOptions() {
    this.colorOptions.forEach(option => {
      const color = option.dataset.color;
      if (this.usedColors.has(color)) {
        option.style.opacity = '0.3';
        option.style.pointerEvents = 'none';
      } else {
        option.style.opacity = '1';
        option.style.pointerEvents = 'auto';
      }
    });
  }
  
  clearSelection() {
    this.colorOptions.forEach(opt => opt.classList.remove('selected'));
    this.selectedColor = null;
  }
  
  addPlayer() {
    const name = this.playerNameInput.value.trim();
    
    if (!name) {
      alert('Por favor, digite o nome do jogador!');
      return;
    }
    
    if (!this.selectedColor) {
      alert('Por favor, escolha um personagem!');
      return;
    }
    
    if (this.players.some(p => p.name.toLowerCase() === name.toLowerCase())) {
      alert('Já existe um jogador com esse nome!');
      return;
    }
    
    const player = {
      id: Date.now(),
      name: name,
      color: this.selectedColor,
      score: 0,
      isDead: false,
      emoji: this.getEmojiByColor(this.selectedColor)
    };
    
    this.players.push(player);
    this.usedColors.add(this.selectedColor);
    this.updateUI();
    this.closeModal();
  }
  
  getEmojiByColor(color) {
    const emojis = {
      yellow: '🦆',
      white: '🐥',
      brown: '🦢',
      black: '🐧',
      green: '🦜',
      blue: '🐦',
      red: '🐓',
      purple: '🦚'
    };
    return emojis[color] || '🦆';
  }
  
  updateUI() {
    this.updatePlayerLanes();
    this.updateScoringInputs();
    this.updateActiveCount();
    this.updateAddButton();
  }
  
  updatePlayerLanes() {
    this.lanesContainer.innerHTML = '';
    
    this.players.forEach(player => {
      const lane = document.createElement('div');
      lane.className = 'player-lane';
      
      const duck = document.createElement('div');
      duck.className = `duck-player ${player.isDead ? 'duck-dead' : ''}`;
      duck.textContent = player.emoji;
      
      // Posição do pato baseada na pontuação (0-100)
      const position = Math.min((player.score / this.winningScore) * 80, 80);
      duck.style.left = `${1 + position}%`;
      
      const info = document.createElement('div');
      info.className = 'player-info';
      info.innerHTML = `
        <div class="player-name">${player.name}</div>
        <div class="player-score">${player.score} pts</div>
      `;
      
      lane.appendChild(duck);
      lane.appendChild(info);
      this.lanesContainer.appendChild(lane);
    });
  }
  
  updateScoringInputs() {
    this.scoringInputs.innerHTML = '';
    
    this.players.forEach(player => {
      if (!player.isDead) {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'score-input-group';
        inputGroup.innerHTML = `
          <label>${player.emoji} ${player.name}</label>
          <input type="number" id="score-${player.id}" min="0" max="100" placeholder="0">
        `;
        this.scoringInputs.appendChild(inputGroup);
      }
    });
    
    if (this.players.filter(p => !p.isDead).length === 0) {
      this.scoringInputs.innerHTML = '<p style="text-align: center; color: #666;">Nenhum jogador ativo</p>';
    }
  }
  
  updateActiveCount() {
    const activeCount = this.players.filter(p => !p.isDead).length;
    this.activeCountSpan.textContent = activeCount;
  }
  
  updateAddButton() {
    this.addPlayerBtn.style.display = this.players.length >= this.maxPlayers ? 'none' : 'block';
  }
  
  applyScores() {
    let hasValidInput = false;
    
    this.players.forEach(player => {
      if (!player.isDead) {
        const input = document.getElementById(`score-${player.id}`);
        const scoreToAdd = parseInt(input.value) || 0;
        
        if (scoreToAdd > 0) {
          hasValidInput = true;
          player.score += scoreToAdd;
          
          if (player.score >= this.winningScore) {
            player.isDead = true;
            this.showDeathMessage(player);
          }
          
          input.value = '';
        }
      }
    });
    
    if (!hasValidInput) {
      alert('Digite pelo menos uma pontuação válida!');
      return;
    }
    
    this.updateUI();
    this.checkGameEnd();
  }
  
  showDeathMessage(player) {
    setTimeout(() => {
      alert(`💀 ${player.name} chegou a ${player.score} pontos e foi eliminado! 💀`);
    }, 500);
  }
  
  checkGameEnd() {
    const alivePlayers = this.players.filter(p => !p.isDead);
    
    if (alivePlayers.length === 1) {
      setTimeout(() => {
        alert(`🎉 ${alivePlayers[0].name} é o vencedor! 🏆`);
      }, 1000);
    } else if (alivePlayers.length === 0) {
      setTimeout(() => {
        alert('😱 Todos os jogadores foram eliminados!');
      }, 1000);
    }
  }
  
  resetGame() {
    if (this.players.length > 0 && confirm('Tem certeza que deseja reiniciar o jogo?')) {
      this.players = [];
      this.usedColors.clear();
      this.updateUI();
    }
  }
}


document.addEventListener('DOMContentLoaded', () => {
  new PatoPontinhoScoring();
});