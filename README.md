# 🦆 Pato Pontinho - Marcador de Pontuação

Um jogo web interativo para marcar pontuação em jogos de cartas, onde cada jogador é representado por um patinho que se move conforme sua pontuação. Quando um jogador atinge 100 pontos, ele é eliminado com um divertido som de "quack"!

![Badge](https://img.shields.io/badge/Status-Concluído-brightgreen) ![Badge](https://img.shields.io/badge/Versão-1.0-blue) ![Badge](https://img.shields.io/badge/Licença-MIT-yellow)

## 📱 Demo Online

🌐 **[Jogar Agora](https://alinepinhelli.github.io/myGameDuck/)**

## 🎮 Como Jogar

### Desktop
- Os patinhos se movem **horizontalmente** da esquerda para a direita
- Cada raia representa um jogador
- A pontuação é marcada conforme o jogo de cartas progride

### Mobile
- Os patinhos se movem **verticalmente** de cima para baixo
- Layout otimizado para tela sensível ao toque
- Interface responsiva e intuitiva

## ✨ Funcionalidades

### 🎯 Sistema de Pontuação
- ✅ Suporte para até **10 jogadores simultâneos**
- ✅ Pontuação individual por rodada
- ✅ Progressão visual dos patinhos
- ✅ **Eliminação automática** aos 100 pontos

### 🦆 Personagens Únicos
- ✅ **8 personagens diferentes**: 🦆 🐥 🦢 🐧 🦜 🐦 🐓 🦚
- ✅ Cada jogador escolhe seu avatar
- ✅ Cores únicas por partida

### 🎵 Sistema de Áudio
- ✅ **Música de fundo alegre** e contínua
- ✅ **Som de "quack"** na eliminação
- ✅ Controle de áudio ON/OFF
- ✅ **3 métodos de fallback** para compatibilidade

### 📱 Design Responsivo
- ✅ **Layout adaptativo**: horizontal no desktop, vertical no mobile
- ✅ **Animações suaves** e efeitos visuais
- ✅ Interface otimizada para touch
- ✅ **Rio animado** com efeitos de água

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Animações, gradientes e responsividade
- **JavaScript ES6+**: Lógica do jogo e interatividade
- **Web Audio API**: Sistema de áudio avançado
- **Media Queries**: Design responsivo

## 🚀 Como Usar

### 1. Configuração Inicial
```bash
# Clone o repositório
git clone https://github.com/AlinePinhelli/myGameDuck.git

# Navegue para a pasta
cd myGameDuck

# Abra o index.html no navegador
open index.html
```

### 2. Adicionando Jogadores
1. Clique em **"+ Adicionar Jogador"**
2. Digite o nome do jogador
3. Escolha um personagem (pato)
4. Clique em **"Adicionar"**

### 3. Marcando Pontuação
1. Jogue sua rodada de cartas
2. Insira os pontos de cada jogador
3. Clique em **"Aplicar Pontuação"**
4. Os patinhos se movem automaticamente!

### 4. Eliminação
- Quando um jogador atinge **100 pontos**:
  - 🦆 **Som de "quack"** é reproduzido
  - 💀 Jogador é **eliminado**
  - 🏆 Jogo continua até sobrar 1 vencedor

## 🎨 Capturas de Tela

### Desktop - Layout Horizontal
```
🦆 Pato Pontinho - Marcador 🦆
🦆 Jogadores ativos: 3/10                    🎵 Música: ON  + Adicionar Jogador

╔════════════════════════════════════════════════════════════════════╗
║  🦆 João ────────────────────────────────────────→ João - 45 pts   ║
║  ═══════════════════════════════════════════════════════════════   ║
║  🐥 Maria ──────────────────→ Maria - 23 pts                       ║
║  ═══════════════════════════════════════════════════════════════   ║
║  🦢 Pedro ────────────────────────────→ Pedro - 67 pts             ║
╚════════════════════════════════════════════════════════════════════╝

Adicionar Pontos da Rodada
🦆 João: [__]  🐥 Maria: [__]  🦢 Pedro: [__]
        [Aplicar Pontuação]  [Reiniciar Jogo]
```

### Mobile - Layout Vertical
```
    🦆 Pato Pontinho 🦆
   Jogadores ativos: 3/10
   🎵 ON  + Adicionar

╔══════════════════════════╗
║ 🦆    🐥    🦢           ║
║ │     │     │            ║
║ │     │     │            ║
║ │     │     ▼            ║
║ │     ▼                  ║
║ ▼                        ║
║                          ║
║João   Maria   Pedro      ║
║45pts  23pts   67pts      ║
╚══════════════════════════╝
```

## 🎯 Casos de Uso

### 🃏 Jogos de Cartas
- **Buraco**
- **Canastra** 
- **Truco**
- **Poker**
- **Uno**

### 🎲 Outros Jogos
- **Jogos de tabuleiro** com pontuação
- **Competições** e torneios
- **Atividades educativas**

## 🔧 Arquitetura do Código

```
PatoPontinho/
├── index.html          # Estrutura principal
├── style.css           # Estilos e animações
├── script.js           # Lógica do jogo
└── README.md           # Documentação
```

### Classes Principais

#### `PatoPontinhoScoring`
- **Gerenciamento de jogadores**
- **Sistema de pontuação**
- **Controle de áudio**
- **Interface responsiva**

#### Métodos Principais
```javascript
addPlayer()           // Adiciona novo jogador
applyScores()         // Aplica pontuação da rodada
playQuackSound()      // Reproduz som de eliminação
updatePlayerLanes()   // Atualiza posição dos patinhos
toggleMusic()         // Controla música de fundo
```

## 🎵 Sistema de Áudio

### Música de Fundo
- **Melodia**: C-D-E-F-G-E-C (Dó Maior)
- **Instrumento**: Oscilador senoidal
- **Loop**: Contínuo com pausas
- **Volume**: Baixo (0.1) para não incomodar

### Som de Eliminação
- **Tipo**: Imitação de "quack" de pato
- **Frequência**: 200Hz → 100Hz (descrescente)
- **Duração**: 0.4 segundos
- **Waveform**: Sawtooth para timbre natural

## 🌐 Compatibilidade

### Navegadores Suportados
- ✅ **Chrome** 66+
- ✅ **Firefox** 60+
- ✅ **Safari** 14+
- ✅ **Edge** 79+

### Dispositivos
- ✅ **Desktop** (Windows, Mac, Linux)
- ✅ **Mobile** (iOS, Android)
- ✅ **Tablet** (iPad, Android tablets)

## 🤝 Contribuindo

1. **Fork** o projeto
2. Crie uma **feature branch** (`git checkout -b feature/nova-funcionalidade`)
3. **Commit** suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. **Push** para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um **Pull Request**

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👩‍💻 Autor

**Aline Pinhelli**
- GitHub: [@AlinePinhelli](https://github.com/AlinePinhelli)
- Projeto: [myGameDuck](https://github.com/AlinePinhelli/myGameDuck)

## 🎉 Agradecimentos

- 🦆 Inspirado na brincadeira infantil "Cinco Patinhos"
- 🎵 Sistema de áudio criado com Web Audio API
- 🎨 Design inspirado em jogos casuais mobile
- 🏆 Desenvolvido para comunidade de jogadores de cartas

---

**⭐ Se você gostou do projeto, deixe uma estrela no repositório!**

🎮 **[Jogar Agora](https://alinepinhelli.github.io/myGameDuck/)** | 📱 **[Ver no GitHub](https://github.com/AlinePinhelli/myGameDuck)**
