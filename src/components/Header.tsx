import React from 'react';
import { Volume2, VolumeX, Moon, Sun, Settings, HelpCircle, ArrowLeft, Swords } from 'lucide-react';
import type { ActiveScreen, GameMode, UserSettings } from '../types';
import { soundFx } from '../utils/sound';

export interface HeaderProps {
  activeScreen: ActiveScreen;
  gameMode: GameMode;
  settings: UserSettings;
  onToggleSound: () => void;
  onToggleTheme: () => void;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
  onReturnToHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  gameMode,
  settings,
  onToggleSound,
  onToggleTheme,
  onOpenSettings,
  onOpenHelp,
  onReturnToHome,
}) => {
  const modeLabels: Record<GameMode, string> = {
    pvp: 'Player vs Player',
    pve: 'Player vs AI',
    eve: 'AI vs AI',
  };

  return (
    <header className="w-full max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-2 sm:gap-4 select-none">
      {/* Brand / Title or Back Button */}
      <div className="flex items-center gap-2.5">
        {activeScreen === 'game' ? (
          <button
            onClick={() => {
              soundFx.playClick();
              onReturnToHome();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-panel text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="Back to Menu"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Menu</span>
          </button>
        ) : null}

        <div
          onClick={() => {
            if (activeScreen === 'game') {
              soundFx.playClick();
              onReturnToHome();
            }
          }}
          className={`flex items-center gap-2.5 ${activeScreen === 'game' ? 'cursor-pointer' : ''}`}
        >
          {/* Neon Logo Glyph */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-purple-600 to-pink-500 p-[1px] shadow-neon-cyan-sm">
            <div className="w-full h-full bg-dark-950 rounded-[11px] flex items-center justify-center">
              <Swords className="w-5 h-5 text-cyan-400" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-lg sm:text-xl text-white font-heading">
                XO <span className="text-cyan-400 text-glow-cyan">BATTLE</span>
              </span>
              {activeScreen === 'game' && (
                <span className="hidden md:inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/5 border border-white/10 text-slate-300">
                  {modeLabels[gameMode]}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Utility Buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Sound Toggle */}
        <button
          onClick={() => {
            soundFx.playClick();
            onToggleSound();
          }}
          className={`p-2 rounded-xl glass-panel transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
            settings.soundEnabled ? 'text-cyan-400 border-cyan-500/30' : 'text-slate-500'
          }`}
          aria-label={settings.soundEnabled ? 'Mute sound effects' : 'Unmute sound effects'}
          title={settings.soundEnabled ? 'Mute sound' : 'Unmute sound'}
        >
          {settings.soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => {
            soundFx.playClick();
            onToggleTheme();
          }}
          className="p-2 rounded-xl glass-panel text-slate-300 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label={settings.theme === 'dark' ? 'Switch to light matrix theme' : 'Switch to cyber dark theme'}
          title="Toggle theme"
        >
          {settings.theme === 'dark' ? <Moon className="w-4 h-4 sm:w-5 sm:h-5" /> : <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />}
        </button>

        {/* How to Play */}
        <button
          onClick={() => {
            soundFx.playClick();
            onOpenHelp();
          }}
          className="p-2 rounded-xl glass-panel text-slate-300 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="How to play guide"
          title="How to play"
        >
          <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Settings */}
        <button
          onClick={() => {
            soundFx.playClick();
            onOpenSettings();
          }}
          className="p-2 rounded-xl glass-panel text-slate-300 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="Open settings"
          title="Settings"
        >
          <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </header>
  );
};
