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
    this.toggleMusicBtn = document.getElementById('toggleMusic');
    
    this.selectedColor = null;
    this.usedColors = new Set();
    
    // Audio
    this.audioContext = null;
    this.backgroundMusic = null;
    this.isMusicPlaying = false;
    this.musicEnabled = true;
    
    this.init();
  }
  
  init() {
    this.addPlayerBtn.addEventListener('click', () => this.openModal());
    this.confirmBtn.addEventListener('click', () => this.addPlayer());
    this.cancelBtn.addEventListener('click', () => this.closeModal());
    this.applyScoresBtn.addEventListener('click', () => this.applyScores());
    this.resetBtn.addEventListener('click', () => this.resetGame());
    
    // Verificar se o botão de música existe antes de adicionar o listener
    if (this.toggleMusicBtn) {
      this.toggleMusicBtn.addEventListener('click', () => this.toggleMusic());
    }
    
    this.colorOptions.forEach(option => {
      option.addEventListener('click', () => this.selectColor(option));
    });
    
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.closeModal();
    });
    
    // Atualizar layout quando a tela mudar de orientação
    window.addEventListener('resize', () => {
      setTimeout(() => this.updatePlayerLanes(), 100);
    });
    
    // Inicializar áudio quando usuário interagir pela primeira vez
    document.addEventListener('click', () => this.initAudio(), { once: true });
    
    this.updateUI();
  }
  
  async initAudio() {
    if (this.audioContext) return; // Evitar inicializar múltiplas vezes
    
    try {
      console.log('Inicializando áudio...');
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      console.log('AudioContext criado:', this.audioContext.state);
      
      // Garantir que o contexto está ativo
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
      
      if (this.musicEnabled) {
        this.startBackgroundMusic();
      }
    } catch (error) {
      console.log('Áudio não suportado:', error);
    }
  }
  
  async startBackgroundMusic() {
    if (!this.audioContext || this.isMusicPlaying || !this.musicEnabled) return;
    
    try {
      // Criar música de fundo alegre usando osciladores
      const melody = [
        { freq: 523, duration: 0.3 }, // C
        { freq: 587, duration: 0.3 }, // D
        { freq: 659, duration: 0.3 }, // E
        { freq: 698, duration: 0.3 }, // F
        { freq: 784, duration: 0.6 }, // G
        { freq: 659, duration: 0.3 }, // E
        { freq: 523, duration: 0.6 }, // C
      ];
      
      this.isMusicPlaying = true;
      this.playMelody(melody, 0);
      
    } catch (error) {
      console.log('Erro ao iniciar música:', error);
    }
  }
  
  playMelody(melody, index) {
    if (!this.audioContext || !this.isMusicPlaying || !this.musicEnabled) return;
    
    if (index >= melody.length) {
      // Reiniciar a melodia após uma pausa
      setTimeout(() => {
        if (this.isMusicPlaying && this.musicEnabled) {
          this.playMelody(melody, 0);
        }
      }, 1000);
      return;
    }
    
    const note = melody[index];
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.value = note.freq;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + note.duration);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + note.duration);
    
    // Próxima nota
    setTimeout(() => {
      this.playMelody(melody, index + 1);
    }, note.duration * 1000);
  }
  
  stopBackgroundMusic() {
    this.isMusicPlaying = false;
  }
  
  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;
    
    if (this.toggleMusicBtn) {
      this.toggleMusicBtn.textContent = this.musicEnabled ? '🎵 Música: ON' : '🎵 Música: OFF';
    }
    
    if (this.musicEnabled) {
      if (!this.audioContext) {
        this.initAudio();
      } else {
        this.startBackgroundMusic();
      }
    } else {
      this.stopBackgroundMusic();
    }
    
    console.log('Música:', this.musicEnabled ? 'Ligada' : 'Desligada');
  }
  
  playQuackSound() {
    console.log('🦆 Tentando tocar QUACK');
    
    // Método 1: Tentar com audioContext existente
    if (this.audioContext && this.audioContext.state === 'running') {
      this.playQuackWithAudioContext();
      return;
    }
    
    // Método 2: Criar novo audioContext na hora
    try {
      const tempAudioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      if (tempAudioContext.state === 'suspended') {
        tempAudioContext.resume().then(() => {
          this.playQuackWithContext(tempAudioContext);
        });
      } else {
        this.playQuackWithContext(tempAudioContext);
      }
    } catch (error) {
      console.log('❌ Erro ao criar AudioContext temporário:', error);
      // Método 3: Fallback com beep simples
      this.playBeepFallback();
    }
  }
  
  playQuackWithAudioContext() {
    try {
      console.log('🦆 Tocando com AudioContext existente');
      
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.4);
      oscillator.type = 'sawtooth';
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.9, this.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.4);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.4);
      
      console.log('✅ Quack tocado!');
    } catch (error) {
      console.log('❌ Erro no quack:', error);
    }
  }
  
  playQuackWithContext(context) {
    try {
      console.log('🦆 Tocando com AudioContext temporário');
      
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      
      oscillator.frequency.setValueAtTime(200, context.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, context.currentTime + 0.4);
      oscillator.type = 'sawtooth';
      
      gainNode.gain.setValueAtTime(0, context.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.9, context.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.4);
      
      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + 0.4);
      
      console.log('✅ Quack temporário tocado!');
      
      // Fechar o contexto depois do som
      setTimeout(() => {
        context.close();
      }, 500);
      
    } catch (error) {
      console.log('❌ Erro no quack temporário:', error);
    }
  }
  
  playBeepFallback() {
    console.log('🔊 Usando fallback - beep simples');
    
    // Como último recurso, tentar com AudioContext bem básico
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.value = 440; // Nota A
      gain.gain.value = 0.5;
      
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
      
      setTimeout(() => ctx.close(), 400);
      
      console.log('✅ Beep fallback tocado!');
    } catch (error) {
      console.log('❌ Nem o fallback funcionou:', error);
    }
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
      
      // Verificar se é mobile
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        // Movimento vertical (topo para baixo)
        const maxHeight = this.lanesContainer.offsetHeight - 100; // Espaço para info
        const position = Math.min((player.score / this.winningScore) * maxHeight, maxHeight);
        duck.style.top = `${20 + position}px`;
        duck.style.left = '50%';
        duck.style.transform = 'translateX(-50%)';
      } else {
        // Movimento horizontal (esquerda para direita)
        const position = Math.min((player.score / this.winningScore) * 80, 80);
        duck.style.left = `${5 + position}%`;
        duck.style.top = 'auto';
        duck.style.transform = 'none';
      }
      
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
            console.log(`🎯 ${player.name} atingiu ${player.score} pontos - ELIMINADO!`);
            player.isDead = true;
            
            // Tocar o som de eliminação
            console.log('🔊 Chamando playQuackSound...');
            this.playQuackSound();
            
            // Mensagem depois de um delay
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
    // Aguardar um pouco para o som tocar antes da mensagem
    setTimeout(() => {
      alert(`💀 ${player.name} chegou a ${player.score} pontos e foi eliminado! 💀`);
    }, 800); // Aumentei de 500ms para 800ms para dar tempo do quack tocar
  }
  
  checkGameEnd() {
    const alivePlayers = this.players.filter(p => !p.isDead);
    
    if (alivePlayers.length === 1) {
      setTimeout(() => {
        this.stopBackgroundMusic();
        alert(`🎉 ${alivePlayers[0].name} é o vencedor! 🏆`);
      }, 1000);
    } else if (alivePlayers.length === 0) {
      setTimeout(() => {
        this.stopBackgroundMusic();
        alert('😱 Todos os jogadores foram eliminados!');
      }, 1000);
    }
  }
  
  resetGame() {
    if (this.players.length > 0 && confirm('Tem certeza que deseja reiniciar o jogo?')) {
      this.players = [];
      this.usedColors.clear();
      this.stopBackgroundMusic();
      setTimeout(() => {
        if (this.musicEnabled && this.audioContext) {
          this.startBackgroundMusic();
        }
      }, 500);
      this.updateUI();
    }
  }
}


document.addEventListener('DOMContentLoaded', () => {
  new PatoPontinhoScoring();
});