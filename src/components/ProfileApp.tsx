/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, Calendar, Briefcase, Github, Linkedin, Mail, Phone, Shield, Code2, Brain } from 'lucide-react';
import { USER_PROFILE_PHOTO } from '../data';

interface ProfileAppProps {
  theme: 'kali-dark' | 'mac-light';
}

export const ProfileApp: React.FC<ProfileAppProps> = ({ theme }) => {
  const isLight = theme === 'mac-light';

  return (
    <div className={`flex flex-col h-full overflow-y-auto select-text ${isLight ? 'bg-white text-zinc-800 font-sans' : 'bg-[#0a0c10] text-slate-300 font-mono'}`}>
      {/* Header banner */}
      <div className={`relative overflow-hidden px-6 py-6 flex flex-col items-center text-center border-b shrink-0 ${isLight ? 'bg-gradient-to-br from-sky-50 to-indigo-50 border-zinc-200' : 'bg-gradient-to-br from-[#0d1117] to-[#111318] border-[#3c4949]/40'}`}>
        {/* Decorative background glows */}
        <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-30 pointer-events-none ${isLight ? 'bg-blue-400' : 'bg-[#00d4aa]/30'}`} />
        <div className={`absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none ${isLight ? 'bg-indigo-400' : 'bg-[#70d3f2]/20'}`} />

        {/* Profile photo */}
        <div className="relative group z-10 mb-3">
          <div className={`absolute -inset-1.5 rounded-full blur-sm opacity-80 group-hover:opacity-100 transition-all duration-300 ${isLight ? 'bg-gradient-to-r from-blue-400 via-indigo-500 to-sky-400' : 'bg-gradient-to-r from-[#00d4aa] to-[#70d3f2]'}`} />
          <div className="w-28 h-28 rounded-full overflow-hidden relative border-2 border-white/20 z-10 bg-black">
            <img
              alt="Devidas Chinnarathod Profile Photo"
              className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-all duration-300"
              src={USER_PROFILE_PHOTO}
              referrerPolicy="no-referrer"
              title="Devidas Chinnarathod"
            />
          </div>
        </div>

        {/* Name & title */}
        <h1 className={`font-bold text-xl tracking-tight z-10 ${isLight ? 'text-zinc-900' : 'text-[#00d4aa]'}`}>
          Devidas Chinnarathod
        </h1>
        <p className={`text-xs font-semibold mt-1 z-10 ${isLight ? 'text-blue-600' : 'text-[#70d3f2]'}`}>
          [ Cybersecurity Researcher ]
        </p>
        <p className={`text-[11px] tracking-wider mt-0.5 z-10 ${isLight ? 'text-zinc-500' : 'text-[#bbc9c9]'}`}>
          [ Generative AI Engineer ]
        </p>
        <p className={`text-[11px] tracking-wide mt-0.5 font-bold z-10 ${isLight ? 'text-indigo-600' : 'text-[#ffb4ac]'}`}>
          [ Founder @ OpenDev AI ]
        </p>

        {/* Social links */}
        <div className={`flex items-center gap-4 mt-3 z-10`}>
          <a href="https://linkedin.com/in/devidas-chinnarathod" target="_blank" rel="noopener noreferrer"
            className={`flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border transition-all hover:scale-105 ${isLight ? 'border-blue-200 text-blue-600 hover:bg-blue-50' : 'border-[#3c4949]/50 text-[#54d9dd] hover:border-[#54d9dd]'}`}>
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
          <a href="https://github.com/DEVIDAS-CHINNARATHOD" target="_blank" rel="noopener noreferrer"
            className={`flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border transition-all hover:scale-105 ${isLight ? 'border-zinc-200 text-zinc-700 hover:bg-zinc-50' : 'border-[#3c4949]/50 text-[#00d4aa] hover:border-[#00d4aa]'}`}>
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      {/* Details section */}
      <div className="flex-1 p-5 space-y-4">
        {/* Quick stats */}
        <div className={`rounded-xl p-3 space-y-2.5 text-xs border ${isLight ? 'bg-neutral-50 border-zinc-200 text-zinc-700' : 'bg-[#111318]/80 border-[#3c4949]/30 text-slate-300'}`}>
          <div className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${isLight ? 'text-zinc-400' : 'text-[#869393]'}`}>// whoami stats</div>
          <div className="flex items-center space-x-2">
            <MapPin className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-blue-500' : 'text-[#00d4aa]'}`} />
            <span>Bangalore, India</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-indigo-500' : 'text-[#70d3f2]'}`} />
            <span>HKBK Engineering (VTU) — 2027</span>
          </div>
          <div className="flex items-center space-x-2">
            <Briefcase className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-emerald-500' : 'text-[#ffb4ac]'}`} />
            <span>Seeking: Security / Network Internship</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-zinc-400' : 'text-slate-400'}`} />
            <a href="mailto:devidaschinnarathod.25@gmail.com" className="hover:underline select-all">devidaschinnarathod.25@gmail.com</a>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-zinc-400' : 'text-slate-400'}`} />
            <span className="select-all">+91 9663592552</span>
          </div>
        </div>

        {/* Skills */}
        <div className={`rounded-xl p-3 space-y-2.5 text-xs border ${isLight ? 'bg-neutral-50 border-zinc-200 text-zinc-700' : 'bg-[#111318]/80 border-[#3c4949]/30 text-slate-300'}`}>
          <div className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${isLight ? 'text-zinc-400' : 'text-[#869393]'}`}>// skill_matrix</div>
          <div className="flex items-start space-x-2">
            <Shield className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isLight ? 'text-red-500' : 'text-[#ff6b6b]'}`} />
            <div>
              <span className={`font-bold block ${isLight ? 'text-zinc-800' : 'text-slate-200'}`}>Cybersecurity</span>
              <span className={isLight ? 'text-zinc-500' : 'text-slate-500'}>Pentest · OSINT · Network Analysis · CNSP Certified</span>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Brain className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isLight ? 'text-purple-500' : 'text-[#c792ea]'}`} />
            <div>
              <span className={`font-bold block ${isLight ? 'text-zinc-800' : 'text-slate-200'}`}>AI / GenAI</span>
              <span className={isLight ? 'text-zinc-500' : 'text-slate-500'}>LLM APIs · RAG · Q-Learning · Gemini · Groq</span>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Code2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isLight ? 'text-sky-500' : 'text-[#70d3f2]'}`} />
            <div>
              <span className={`font-bold block ${isLight ? 'text-zinc-800' : 'text-slate-200'}`}>Full-Stack Engineering</span>
              <span className={isLight ? 'text-zinc-500' : 'text-slate-500'}>Python · FastAPI · React · Next.js · Flutter</span>
            </div>
          </div>
        </div>

        {/* Key achievements */}
        <div className={`rounded-xl p-3 space-y-2 text-xs border ${isLight ? 'bg-neutral-50 border-zinc-200 text-zinc-700' : 'bg-[#111318]/80 border-[#3c4949]/30 text-slate-300'}`}>
          <div className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${isLight ? 'text-zinc-400' : 'text-[#869393]'}`}>// achievements</div>
          {[
            '🏆 2nd Runner Up — AI Ignite National Hackathon (OpenDev AI)',
            '🏆 2nd Runner Up — Shannon Codec Hackathon',
            '🛡️ CNSP Certified — Certified Network Security Practitioner (Jan 2026)',
            '🌐 Founder — OpenDev AI (Autonomous GitHub Security Agent)',
            '👥 Founder — CodeCircle Tech Student Community',
          ].map((item, i) => (
            <div key={i} className={`flex items-start gap-2 py-0.5 ${isLight ? 'text-zinc-600' : 'text-slate-400'}`}>
              <span className="leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
