import React, { useState } from 'react';
import type { UserSettings, AIDifficulty } from '../../types';
import { Modal } from '../UI/Modal';
import { Button } from '../UI/Button';
import {
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Bot,
  User,
  AlertTriangle,
  Check,
} from 'lucide-react';

export interface SettingsModalProps {
  isOpen: boolean;
  settings: UserSettings;
  onClose: () => void;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
  onResetStats: () => void;
  onResetSettings: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  settings,
  onClose,
  onUpdateSettings,
  onResetStats,
  onResetSettings,
}) => {
  const [confirmResetStats, setConfirmResetStats] = useState(false);
  const [confirmResetAll, setConfirmResetAll] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleStatsReset = () => {
    onResetStats();
    setConfirmResetStats(false);
    showNotice('Statistics reset successfully');
  };

  const handleAllReset = () => {
    onResetSettings();
    setConfirmResetAll(false);
    showNotice('Settings reset to defaults');
  };

  const showNotice = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 2500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Settings"
      subtitle="Customize audio, appearance, players and AI"
      maxWidth="md"
    >
      <div className="space-y-5 text-sm">
        {/* Flash Message */}
        {successMessage && (
          <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fade-in">
            <Check className="w-4 h-4" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Audio & Theme Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Sound Toggle */}
          <div className="p-3.5 rounded-2xl bg-dark-900/60 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                {settings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </div>
              <div>
                <div className="font-bold text-white text-xs sm:text-sm">Sound Effects</div>
                <div className="text-[11px] text-slate-400">Web Audio FX</div>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={settings.soundEnabled}
              onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                settings.soundEnabled ? 'bg-cyan-500 justify-end' : 'bg-slate-700 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-slate-950 shadow-md transform transition-transform" />
            </button>
          </div>

          {/* Theme Toggle */}
          <div className="p-3.5 rounded-2xl bg-dark-900/60 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                {settings.theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </div>
              <div>
                <div className="font-bold text-white text-xs sm:text-sm">Theme</div>
                <div className="text-[11px] text-slate-400">{settings.theme === 'dark' ? 'Cyber Dark' : 'Light Matrix'}</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onUpdateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' })}
              className="px-2.5 py-1 rounded-xl text-xs font-bold bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10 transition-colors"
            >
              {settings.theme === 'dark' ? 'Dark' : 'Light'}
            </button>
          </div>
        </div>

        {/* AI Difficulty Selector */}
        <div className="p-3.5 rounded-2xl bg-dark-900/60 border border-white/10 space-y-2">
          <label className="font-bold text-white text-xs sm:text-sm flex items-center gap-2">
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>Default AI Difficulty</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['easy', 'medium', 'hard'] as AIDifficulty[]).map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => onUpdateSettings({ difficulty: diff })}
                className={`py-2 px-2 rounded-xl text-xs font-bold capitalize transition-all duration-200 border ${
                  settings.difficulty === diff
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-neon-cyan-sm'
                    : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-400">
            {settings.difficulty === 'easy' && 'Casual play. AI makes mostly random exploratory moves.'}
            {settings.difficulty === 'medium' && 'Balanced. AI wins when possible, blocks attacks, and plays smart.'}
            {settings.difficulty === 'hard' && 'Unbeatable. Powered by optimal Minimax tree search.'}
          </p>
        </div>

        {/* Player Names Customization */}
        <div className="p-3.5 rounded-2xl bg-dark-900/60 border border-white/10 space-y-3">
          <div className="font-bold text-white text-xs sm:text-sm flex items-center gap-2">
            <User className="w-4 h-4 text-purple-400" />
            <span>Player Customization</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="p1-name" className="block text-[11px] font-semibold text-slate-400 mb-1">
                Player 1 (X)
              </label>
              <input
                id="p1-name"
                type="text"
                maxLength={16}
                value={settings.playerXName}
                onChange={(e) => onUpdateSettings({ playerXName: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl bg-dark-950 border border-cyan-500/30 text-white text-xs focus:outline-none focus:border-cyan-400"
                placeholder="Player X"
              />
            </div>

            <div>
              <label htmlFor="p2-name" className="block text-[11px] font-semibold text-slate-400 mb-1">
                Player 2 (O - PvP)
              </label>
              <input
                id="p2-name"
                type="text"
                maxLength={16}
                value={settings.playerOName}
                onChange={(e) => onUpdateSettings({ playerOName: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl bg-dark-950 border border-purple-500/30 text-white text-xs focus:outline-none focus:border-purple-400"
                placeholder="Player O"
              />
            </div>
          </div>

          <div>
            <label htmlFor="ai-name" className="block text-[11px] font-semibold text-slate-400 mb-1">
              AI Name (PvE)
            </label>
            <input
              id="ai-name"
              type="text"
              maxLength={16}
              value={settings.aiName}
              onChange={(e) => onUpdateSettings({ aiName: e.target.value })}
              className="w-full px-3 py-1.5 rounded-xl bg-dark-950 border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
              placeholder="Nexus AI"
            />
          </div>
        </div>

        {/* Reset Actions */}
        <div className="pt-2 border-t border-white/10 space-y-2">
          {/* Reset Stats */}
          {confirmResetStats ? (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-red-400 text-xs font-semibold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Confirm reset all stats?</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleStatsReset}
                  className="px-2.5 py-1 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-500"
                >
                  Yes, Reset
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmResetStats(false)}
                  className="px-2.5 py-1 rounded-lg bg-white/10 text-slate-300 text-xs hover:bg-white/20"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Score & match history</span>
              <button
                type="button"
                onClick={() => setConfirmResetStats(true)}
                className="text-xs text-red-400 hover:text-red-300 font-semibold underline underline-offset-2"
              >
                Reset Statistics
              </button>
            </div>
          )}

          {/* Reset All Settings */}
          {confirmResetAll ? (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-red-400 text-xs font-semibold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Reset all preferences to default?</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAllReset}
                  className="px-2.5 py-1 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-500"
                >
                  Yes, Reset
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmResetAll(false)}
                  className="px-2.5 py-1 rounded-lg bg-white/10 text-slate-300 text-xs hover:bg-white/20"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Restore factory defaults</span>
              <button
                type="button"
                onClick={() => setConfirmResetAll(true)}
                className="text-xs text-slate-400 hover:text-white font-semibold underline underline-offset-2"
              >
                Reset All Settings
              </button>
            </div>
          )}
        </div>

        {/* Done Button */}
        <div className="pt-2">
          <Button variant="primary" fullWidth size="md" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
};
