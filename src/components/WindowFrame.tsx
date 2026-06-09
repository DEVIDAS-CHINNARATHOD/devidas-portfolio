/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { Terminal, Award, FileText, Folder, Globe } from 'lucide-react';
import { AppID, DesktopWindow } from '../types';

interface WindowFrameProps {
  appWindow: DesktopWindow;
  theme?: 'kali-dark' | 'mac-light';
  onClose: (id: AppID) => void;
  onMinimize: (id: AppID) => void;
  onMaximize: (id: AppID) => void;
  onFocus: (id: AppID) => void;
  onTranslate: (id: AppID, x: number, y: number) => void;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  appWindow,
  theme = 'kali-dark',
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onTranslate,
  children,
}) => {
  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    offsetY: number;
    offsetX: number;
  }>({
    isDragging: false,
    offsetY: 0,
    offsetX: 0,
  });

  const headerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Bring window to focus on mouse down
    onFocus(appWindow.id);

    // Only drag with left mouse button click
    if (e.button !== 0 || appWindow.isMaximized) return;

    const startX = e.clientX - appWindow.x;
    const startY = e.clientY - appWindow.y;

    setDragState({
      isDragging: true,
      offsetX: startX,
      offsetY: startY,
    });

    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragState.isDragging) return;

    // Boundary constraint within viewport
    const newX = Math.max(10, Math.min(window.innerWidth - 150, e.clientX - dragState.offsetX));
    const newY = Math.max(35, Math.min(window.innerHeight - 100, e.clientY - dragState.offsetY));

    onTranslate(appWindow.id, newX, newY);
  };

  const handleMouseUp = () => {
    if (dragState.isDragging) {
      setDragState((prev) => ({ ...prev, isDragging: false }));
    }
  };

  React.useEffect(() => {
    if (dragState.isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragState.isDragging]);

  if (!appWindow.isOpen) return null;

  const isLight = theme === 'mac-light';
  const isDarkApp = appWindow.id === 'terminal' || appWindow.id === 'vscode';

  return (
    <div
      style={{
        zIndex: appWindow.zIndex,
        left: appWindow.isMaximized ? '4rem' : `${appWindow.x}px`,
        top: appWindow.isMaximized ? '2rem' : `${appWindow.y}px`,
        width: appWindow.isMaximized ? 'calc(100% - 4rem)' : appWindow.width,
        height: appWindow.isMaximized ? 'calc(100vh - 2rem)' : appWindow.height,
        position: 'absolute',
      }}
      className={`flex flex-col overflow-hidden select-none transition-all duration-150 ${
        isLight
          ? 'bg-white/75 backdrop-blur-2xl border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.14)] rounded-2xl'
          : 'glass-panel rounded shadow-2xl text-on-surface'
      } ${
        appWindow.isMinimized
          ? 'pointer-events-none opacity-0 scale-95 invisible'
          : dragState.isDragging ? 'opacity-90 scale-[1.01]' : 'opacity-100'
      }`}
      onClick={() => onFocus(appWindow.id)}
    >
      {/* Window Title Bar */}
      <div
        ref={headerRef}
        onMouseDown={handleMouseDown}
        className={`h-10 flex items-center justify-between px-4 shrink-0 cursor-move ${
          isLight
            ? 'bg-[#eaebee]/90 border-b border-zinc-200/80 text-zinc-800'
            : 'bg-[#1c2128] border-b border-[#3d4349]'
        }`}
      >
        <div className="flex items-center space-x-2">
          {appWindow.id === 'terminal' && (
            <Terminal className="w-4 h-4 text-sky-500" />
          )}
          {appWindow.id === 'mousepad' && (
            <Award className="w-4 h-4 text-amber-500" />
          )}
          {appWindow.id === 'nano_contact' && (
            <FileText className="w-4 h-4 text-emerald-500" />
          )}
          {appWindow.id === 'file_manager' && (
            <Folder className="w-4 h-4 text-blue-500" />
          )}
          {appWindow.id === 'projects_viewer' && (
            <Globe className="w-4 h-4 text-indigo-500" />
          )}
          <span className={`truncate font-sans font-medium text-xs tracking-wide ${
            isLight ? 'text-zinc-800' : 'text-on-surface'
          }`}>
            {appWindow.title}
          </span>
        </div>

        {/* Action controls */}
        <div className="flex items-center space-x-2 shrink-0 select-none">
          <button
            title="Close"
            onClick={(e) => {
              e.stopPropagation();
              onClose(appWindow.id);
            }}
            className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] hover:bg-[#e04f47] text-[11px] text-transparent hover:text-zinc-900 font-extrabold flex items-center justify-center transition-all cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.15)] hover:scale-105"
          >
            ×
          </button>
          <button
            title="Minimize"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize(appWindow.id);
            }}
            className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] hover:bg-[#e0a624] text-[11px] text-transparent hover:text-zinc-900 font-extrabold flex items-center justify-center transition-all cursor-pointer pb-0.5 shadow-[0_1px_3px_rgba(0,0,0,0.15)] hover:scale-105"
          >
            –
          </button>
          <button
            title="Toggle Maximize"
            onClick={(e) => {
              e.stopPropagation();
              onMaximize(appWindow.id);
            }}
            className="w-3.5 h-3.5 rounded-full bg-[#27c93f] hover:bg-[#1fa331] text-[11px] text-transparent hover:text-zinc-900 font-extrabold flex items-center justify-center transition-all cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.15)] hover:scale-105"
          >
            +
          </button>
        </div>
      </div>

      {/* Embedded Application Frame Area */}
      <div className={`flex-1 overflow-auto select-text ${
        isLight
          ? (isDarkApp ? 'bg-[#0f141c] text-zinc-100' : 'bg-neutral-50/95 text-neutral-900')
          : 'bg-[#0a0c10]'
      }`}>
        {children}
      </div>
    </div>
  );
};
