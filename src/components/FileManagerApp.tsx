/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { ContactMessage, SystemFile } from '../types';
import { FolderOpen, Database, FileText, Check, Edit2, Trash2, Eye, CircleAlert } from 'lucide-react';

interface FileManagerAppProps {
  files: SystemFile[];
  theme?: 'kali-dark' | 'mac-light';
  onRenameFile: (fileId: string, newName: string) => void;
  onOpenFile: (file: SystemFile) => void;
  onDeleteFile: (fileId: string) => void;
}

export const FileManagerApp: React.FC<FileManagerAppProps> = ({
  files,
  theme = 'kali-dark',
  onRenameFile,
  onOpenFile,
  onDeleteFile,
}) => {
  const [activeTab, setActiveTab] = useState<'system' | 'db_logs'>('system');
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [newNameVal, setNewNameVal] = useState('');
  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);

  const isLight = theme === 'mac-light';

  useEffect(() => {
    loadDatabaseMessages();
  }, [activeTab]);

  const loadDatabaseMessages = () => {
    const raw = localStorage.getItem('kali-contact-database');
    if (raw) {
      setMessages(JSON.parse(raw));
    } else {
      setMessages([]);
    }
  };

  const handleStartRename = (file: SystemFile) => {
    setRenamingId(file.id);
    setNewNameVal(file.name);
  };

  const handleSaveRename = (fileId: string) => {
    if (newNameVal.trim()) {
      onRenameFile(fileId, newNameVal.trim());
    }
    setRenamingId(null);
  };

  const handleDeleteMessage = (msgId: string) => {
    const updated = messages.filter((m) => m.id !== msgId);
    localStorage.setItem('kali-contact-database', JSON.stringify(updated));
    setMessages(updated);
    if (selectedMsg?.id === msgId) {
      setSelectedMsg(null);
    }
  };

  return (
    <div className={`flex flex-col md:flex-row h-full font-mono text-body-md ${
      isLight ? 'bg-neutral-50 text-neutral-800' : 'bg-[#0a0c10] text-on-surface'
    }`}>
      {/* Sidebar Navigation */}
      <div className={`w-full md:w-48 flex flex-row md:flex-col p-2 gap-1 md:gap-2 shrink-0 overflow-x-auto md:overflow-x-visible ${
        isLight ? 'bg-[#f0f1f4] border-r border-[#dedede]' : 'bg-[#111318]/90 border-r border-outline-variant/30'
      }`}>
        <button
          onClick={() => setActiveTab('system')}
          className={`flex items-center space-x-2 px-3 py-2 rounded text-xs text-left w-full transition-colors whitespace-nowrap ${
            activeTab === 'system'
              ? (isLight ? 'bg-blue-600/10 border-l-2 border-blue-600 text-blue-600 font-bold' : 'bg-primary/10 border-l-2 border-primary text-primary')
              : (isLight ? 'text-zinc-650 hover:bg-zinc-200/50' : 'text-on-surface-variant hover:bg-surface-variant/20 hover:text-on-surface')
          }`}
        >
          <FolderOpen className="w-4 h-4" />
          <span>/root/desktop</span>
        </button>

        <button
          onClick={() => setActiveTab('db_logs')}
          className={`flex items-center space-x-2 px-3 py-2 rounded text-xs text-left w-full transition-colors whitespace-nowrap ${
            activeTab === 'db_logs'
              ? (isLight ? 'bg-teal-600/10 border-l-2 border-teal-600 text-teal-600 font-bold' : 'bg-[#70d3f2]/10 border-l-2 border-[#70d3f2] text-[#70d3f2]')
              : (isLight ? 'text-zinc-650 hover:bg-zinc-200/50' : 'text-on-surface-variant hover:bg-surface-variant/20 hover:text-on-surface')
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Contact DB Logs</span>
        </button>

        <div className={`hidden md:block mt-auto p-2 text-[10px] border-t ${
          isLight ? 'text-neutral-500 border-zinc-200' : 'text-slate-500 border-[#3c4949]/30'
        }`}>
          <span>Storage: Persistent</span>
          <div className={`w-full h-1 rounded mt-1 overflow-hidden ${isLight ? 'bg-zinc-250' : 'bg-[#3c4949]/30'}`}>
            <div className={`h-full w-[32%] ${isLight ? 'bg-blue-600' : 'bg-primary'}`}></div>
          </div>
        </div>
      </div>

      {/* Main Folder Explorer Area */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto select-text">
        {activeTab === 'system' ? (
          <div>
            <div className={`flex items-center justify-between border-b pb-2 mb-4 ${
              isLight ? 'border-zinc-200' : 'border-[#3c4949]/40'
            }`}>
              <span className={`text-xs ${isLight ? 'text-zinc-550' : 'text-[#869393]'}`}>// File browser (Desktop mount):</span>
              <span className={`text-xs font-bold ${isLight ? 'text-blue-600' : 'text-[#54d9dd]'}`}>Total Assets: {files.length}</span>
            </div>

            <div className="space-y-2">
              {files.map((file) => (
                <div
                  key={file.id}
                  className={`flex items-center justify-between p-3 rounded border transition-all ${
                    isLight
                      ? 'bg-white border-zinc-200 hover:border-blue-500/40 hover:bg-zinc-100/30 shadow-xs'
                      : 'bg-[#161b22]/30 border border-[#3c4949]/20 hover:border-primary/40 hover:bg-[#1e2024]/30'
                  }`}
                >
                  <div
                    onClick={() => onOpenFile(file)}
                    className="flex-1 flex items-center space-x-3 cursor-pointer select-none"
                  >
                    {file.type === 'conf' ? (
                      <FileText className={`w-5 h-5 shrink-0 ${isLight ? 'text-orange-500' : 'text-[#ffb4ac]'}`} />
                    ) : (
                      <FileText className={`w-5 h-5 shrink-0 ${isLight ? 'text-blue-500' : 'text-primary'}`} />
                    )}

                    <div>
                      {renamingId === file.id ? (
                        <input
                          title="Rename input"
                          type="text"
                          value={newNameVal}
                          onChange={(e) => setNewNameVal(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveRename(file.id);
                            if (e.key === 'Escape') setRenamingId(null);
                          }}
                          className={`px-1.5 py-0.5 rounded text-xs font-mono max-w-xs focus:ring-0 ${
                            isLight
                              ? 'bg-zinc-50 border border-blue-500 text-neutral-800'
                              : 'bg-[#0c0e12] border border-primary text-primary'
                          }`}
                          onClick={(e) => e.stopPropagation()}
                          autoFocus
                        />
                      ) : (
                        <span className={`text-sm font-bold leading-none transition-colors ${
                          isLight
                            ? 'text-neutral-800 hover:text-blue-600'
                            : 'text-[#e2e2e8] hover:text-primary'
                        }`}>
                          {file.name}
                        </span>
                      )}
                      <p className={`text-[10px] select-none mt-0.5 font-mono ${
                        isLight ? 'text-zinc-500' : 'text-slate-500'
                      }`}>
                        Path: {file.path} | Size: {Math.round(file.content.length)} bytes
                      </p>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center space-x-3 shrink-0 ml-2">
                    {renamingId === file.id ? (
                      <button
                        title="Save Rename"
                        onClick={() => handleSaveRename(file.id)}
                        className="p-1 text-green-500 hover:text-green-600 hover:bg-green-550/10 rounded transition-all"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        title="Rename file inline"
                        onClick={() => handleStartRename(file)}
                        className={`p-1.5 rounded transition-all ${
                          isLight
                            ? 'text-zinc-500 hover:text-blue-600 hover:bg-blue-600/10'
                            : 'text-slate-400 hover:text-primary hover:bg-primary/10'
                        }`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}

                    {file.canDelete && (
                      <button
                        title="Delete file"
                        onClick={() => onDeleteFile(file.id)}
                        className={`p-1.5 rounded transition-all ${
                          isLight
                            ? 'text-zinc-500 hover:text-red-650 hover:bg-red-500/10'
                            : 'text-slate-400 hover:text-tertiary hover:bg-tertiary/10'
                        }`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className={`mt-8 text-xs italic max-w-md ${isLight ? 'text-neutral-500' : 'text-slate-500'}`}>
              💡 <span className={`${isLight ? 'text-blue-600' : 'text-[#54d9dd]'} font-bold`}>GUI Power Utility:</span> Rename your files by clicking the edit pencil. Type 'Enter' or click the checkmark to save! Let 'mv' do the rest.
            </div>
          </div>
        ) : (
          /* DB logs content */
          <div>
            <div className={`flex items-center justify-between border-b pb-2 mb-4 select-none ${
              isLight ? 'border-zinc-200' : 'border-[#3c4949]/30'
            }`}>
              <span className={`text-xs ${isLight ? 'text-zinc-550' : 'text-[#869393]'}`}>// Dispatched mail payloads:</span>
              <span className={`text-xs font-bold ${isLight ? 'text-teal-600' : 'text-[#70d3f2]'}`}>Dispatches Saved: {messages.length}</span>
            </div>

            {messages.length === 0 ? (
              <div className={`p-10 text-center rounded-xl border border-dashed flex flex-col items-center justify-center gap-3 ${
                isLight ? 'border-zinc-200 bg-zinc-50/50 text-zinc-400' : 'border-[#21262d] text-slate-500'
              }`}>
                <svg className="w-12 h-12 opacity-30" viewBox="0 0 48 48" fill="none">
                  <rect x="4" y="10" width="40" height="28" rx="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M4,14 L24,28 L44,14" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
                <div>
                  <p className={`text-sm font-semibold ${isLight ? 'text-zinc-500' : 'text-slate-400'}`}>No messages yet</p>
                  <p className={`text-xs mt-1 ${isLight ? 'text-zinc-400' : 'text-slate-600'}`}>
                    Messages sent via the Contact form will appear here.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* List of stored contacts */}
                <div className="space-y-2 select-none">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      onClick={() => setSelectedMsg(msg)}
                      className={`p-3 rounded border text-left cursor-pointer transition-all ${
                        selectedMsg?.id === msg.id
                          ? (isLight ? 'border-teal-500 bg-teal-50 text-teal-950 font-medium' : 'border-[#70d3f2] bg-[#70d3f2]/10')
                          : (isLight ? 'border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50 text-zinc-800 shadow-xs' : 'border-[#3c4949]/20 bg-[#161b22]/30 hover:border-[#70d3f2]/50 hover:bg-[#1e2024]/30')
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className={`text-xs font-bold ${isLight ? 'text-zinc-900' : 'text-[#e1e1e8]'}`}>
                          {msg.senderName}
                        </span>
                        <button
                          title="Delete message from database"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteMessage(msg.id);
                          }}
                          className="text-slate-500 hover:text-red-500 p-1 transition-colors flex items-center justify-center"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className={`text-[11px] truncate mt-1 ${isLight ? 'text-teal-600' : 'text-[#70d3f2]'}`}>
                        {msg.returnAddress}
                      </p>
                      <div className={`text-[10px] text-right mt-2 ${isLight ? 'text-zinc-400' : 'text-slate-500'}`}>
                        {msg.timestamp}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Msg Reader Panel */}
                <div>
                  {selectedMsg ? (
                    <div className={`p-4 rounded border space-y-3 leading-relaxed ${
                      isLight ? 'bg-white border-zinc-200 text-zinc-850 shadow-sm' : 'border-[#3c4949]/30 bg-[#0a0c10]'
                    }`}>
                      <div className={`border-b pb-2 flex justify-between items-center text-xs select-none ${
                        isLight ? 'border-zinc-150 text-zinc-400' : 'border-[#3c4949]/40 text-slate-500'
                      }`}>
                        <span>HANDSHAKE_RECORD: {selectedMsg.id}</span>
                        <span>{selectedMsg.timestamp}</span>
                      </div>
                      <div className="text-xs space-y-1">
                        <p><strong className={isLight ? 'text-teal-600' : 'text-primary'}>Sender:</strong> {selectedMsg.senderName}</p>
                        <p><strong className={isLight ? 'text-teal-600' : 'text-primary'}>Address:</strong> {selectedMsg.returnAddress}</p>
                      </div>
                      <div className={`p-3 rounded text-xs font-mono leading-relaxed select-text border whitespace-pre-wrap ${
                        isLight ? 'bg-zinc-50 text-zinc-700 border-zinc-200' : 'bg-[#111318] text-slate-300 border-[#3c4949]/20'
                      }`}>
                        {selectedMsg.payloadData}
                      </div>
                    </div>
                  ) : (
                    <div className={`p-8 text-center select-none rounded border border-dashed flex flex-col items-center justify-center ${
                      isLight ? 'border-zinc-300 bg-zinc-50 text-zinc-500' : 'border-[#3c4949]/30 text-slate-500'
                    }`}>
                      <Eye className="w-6 h-6 mb-1 text-slate-400" />
                      <p className="text-xs">Click a transaction message to inspect envelope contents.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
