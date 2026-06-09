/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Terminal as TerminalIcon,
  Globe,
  Folder,
  Settings,
  Award,
  FileText,
  Trash2,
  Wifi,
  WifiOff,
  Battery,
  Volume2,
  ExternalLink,
  Github,
  Linkedin,
  MapPin,
  Calendar,
  Briefcase,
  Layers,
  Heart,
  Code,
  Compass,
  Sun,
  Moon
} from 'lucide-react';

import { INITIAL_FILES, USER_PROFILE_PHOTO } from './data';
import { AppID, DesktopWindow, SystemFile, ContactMessage } from './types';
import { WindowFrame } from './components/WindowFrame';
import { TerminalApp } from './components/TerminalApp';
import { MousepadApp } from './components/MousepadApp';
import { NanoContactApp } from './components/NanoContactApp';
import { FileManagerApp } from './components/FileManagerApp';
import { ProjectsApp } from './components/ProjectsApp';
import { VSCodeApp } from './components/VSCodeApp';
import { ChromeApp } from './components/ChromeApp';
import { PdfResumeApp } from './components/PdfResumeApp';
import { ProfileApp } from './components/ProfileApp';
import kaliBg1 from './assets/images/kali-bg.jpg';
import kaliBg2 from './assets/images/kalibg2.png';
import kaliBg3 from './assets/images/kali-bg3.jpg';

