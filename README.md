# ⚔️ XO Battle — Classic Tic-Tac-Toe. Modern Battle.

A complete, responsive, modern Tic-Tac-Toe web gaming platform built with React 19, TypeScript, Vite, Tailwind CSS, Lucide React, and the Web Audio API.

![XO Battle Neon UI](public/favicon.svg)

---

## 🚀 Key Features

- **Cyber Gaming Visual Design**:
  - Deep dark navy palette (`#060913`), neon cyan (`#00f0ff`), and electric purple/pink accents
  - Glassmorphic translucent cards with subtle glow borders (`backdrop-blur-md`)
  - Animated SVG drawing strokes for marks (Crosslines for X, circular sweep for O)
  - Pulsing victory line highlights and confetti celebrations
- **Three Distinct Game Modes**:
  - 👥 **Player vs Player (PvP)**: Two players clash turn-by-turn locally on the same device.
  - 🤖 **Player vs AI (PvE)**: Play as X against an AI with 3 selectable difficulties:
    - **Easy**: Mostly random moves for casual gameplay.
    - **Medium**: Tactical play (detects instant wins, blocks opponent wins, claims center/corners).
    - **Hard**: Mathematically **unbeatable Minimax** search algorithm.
  - 🎮 **AI vs AI (EvE)**: Spectator duel mode with automated turns, play/pause controls, and adjustable pace.
- **Web Audio API Synthesizer (Offline & Asset-Free)**:
  - High-frequency crisp FM blip for Player X
  - Warm resonant harmonic pulse for Player O
  - 4-tone triumphant ascending arpeggio fanfare for wins
  - Mellow 2-tone cadence for stalemates / draws
  - Micro-click for button interactions
  - Global mute/unmute toggle in header and settings
- **Complete Scoreboard & Persistence**:
  - Live tracking of Player X wins, Player O wins, Draws, Total matches, and Win Streaks
  - Persisted in `localStorage` with fail-safe error handling and reset controls
- **Player Customization**:
  - Custom names for Player 1, Player 2, and AI
  - Real-time score and turn label synchronization
- **Accessibility & Touch-Optimization**:
  - Keyboard navigation: `Arrow Keys` move focus across the 3x3 grid; `Space` or `Enter` marks the cell
  - ARIA grid roles and live announcements (`aria-live="polite"`)
  - Clear cell labeling (`Row 1, Column 1, empty cell`, etc.)
  - Mobile-responsive sizing with large tap targets (>64px)

---

## 🛠️ Tech Stack

- **React 19**
- **TypeScript**
- **Vite 8**
- **Tailwind CSS 3.4**
- **Lucide React** (Vector icons)
- **canvas-confetti** (Celebration particles)
- **Web Audio API** (Procedural sound synthesis)

---

## 💻 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) version 20.17+ or higher
- [npm](https://www.npmjs.com/)

### Installation

```bash
# Navigate to the project directory
cd C:\Users\Aarya\.gemini\antigravity\scratch\xo-battle

# Install dependencies (already installed if using existing workspace)
npm install
```

### Running Development Server

```bash
npm run dev
```

Then open your browser at the displayed local URL (typically `http://localhost:5173`).

### Production Build & Preview

```bash
# Build the production bundle
npm run build

# Preview the production build locally
npm run preview
```

---

## 📂 Project Structure

```
xo-battle/
├── index.html                   # SEO tags, theme metadata, Google Fonts
├── package.json                 # Dependencies & scripts
├── tailwind.config.js           # Neon color extensions, shadows, keyframes
├── src/
│   ├── index.css                # Tailwind directives & glow utilities
│   ├── main.tsx                 # Application entrypoint
│   ├── App.tsx                  # Root layout, theme sync, modals & routing
│   ├── types/
│   │   └── index.ts             # TypeScript definitions
│   ├── utils/
│   │   ├── gameLogic.ts         # Pure win/draw detection & coordinates
│   │   ├── minimax.ts           # Minimax algorithm & difficulty strategies
│   │   ├── sound.ts             # Web Audio API sound synthesizer
│   │   ├── storage.ts           # Safe localStorage reader/writer
│   │   └── confetti.ts          # Particle celebration launcher
│   ├── hooks/
│   │   └── useGame.ts           # Gameplay state machine & turn automation
│   └── components/
│       ├── Header.tsx           # Navigation bar, sound/theme toggles
│       ├── LandingScreen.tsx    # Hero section, mode picker, difficulty selector
│       ├── GameScreen.tsx       # Active match view, controls, spectator buttons
│       ├── GameBoard.tsx        # 3x3 responsive grid with arrow key navigation
│       ├── GameCell.tsx         # Accessible cell with animated marks & hover preview
│       ├── ScoreBoard.tsx       # Score cards, match counters, win streak indicator
│       ├── TurnIndicator.tsx    # Turn pill with AI thinking indicator
│       ├── UI/
│       │   ├── Button.tsx       # Glowing button variants
│       │   ├── Card.tsx         # Glassmorphism container
│       │   └── Modal.tsx        # Accessible dialog backdrop with scale animation
│       └── Modals/
│           ├── ResultModal.tsx  # Win/Draw celebration modal
│           ├── SettingsModal.tsx # Custom names, difficulty, sound/theme toggles
│           └── HowToPlayModal.tsx# Instructions and keyboard controls
```

---

## 🎮 How to Play

1. **Choose a Mode**: Select Player vs Player, Player vs AI, or AI vs AI.
2. **Take Turns**: Player X makes the opening move. Click or press `Space`/`Enter` on an empty cell.
3. **Win Condition**: Align 3 of your marks horizontally, vertically, or diagonally.
4. **Draw Condition**: Fill all 9 cells without either player forming a 3-in-a-row line.
