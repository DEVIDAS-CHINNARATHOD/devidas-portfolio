/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ContactMessage } from '../types';
import { Send, RotateCcw, Github, Linkedin, Mail, Phone, MapPin, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

interface NanoContactAppProps {
  onMessageSent: (msg: ContactMessage) => void;
  theme?: 'kali-dark' | 'mac-light';
}

export const NanoContactApp: React.FC<NanoContactAppProps> = ({ onMessageSent, theme = 'kali-dark' }) => {
  const isLight = theme === 'mac-light';

  const [formData, setFormData] = useState({
    senderName: '',
    returnAddress: '',
    payloadData: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({ senderName: '', returnAddress: '', payloadData: '' });
    setStatus('idle');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.senderName || !formData.returnAddress || !formData.payloadData) return;

    setStatus('sending');

    setTimeout(() => {
      const newMessage: ContactMessage = {
        id: `msg_${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        senderName: formData.senderName,
        returnAddress: formData.returnAddress,
        payloadData: formData.payloadData,
      };

      const existing = localStorage.getItem('kali-contact-database');
      const db: ContactMessage[] = existing ? JSON.parse(existing) : [];
      db.push(newMessage);
      localStorage.setItem('kali-contact-database', JSON.stringify(db));
      onMessageSent(newMessage);
      setStatus('sent');

      setTimeout(handleReset, 5000);
    }, 1800);
  };

  const inputClass = (extraLight = '', extraDark = '') =>
    `w-full rounded-lg border px-3 py-2.5 text-sm font-sans outline-none transition-all placeholder:text-sm ${
      isLight
        ? `bg-white border-zinc-200 text-zinc-800 placeholder-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 ${extraLight}`
        : `bg-[#0d1117] border-[#30363d] text-slate-200 placeholder-slate-600 focus:border-[#00d4aa] focus:ring-2 focus:ring-[#00d4aa]/10 ${extraDark}`
    }`;

  return (
    <div className={`h-full flex flex-col font-sans overflow-hidden ${isLight ? 'bg-slate-50 text-zinc-800' : 'bg-[#0d1117] text-slate-300'}`}>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto p-5 space-y-5">

          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Mail className={`w-5 h-5 ${isLight ? 'text-blue-600' : 'text-[#00d4aa]'}`} />
              <h1 className={`text-base font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                Get In Touch
              </h1>
            </div>
            <p className={`text-xs ${isLight ? 'text-zinc-500' : 'text-slate-500'}`}>
              Open to internship opportunities in Cybersecurity &amp; AI Engineering.
            </p>
          </div>

          {/* Quick Contact Info */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-2.5`}>
            {[
              { icon: Mail, label: 'Email', value: 'devidaschinnarathod.25@gmail.com', short: 'Gmail', href: 'mailto:devidaschinnarathod.25@gmail.com' },
              { icon: Phone, label: 'Phone', value: '+91 9663592552', short: '+91 9663592552', href: 'tel:+919663592552' },
              { icon: MapPin, label: 'Location', value: 'Bangalore, India', short: 'Bangalore, IN', href: null },
            ].map(({ icon: Icon, label, short, href }) => (
              <div
                key={label}
                className={`flex items-center gap-2.5 p-3 rounded-xl border ${
                  isLight ? 'bg-white border-zinc-200' : 'bg-[#161b22] border-[#21262d]'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isLight ? 'text-blue-500' : 'text-[#00d4aa]'}`} />
                <div className="min-w-0">
                  <p className={`text-[10px] font-semibold uppercase tracking-widest ${isLight ? 'text-zinc-400' : 'text-slate-600'}`}>{label}</p>
                  {href ? (
                    <a href={href} className={`text-xs font-medium truncate block hover:underline ${isLight ? 'text-zinc-700' : 'text-slate-300'}`}>{short}</a>
                  ) : (
                    <p className={`text-xs font-medium truncate ${isLight ? 'text-zinc-700' : 'text-slate-300'}`}>{short}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex gap-2.5">
            <a
              href="https://linkedin.com/in/devidas-chinnarathod"
              target="_blank" rel="noopener noreferrer"
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                isLight
                  ? 'bg-white border-zinc-200 text-zinc-700 hover:border-blue-400 hover:text-blue-600 hover:shadow-sm'
                  : 'bg-[#161b22] border-[#21262d] text-slate-400 hover:border-[#00d4aa]/50 hover:text-[#00d4aa]'
              }`}
            >
              <Linkedin className="w-4 h-4 text-sky-500" />
              LinkedIn
            </a>
            <a
              href="https://github.com/DEVIDAS-CHINNARATHOD"
              target="_blank" rel="noopener noreferrer"
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                isLight
                  ? 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-400 hover:shadow-sm'
                  : 'bg-[#161b22] border-[#21262d] text-slate-400 hover:border-slate-500 hover:text-white'
              }`}
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>

          {/* Divider */}
          <div className={`flex items-center gap-3 ${isLight ? 'text-zinc-300' : 'text-[#21262d]'}`}>
            <div className={`flex-1 h-px ${isLight ? 'bg-zinc-200' : 'bg-[#21262d]'}`} />
            <span className={`text-[11px] font-semibold ${isLight ? 'text-zinc-400' : 'text-slate-600'}`}>Send a Message</span>
            <div className={`flex-1 h-px ${isLight ? 'bg-zinc-200' : 'bg-[#21262d]'}`} />
          </div>

          {/* Success State */}
          {status === 'sent' ? (
            <div className={`rounded-xl border p-6 flex flex-col items-center gap-3 text-center ${
              isLight ? 'bg-emerald-50 border-emerald-200' : 'bg-emerald-900/20 border-emerald-500/30'
            }`}>
              <CheckCircle2 className={`w-10 h-10 ${isLight ? 'text-emerald-500' : 'text-emerald-400'}`} />
              <div>
                <p className={`font-bold text-sm ${isLight ? 'text-emerald-800' : 'text-emerald-300'}`}>Message Sent!</p>
                <p className={`text-xs mt-1 ${isLight ? 'text-emerald-600' : 'text-emerald-500'}`}>
                  Thanks! I'll get back to you soon at {formData.returnAddress || 'your email'}.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Name */}
              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${isLight ? 'text-zinc-700' : 'text-slate-400'}`}>
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="senderName"
                  type="text"
                  value={formData.senderName}
                  onChange={handleChange}
                  placeholder="e.g. Jane Smith"
                  required
                  disabled={status === 'sending'}
                  className={inputClass()}
                />
              </div>

              {/* Email */}
              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${isLight ? 'text-zinc-700' : 'text-slate-400'}`}>
                  Your Email <span className="text-red-500">*</span>
                </label>
                <input
                  name="returnAddress"
                  type="email"
                  value={formData.returnAddress}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  required
                  disabled={status === 'sending'}
                  className={inputClass()}
                />
              </div>

              {/* Message */}
              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${isLight ? 'text-zinc-700' : 'text-slate-400'}`}>
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="payloadData"
                  rows={4}
                  value={formData.payloadData}
                  onChange={handleChange}
                  placeholder="Hi Devidas, I'd love to connect about..."
                  required
                  disabled={status === 'sending'}
                  className={`${inputClass()} resize-none`}
                />
                <div className={`text-right text-[10px] mt-1 ${isLight ? 'text-zinc-400' : 'text-slate-600'}`}>
                  {formData.payloadData.length} / 500 chars
                </div>
              </div>

              {/* Error */}
              {status === 'error' && (
                <div className={`flex items-center gap-2 text-xs p-2.5 rounded-lg border ${
                  isLight ? 'bg-red-50 border-red-200 text-red-600' : 'bg-red-900/20 border-red-500/30 text-red-400'
                }`}>
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  Something went wrong. Please try again.
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={status === 'sending'}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg border text-xs font-semibold transition-all ${
                    isLight
                      ? 'border-zinc-200 text-zinc-600 hover:bg-zinc-100 bg-white'
                      : 'border-[#30363d] text-slate-400 hover:bg-[#161b22] hover:text-slate-200'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={status === 'sending' || !formData.senderName || !formData.returnAddress || !formData.payloadData}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                    status === 'sending' || !formData.senderName
                      ? (isLight ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed' : 'bg-[#21262d] text-slate-600 cursor-not-allowed')
                      : (isLight
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md'
                          : 'bg-[#00d4aa] hover:bg-[#00d4aa]/90 text-black hover:shadow-[0_0_20px_rgba(0,212,170,0.4)]')
                  }`}
                >
                  {status === 'sending' ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="w-3.5 h-3.5" /> Send Message</>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
