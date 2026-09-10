import React, { useState } from 'react';
import type { GameMode, AIDifficulty, UserSettings, ScoreStats } from '../types';
import { Button } from './UI/Button';
import {
  Users,
  Bot,
  Eye,
  Play,
  HelpCircle,
  Settings,
  Sparkles,
  Zap,
  Shield,
} from 'lucide-react';

export interface LandingScreenProps {
  settings: UserSettings;
  stats: ScoreStats;
  onStartGame: (mode: GameMode, difficulty: AIDifficulty) => void;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  settings,
  stats,
  onStartGame,
  onOpenSettings,
  onOpenHelp,
}) => {
  const [selectedMode, setSelectedMode] = useState<GameMode>('pve');
  const [selectedDifficulty, setSelectedDifficulty] = useState<AIDifficulty>(settings.difficulty);

  const handleStart = () => {
    onStartGame(selectedMode, selectedDifficulty);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4 sm:py-8 flex flex-col items-center text-center animate-fade-in">
      {/* Hero Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold tracking-wide uppercase shadow-neon-cyan-sm mb-4">
        <Sparkles className="w-3.5 h-3.5 animate-spin text-cyan-400" />
        <span>Next-Gen Casual Gaming</span>
      </div>

      {/* Main Title & Tagline */}
      <div className="relative mb-6">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight font-heading text-white">
          XO <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">BATTLE</span>
        </h1>
        <p className="text-base sm:text-xl text-slate-300 font-semibold mt-2 max-w-md mx-auto">
          Classic Tic-Tac-Toe. <span className="text-cyan-400 font-bold">Modern Battle.</span>
        </p>
      </div>

      {/* Decorative Interactive Floating Board Teaser */}
      <div className="relative mb-8 p-3 rounded-2xl glass-panel-glow border border-white/10 flex items-center gap-2 max-w-xs mx-auto shadow-2xl">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center font-black text-cyan-400 text-xl shadow-neon-cyan-sm animate-pulse">
          X
        </div>
        <div className="w-10 h-10 rounded-xl bg-slate-900/50 border border-white/5 flex items-center justify-center font-bold text-slate-600 text-sm">
          VS
        </div>
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/50 flex items-center justify-center font-black text-purple-400 text-xl shadow-neon-purple-sm animate-pulse">
          O
        </div>
        <div className="text-left ml-2">
          <div className="text-xs font-bold text-white">Grid Arena</div>
          <div className="text-[10px] text-slate-400">Tactical 3x3 Cyber Duel</div>
        </div>
      </div>

      {/* Game Mode Selection Grid */}
      <div className="w-full space-y-3 mb-6 text-left">
        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 text-center sm:text-left px-1">
          Select Game Mode
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Mode 1: PvP */}
          <button
            type="button"
            onClick={() => setSelectedMode('pvp')}
            className={`p-4 rounded-2xl text-left transition-all duration-200 border relative overflow-hidden group ${
              selectedMode === 'pvp'
                ? 'bg-cyan-500/15 border-cyan-400 shadow-neon-cyan-sm text-white'
                : 'glass-panel text-slate-300 hover:border-white/20 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
                <Users className="w-5 h-5" />
              </div>
              {selectedMode === 'pvp' && (
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-neon-cyan-sm" />
              )}
            </div>
            <div className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
              Player vs Player
            </div>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              2 Players, 1 device. Clash turn by turn.
            </p>
          </button>

          {/* Mode 2: PvAI */}
          <button
            type="button"
            onClick={() => setSelectedMode('pve')}
            className={`p-4 rounded-2xl text-left transition-all duration-200 border relative overflow-hidden group ${
              selectedMode === 'pve'
                ? 'bg-purple-500/15 border-purple-400 shadow-neon-purple-sm text-white'
                : 'glass-panel text-slate-300 hover:border-white/20 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
                <Bot className="w-5 h-5" />
              </div>
              {selectedMode === 'pve' && (
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-neon-purple-sm" />
              )}
            </div>
            <div className="font-bold text-sm text-white group-hover:text-purple-300 transition-colors">
              Player vs AI
            </div>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Play as X against smart algorithmic AI.
            </p>
          </button>

          {/* Mode 3: EvE */}
          <button
            type="button"
            onClick={() => setSelectedMode('eve')}
            className={`p-4 rounded-2xl text-left transition-all duration-200 border relative overflow-hidden group ${
              selectedMode === 'eve'
                ? 'bg-pink-500/15 border-pink-400 shadow-neon-pink text-white'
                : 'glass-panel text-slate-300 hover:border-white/20 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2.5 rounded-xl bg-pink-500/20 text-pink-400">
                <Eye className="w-5 h-5" />
              </div>
              {selectedMode === 'eve' && (
                <span className="w-2.5 h-2.5 rounded-full bg-pink-400" />
              )}
            </div>
            <div className="font-bold text-sm text-white group-hover:text-pink-300 transition-colors">
              AI vs AI
            </div>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Spectator battle. Watch bots fight automatically.
            </p>
          </button>
        </div>
      </div>

      {/* Difficulty Picker for PvAI or EvE */}
      {selectedMode !== 'pvp' && (
        <div className="w-full p-4 rounded-2xl glass-panel mb-6 animate-scale-in text-left">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              AI Intelligence Level
            </span>
            <span className="text-[11px] text-cyan-400 font-semibold capitalize">
              {selectedDifficulty === 'hard' ? 'Unbeatable Minimax' : `${selectedDifficulty} mode`}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(['easy', 'medium', 'hard'] as AIDifficulty[]).map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => setSelectedDifficulty(diff)}
                className={`py-2 px-3 rounded-xl text-xs font-bold capitalize transition-all border ${
                  selectedDifficulty === diff
                    ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300 shadow-neon-cyan-sm'
                    : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Primary Call to Action Button */}
      <div className="w-full max-w-sm mb-6">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleStart}
          leftIcon={<Play className="w-5 h-5 fill-slate-950" />}
          className="py-4 text-base tracking-wide"
        >
          Start Battle
        </Button>
      </div>

      {/* Quick Stats & Secondary Controls */}
      <div className="w-full max-w-md flex items-center justify-between gap-3 pt-4 border-t border-white/10 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <Shield className="w-4 h-4 text-slate-500" />
          <span>Matches Played: <strong className="text-white">{stats.totalGames}</strong></span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenHelp}
            className="px-3 py-1.5 rounded-xl glass-panel text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors font-semibold"
          >
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>How to Play</span>
          </button>
          <button
            type="button"
            onClick={onOpenSettings}
            className="px-3 py-1.5 rounded-xl glass-panel text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors font-semibold"
          >
            <Settings className="w-3.5 h-3.5 text-purple-400" />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};
