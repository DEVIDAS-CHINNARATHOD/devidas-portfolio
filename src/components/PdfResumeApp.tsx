/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Download, 
  Printer, 
  FileText, 
} from 'lucide-react';
import resumePdf from '../assets/devidas_resume_final.pdf';

export const PdfResumeApp: React.FC = () => {
  const [zoom, setZoom] = useState<number>(100);
  const [rotation, setRotation] = useState<number>(0);
  const [successMsg, setSuccessMsg] = useState<string>('');

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 10, 150));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 10, 70));
  const handleResetZoom = () => setZoom(100);
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  const handlePrint = () => {
    window.open(resumePdf, '_blank');
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumePdf;
    link.download = 'Devidas_Chinnarathod_Resume.pdf';
    link.click();
    setSuccessMsg('Resume PDF downloaded successfully!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="flex flex-col h-full bg-[#323639] text-zinc-300 font-sans text-xs select-none relative overflow-hidden">
      
      {/* 1. PDF Header Acrobat Navigation Toolbar */}
      <div className="bg-[#202124] h-12 border-b border-[#303134] px-4 flex items-center justify-between shrink-0 shadow-lg">
        <div className="flex items-center space-x-2.5">
          <FileText className="w-5 h-5 text-red-500" />
          <div className="truncate">
            <span className="font-semibold text-zinc-100 text-[11.5px]">Devidas_Chinnarathod_Resume.pdf</span>
            <span className="text-[9.5px] text-zinc-500 block">PDF Document Viewer</span>
          </div>
        </div>

        {/* Global Toolbar buttons */}
        <div className="flex items-center space-x-2">
          <button 
            type="button"
            onClick={handleRotate} 
            title="Rotate Page" 
            className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all"
          >
            <RotateCw className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={handlePrint} 
            title="Open PDF in new tab" 
            className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all"
          >
            <Printer className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={handleDownload} 
            title="Download PDF File" 
            className="p-1.5 rounded bg-red-600/10 hover:bg-red-700 hover:text-white border border-red-900/30 text-red-400 font-bold transition-all"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Success Download banner notification */}
      {successMsg && (
        <div className="absolute top-14 left-1/2 transform -translate-x-1/2 p-2 px-4 rounded bg-emerald-950 border border-emerald-500 text-emerald-400 font-sans text-[11px] font-semibold text-center shadow-lg z-50 animate-pulse">
          ✓ {successMsg}
        </div>
      )}

      {/* 2. Real PDF Embedded via iframe */}
      <div className="flex-1 overflow-hidden bg-[#525659]">
        <iframe
          src={resumePdf}
          title="Devidas Chinnarathod Resume"
          className="w-full h-full border-0"
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: 'center center',
            transition: 'transform 0.2s ease-out',
          }}
        />
      </div>
    </div>
  );
};
