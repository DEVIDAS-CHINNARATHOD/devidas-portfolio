/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data';
import { ExternalLink, Github, Cpu, ChevronRight, Zap, CheckSquare } from 'lucide-react';

export const ProjectsApp: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(PROJECTS_DATA[0].id);

  const selectedProject = PROJECTS_DATA.find((p) => p.id === selectedProjectId) || PROJECTS_DATA[0];

  return (
    <div className="flex flex-col md:flex-row h-full font-mono bg-[#0a0c10] text-[13px] text-slate-300">
      {/* Visual left project sidebar selectors */}
      <div className="w-full md:w-64 bg-[#0d1117] border-r border-[#21262d] flex flex-row md:flex-col p-2 gap-1 overflow-x-auto md:overflow-x-visible shrink-0 select-none">
        <div className="hidden md:block text-[10px] text-[#8b949e] p-2 border-b border-[#21262d] uppercase font-bold text-center tracking-widest mb-2">
          📁 Project Repository
        </div>
        {PROJECTS_DATA.map((proj, idx) => (
          <button
            key={proj.id}
            onClick={() => setSelectedProjectId(proj.id)}
            className={`flex items-center space-x-2.5 px-3 py-2.5 rounded-md text-xs text-left w-full transition-all text-ellipsis overflow-hidden whitespace-nowrap active:scale-95 border ${
              selectedProjectId === proj.id
                ? 'bg-[#00d4aa]/10 border-[#00d4aa]/40 text-[#00d4aa] font-bold border-l-2 border-l-[#00d4aa]'
                : 'border-transparent text-[#8b949e] hover:bg-[#161b22] hover:text-slate-200 hover:border-[#30363d]'
            }`}
          >
            <Cpu className={`w-3.5 h-3.5 shrink-0 ${selectedProjectId === proj.id ? 'text-[#00d4aa]' : 'text-[#484f58]'}`} />
            <span className="truncate">{proj.title.split('—')[0].split('-')[0].trim()}</span>
          </button>
        ))}
      </div>

      {/* Structured project specification details reader */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto select-text flex flex-col bg-[#0a0c10]">
        <div className="space-y-5">
          {/* Project title & GitHub link */}
          <div className="flex flex-col sm:flex-row justify-between items-start border-b border-[#21262d] pb-4 gap-3">
            <div>
              <h2 className="text-[17px] text-[#e6edf3] font-bold leading-tight">
                {selectedProject.title}
              </h2>
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {selectedProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-full bg-[#1f2937] border border-[#374151] text-[#60a5fa] text-[10px] tracking-wide font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <a
              href={selectedProject.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#21262d] border border-[#30363d] hover:border-[#00d4aa] hover:text-[#00d4aa] text-[#c9d1d9] text-xs font-bold rounded-md transition-all shrink-0 group"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
            </a>
          </div>

          {/* Overview */}
          <div className="space-y-1.5">
            <div className="text-[10px] text-[#00d4aa] font-bold uppercase tracking-widest flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5" />
              Overview
            </div>
            <p className="text-[#8b949e] text-xs leading-relaxed pl-5">
              {selectedProject.overview}
            </p>
          </div>

          {/* Features */}
          <div className="space-y-2">
            <div className="text-[10px] text-[#00d4aa] font-bold uppercase tracking-widest flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5" />
              Key Features
            </div>
            <ul className="space-y-1.5 pl-5">
              {selectedProject.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[#c9d1d9] leading-relaxed">
                  <CheckSquare className="w-3.5 h-3.5 text-[#58a6ff] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Impact */}
          {selectedProject.impact.length > 0 && (
            <div className="space-y-2">
              <div className="text-[10px] text-[#f78166] font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Impact & Results
              </div>
              <ul className="space-y-1.5 pl-5">
                {selectedProject.impact.map((imp, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#c9d1d9] leading-relaxed">
                    <span className="text-[#f78166] shrink-0 font-bold">⚡</span>
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-auto pt-6 border-t border-[#21262d] text-[10px] text-[#484f58] text-center select-none">
          Click any project in the sidebar to view its details · {PROJECTS_DATA.length} Projects Total
        </div>
      </div>
    </div>
  );
};
