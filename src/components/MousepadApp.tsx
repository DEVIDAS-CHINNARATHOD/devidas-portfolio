/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, GraduationCap, Award, BookOpen, Cpu, Code2, Brain, CheckCircle2, ExternalLink } from 'lucide-react';

interface MousepadAppProps {
  theme?: 'kali-dark' | 'mac-light';
}

const CERTS = [
  {
    code: 'CNSP',
    full: 'Certified Network Security Practitioner',
    issuer: 'The SecOps Group',
    date: 'January 2026',
    status: 'VALID',
    statusColor: 'emerald',
    icon: ShieldCheck,
    link: 'https://secops.group/certificate-validation/',
    desc: 'Validates expertise in network scanning, vulnerability assessment, and penetration testing fundamentals.',
  },
  {
    code: 'MCP',
    full: 'Introduction to Model Context Protocol',
    issuer: 'Anthropic',
    date: '2025',
    status: 'COMPLETED',
    statusColor: 'blue',
    icon: Brain,
    link: 'https://anthropic.com',
    desc: 'Official Anthropic course on building agentic AI systems using the Model Context Protocol (MCP) standard.',
  },
  {
    code: 'DCSC',
    full: 'Defensive Cyber Security Certification',
    issuer: 'Defensive Cyber Lab (DROP)',
    date: '2023',
    status: 'CERTIFIED',
    statusColor: 'teal',
    icon: ShieldCheck,
    link: '#',
    desc: 'Covers defensive cyber operations, threat intelligence, incident response and log monitoring practices.',
  },
  {
    code: 'LFS101',
    full: 'Introduction to Linux',
    issuer: 'The Linux Foundation',
    date: '2023',
    status: 'COMPLETED',
    statusColor: 'orange',
    icon: GraduationCap,
    link: 'https://trainingportal.linuxfoundation.org',
    desc: 'Foundational course in Linux CLI, filesystem navigation, permissions, shell scripting and system administration.',
  },
];

const SKILLS = [
  {
    title: 'Penetration Testing',
    level: 85,
    badge: 'EXPERT',
    badgeColor: 'red',
    icon: ShieldCheck,
    tags: ['OWASP Top 10', 'SQLi / XSS', 'Nmap', 'Burp Suite', 'Network Enum'],
    details: [
      'OWASP Top 10 Audit Frameworks & Web App Pen-testing',
      'SQL Injection, Command Injection, XXE exploitation chains',
      'Broken Auth, Session Hijacking & IDOR vulnerability mapping',
      'Nmap network enumeration, Nikto web auditing automation',
      'Burp Suite intercept proxy, payload delivery & fuzzing',
    ],
  },
  {
    title: 'Python & Automation',
    level: 80,
    badge: 'ADVANCED',
    badgeColor: 'blue',
    icon: Code2,
    tags: ['FastAPI', 'Scripts', 'Scrapers', 'ML Pipelines', 'REST APIs'],
    details: [
      'Custom port scanners & subdomain brute-force tools',
      'FastAPI REST APIs with async background job workers',
      'Automated REST API scanning and fuzzing scripts',
      'TF-IDF & scikit-learn model training helper pipelines',
      'Multithreaded network flow analyzers & log parsers',
    ],
  },
  {
    title: 'AI / LLM Engineering',
    level: 75,
    badge: 'ADVANCED',
    badgeColor: 'purple',
    icon: Brain,
    tags: ['Gemini API', 'Groq', 'RAG', 'ChromaDB', 'Q-Learning'],
    details: [
      'Autonomous agent loops with Gemini & Groq LLaMA APIs',
      'Prompt injection filtering & adversarial jailbreak defense',
      'Reinforcement Q-Learning state machines for decision routing',
      'ChromaDB / FAISS vector stores for secure RAG pipelines',
      'MCP (Model Context Protocol) agentic tool integration',
    ],
  },
  {
    title: 'Full-Stack Development',
    level: 72,
    badge: 'INTERMEDIATE',
    badgeColor: 'green',
    icon: Cpu,
    tags: ['React', 'Node.js', 'PostgreSQL', 'Chrome Ext', 'Flutter'],
    details: [
      'React 18 / Vite / Tailwind CSS frontend applications',
      'Node.js + FastAPI backend REST microservices',
      'PostgreSQL, SQLite database schema design & querying',
      'Chrome Manifest v3 extension background service workers',
      'Flutter Android mobile app development with Dart',
    ],
  },
];