const BG_OPTIONS = [
  { id: 'default', label: 'Default', dark: null, light: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2560&q=80' },
  { id: 'kali1', label: 'Kali BG 1', dark: kaliBg1, light: kaliBg1 },
  { id: 'kali2', label: 'Kali BG 2', dark: kaliBg2, light: kaliBg2 },
  { id: 'kali3', label: 'Kali BG 3', dark: kaliBg3, light: kaliBg3 },
];

export default function App() {
  // Theme Manager States
  const [theme, setTheme] = useState<'kali-dark' | 'mac-light'>('mac-light');
  const isLight = theme === 'mac-light';
  const [bgId, setBgId] = useState<string>('kali3');
  const [showBgPicker, setShowBgPicker] = useState<boolean>(false);
  const activeBg = BG_OPTIONS.find(b => b.id === bgId) || BG_OPTIONS[0];

  // Persistence Database files state
  const [files, setFiles] = useState<SystemFile[]>(() => {
    const saved = localStorage.getItem('kali-files-database');
    return saved ? JSON.parse(saved) : INITIAL_FILES;
  });

  // Windows Desktop Manager States
  const [windows, setWindows] = useState<DesktopWindow[]>([
    {
      id: 'terminal',
      title: 'root@kali: ~',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      x: 120,
      y: 70,
      width: '54rem',
      height: '520px',
    },
    {
      id: 'mousepad',
      title: 'dossier_skills_certs.txt - Mousepad',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 5,
      x: 200,
      y: 110,
      width: '52rem',
      height: '500px',
    },
    {
      id: 'nano_contact',
      title: 'contact_init.conf - nano',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      x: 260,
      y: 140,
      width: '46rem',
      height: '460px',
    },
    {
      id: 'file_manager',
      title: 'File Manager - /root',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      x: 280,
      y: 160,
      width: '48rem',
      height: '450px',
    },
    {
      id: 'projects_viewer',
      title: 'Projects Repository - Exploit Registry',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      x: 160,
      y: 150,
      width: '50rem',
      height: '480px',
    },
    {
      id: 'vscode',
      title: 'Visual Studio Code - opendev-security-repo',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      x: 140,
      y: 80,
      width: '58rem',
      height: '560px',
    },
    {
      id: 'chrome',
      title: 'Chrome Web Browser - Secure Sandbox',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      x: 180,
      y: 100,
      width: '56rem',
      height: '540px',
    },
    {
      id: 'pdf_resume',
      title: 'Devidas_Chinnarathod_Resume.pdf - PDF Viewer',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      x: 200,
      y: 90,
      width: '52rem',
      height: '580px',
    },
    {
      id: 'profile',
      title: 'Profile — Devidas Chinnarathod',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      x: 220,
      y: 80,
      width: '26rem',
      height: '560px',
    },
  ]);

  // System States
  const [wifiOnline, setWifiOnline] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<string>('23:54');
  const [appDropdown, setAppDropdown] = useState<'applications' | 'places' | null>(null);
  const [activeHandshakeCount, setActiveHandshakeCount] = useState<number>(0);

  // Synchronize dynamic files back to persistence storage
  useEffect(() => {
    localStorage.setItem('kali-files-database', JSON.stringify(files));
  }, [files]);

  // Ticking systems clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hrs}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sync initial message DB count index
  useEffect(() => {
    const raw = localStorage.getItem('kali-contact-database');
    if (raw) {
      const parsed = JSON.parse(raw);
      setActiveHandshakeCount(parsed.length);
    }
  }, []);

  // System Core Rename file works
  const handleRenameFile = (fileId: string, newName: string) => {
    setFiles((prev) =>
      prev.map((f) => {
        if (f.id === fileId) {
          // If renaming resume.txt, make sure to preserve its link
          return {
            ...f,
            name: newName,
            path: f.path.substring(0, f.path.lastIndexOf('/') + 1) + newName,
          };
        }
        return f;
      })
    );
  };

  const handleOpenFile = (file: SystemFile) => {
    if (file.type === 'conf') {
      handleOpenApp('nano_contact');
    } else if (file.id === 'certifications') {
      handleOpenApp('mousepad');
    } else {
      // Just open terminal, and print cat output for ease of use
      handleOpenApp('terminal');
    }
  };

  const handleDeleteFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  // Window actions state manager
  const handleOpenApp = (id: AppID) => {
    setWindows((prev) => {
      const target = prev.find((w) => w.id === id);
      
      const cleaned = target ? prev : [
        ...prev,
        {
          id,
          title: getTitleByAppId(id),
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: 1,
          x: 200,
          y: 120,
          width: '45rem',
          height: '420px'
        }
      ];

      const maxZ = Math.max(...cleaned.map((w) => w.zIndex), 0);

      // Smart toggling window manager actions:
      // If the target app is already open, NOT minimized, and currently topmost (focused),
      // clicking the launcher icon should MINIMIZE it!
      if (target && target.isOpen && !target.isMinimized && target.zIndex === maxZ) {
        return cleaned.map((w) => {
          if (w.id === id) {
            return {
              ...w,
              isMinimized: true,
            };
          }
          return w;
        });
      }

      // Otherwise: open it, restore it (turn off minimize), and focus it on top
      return cleaned.map((w) => {
        if (w.id === id) {
          return {
            ...w,
            isOpen: true,
            isMinimized: false,
            zIndex: maxZ + 1,
          };
        }
        return w;
      });
    });
  };

  const getTitleByAppId = (id: AppID): string => {
    switch (id) {
      case 'terminal': return 'root@kali: ~';
      case 'mousepad': return 'dossier_skills_certs.txt - Mousepad';
      case 'nano_contact': return 'contact_init.conf - nano';
      case 'file_manager': return 'File Manager - /root';
      case 'projects_viewer': return 'Projects Repository - Exploit Registry';
      case 'profile': return 'Profile — Devidas Chinnarathod';
      default: return 'System App';
    }
  };

  const handleCloseWindow = (id: AppID) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          return { ...w, isOpen: false };
        }
        return w;
      })
    );
  };

  const handleMinimizeWindow = (id: AppID) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          return { ...w, isMinimized: true };
        }
        return w;
      })
    );
  };

  const handleMaximizeWindow = (id: AppID) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          return { ...w, isMaximized: !w.isMaximized };
        }
        return w;
      })
    );
  };

  const handleFocusWindow = (id: AppID) => {
    setWindows((prev) => {
      const maxZ = Math.max(...prev.map((w) => w.zIndex), 0);
      return prev.map((w) => {
        if (w.id === id) {
          return { ...w, zIndex: maxZ + 1, isMinimized: false };
        }
        return w;
      });
    });
  };

  const handleTranslateWindow = (id: AppID, x: number, y: number) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          return { ...w, x, y };
        }
        return w;
      })
    );
  };

  // Synchronize datatable message dispatches index
  const handleMessageDispatched = (msg: ContactMessage) => {
    setActiveHandshakeCount((prev) => prev + 1);
  };

  // Resume named files tracer finder
  const resumeFile = files.find((f) => f.id === 'resume') || files[1];

  return (
    <div className={`text-on-background min-h-screen h-screen w-screen relative overflow-hidden select-none font-sans transition-colors duration-500 ${
      isLight ? 'bg-[#e2e4e9] text-zinc-800' : 'bg-background text-on-background kali-matrix-bg'
    }`}>
      {/* Background Desktop Wallpaper */}
      <img
        alt="Operating system desktop background wallpaper"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none transition-all duration-700 ease-in-out"
        src={
          bgId === 'default'
            ? (isLight
              ? "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2560&q=80"
              : "https://lh3.googleusercontent.com/aida-public/AB6AXuAcpBiqV-83K45e-rZdtZX_8URBcaB7ABYUMd8u34nYxKALitW0yNttBdofnRuacSwgbw05hwEHPlS_5EeucHO3X-D3eUEEMCEcwAq3J93EtVovAyLlUEOuJdIRyLxE9h7gs_SEPtCywKLFz2tXxWkp4hC3ga_UXRCz5dL3USxrT35qqVRpYfCmQwZywcXPyy9UlYTmxwFZ_acshOYJUx_ntr3cQVK0w5h1WtGvK1LOwDq_k5wgnt9J0d_CIoQmA-hnPfFBArL7h40")
            : (isLight ? activeBg.light : activeBg.dark) || ''
        }
        style={{
          opacity: isLight ? (bgId === 'default' ? 0.95 : 1) : (bgId === 'default' ? 0.20 : 0.55),
        }}
        referrerPolicy="no-referrer"
      />

      {/* ==================== 1. TOP ACCESS BAR ==================== */}
      <header className={`fixed top-0 left-0 w-full z-[999] flex justify-between items-center px-4 h-9 font-sans select-none transition-all duration-350 border-b ${
        isLight
          ? 'bg-white/80 backdrop-blur-2xl border-zinc-200/80 text-zinc-800 shadow-sm'
          : 'bg-surface-container-highest border-[#3c4949]/30 text-on-surface'
      }`}>
        <div className="flex items-center space-x-4">
          <span className={`text-sm font-bold tracking-tight transition-colors ${
            isLight ? 'text-zinc-900' : 'text-primary'
          }`}>
            Kali Linux
          </span>
          <nav className="flex space-x-2 h-full text-xs">
            {/* Applications dropdown */}
            <div className="relative h-full">
              <button
                onClick={() => setAppDropdown(appDropdown === 'applications' ? null : 'applications')}
                className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                  appDropdown === 'applications'
                    ? (isLight ? 'bg-blue-600 text-white' : 'bg-primary text-black')
                    : (isLight ? 'text-zinc-700 hover:bg-zinc-200/60' : 'text-slate-350 hover:bg-primary/20 hover:text-black')
                }`}
              >
                Applications
              </button>
              {appDropdown === 'applications' && (
                <div className={`absolute left-0 mt-1.5 w-48 rounded-lg shadow-2xl py-1.5 z-50 text-left border ${
                  isLight
                    ? 'bg-white/95 backdrop-blur-xl border-zinc-200 text-zinc-800'
                    : 'bg-[#161b22] border-[#30363d] text-slate-350'
                }`}>
                  <button
                    onClick={() => { handleOpenApp('terminal'); setAppDropdown(null); }}
                    className={`flex items-center space-x-2 px-3 py-2 text-xs w-full text-left transition-colors ${
                      isLight ? 'hover:bg-blue-600/10 hover:text-blue-600 text-zinc-700' : 'hover:bg-primary/20 hover:text-primary text-slate-300'
                    }`}
                  >
                    <TerminalIcon className={`w-3.5 h-3.5 ${isLight ? 'text-blue-600' : 'text-primary'}`} />
                    <span>Terminal Emulator</span>
                  </button>
                  <button
                    onClick={() => { handleOpenApp('mousepad'); setAppDropdown(null); }}
                    className={`flex items-center space-x-2 px-3 py-2 text-xs w-full text-left transition-colors ${
                      isLight ? 'hover:bg-blue-600/10 hover:text-blue-600 text-zinc-700' : 'hover:bg-primary/20 hover:text-primary text-slate-300'
                    }`}
                  >
                    <Award className={`w-3.5 h-3.5 ${isLight ? 'text-amber-500' : 'text-secondary'}`} />
                    <span>Mousepad Skill Editor</span>
                  </button>
                  <button
                    onClick={() => { handleOpenApp('file_manager'); setAppDropdown(null); }}
                    className={`flex items-center space-x-2 px-3 py-2 text-xs w-full text-left transition-colors ${
                      isLight ? 'hover:bg-blue-600/10 hover:text-blue-600 text-zinc-700' : 'hover:bg-primary/20 hover:text-primary text-slate-300'
                    }`}
                  >
                    <Folder className={`w-3.5 h-3.5 ${isLight ? 'text-blue-500' : 'text-primary'}`} />
                    <span>File Browser</span>
                  </button>
                  <button
                    onClick={() => { handleOpenApp('nano_contact'); setAppDropdown(null); }}
                    className={`flex items-center space-x-2 px-3 py-2 text-xs w-full text-left transition-colors ${
                      isLight ? 'hover:bg-blue-600/10 hover:text-blue-600 text-zinc-700' : 'hover:bg-primary/20 hover:text-primary text-slate-300'
                    }`}
                  >
                    <FileText className={`w-3.5 h-3.5 ${isLight ? 'text-emerald-500' : 'text-tertiary'}`} />
                    <span>Nano Config Dispatcher</span>
                  </button>
                </div>
              )}
            </div>

            {/* Places dropdown */}
            <div className="relative h-full">
              <button
                onClick={() => setAppDropdown(appDropdown === 'places' ? null : 'places')}
                className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                  appDropdown === 'places'
                    ? (isLight ? 'bg-blue-600 text-white' : 'bg-primary text-black')
                    : (isLight ? 'text-zinc-700 hover:bg-zinc-200/60' : 'text-slate-350 hover:bg-primary/20 hover:text-black')
                }`}
              >
                Places
              </button>
              {appDropdown === 'places' && (
                <div className={`absolute left-0 mt-1.5 w-48 rounded-lg shadow-2xl py-1.5 z-50 text-left border ${
                  isLight
                    ? 'bg-white/95 backdrop-blur-xl border-zinc-200 text-zinc-800'
                    : 'bg-[#161b22] border-[#30363d]'
                }`}>
                  <button
                    onClick={() => { handleOpenApp('file_manager'); setAppDropdown(null); }}
                    className={`flex items-center space-x-2 px-3 py-2 text-xs w-full text-left transition-colors ${
                      isLight ? 'hover:bg-blue-600/10 hover:text-blue-600 text-zinc-700' : 'hover:bg-primary/20 hover:text-primary text-slate-300'
                    }`}
                  >
                    <Folder className="w-3.5 h-3.5" />
                    <span>Desktop Directory</span>
                  </button>
                  <button
                    onClick={() => { handleOpenApp('projects_viewer'); setAppDropdown(null); }}
                    className={`flex items-center space-x-2 px-3 py-2 text-xs w-full text-left transition-colors ${
                      isLight ? 'hover:bg-blue-600/10 hover:text-blue-600 text-zinc-700' : 'hover:bg-primary/20 hover:text-primary text-slate-300'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Exploit Portfolios</span>
                  </button>
                  <button
                    onClick={() => { handleOpenApp('nano_contact'); setAppDropdown(null); }}
                    className={`flex items-center space-x-2 px-3 py-2 text-xs w-full text-left transition-colors ${
                      isLight ? 'hover:bg-blue-600/10 hover:text-blue-600 text-zinc-700' : 'hover:bg-primary/20 hover:text-primary text-slate-300'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5 text-[#ffb4ac]" />
                    <span>Contact Channel</span>
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Network and systems triggers bar */}
        <div className={`flex items-center space-x-4 text-xs font-bold transition-colors ${
          isLight ? 'text-zinc-700' : 'text-primary'
        }`}>
          <div className="flex items-center space-x-3">
            {/* Interactive Theme Toggle Switch */}
            <button
              onClick={() => setTheme(isLight ? 'kali-dark' : 'mac-light')}
              title={`Toggle appearance: current mode is ${theme}`}
              className={`p-1 rounded flex items-center gap-1.5 transition-all group shrink-0 hover:bg-neutral-200/50 cursor-pointer ${
                isLight ? 'text-zinc-650 hover:text-zinc-900' : 'hover:bg-primary/10 text-primary'
              }`}
            >
              {isLight ? (
                <>
                  <Moon className="w-4 h-4 text-indigo-600 transition-colors" />
                  <span className="text-[10px] text-zinc-550 group-hover:text-zinc-850 hidden lg:inline">Kali Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-[#ffbe2e] hover:text-[#ffd255] transition-colors" />
                  <span className="text-[10px] text-slate-400 group-hover:text-primary hidden lg:inline">Kali Light</span>
                </>
              )}
            </button>

            {/* Interactive Wifi online state toggle */}
            <button
              onClick={() => {
                setWifiOnline(!wifiOnline);
                // Console notify to active terminal instances
                const log = `[sys_kernel] Network State Change: Interfaces toggled ${!wifiOnline ? 'ONLINE' : 'OFFLINE'}`;
                console.log(log);
              }}
              title={`Network Interface: Click to toggle ${wifiOnline ? 'Offline' : 'Online'}`}
              className={`p-1 rounded-sm flex items-center gap-1 transition-all group shrink-0 cursor-pointer ${
                isLight ? 'hover:bg-zinc-200/50' : 'hover:bg-primary/20'
              }`}
            >
              {wifiOnline ? (
                <>
                  <Wifi className={`w-4 h-4 animate-pulse ${isLight ? 'text-blue-500' : 'text-[#54d9dd]'}`} />
                  <span className={`text-[10px] hidden sm:inline ${isLight ? 'text-zinc-500' : 'text-slate-400'}`}>wlan0 ON</span>
                </>
              ) : (
                <>
                  <WifiOff className={`w-4 h-4 ${isLight ? 'text-zinc-500' : 'text-tertiary'}`} />
                  <span className={`text-[10px] hidden sm:inline ${isLight ? 'text-zinc-500' : 'text-slate-400'}`}>wlan0 OFF</span>
                </>
              )}
            </button>

            {/* Battery standard label */}
            <div className="flex items-center gap-1 opacity-80 shrink-0" title="Simulated power loop status: Charging">
              <Battery className={`w-4 h-4 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
              <span className={`text-[9px] font-mono hidden sm:inline ${isLight ? 'text-zinc-500' : 'text-slate-400'}`}>100% (AC)</span>
            </div>

            {/* Volume label */}
            <div className="flex items-center gap-1 opacity-80 shrink-0" title="Kernel audio master node">
              <Volume2 className={`w-4 h-4 ${isLight ? 'text-blue-500' : 'text-sky-400'}`} />
            </div>

            {/* BG Picker button */}
            <div className="relative shrink-0">
              <button
                onClick={() => setShowBgPicker(!showBgPicker)}
                title="Change desktop background"
                className={`p-1 rounded flex items-center gap-1 transition-all cursor-pointer text-[10px] font-bold ${
                  isLight ? 'text-zinc-600 hover:bg-zinc-200/50' : 'text-slate-400 hover:bg-primary/10 hover:text-primary'
                } ${showBgPicker ? (isLight ? 'bg-zinc-200/50' : 'bg-primary/10') : ''}`}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span className="hidden lg:inline">BG</span>
              </button>
              {showBgPicker && (
                <div className={`absolute right-0 top-full mt-1.5 w-40 rounded-lg shadow-2xl py-1.5 z-[1000] border ${
                  isLight ? 'bg-white/95 backdrop-blur-xl border-zinc-200 text-zinc-800' : 'bg-[#161b22] border-[#30363d] text-slate-300'
                }`}>
                  <div className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1 ${isLight ? 'text-zinc-400' : 'text-[#869393]'}`}>
                    Wallpaper
                  </div>
                  {BG_OPTIONS.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => { setBgId(opt.id); setShowBgPicker(false); }}
                      className={`flex items-center gap-2 px-3 py-1.5 text-xs w-full text-left transition-colors ${
                        bgId === opt.id
                          ? (isLight ? 'text-blue-600 bg-blue-50' : 'text-[#00d4aa] bg-[#00d4aa]/10')
                          : (isLight ? 'hover:bg-zinc-100 text-zinc-700' : 'hover:bg-[#21262d] text-slate-400')
                      }`}
                    >
                      {bgId === opt.id ? '● ' : '○ '}{opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={`border-l pl-4 select-none font-bold font-sans ${
            isLight ? 'border-zinc-250 text-zinc-800' : 'border-[#3c4949]/50 text-[#54d9dd]'
          }`}>
            {currentTime}
          </div>
        </div>
      </header>

      {/* Dropdown outside shield click layer */}
      {appDropdown && (
        <div className="fixed inset-0 z-[9] bg-transparent" onClick={() => setAppDropdown(null)} />
      )}

      {/* ==================== 2. DESKTOP WORKSPACE ==================== */}
      <div className="pt-10 pl-4 pr-4 pb-8 w-full h-full relative z-10 select-none overflow-hidden">
        {/* Desktop Icons Grid — top-left */}
        <div className="flex flex-wrap content-start gap-2 mt-2 max-w-xs">

          {/* Terminal Icon */}
          <div onClick={() => handleOpenApp('terminal')} className={`flex flex-col items-center justify-center p-2 w-22 h-22 cursor-pointer group hover:scale-105 active:scale-95 border border-transparent rounded-xl transition-all ${isLight ? 'hover:bg-white/30 hover:border-white/50 hover:shadow-md' : 'hover:bg-black/30 hover:border-[#00d4aa]/40'}`}>
            <div className="w-12 h-12 flex items-center justify-center mb-1">
              {/* Kali Terminal SVG icon */}
              <svg viewBox="0 0 48 48" className="w-11 h-11 drop-shadow-lg">
                <rect width="48" height="48" rx="8" fill="#282a36"/>
                <text x="8" y="32" fontSize="22" fontFamily="monospace" fill="#50fa7b">{'>'}_</text>
              </svg>
            </div>
            <span className="font-semibold block text-[11px] text-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] font-mono group-hover:text-[#50fa7b]">Terminal</span>
          </div>

          {/* VS Code Icon */}
          <div onClick={() => handleOpenApp('vscode')} className={`flex flex-col items-center justify-center p-2 w-22 h-22 cursor-pointer group hover:scale-105 active:scale-95 border border-transparent rounded-xl transition-all ${isLight ? 'hover:bg-white/30 hover:border-white/50 hover:shadow-md' : 'hover:bg-black/30 hover:border-[#007acc]/40'}`}>
            <div className="w-12 h-12 flex items-center justify-center mb-1">
              <svg viewBox="0 0 48 48" className="w-11 h-11 drop-shadow-lg">
                <defs><clipPath id="vsc"><polygon points="36,3 36,45 6,30 6,18"/></clipPath></defs>
                <polygon points="36,3 36,45 6,30 6,18" fill="#007acc"/>
                <polygon points="36,3 24,15 12,8 6,18 18,24 6,30 12,40 24,33 36,45 42,39 30,24 42,9" fill="#1f9cf0"/>
                <polygon points="36,3 24,15 12,8 6,18 18,24" fill="rgba(255,255,255,0.25)"/>
                <polygon points="6,30 18,24 6,18" fill="rgba(255,255,255,0.25)"/>
              </svg>
            </div>
            <span className="font-semibold block text-[11px] text-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] font-mono group-hover:text-[#007acc]">VS Code</span>
          </div>

          {/* Chrome Icon */}
          <div onClick={() => handleOpenApp('chrome')} className={`flex flex-col items-center justify-center p-2 w-22 h-22 cursor-pointer group hover:scale-105 active:scale-95 border border-transparent rounded-xl transition-all ${isLight ? 'hover:bg-white/30 hover:border-white/50 hover:shadow-md' : 'hover:bg-black/30 hover:border-yellow-400/40'}`}>
            <div className="w-12 h-12 flex items-center justify-center mb-1">
              <svg viewBox="0 0 48 48" className="w-11 h-11 drop-shadow-lg">
                <circle cx="24" cy="24" r="20" fill="#fff"/>
                <path d="M4,24 A20,20 0 0,1 44,24" fill="#ea4335"/>
                <path d="M44,24 A20,20 0 0,1 14,39.6" fill="#fbbc05"/>
                <path d="M14,39.6 A20,20 0 0,1 4,24" fill="#34a853"/>
                <circle cx="24" cy="24" r="9" fill="#4285f4"/>
                <circle cx="24" cy="24" r="6" fill="#fff"/>
              </svg>
            </div>
            <span className="font-semibold block text-[11px] text-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] font-mono group-hover:text-yellow-300">Chrome</span>
          </div>

          {/* Projects Folder Icon */}
          <div onClick={() => handleOpenApp('projects_viewer')} className={`flex flex-col items-center justify-center p-2 w-22 h-22 cursor-pointer group hover:scale-105 active:scale-95 border border-transparent rounded-xl transition-all ${isLight ? 'hover:bg-white/30 hover:border-white/50 hover:shadow-md' : 'hover:bg-black/30 hover:border-blue-400/40'}`}>
            <div className="w-12 h-12 flex items-center justify-center mb-1">
              <svg viewBox="0 0 48 48" className="w-11 h-11 drop-shadow-lg">
                <path d="M4,12 Q4,8 8,8 L20,8 L24,12 L44,12 Q44,12 44,16 L44,38 Q44,42 40,42 L8,42 Q4,42 4,38 Z" fill="#ffca28"/>
                <path d="M4,16 L44,16 L44,38 Q44,42 40,42 L8,42 Q4,42 4,38 Z" fill="#ffd54f"/>
                <text x="16" y="34" fontSize="14" fontFamily="monospace" fill="#5c3d00">{'</>'}</text>
              </svg>
            </div>
            <span className="font-semibold block text-[11px] text-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] font-mono group-hover:text-yellow-300">Projects</span>
          </div>

          {/* File Manager Icon */}
          <div onClick={() => handleOpenApp('file_manager')} className={`flex flex-col items-center justify-center p-2 w-22 h-22 cursor-pointer group hover:scale-105 active:scale-95 border border-transparent rounded-xl transition-all ${isLight ? 'hover:bg-white/30 hover:border-white/50 hover:shadow-md' : 'hover:bg-black/30 hover:border-[#54d9dd]/40'}`}>
            <div className="w-12 h-12 flex items-center justify-center mb-1">
              <svg viewBox="0 0 48 48" className="w-11 h-11 drop-shadow-lg">
                <rect x="4" y="14" width="40" height="28" rx="3" fill="#0277bd"/>
                <rect x="4" y="10" width="18" height="6" rx="2" fill="#0277bd"/>
                <rect x="4" y="14" width="40" height="28" rx="3" fill="#29b6f6" opacity="0.7"/>
                <rect x="8" y="20" width="16" height="3" rx="1.5" fill="white" opacity="0.8"/>
                <rect x="8" y="26" width="24" height="3" rx="1.5" fill="white" opacity="0.6"/>
                <rect x="8" y="32" width="20" height="3" rx="1.5" fill="white" opacity="0.6"/>
              </svg>
            </div>
            <span className="font-semibold block text-[11px] text-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] font-mono group-hover:text-[#54d9dd]">Files</span>
          </div>

          {/* Resume PDF Icon */}
          <div onClick={() => handleOpenApp('pdf_resume')} className={`flex flex-col items-center justify-center p-2 w-22 h-22 cursor-pointer group hover:scale-105 active:scale-95 border border-transparent rounded-xl transition-all ${isLight ? 'hover:bg-white/30 hover:border-white/50 hover:shadow-md' : 'hover:bg-black/30 hover:border-red-500/40'}`}>
            <div className="w-12 h-12 flex items-center justify-center mb-1">
              <svg viewBox="0 0 48 48" className="w-11 h-11 drop-shadow-lg">
                <rect x="8" y="2" width="28" height="36" rx="3" fill="#f44336"/>
                <rect x="12" y="40" width="28" height="6" rx="2" fill="#b71c1c"/>
                <text x="11" y="26" fontSize="11" fontFamily="sans-serif" fill="white" fontWeight="bold">PDF</text>
                <rect x="12" y="10" width="16" height="2" rx="1" fill="white" opacity="0.6"/>
                <rect x="12" y="14" width="20" height="2" rx="1" fill="white" opacity="0.6"/>
              </svg>
            </div>
            <span className="font-semibold block text-[11px] text-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] font-mono group-hover:text-red-400">Resume</span>
          </div>

          {/* Certs Icon */}
          <div onClick={() => handleOpenApp('mousepad')} className={`flex flex-col items-center justify-center p-2 w-22 h-22 cursor-pointer group hover:scale-105 active:scale-95 border border-transparent rounded-xl transition-all ${isLight ? 'hover:bg-white/30 hover:border-white/50 hover:shadow-md' : 'hover:bg-black/30 hover:border-amber-400/40'}`}>
            <div className="w-12 h-12 flex items-center justify-center mb-1">
              <svg viewBox="0 0 48 48" className="w-11 h-11 drop-shadow-lg">
                <circle cx="24" cy="22" r="14" fill="#ff9800"/>
                <circle cx="24" cy="22" r="10" fill="#ffc107"/>
                <polygon points="24,14 26,20 33,20 27.5,24 29.5,31 24,27 18.5,31 20.5,24 15,20 22,20" fill="#fff"/>
                <rect x="18" y="34" width="12" height="10" rx="2" fill="#e65100"/>
                <rect x="20" y="34" width="8" height="3" rx="1" fill="#ff9800"/>
              </svg>
            </div>
            <span className="font-semibold block text-[11px] text-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] font-mono group-hover:text-amber-400">Certs</span>
          </div>

          {/* Contact Icon */}
          <div onClick={() => handleOpenApp('nano_contact')} className={`flex flex-col items-center justify-center p-2 w-22 h-22 cursor-pointer group hover:scale-105 active:scale-95 border border-transparent rounded-xl transition-all ${isLight ? 'hover:bg-white/30 hover:border-white/50 hover:shadow-md' : 'hover:bg-black/30 hover:border-emerald-400/40'}`}>
            <div className="w-12 h-12 flex items-center justify-center mb-1">
              <svg viewBox="0 0 48 48" className="w-11 h-11 drop-shadow-lg">
                <rect x="6" y="10" width="36" height="28" rx="4" fill="#4caf50"/>
                <path d="M6,14 L24,26 L42,14" stroke="white" strokeWidth="2.5" fill="none"/>
                <rect x="6" y="10" width="36" height="28" rx="4" fill="#66bb6a" opacity="0.3"/>
              </svg>
            </div>
            <span className="font-semibold block text-[11px] text-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] font-mono group-hover:text-emerald-400">Contact</span>
          </div>

          {/* Profile Icon */}
          <div onClick={() => handleOpenApp('profile')} className={`flex flex-col items-center justify-center p-2 w-22 h-22 cursor-pointer group hover:scale-105 active:scale-95 border border-transparent rounded-xl transition-all ${isLight ? 'hover:bg-white/30 hover:border-white/50 hover:shadow-md' : 'hover:bg-black/30 hover:border-[#00d4aa]/40'}`}>
            <div className="w-12 h-12 flex items-center justify-center mb-1 relative">
              <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-[#00d4aa]/60 group-hover:ring-[#00d4aa] transition-all">
                <img src={USER_PROFILE_PHOTO} alt="Devidas Profile" className="w-full h-full object-cover" />
              </div>
            </div>
            <span className="font-semibold block text-[11px] text-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] font-mono group-hover:text-[#00d4aa]">Profile</span>
          </div>

          {/* Inbox / Messages Icon */}
          <div onClick={() => handleOpenApp('file_manager')} className={`flex flex-col items-center justify-center p-2 w-22 h-22 cursor-pointer group hover:scale-105 active:scale-95 border border-transparent rounded-xl transition-all relative ${isLight ? 'hover:bg-white/30 hover:border-white/50 hover:shadow-md' : 'hover:bg-black/30 hover:border-emerald-400/40'}`}>
            {activeHandshakeCount > 0 && (
              <span className="absolute top-1 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full z-10 animate-bounce bg-red-500 text-white shadow">
                {activeHandshakeCount}
              </span>
            )}
            <div className="w-12 h-12 flex items-center justify-center mb-1">
              <svg viewBox="0 0 48 48" className="w-11 h-11 drop-shadow-lg">
                <rect x="4" y="10" width="40" height="28" rx="4" fill="#1565c0"/>
                <rect x="4" y="10" width="40" height="28" rx="4" fill="#1976d2"/>
                <path d="M4,14 L24,28 L44,14" stroke="white" strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
                {/* Unread dot */}
                <circle cx="36" cy="14" r="6" fill="#f44336"/>
                <text x="33.5" y="18" fontSize="8" fill="white" fontWeight="bold">!</text>
              </svg>
            </div>
            <span className="font-semibold block text-[11px] text-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] font-mono group-hover:text-emerald-300">Inbox</span>
          </div>
        </div>
      </div>

      {/* ==================== 4. WINDOWS APP CONTAINER STACK ==================== */}
      {windows.map((w) => (
        <WindowFrame
          key={w.id}
          appWindow={w}
          theme={theme}
          onClose={handleCloseWindow}
          onMinimize={handleMinimizeWindow}
          onMaximize={handleMaximizeWindow}
          onFocus={handleFocusWindow}
          onTranslate={handleTranslateWindow}
        >
          {/* Dynamic app router based on selected wind id */}
          {w.id === 'terminal' && (
            <TerminalApp
              files={files}
              onRenameFile={handleRenameFile}
              openApp={handleOpenApp}
            />
          )}

          {w.id === 'mousepad' && <MousepadApp theme={theme} />}

          {w.id === 'nano_contact' && (
            <NanoContactApp onMessageSent={handleMessageDispatched} theme={theme} />
          )}

          {w.id === 'file_manager' && (
            <FileManagerApp
              files={files}
              theme={theme}
              onRenameFile={handleRenameFile}
              onOpenFile={handleOpenFile}
              onDeleteFile={handleDeleteFile}
            />
          )}

          {w.id === 'projects_viewer' && <ProjectsApp />}

          {w.id === 'vscode' && (
            <VSCodeApp files={files} openApp={handleOpenApp} />
          )}

          {w.id === 'chrome' && (
            <ChromeApp openApp={handleOpenApp} />
          )}

          {w.id === 'pdf_resume' && (
            <PdfResumeApp />
          )}

          {w.id === 'profile' && (
            <ProfileApp />
          )}
        </WindowFrame>
      ))}
 
      {/* ==================== 6. SYSTEM STATUS FOOTER BAR ==================== */}
      <footer className={`fixed bottom-0 left-0 w-full z-[998] flex items-center justify-between px-4 h-6 font-mono text-[10px] select-none transition-all duration-350 border-t ${
        isLight
          ? 'bg-white/80 backdrop-blur-xl border-zinc-200/80 text-zinc-500 shadow-sm'
          : 'bg-surface-container-lowest border-t border-[#3c4949]/20 text-slate-500'
      }`}>
        <div className="flex items-center space-x-1">
          <span>&copy; {new Date().getFullYear()} Devidas Portfolio - Offensive Penetration Platform</span>
          <span className={`hidden sm:inline px-1 ${isLight ? 'text-zinc-300' : 'text-secondary'}`}>|</span>
          <span className="text-[10px] hidden sm:inline flex items-center gap-1">
            <Heart className={`w-2.5 h-2.5 ${isLight ? 'text-red-500' : 'text-tertiary'}`} /> Dedicated To Secure System Architectures
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="https://linkedin.com/in/devidas-chinnarathod"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center space-x-1 hover:underline ${isLight ? 'text-zinc-650 hover:text-blue-600' : 'hover:text-primary text-slate-550'}`}
          >
            <span>LinkedIn</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
          <a
            href="https://github.com/DEVIDAS-CHINNARATHOD"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center space-x-1 hover:underline ${isLight ? 'text-zinc-650 hover:text-blue-600' : 'hover:text-primary text-slate-550'}`}
          >
            <span>GitHub</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </footer>
    </div>
  );
}
