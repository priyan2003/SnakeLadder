# 🎲 Snake and Ladder Game

A modern, interactive multiplayer Snake and Ladder game built with React, TypeScript, and Tailwind CSS.

![Snake and Ladder Game](https://img.shields.io/badge/Game-Snake%20%26%20Ladder-green)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)

## ✨ Features

- **Multiplayer Support**: 2-4 players with unique colors and emojis
- **Classic 10×10 Board**: Traditional zig-zag layout (1-100)
- **Animated Gameplay**: 
  - Smooth dice roll animations
  - Step-by-step player movement
  - Snake and ladder transitions
- **Visual Feedback**:
  - Highlighted current player cell
  - Snake 🐍 and ladder 🪜 indicators
  - Toast notifications for game events
- **Win Celebration**: Confetti animation and victory modal
- **Responsive Design**: Works on desktop and mobile
- **Roll History**: Track recent dice rolls per player

## 🎮 Game Rules

1. Each player starts at position 0 (off the board)
2. Players take turns rolling the dice (1-6)
3. Move forward by the dice value
4. **Ladders** 🪜: Land on the bottom → climb to the top
5. **Snakes** 🐍: Land on the head → slide down to the tail
6. First player to reach exactly 100 wins!
7. If a roll would exceed 100, the player doesn't move

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd snake-and-ladder

# Install dependencies
npm install

# Start development server
npm run dev
```

The game will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 🐳 Docker

### Build and Run

```bash
# Build the image
docker build -t snake-ladder-game .

# Run the container
docker run -p 8080:80 snake-ladder-game
```

Access the game at `http://localhost:8080`

### Docker Compose (Optional)

```yaml
version: '3.8'
services:
  game:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

```bash
docker-compose up -d
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📁 Project Structure

```
src/
├── components/
│   ├── game/
│   │   ├── Board.tsx          # 10x10 game board
│   │   ├── Cell.tsx           # Individual board cell
│   │   ├── Dice.tsx           # Animated dice component
│   │   ├── GameControls.tsx   # Dice roll & player info
│   │   ├── PlayerSelect.tsx   # Player count selection
│   │   ├── SnakeLadderGame.tsx # Main game logic
│   │   └── WinModal.tsx       # Victory celebration
│   └── ui/                    # Reusable UI components
├── lib/
│   ├── gameConfig.ts          # Game configuration & helpers
│   └── utils.ts               # Utility functions
├── pages/
│   └── Index.tsx              # Main page
└── index.css                  # Global styles & animations
```

## 🎨 Customization

### Snakes and Ladders

Edit `src/lib/gameConfig.ts` to modify snake and ladder positions:

```typescript
export const SNAKES: Record<number, number> = {
  99: 54,  // Snake from 99 to 54
  // Add more snakes...
};

export const LADDERS: Record<number, number> = {
  4: 25,   // Ladder from 4 to 25
  // Add more ladders...
};
```

### Player Colors

Customize player appearances in `PLAYER_CONFIGS`:

```typescript
export const PLAYER_CONFIGS = [
  { id: 1, name: 'Player 1', color: '#EF4444', emoji: '🔴' },
  // Customize colors and emojis...
];
```

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Framer Motion** - Animations (via CSS)
- **Sonner** - Toast notifications
- **Vitest** - Testing framework

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.