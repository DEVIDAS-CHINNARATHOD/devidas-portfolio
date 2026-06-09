/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Folder, 
  FileCode, 
  ChevronRight, 
  ChevronDown, 
  Search, 
  Settings, 
  Terminal as TerminalIcon, 
  Play, 
  Info, 
  Layers, 
  Eye, 
  Cpu, 
  Copy, 
  Check,
  Package,
  ShieldAlert
} from 'lucide-react';
import { AppID, SystemFile } from '../types';

interface VSCodeAppProps {
  files: SystemFile[];
  openApp: (appId: AppID) => void;
}

interface MockCodeFile {
  name: string;
  path: string;
  language: 'json' | 'typescript' | 'python' | 'markdown';
  iconColor: string;
  code: string;
}

export const VSCodeApp: React.FC<VSCodeAppProps> = ({ files, openApp }) => {
  const [activeTab, setActiveTab] = useState<string>('opendev_ai.py');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '┌──(devidas㉿kali)-[~/projects/opendev-security]',
    '└─$ git log --oneline -5',
    'a3f2c1d feat: add Q-learning reward shaping for vuln remediation',
    'b9e1a4f fix: Gemini API rate-limit retry with exponential backoff',
    'c7d3f8e feat: add Nmap async WebSocket scan pipeline',
    'd2a1b5c chore: update dependencies, pin google-genai==0.3.0',
    'e4f9c2a init: OpenDev AI autonomous security agent',
    '┌──(devidas㉿kali)-[~/projects/opendev-security]',
    '└─$ python opendev_ai.py --mode scan --repo DEVIDAS-CHINNARATHOD/opendev-security',
    '[*] OpenDev AI Agent v1.3 initialized',
    '[*] Connecting to GitHub API... OK',
    '[*] Fetching repository tree... 47 files found',
    '[!] Starting vulnerability scan pipeline...',
    '[+] Scan complete. Type a command below:',
  ]);

  const mockCodeFiles: MockCodeFile[] = [
    {
      name: 'opendev_ai.py',
      path: 'src/agents/opendev_ai.py',
      language: 'python',
      iconColor: 'text-yellow-500',
      code: `import os
import sys
import gymnasium as gym
from fastapi import FastAPI
from google import genai
from github import Github

app = FastAPI(title="OpenDev Security Agent Core")
ai_client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

class AutonomousAgentRemediator:
    """
    OpenDev AI: Undergrad 2nd Runner Up at AI Ignite Hackathon
    Autonomous GitHub Security Remediation Agent utilizing Q-Learning & LLMs.
    """
    def __init__(self, repo_slug: str):
        self.github = Github(os.getenv("GITHUB_TOKEN"))
        self.repo = self.github.get_repo(repo_slug)
        self.state_size = 5 # vulnerabilites: injection, secrets, static, owasp, clean
        self.action_size = 3 # actions: scan, explain, create_pr_fix
        
    def scan_vulnerabilities(self) -> list:
        print("[!] Activating target scan pipeline...")
        vulnerabilities = []
        # Checks for secret leak & SQL Injection markers
        for root, dirs, files in os.walk("."):
            for f in files:
                if f.endswith(".env") or f.endswith(".py"):
                    with open(os.path.join(root, f), 'r') as file_ref:
                        lines = file_ref.readlines()
                        for i, line in enumerate(lines):
                            if "API_KEY" in line or "SECRET" in line:
                                vulnerabilities.append({
                                    "type": "SECRET_LEAK",
                                    "file": f,
                                    "line": i + 1,
                                    "priority": "CRITICAL"
                                })
        return vulnerabilities

    def generate_diff_fix(self, vuln: dict) -> str:
        prompt = f"""
        Act as offensive security researcher. Generate direct source patch for code issue:
        Type: {vuln['type']}
        Location: {vuln['file']} at line {vuln['line']}
        
        Strict: return ONLY git unified diff ready to apply.
        """
        response = ai_client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        return response.text
`
    },
    {
      name: 'veltrix_detector.ts',
      path: 'src/security/veltrix_detector.ts',
      language: 'typescript',
      iconColor: 'text-blue-400',
      code: `/**
 * Veltrix AI Phishing Detection Suite
 * Hybrid Classifier combining Logistic Regression + TF-IDF heuristics
 */

export interface URLRiskMetrics {
  riskScore: number; // 0 to 100
  isPhishing: boolean;
  threatCategory: 'Phishing' | 'Clean' | 'Suspicious' | 'Malware';
  riskIndicators: string[];
}

export class VeltrixPhishingEngine {
  private static readonly PHISHING_RE_PATTERNS = [
    /paypal.*login/i,
    /login-verification-secure/i,
    /wallet-connect-airdrop/i,
    /metamask-support/i,
    /netflix-verify/i,
    /secure-bank-update/i
  ];

  public static analyzeUrl(url: string): URLRiskMetrics {
    const indicators: string[] = [];
    let score = 0;

    // 1. IP address in hostname indicator
    if (/^[a-zA-Z]+:\\/\\/\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}/.test(url)) {
      score += 35;
      indicators.push("Direct Host IP Addressing detected instead of DNS namespace");
    }

    // 2. Suspicious keyword matching
    for (const pattern of this.PHISHING_RE_PATTERNS) {
      if (pattern.test(url)) {
        score += 40;
        indicators.push(\`Domain contains brand spoof pattern matching template: \${pattern.source}\`);
      }
    }

    // 3. Subdomain depth audit
    const urlParts = url.replace(/^[a-zA-Z]+:\\/\\//, '').split('/');
    const hostname = urlParts[0];
    const subdomains = hostname.split('.');
    if (subdomains.length > 4) {
      score += 20;
      indicators.push(\`Excessive subdomain fragmentation: \${subdomains.length} host layers\`);
    }

    return {
      riskScore: Math.min(score, 100),
      isPhishing: score >= 50,
      threatCategory: score >= 75 ? 'Phishing' : score >= 50 ? 'Suspicious' : 'Clean',
      riskIndicators: indicators
    };
  }
}
`
    },
    {
      name: 'exploit_iq_server.py',
      path: 'src/recon/exploit_iq_server.py',
      language: 'python',
      iconColor: 'text-yellow-600',
      code: `import asyncio
import sys
import subprocess
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="ExploitIQ Automated Pentest Pipeline")

@app.websocket("/api/ws/scan")
async def websocket_scan(websocket: WebSocket, target_host: str):
    await websocket.accept()
    await websocket.send_json({"status": "CONNECTED", "msg": f"Target lock: {target_host}"})
    
    # 1. Trigger non-blocking NMAP sweep
    await websocket.send_json({"status": "SCANNING", "tool": "Nmap", "progress": 25})
    nmap_process = await asyncio.create_subprocess_exec(
        'nmap', '-F', '-Pn', target_host,
        stdout=subprocess.PIPE, stderr=subprocess.PIPE
    )
    
    stdout, _ = await nmap_process.communicate()
    results = stdout.decode()
    
    # Send findings instantly to terminal visualizers
    await websocket.send_json({
        "status": "PROCESSING",
        "tool": "Nmap",
        "progress": 50,
        "payload": results
    })
    
    # Synthesize threat mitigation options dynamically
    mitigation_log = "RECOMMENDATION: Restrict WAN access to TCP 22/80 on perimeter firewall."
    await websocket.send_json({
        "status": "COMPLETED",
        "report_generated": True,
        "mitigation": mitigation_log
    })
`
    },
    {
      name: 'package.json',
      path: 'package.json',
      language: 'json',
      iconColor: 'text-emerald-500',
      code: `{
  "name": "opendev-security-autonomous-agent",
  "version": "1.3.37",
  "founder": "Devidas Chinnarathod",
  "contact": "devidaschinnarathod.25@gmail.com",
  "location": "Bangalore, India",
  "main": "opendev_ai.py",
  "dependencies": {
    "fastapi": "^0.110.0",
    "google-genai": "^0.3.0",
    "pygithub": "^2.1.1",
    "gymnasium": "^0.29.1",
    "scikit-learn": "^1.3.2"
  },
  "keywords": [
    "Cybersecurity",
    "RL-Agent",
    "Autonomous-Security-Remediation",
    "Vulnerability-Scanner"
  ]
}
`
    }
  ];

  const currentFileObj = mockCodeFiles.find((f) => f.name === activeTab) || mockCodeFiles[0];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentFileObj.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const executeTerminalInput = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim();
    if (!cmd) return;

    const args = cmd.split(' ');
    const base = args[0].toLowerCase();
    let reply = `bash: ${cmd}: command not found`;

    if (base === 'clear') {
      setTerminalLogs([]);
      setTerminalInput('');
      return;
    } else if (base === 'whoami') {
      reply = 'devidas';
    } else if (base === 'pwd') {
      reply = '/root/projects/opendev-security';
    } else if (base === 'ls' || base === 'ls -la') {
      reply = 'drwxr-xr-x  agents/   recon/   models/\n-rw-r--r--  opendev_ai.py   veltrix_detector.ts   exploit_iq_server.py   port_scanner.py   requirements.txt';
    } else if (base === 'python' || base === 'python3') {
      reply = 'Python 3.11.4 (Kali GNU/Linux Rolling)\n[GCC 12.2.0] on linux\nType "help" or "exit()" to quit.';
    } else if (base === 'pip') {
      reply = 'Usage: pip <command> [options]\nInstalled: fastapi 0.110.0, google-genai 0.3.0, pygithub 2.1.1, scikit-learn 1.3.2, gymnasium 0.29.1';
    } else if (base === 'git') {
      reply = 'On branch main\nYour branch is up to date with \'origin/main\'.\nnothing to commit, working tree clean';
    } else if (base === 'nmap') {
      reply = 'Starting Nmap 7.94 ( https://nmap.org )\nUsage: nmap [Scan Type(s)] [Options] {target}\nTry: nmap -sV -p 1-1000 <target>';
    } else if (base === 'neofetch') {
      reply = '       _  devidas@kali\n      | | OS: Kali GNU/Linux Rolling\n   ___| | Kernel: 6.1.0-kali9-amd64\n  / __| | Shell: zsh 5.9\n | (__| | Terminal: VSCode Integrated\n  \___|_| Python: 3.11.4 | Node: 20.x';
    } else if (base === 'help') {
      reply = 'Available: whoami, pwd, ls, python3, pip, git, nmap, neofetch, clear';
    }

    setTerminalLogs(prev => [
      ...prev,
      `┌──(devidas㉿kali)-[~/projects/opendev-security]`,
      `└─$ ${cmd}`,
      reply,
    ]);
    setTerminalInput('');
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-zinc-300 font-sans text-xs select-none">
      
      {/* VS Code Menu Ribbon */}
      <div className="bg-[#3c3c3c] px-3 py-1 flex items-center justify-between border-b border-[#2b2b2b] text-[11px] text-zinc-400 font-medium">
        <div className="flex items-center space-x-3.5">
          <span className="text-sky-400 font-bold tracking-wider hover:text-white transition-all cursor-pointer">VS Code</span>
          <span className="hover:text-white transition-all cursor-pointer">File</span>
          <span className="hover:text-white transition-all cursor-pointer">Edit</span>
          <span className="hover:text-white transition-all cursor-pointer">Selection</span>
          <span className="hover:text-white transition-all cursor-pointer">View</span>
          <span className="hover:text-white transition-all cursor-pointer">Go</span>
          <span className="hover:text-white transition-all cursor-pointer">Terminal</span>
          <span className="hover:text-white transition-all cursor-pointer">Help</span>
        </div>
        <div className="text-zinc-500 font-mono text-[10px]">
          {activeTab} — Devidas Code Environment
        </div>
      </div>

      {/* Main split: Sidebar & Editor */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Leftmost VS Code Action Rail */}
        <div className="w-12 bg-[#333333] flex flex-col justify-between items-center py-4 border-r border-[#2b2b2b] select-none text-zinc-400">
          <div className="flex flex-col space-y-5 items-center w-full">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              title="Toggle File Explorer [Ctrl+B]"
              className={`p-1.5 rounded transition-all hover:text-sky-400 ${
                sidebarOpen ? 'text-sky-400 border-l border-sky-400 bg-sky-950/10' : ''
              }`}
            >
              <Layers className="w-5 h-5" />
            </button>
            <button className="p-1.5 rounded transition-all hover:text-sky-400" title="Source Search Workspace">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-1.5 rounded transition-all hover:text-sky-400" title="Package Registry Extensions" onClick={() => openApp('projects_viewer')}>
              <Package className="w-5 h-5" />
            </button>
            <button className="p-1.5 rounded transition-all hover:text-sky-400" title="Ethical Exploiting Toolkit Scanner">
              <ShieldAlert className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-col space-y-4 items-center">
            <button className="p-1.5 hover:text-sky-400 transition-colors" title="AI Assistant Engine">
              <Cpu className="w-5 h-5" />
            </button>
            <button className="p-1.5 hover:text-sky-400 transition-colors" title="VS Code Settings">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Sidebar Folder Browser */}
        {sidebarOpen && (
          <div className="w-52 bg-[#252526] border-r border-[#2b2b2b] flex flex-col pt-3 shrink-0 select-none">
            <div className="px-3 pb-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center justify-between">
              <span>Explorer</span>
              <span className="text-zinc-600">WORKSPACE</span>
            </div>

            {/* Simulated Workspace directory tree */}
            <div className="mx-2 p-1.5 mb-2 rounded bg-zinc-800/40 border border-zinc-700/30 flex items-center space-x-1.5 text-[10.5px]">
              <Cpu className="w-3.5 h-3.5 text-sky-400 text-[10px]" />
              <span className="font-bold text-zinc-300">opendev-security-repo</span>
            </div>

            <div className="flex-1 overflow-y-auto font-mono text-[11px] text-zinc-400 px-1 space-y-1">
              
              {/* Folder: src */}
              <div className="flex items-center space-x-1 py-1 px-2 hover:bg-zinc-800 rounded cursor-pointer group">
                <ChevronDown className="w-3 h-3 text-zinc-500" />
                <Folder className="w-3.5 h-3.5 text-sky-500 fill-sky-500/10" />
                <span className="font-semibold text-zinc-300">src</span>
              </div>

              {/* Files in Folder */}
              <div className="pl-6 space-y-0.5">
                {mockCodeFiles.filter(f => f.name !== 'package.json').map((f) => (
                  <div
                    key={f.name}
                    onClick={() => setActiveTab(f.name)}
                    className={`flex items-center space-x-1.5 py-1 px-2 rounded cursor-pointer transition-colors ${
                      activeTab === f.name ? 'bg-[#37373d] text-sky-400 font-semibold' : 'hover:bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    <FileCode className={`w-3.5 h-3.5 ${f.iconColor}`} />
                    <span className="truncate">{f.name}</span>
                  </div>
                ))}
              </div>

              {/* File: package.json outside */}
              <div
                onClick={() => setActiveTab('package.json')}
                className={`flex items-center space-x-1.5 py-1 px-2 mx-1 mt-1 rounded cursor-pointer transition-colors ${
                  activeTab === 'package.json' ? 'bg-[#37373d] text-sky-400 font-semibold' : 'hover:bg-zinc-800 text-zinc-400'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 text-emerald-500" />
                <span className="font-mono">package.json</span>
              </div>
            </div>
          </div>
        )}

        {/* Code Editor viewports space */}
        <div className="flex-1 flex flex-col bg-[#1e1e1e] overflow-hidden">
          
          {/* Opened Tabs Bar */}
          <div className="bg-[#2d2d2d] flex border-b border-[#252526] overflow-x-auto select-none">
            {mockCodeFiles.map((f) => (
              <div
                key={f.name}
                onClick={() => setActiveTab(f.name)}
                className={`flex items-center space-x-2 px-3 py-1.5 border-r border-[#252526] cursor-pointer text-[11px] transition-colors ${
                  activeTab === f.name 
                    ? 'bg-[#1e1e1e] text-sky-400 border-t-2 border-sky-400 font-semibold' 
                    : 'text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300'
                }`}
              >
                <FileCode className={`w-3.5 h-3.5 ${f.iconColor}`} />
                <span>{f.name}</span>
                {activeTab === f.name && (
                  <span className="w-1.5 h-1.5 bg-primary rounded-full ml-1" />
                )}
              </div>
            ))}
          </div>

          {/* Code Viewer pane with syntax highlighting representation */}
          <div className="flex-1 p-4 overflow-y-auto font-mono text-[11.5px] leading-relaxed relative bg-[#1e1e1e] select-text selection:bg-sky-500/20">
            {/* Copy code tool icon */}
            <button
              onClick={copyToClipboard}
              className="absolute top-3 right-5 p-1.5 rounded bg-zinc-800 border border-zinc-700/60 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all flex items-center space-x-1"
              title="Copy code to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px] text-emerald-400 font-sans">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-sans">Copy</span>
                </>
              )}
            </button>

            {/* Beautiful, styled syntax highlighting structure using styled pre lines */}
            <pre className="text-zinc-300">
              <code>
                {currentFileObj.code.split('\n').map((line, index) => {
                  // Beautiful mock formatting classes for keywords:
                  let formattedElement: React.ReactNode = line;

                  // Highlighting heuristic substitutions (just styling key items for code aesthetic)
                  if (currentFileObj.language === 'python') {
                    // keywords representation
                    const formattedLine = line
                      .replace(/\b(import|from|class|def|return|try|except|for|in|class|if|else|while|print|with|as)\b/g, '<span class="text-pink-400">$1</span>')
                      .replace(/(True|False|None)/g, '<span class="text-sky-400 font-bold">$1</span>')
                      .replace(/(def\s+)([A-Za-z0-9_]+)/g, '$1<span class="text-emerald-400">$2</span>')
                      .replace(/(class\s+)([A-Za-z0-9_]+)/g, '$1<span class="text-blue-300">$2</span>')
                      .replace(/("[^"]*")/g, '<span class="text-amber-300">$1</span>')
                      .replace(/(\'[^\']*\')/g, '<span class="text-amber-300">$1</span>')
                      .replace(/(#.*)$/g, '<span class="text-zinc-500 italic">$1</span>');

                    formattedElement = <span dangerouslySetInnerHTML={{ __html: formattedLine }} />;
                  } else if (currentFileObj.language === 'typescript') {
                    const formattedLine = line
                      .replace(/\b(export|import|const|let|private|public|static|readonly|class|interface|type|from|return|if|for|of|in|new|extends|implements)\b/g, '<span class="text-sky-400">$1</span>')
                      .replace(/(true|false|null)/g, '<span class="text-amber-500 font-bold">$1</span>')
                      .replace(/(class\s+)([A-Za-z0-9_]+)/g, '$1<span class="text-blue-300">$2</span>')
                      .replace(/(interface\s+)([A-Za-z0-9_]+)/g, '$1<span class="text-blue-300">$2</span>')
                      .replace(/("[^"]*")/g, '<span class="text-amber-300">$1</span>')
                      .replace(/(\`[^\`]*\`)/g, '<span class="text-amber-300">$1</span>')
                      .replace(/(\/\/.*)$/g, '<span class="text-zinc-500 italic">$1</span>');

                    formattedElement = <span dangerouslySetInnerHTML={{ __html: formattedLine }} />;
                  } else if (currentFileObj.language === 'json') {
                    const formattedLine = line
                      .replace(/("[A-Za-z0-9_]+")\s*:/g, '<span class="text-pink-400 font-semibold">$1</span>:')
                      .replace(/("[^"]*")/g, '<span class="text-amber-300">$1</span>')
                      .replace(/(\d+)/g, '<span class="text-sky-400">$1</span>');

                    formattedElement = <span dangerouslySetInnerHTML={{ __html: formattedLine }} />;
                  }

                  return (
                    <div key={index} className="flex hover:bg-zinc-800/40 rounded px-1 group transition-colors">
                      <span className="w-7 text-right pr-3.5 text-zinc-600 select-none text-[10px] mt-0.5">{index + 1}</span>
                      <span className="flex-1 whitespace-pre-wrap">{formattedElement}</span>
                    </div>
                  );
                })}
              </code>
            </pre>
          </div>

          {/* Bottom Terminal Drawer Panel inside VS Code wrapper */}
          <div className="h-44 border-t border-[#252526] bg-[#1e1e1e] flex flex-col font-mono text-[11px] select-text select-none">
            
            {/* Tab panel bar */}
            <div className="bg-[#252526] px-3.5 py-1 flex items-center justify-between text-zinc-400 select-none text-[10.5px]">
              <div className="flex items-center space-x-4">
                <span className="border-b border-sky-400 font-bold text-sky-400 py-0.5 flex items-center space-x-1 cursor-pointer">
                  <TerminalIcon className="w-3.5 h-3.5 mr-1" />
                  Terminal
                </span>
                <span className="hover:text-zinc-300 cursor-pointer">Output</span>
                <span className="hover:text-zinc-300 cursor-pointer">Problems (0)</span>
                <span className="hover:text-zinc-300 cursor-pointer font-sans">Debug Console</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-zinc-500">Live Agent: Online</span>
              </div>
            </div>

            {/* VS Code terminal logs body */}
            <div className="flex-1 p-3 overflow-y-auto space-y-1 select-text scrollbar-none">
              {terminalLogs.map((log, index) => (
                <div key={index} className="whitespace-pre-wrap leading-relaxed">
                  {log.startsWith('┌──') || log.startsWith('└─') ? (
                    <span className="text-emerald-400 font-bold">{log}</span>
                  ) : log.startsWith('[+]') ? (
                    <span className="text-emerald-300">{log}</span>
                  ) : log.startsWith('[!]') ? (
                    <span className="text-yellow-400">{log}</span>
                  ) : log.startsWith('[*]') ? (
                    <span className="text-sky-400">{log}</span>
                  ) : log.match(/^[a-f0-9]{7} /) ? (
                    <span><span className="text-amber-400">{log.slice(0,7)}</span><span className="text-zinc-300">{log.slice(7)}</span></span>
                  ) : (
                    <span className="text-zinc-400">{log}</span>
                  )}
                </div>
              ))}

              {/* Terminal Form command prompts */}
              <form onSubmit={executeTerminalInput} className="flex items-center w-full">
                <span className="text-emerald-400 font-bold mr-1.5 whitespace-nowrap">└─$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-sky-300 p-0 focus:ring-0 font-mono text-[11px] caret-sky-400"
                  autoComplete="off"
                  placeholder="type a command... (try: neofetch, nmap, git, help)"
                  title="VS Code Terminal Shell"
                />
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* VS Code Footer Bar */}
      <div className="bg-[#007acc] text-white px-3 py-1 flex items-center justify-between text-[10.5px]">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 bg-sky-800 hover:bg-sky-700 transition-colors px-1.5 py-0.5 rounded cursor-pointer">
            <Play className="w-3 h-3 fill-white" />
            <span className="font-sans font-bold">master*</span>
          </div>
          <span className="flex items-center space-x-1 text-sky-100 hover:text-white cursor-pointer">
            <Info className="w-3.5 h-3.5" />
            <span>0 Warnings, 0 Errors</span>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span>LF</span>
          <span>UTF-8</span>
          <span>Python 3.11</span>
          <span>Live Share</span>
        </div>
      </div>
    </div>
  );
};
