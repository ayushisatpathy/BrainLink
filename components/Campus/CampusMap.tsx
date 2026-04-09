"use client";

import React, { useEffect, useRef } from 'react';
import * as Phaser from 'phaser';
import { MainScene } from '@/game/scenes/MainScene';
import RoomOverlay from './RoomOverlay';

const CampusMap: React.FC = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && gameContainerRef.current && !gameRef.current) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        parent: gameContainerRef.current,
        width: 800,
        height: 600,
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { x: 0, y: 0 },
            debug: false,
          },
        },
        scene: [MainScene],
        audio: {
          noAudio: true
        }
      };

      gameRef.current = new Phaser.Game({
        ...config,
        disableContextMenu: true
      });
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-slate-900 border-x border-white/5">
      <div className="relative bg-slate-900 p-2 rounded-[2rem] border-[12px] border-slate-800 shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden">
        <div ref={gameContainerRef} className="rounded-2xl overflow-hidden shadow-inner" />
      </div>
    </div>
  );
};

export default CampusMap;
