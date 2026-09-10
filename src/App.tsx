import React, { useState, useEffect, useCallback } from 'react';
import type {
  ActiveScreen,
  GameMode,
  AIDifficulty,
  UserSettings,
  ScoreStats,
  PlayerSymbol,
} from './types';
import {
  loadSettings,
  saveSettings,
  loadStats,
  saveStats,
  resetStats,
  resetSettings,
} from './utils/storage';
import { soundFx } from './utils/sound';
import { Header } from './components/Header';
import { LandingScreen } from './components/LandingScreen';
import { GameScreen } from './components/GameScreen';
import { SettingsModal } from './components/Modals/SettingsModal';
import { HowToPlayModal } from './components/Modals/HowToPlayModal';

export const App: React.FC = () => {
  // State from LocalStorage
  const [settings, setSettings] = useState<UserSettings>(() => loadSettings());
  const [stats, setStats] = useState<ScoreStats>(() => loadStats());

  // Screen and Mode Navigation
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('landing');
  const [gameMode, setGameMode] = useState<GameMode>('pve');
  const [activeDifficulty, setActiveDifficulty] = useState<AIDifficulty>(settings.difficulty);

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  // Sync theme to <html> tag
  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
  }, [settings.theme]);

  // Sync sound mute status
  useEffect(() => {
    soundFx.setMuted(!settings.soundEnabled);
  }, [settings.soundEnabled]);

  // Persist settings whenever changed
  const handleUpdateSettings = useCallback((newPartial: Partial<UserSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newPartial };
      saveSettings(updated);
      return updated;
    });
  }, []);

  // Reset Stats
  const handleResetStats = useCallback(() => {
    const fresh = resetStats();
    setStats(fresh);
  }, []);

  // Reset Settings
  const handleResetSettings = useCallback(() => {
    const fresh = resetSettings();
    setSettings(fresh);
  }, []);

  // Record win/draw to stats
  const handleRecordResult = useCallback((winner: PlayerSymbol | null) => {
    setStats((prev) => {
      let xWins = prev.xWins;
      let oWins = prev.oWins;
      let draws = prev.draws;
      let currentStreak = { ...prev.currentStreak };

      if (winner === 'X') {
        xWins += 1;
        if (currentStreak.winner === 'X') {
          currentStreak.count += 1;
        } else {
          currentStreak = { winner: 'X', count: 1 };
        }
      } else if (winner === 'O') {
        oWins += 1;
        if (currentStreak.winner === 'O') {
          currentStreak.count += 1;
        } else {
          currentStreak = { winner: 'O', count: 1 };
        }
      } else {
        draws += 1;
        currentStreak = { winner: null, count: 0 };
      }

      const updated: ScoreStats = {
        xWins,
        oWins,
        draws,
        totalGames: prev.totalGames + 1,
        currentStreak,
      };

      saveStats(updated);
      return updated;
    });
  }, []);

  // Start game from landing screen
  const handleStartGame = (mode: GameMode, difficulty: AIDifficulty) => {
    setGameMode(mode);
    setActiveDifficulty(difficulty);
    setActiveScreen('game');
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-dark-950 bg-cyber-grid text-slate-100 overflow-x-hidden">
      {/* Dynamic Ambient Neon Lights */}
      <div
        aria-hidden="true"
        className="fixed -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10"
      />
      <div
        aria-hidden="true"
        className="fixed -bottom-40 -right-40 w-96 h-96 bg-purple-600/15 rounded-full blur-[130px] pointer-events-none -z-10"
      />
      <div
        aria-hidden="true"
        className="fixed top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-pink-500/5 rounded-full blur-[140px] pointer-events-none -z-10"
      />

      {/* Persistent Navigation Header */}
      <Header
        activeScreen={activeScreen}
        gameMode={gameMode}
        settings={settings}
        onToggleSound={() => handleUpdateSettings({ soundEnabled: !settings.soundEnabled })}
        onToggleTheme={() => handleUpdateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' })}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onReturnToHome={() => setActiveScreen('landing')}
      />

      {/* Main Screen Content */}
      <div className="flex-1 flex items-center justify-center w-full">
        {activeScreen === 'landing' ? (
          <LandingScreen
            settings={settings}
            stats={stats}
            onStartGame={handleStartGame}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenHelp={() => setIsHelpOpen(true)}
          />
        ) : (
          <GameScreen
            initialMode={gameMode}
            initialDifficulty={activeDifficulty}
            settings={settings}
            stats={stats}
            onRecordResult={handleRecordResult}
            onReturnToHome={() => setActiveScreen('landing')}
            onUpdateDifficulty={(diff) => {
              setActiveDifficulty(diff);
              handleUpdateSettings({ difficulty: diff });
            }}
          />
        )}
      </div>

      {/* Subtle Footer */}
      <footer className="w-full text-center py-3 text-[11px] text-slate-500 font-medium">
        <span>XO Battle &copy; {new Date().getFullYear()} &bull; Cybernetic Tic-Tac-Toe Arena</span>
      </footer>

      {/* Modals */}
      <SettingsModal
        isOpen={isSettingsOpen}
        settings={settings}
        onClose={() => setIsSettingsOpen(false)}
        onUpdateSettings={handleUpdateSettings}
        onResetStats={handleResetStats}
        onResetSettings={handleResetSettings}
      />

      <HowToPlayModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
};

export default App;
