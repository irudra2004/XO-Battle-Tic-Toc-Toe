import React from 'react';
import { Modal } from '../UI/Modal';
import { Button } from '../UI/Button';
import { Swords, Bot, Users, Eye, Keyboard, ShieldCheck } from 'lucide-react';

export interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="How to Play XO Battle"
      subtitle="Master the arena and outsmart your opponent"
      maxWidth="md"
    >
      <div className="space-y-4 text-xs sm:text-sm text-slate-300">
        {/* Core Rules */}
        <div className="p-3.5 rounded-2xl bg-dark-900/60 border border-white/10 space-y-2">
          <div className="font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Game Rules</span>
          </div>
          <ul className="space-y-1.5 list-disc list-inside text-slate-400">
            <li><strong className="text-white">Player X</strong> always makes the opening move.</li>
            <li>Players take alternating turns marking an empty grid cell.</li>
            <li>Connect <strong className="text-cyan-400">3 marks in a row</strong> (horizontally, vertically, or diagonally) to secure victory!</li>
            <li>If all 9 cells are occupied with no 3-in-a-row, the duel ends in a <strong className="text-amber-400">Draw</strong>.</li>
          </ul>
        </div>

        {/* Game Modes */}
        <div className="p-3.5 rounded-2xl bg-dark-900/60 border border-white/10 space-y-2.5">
          <div className="font-bold text-white flex items-center gap-2">
            <Swords className="w-4 h-4 text-purple-400" />
            <span>Game Modes</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-start gap-2.5">
              <Users className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
              <div>
                <strong className="text-white">Player vs Player:</strong> Two gladiators clash locally on the same device.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Bot className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <strong className="text-white">Player vs AI:</strong> Duel the machine across Easy, Medium, or impossible Minimax Hard.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Eye className="w-4 h-4 text-pink-400 mt-0.5 shrink-0" />
              <div>
                <strong className="text-white">AI vs AI:</strong> Spectate two autonomous algorithms wage warfare with automated turns.
              </div>
            </div>
          </div>
        </div>

        {/* Keyboard Controls */}
        <div className="p-3.5 rounded-2xl bg-dark-900/60 border border-white/10 space-y-2">
          <div className="font-bold text-white flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-emerald-400" />
            <span>Accessibility & Controls</span>
          </div>
          <p className="text-slate-400">
            Navigate the grid with <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">Arrow Keys</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">Tab</kbd>. Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">Space</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">Enter</kbd> to place your mark.
          </p>
        </div>

        <div className="pt-2">
          <Button variant="primary" fullWidth size="md" onClick={onClose}>
            Got It, Let's Play!
          </Button>
        </div>
      </div>
    </Modal>
  );
};
