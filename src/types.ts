/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SystemFile {
  id: string;
  name: string;
  path: string;
  content: string;
  type: 'txt' | 'conf' | 'directory' | 'bin';
  canDelete?: boolean;
}

export interface Project {
  id: string;
  title: string;
  techStack: string[];
  overview: string;
  features: string[];
  impact: string[];
  githubUrl: string;
}

export interface ContactMessage {
  id: string;
  timestamp: string;
  senderName: string;
  returnAddress: string;
  payloadData: string;
}

export type AppID = 'terminal' | 'mousepad' | 'nano_contact' | 'file_manager' | 'projects_viewer' | 'message_log_viewer' | 'settings' | 'vscode' | 'chrome' | 'pdf_resume' | 'profile';

export interface DesktopWindow {
  id: AppID;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number | string;
  height: number | string;
}
