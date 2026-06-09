/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { AppID, SystemFile } from '../types';

interface TerminalAppProps {
  files: SystemFile[];
  onRenameFile: (fileId: string, newName: string) => void;
  openApp: (appId: AppID) => void;
}

interface CommandHistoryEntry {
  input: string;
  output: string;
  dir: string;
}

export const TerminalApp: React.FC<TerminalAppProps> = ({ files, onRenameFile, openApp }) => {
  const [history, setHistory] = useState<CommandHistoryEntry[]>([
    {
      input: 'whoami',
      output: 'root',
      dir: '~',
    },
    {
      input: 'cat /etc/profile/devidas.txt',
      output: `  ____             _     _           
 |  _ \\  _____   _(_) __| | __ _ ___ 
 | | | |/ _ \\ \\ / / |/ _\` |/ _\` / __|
 | |_| |  __/\\ V /| | (_| | (_| \\__ \\
 |____/ \\___| \\_/ |_|\\__,_|\\__,_|___/

----------------------------------------------------
Devidas Chinnarathod
[ Cybersecurity Researcher ] [ AI Enthusiast ] [ Founder @ OpenDev AI ]
----------------------------------------------------
Location: Bangalore, India
Status:   Active (Listening)
Uptime:   99.98% / Standard Operating Routine
Bio:      Pioneering the intersection of artificial intelligence and offensive
          security. As the founder of OpenDev AI, Devidas focuses on developing
          next-generation autonomous security systems and researching vulnerabilities
          within large language models. Operating at the bleeding edge where algorithms
          meet exploitation, identifying logic flaws before they are weaponized.`,
      dir: '~',
    },
  ]);

  const [currentInput, setCurrentInput] = useState('');
  const [currentDir, setCurrentDir] = useState('~');
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = currentInput.trim();
    if (!command) return;

    const parts = command.split(/\s+/);
    const primary = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output = '';

    switch (primary) {
      case 'help':
        output = `Kali terminal shell triggers:
  help                    - Display available commands
  whoami                  - Show current logged user details
  ls                      - List files on desktop environment
  pwd                     - Print current working directory
  date                    - Print system calendar date and time
  sudo su                 - Elevate standard shell privileges to absolute root
  resume                  - Launch the official secure PDF Resume Viewer
  vscode                  - Launch Visual Studio Code workspace
  chrome                  - Launch secure Chrome Web Browser Sandbox
  cat <file>              - Read contents of a dynamic txt/conf file
  mv <old_file> <new_file>- Rename a file (e.g. mv resume.txt devidas_resume.txt)
  neofetch                - Display beautiful system environment parameters
  clear                   - Clear screen history
  contact                 - Open the Mail Dispatch contact application gui
  mousepad                - Show the technical skill matrix and certifications text editor`;
        break;

      case 'whoami':
        output = `root (Devidas Chinnarathod - Founder @ OpenDev AI | Cybersecurity Student)`;
        break;

      case 'sudo':
        if (args[0] === 'su') {
          output = `[sudo] password for kali: **************************
Permission granted. 
Successfully elevated privileges to Superuser. Active security nodes initialized on host 'kali-core-v3'.`;
        } else {
          output = `usage: sudo su (elevates privilege level)`;
        }
        break;

      case 'pwd':
        output = `/home/kali/devidas-workspace`;
        break;

      case 'date':
        output = new Date().toString();
        break;

      case 'resume':
        output = "Launching official secure PDF Resume Viewer interface...";
        openApp('pdf_resume');
        break;

      case 'vscode':
        output = "Opening Visual Studio Code environment (opendev-security-repo)...";
        openApp('vscode');
        break;

      case 'chrome':
      case 'browser':
        output = "Opening Google Chrome Secure Web Browser Sandbox...";
        openApp('chrome');
        break;

      case 'clear':
        setHistory([]);
        setCurrentInput('');
        return;

      case 'ls':
        output = `readme.txt    certifications.txt    contact_init.conf    resume.pdf    vscode.bin    chrome.bin`;
        break;

      case 'mv':
        if (args.length < 2) {
          output = 'Usage: mv <old_filename> <new_filename>  (e.g., mv resume.txt devidas_resume.txt)';
        } else {
          const oldName = args[0];
          const newName = args[1];
          const fileToRename = files.find((f) => f.name === oldName);

          if (!fileToRename) {
            output = `mv: cannot stat '${oldName}': No such file exists inside system directory.`;
          } else {
            // Run rename handler
            onRenameFile(fileToRename.id, newName);
            output = `Renamed '${oldName}' to '${newName}' successfully. The desktop icon was updated.`;
          }
        }
        break;

      case 'cat':
        if (args.length === 0) {
          output = 'Usage: cat <filename>   (e.g. cat resume.txt)';
        } else {
          const searchFilename = args[0];
          const foundFile = files.find((f) => f.name.toLowerCase() === searchFilename.toLowerCase());

          if (!foundFile) {
            output = `cat: ${searchFilename}: No such file exists in directory '/root/'.`;
          } else {
            output = foundFile.content;
          }
        }
        break;

      case 'neofetch':
        output = `               .,-:;//;:=,             root@kali-os
          . :H@@@MM@M#H/.,+%;,         ------------
       ,/X+ +M@@M@MM%=,-%H@M@X/,       OS: Kali GNU/Linux x86_64
     -+@MM;  :%@#%;      -M@@@@H@:+    Host: devidas-portfolio-container-v3
    -X@@@M%               -%MM@@@M@-   Kernel: 6.9.12-kali-amd64
   ,%%@@@MX.               .%%M@@@@M,  Uptime: 13h 42m
  :%;H@@@MM#.             -H@@@@@@+%%: Shell: bash 5.2.15
  X@.@@@@@@X@             #@@@@@@@@.@@ Theme: Offensive Precision
  #@.-@@@@@@M-            %@@@@@@@+.-@ CPU: Google Gemini 3.5 Flash
  X@.@@@@@@@@X.          .x@@@@@@@X.@@ Memory: 16 GigaBytes RAM
  :%:H@@@@@@@@H;        .H@@@@@@@@+%%: Location: Bangalore, India
   ,%%M@@@@@@@@@%.    ,M@@@@@@@@@@@@,  Interests: AI Agents, Cryptography, 
    -X@M@@@@@@@@@% :+M@@@@@@@@@@@@@-              Vulnerability Scanners,
     -+@M@@@@@@@@%:@M@@@@@@@@@@@H@:+              Large Language Models (LLM)
       ,/X+ +M@@@@M@@@@@@@X/,          
          . :H@@@@@@@H/.,+%;,          
               .,-:;//;:=,             `;
        break;

      case 'contact':
        output = "Launching 'contact_init.conf' file in Nano Mail Dispatch GUI editor...";
        openApp('nano_contact');
        break;

      case 'mousepad':
        output = "Launching Skill Matrix & Credentials editor...";
        openApp('mousepad');
        break;

      default:
        output = `bash: ${primary}: command not discovered. Type 'help' for possible shell commands.`;
    }

    setHistory((prev) => [...prev, { input: command, output, dir: currentDir }]);
    setCurrentInput('');
  };

  return (
    <div
      onClick={focusInput}
      className="p-4 font-mono text-body-md text-on-surface h-full flex flex-col justify-between select-text"
      style={{ minHeight: '400px' }}
    >
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {/* Static Prompt History */}
        {history.map((entry, index) => (
          <div key={index} className="space-y-1">
            <div className="flex flex-col">
              <span className="text-error font-bold">┌──(root@kali)-[{entry.dir}]</span>
              <div className="flex items-center">
                <span className="text-error font-bold mr-2">└─#</span>
                <span className="text-primary terminal-glow">{entry.input}</span>
              </div>
            </div>
            {entry.output && (
              <pre className="text-on-surface-variant whitespace-pre-wrap leading-relaxed mt-1 scrollbar-none font-mono">
                {entry.output}
              </pre>
            )}
          </div>
        ))}

        {/* Current Interactive Prompt */}
        <div className="space-y-1">
          <span className="text-error font-bold">┌──(root@kali)-[{currentDir}]</span>
          <form onSubmit={handleCommandSubmit} className="flex items-center w-full">
            <span className="text-error font-bold mr-2">└─#</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-primary terminal-glow p-0 focus:ring-0 font-mono caret-[#54d9dd]"
              autoComplete="off"
              autoFocus
              title="Command prompt"
            />
          </form>
        </div>
        <div ref={terminalEndRef} />
      </div>

      <div className="text-outline-variant text-[10px] text-right font-label-md">
        Press [ENTER] to execute commands. Type 'help' to audit system capabilities.
      </div>
    </div>
  );
};