const badgeStyles: Record<string, { bg: string; text: string; border: string }> = {
  red:    { bg: 'bg-red-500/10',    text: 'text-red-400',    border: 'border-red-500/30' },
  blue:   { bg: 'bg-blue-500/10',   text: 'text-blue-400',   border: 'border-blue-500/30' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
  green:  { bg: 'bg-emerald-500/10',text: 'text-emerald-400',border: 'border-emerald-500/30' },
  emerald:{ bg: 'bg-emerald-500/10',text: 'text-emerald-400',border: 'border-emerald-500/30' },
  teal:   { bg: 'bg-teal-500/10',   text: 'text-teal-400',   border: 'border-teal-500/30' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30' },
};

export const MousepadApp: React.FC<MousepadAppProps> = ({ theme = 'kali-dark' }) => {
  const [activeTab, setActiveTab] = useState<'certs' | 'skills'>('certs');
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const isLight = theme === 'mac-light';

  return (
    <div className={`h-full flex flex-col font-sans overflow-hidden ${isLight ? 'bg-slate-50 text-zinc-800' : 'bg-[#0d1117] text-slate-300'}`}>

      {/* Header */}
      <div className={`px-5 pt-5 pb-4 shrink-0 border-b ${isLight ? 'border-zinc-200' : 'border-[#21262d]'}`}>
        <div className="flex items-center gap-2 mb-1">
          <Award className={`w-5 h-5 ${isLight ? 'text-blue-600' : 'text-[#00d4aa]'}`} />
          <h1 className={`text-base font-bold tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
            Skills & Certifications
          </h1>
        </div>
        <p className={`text-xs ${isLight ? 'text-zinc-500' : 'text-slate-500'}`}>
          Devidas Chinnarathod · Cybersecurity &amp; AI Engineering
        </p>

        {/* Tabs */}
        <div className={`flex gap-1 mt-4 p-1 rounded-lg w-fit ${isLight ? 'bg-zinc-100' : 'bg-[#161b22]'}`}>
          {(['certs', 'skills'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all capitalize ${
                activeTab === tab
                  ? (isLight ? 'bg-white text-blue-600 shadow-sm' : 'bg-[#21262d] text-[#00d4aa]')
                  : (isLight ? 'text-zinc-500 hover:text-zinc-700' : 'text-slate-500 hover:text-slate-300')
              }`}
            >
              {tab === 'certs' ? '🏅 Certifications' : '⚡ Skills Matrix'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-3">

        {/* ── CERTS TAB ── */}
        {activeTab === 'certs' && (
          <div className="space-y-3">
            {CERTS.map((cert) => {
              const Icon = cert.icon;
              const style = badgeStyles[cert.statusColor] || badgeStyles.blue;
              return (
                <div
                  key={cert.code}
                  className={`rounded-xl p-4 border transition-all group ${
                    isLight
                      ? 'bg-white border-zinc-200 hover:border-blue-300 hover:shadow-md'
                      : 'bg-[#161b22] border-[#21262d] hover:border-[#00d4aa]/40 hover:bg-[#1c2128]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className={`p-2 rounded-lg shrink-0 ${style.bg} ${style.border} border`}>
                        <Icon className={`w-4 h-4 ${style.text}`} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-sm font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                            {cert.code}
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${style.bg} ${style.text} ${style.border}`}>
                            {cert.status}
                          </span>
                        </div>
                        <p className={`text-xs mt-0.5 font-medium ${isLight ? 'text-zinc-700' : 'text-slate-300'}`}>
                          {cert.full}
                        </p>
                        <p className={`text-[11px] mt-0.5 ${isLight ? 'text-zinc-400' : 'text-slate-500'}`}>
                          {cert.issuer} · {cert.date}
                        </p>
                        <p className={`text-[11px] mt-1.5 leading-relaxed ${isLight ? 'text-zinc-500' : 'text-slate-500'}`}>
                          {cert.desc}
                        </p>
                      </div>
                    </div>
                    {cert.link !== '#' && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`shrink-0 p-1.5 rounded-md transition-all opacity-0 group-hover:opacity-100 ${
                          isLight ? 'text-zinc-400 hover:text-blue-600 hover:bg-blue-50' : 'text-slate-600 hover:text-[#00d4aa] hover:bg-[#00d4aa]/10'
                        }`}
                        title="Verify certificate"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}

            <div className={`mt-2 text-center text-[11px] italic ${isLight ? 'text-zinc-400' : 'text-slate-600'}`}>
              4 certifications · Verified professional credentials
            </div>
          </div>
        )}

        {/* ── SKILLS TAB ── */}
        {activeTab === 'skills' && (
          <div className="space-y-3">
            {SKILLS.map((skill) => {
              const Icon = skill.icon;
              const style = badgeStyles[skill.badgeColor] || badgeStyles.blue;
              const isOpen = expandedSkill === skill.title;
              return (
                <div
                  key={skill.title}
                  className={`rounded-xl border transition-all cursor-pointer ${
                    isLight
                      ? 'bg-white border-zinc-200 hover:border-blue-300 hover:shadow-md'
                      : 'bg-[#161b22] border-[#21262d] hover:border-[#00d4aa]/30'
                  } ${isOpen ? (isLight ? 'border-blue-300 shadow-md' : 'border-[#00d4aa]/40') : ''}`}
                  onClick={() => setExpandedSkill(isOpen ? null : skill.title)}
                >
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg shrink-0 ${style.bg} border ${style.border}`}>
                        <Icon className={`w-4 h-4 ${style.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                            {skill.title}
                          </span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold border tracking-widest ${style.bg} ${style.text} ${style.border}`}>
                            {skill.badge}
                          </span>
                        </div>
                        {/* Skill bar */}
                        <div className={`mt-1.5 h-1.5 rounded-full overflow-hidden ${isLight ? 'bg-zinc-100' : 'bg-[#21262d]'}`}>
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${style.text.replace('text-', 'bg-').replace('-400', '-500')}`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                      <span className={`text-xs font-mono font-bold shrink-0 ${style.text}`}>
                        {skill.level}%
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {skill.tags.map(tag => (
                        <span
                          key={tag}
                          className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${
                            isLight ? 'bg-zinc-50 border-zinc-200 text-zinc-600' : 'bg-[#21262d] border-[#30363d] text-slate-400'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {isOpen && (
                    <div className={`px-4 pb-4 border-t ${isLight ? 'border-zinc-100' : 'border-[#21262d]'}`}>
                      <div className={`pt-3 space-y-1.5`}>
                        {skill.details.map((d, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs">
                            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${style.text}`} />
                            <span className={isLight ? 'text-zinc-600' : 'text-slate-400'}>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
