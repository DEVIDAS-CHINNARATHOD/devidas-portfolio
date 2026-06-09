/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import devidasProfile from './assets/images/devidas_profile_1780831559114.png';
import { Project, SystemFile } from './types';

export const USER_PROFILE_PHOTO = devidasProfile;

export const INITIAL_FILES: SystemFile[] = [
  {
    id: 'readme',
    name: 'readme.txt',
    path: '/root/readme.txt',
    type: 'txt',
    content: `====================================================================
KALI PORTFOLIO SYSTEM v1.3.37-RELEASE
====================================================================

Welcome root! You have successfully accessed the professional system
of Devidas Chinnarathod.

[SYSTEM SUMMARY]
Undergraduate specializing in Cybersecurity, GenAI, and Software Eng.
Built 6+ production-ready projects in security automation, threat intelligence,
and multi-agent AI systems.

[QUICK INSTRUCTIONS]
- Double click any icon on the desktop to open the window.
- Make changes, edit configs, or test CLI tool commands in the Terminal.
- You can RENAME your resume file either in the Terminal with 'mv'
  or by double clicking on the file name under Settings / File Explorer!
- Configure and ./dispatch.sh the 'contact_init.conf' file in Nano mode
  to save contact requests to the local storage database.

Type 'help' in the Terminal for available shell triggers.
`
  },
  {
    id: 'resume',
    name: 'resume.txt',
    path: '/root/resume.txt',
    type: 'txt',
    content: `DEVIDAS CHINNARATHOD - UNDERGRADUATE PORTFOLIO
=====================================================================
Bangalore, India | devidaschinnarathod.25@gmail.com | +91 9663592552
GitHub: DEVIDAS-CHINNARATHOD | LinkedIn: devidas-chinnarathod

SUMMARY
---------------------------------------------------------------------
CS undergraduate specializing in AI, Generative AI, Cybersecurity,
and Software Engineering. Built 6+ production-ready projects
spanning autonomous AI agents, phishing detection systems,
penetration testing tools, and full-stack applications.
Seeking a Cybersecurity or Network Engineer Internship.

EDUCATION
---------------------------------------------------------------------
- HKBK College of Engineering - VTU, Bangalore
  B.E. in Computer Science & Engineering (Graduation: 2027)
- SBR PU College, Bidar
  Class XII - Science (2023) | Score: 80%

CERTIFICATIONS
---------------------------------------------------------------------
- Certified Network Security Practitioner (CNSP) - Jan 2026
- Introduction to Model Context Protocol - Anthropic (2025)
- DROP Certified Security Course (DCSC) - 2023
- Introduction to Linux (LFS101) - The Linux Foundation (2023)

LEADERSHIP & ACHIEVEMENTS
---------------------------------------------------------------------
- Founder & Maintainer - OpenDev AI (Autonomous GitHub Security Agent)
- Founder & Maintainer - CodeCircle Tech Student Community
- 2nd Runner Up - AI Ignite Hackathon (OpenDev AI - AI-for-Impact)
- 2nd Runner Up - Shannon Codec Hackathon
`
  },
  {
    id: 'certifications',
    name: 'certifications.txt',
    path: '/root/certifications.txt',
    type: 'txt',
    content: `# ====================================================================
# SYSTEM IDENTIFICATION: Root
# DIRECTORY: /opt/security/personnel/dossiers/
# STATUS: ACTIVE
# ====================================================================

> TECHNICAL_CAPABILITIES

Penetration Testing    [EXPERT]
• Network Exploitation
• Web Application Sec
• Social Engineering / OSINT

Python                 [ADVANCED]
• Custom Tooling
• Automation Scripts
• Data Analysis & Mining

AI / Machine Learning  [INTERMEDIATE]
• Threat Modeling Models
• Anomaly Detection in Network Flow
• TensorFlow / PyTorch / Hugging Face


> CERTIFICATIONS_REGISTRY

[VALID]      CNSP   Certified Network Security Professional (The SecOps Group)
[CERTIFIED]  DCSC   Defensive Cyber Security Certification (Cyber Sec & Ethical Hacking)
[EXP_2025]   LFCS   Linux Foundation Certified SysAdmin (The Linux Foundation)
`
  },
  {
    id: 'contact_conf',
    name: 'contact_init.conf',
    path: '/root/contact_init.conf',
    type: 'conf',
    content: `# =========================================================================
# KALI PORTFOLIO COMMUNICATION PROTOCOL
# =========================================================================
# Target Email : devidaschinnarathod.25@gmail.com
# Status       : LISTENING

# --- System Parameters (External Links) ---
# LINKEDIN_URL="https://linkedin.com/in/devidas-chinnarathod"
# GITHUB_URL="https://github.com/DEVIDAS-CHINNARATHOD"

# --- Payload Configuration ---
SENDER_NAME="Guest-User"
RETURN_ADDRESS="guest@domain.com"
PAYLOAD_DATA="Hello Devidas, I viewed your portfolio and would love to discuss security opportunities or projects!"
`
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'veltri_ai',
    title: 'Veltrix AI — Phishing Detection Platform',
    techStack: ['FastAPI', 'scikit-learn', 'TF-IDF', 'Logistic Regression', 'Chrome Manifest v3', 'Flutter', 'Next.js'],
    overview: 'An end-to-end, multilingual phishing detection platform protecting users across email and web workflows using AI classification, URL risk assessment, and heuristic threat intelligence.',
    features: [
      'ML Email Classifier: TF-IDF + Logistic Regression yields 95%+ detection accuracy',
      'Chrome Extension (Manifest v3): Real-time malicious URL scanning with overlay warnings',
      'Flutter Android App: On-device phishing protection covering SMS and link risk alerts',
      'Next.js Dashboard: Centralized statistics monitor exhibiting system threat load maps'
    ],
    impact: [
      'Achieved 95%+ classification accuracy on public test datasets',
      'Extended cross-platform threat coverage across browsers and Android devices'
    ],
    githubUrl: 'https://github.com/DEVIDAS-CHINNARATHOD/Veltrix-AI'
  },
  {
    id: 'opendev_ai',
    title: 'OpenDev AI — Autonomous GitHub Security Agent',
    techStack: ['Python', 'FastAPI', 'Q-Learning RL', 'Gemini API', 'Groq API', 'GitHub API', 'Next.js 14'],
    overview: 'A fully autonomous security remediation agent that forks target repositories, scans for secrets and injection vulnerabilities, and opens PRs with LLM-generated fixes, powered by Reinforcement Learning.',
    features: [
      'Q-Learning Decision Agent: Automates vulnerability prioritization and remediation strategies',
      'Vulnerability scanner covering 5+ categories (OWASP Top 10, static, and secret leaks)',
      'Remediation engine powered by Gemini & Groq APIs generating valid pull request fixes'
    ],
    impact: [
      '2nd Runner Up at the national AI Ignite Hackathon (AI-for-Impact)',
      'Automates vulnerability checks and opens fixes with zero manual intervention'
    ],
    githubUrl: 'https://github.com/DEVIDAS-CHINNARATHOD/OpenDev-AI'
  },
  {
    id: 'exploit_iq',
    title: 'ExploitIQ — Autonomous AI Penetration Testing Assistant',
    techStack: ['Python', 'FastAPI', 'WebSockets', 'Nmap', 'Nikto', 'Searchsploit', 'Groq LLaMA'],
    overview: 'An automated security-recon pipeline coordinating Nmap, Nikto, and Searchsploit, synthesizing diagnostics with Groq LLM to stream detailed vulnerability reports directly over WebSockets.',
    features: [
      'Orchestrates 4 core reconnaissance & OSINT tools in a highly optimized pipeline',
      'WebSocket logs streaming real-time shell execution output directly to live frontend dashboard',
      'AI Synthesis: Synthesizes detailed pentest logs into clean markdown reports with risk levels'
    ],
    impact: [
      'Reduces reconnaissance setup and consolidation time from hours to standard click of button',
      'Generates remediation reports mapped to CVE databases instantly'
    ],
    githubUrl: 'https://github.com/DEVIDAS-CHINNARATHOD/ExploitIQ'
  },
  {
    id: 'geoagent',
    title: 'GeoAgent — Agentic Local Tourism Intelligence',
    techStack: ['Python', 'FastAPI', 'LangChain', 'ChromaDB', 'Hugging Face', 'LLaMA 3.1 8B', 'React'],
    overview: 'A production-level multi-agent AI system arranging 6 collaborative specialized agents (Planner, Explorer, Nearby, Weather, Safety, Aggregator) to deliver secure and context-aware local trip intelligence.',
    features: [
      'RAG Engine: ChromaDB vector storage storing semantic database files',
      'Multi-agent pipeline prioritizing user safety parameters and area alert indexes',
      'Apple-inspired minimal design chat UI with responsive maps and safety indicators'
    ],
    impact: [
      'Continuous CI/CD with robust automatic testing suite deployable to Render & Vercel',
      'Coordinates 6 specialized roles in concurrent processing loops to solve queries under 3s'
    ],
    githubUrl: 'https://github.com/DEVIDAS-CHINNARATHOD/GeoAgent'
  },
  {
    id: 'key_logger_ml',
    title: 'Defensive ML Keylogger Detection System',
    techStack: ['Python', 'scikit-learn', 'pandas', 'NumPy', 'Network Traffic Analysis'],
    overview: 'A high-precision defensive AI classifier detecting active keylogger malware behaviors entirely through passive network traffic analysis without requiring any host system access.',
    features: [
      'Passive Network Flow Diagnostics: Evaluates packet entropy, frequency ratios and timing',
      'scikit-learn models classifying benign vs malware payloads on network streams with high accuracy',
      'Secures endpoints dynamically against evasive malware without administrative installation'
    ],
    impact: [
      'Defeated endpoint-evasive keylogger payloads in live simulated attacks',
      'Operates entirely in-network, yielding zero impact on host machine CPUs'
    ],
    githubUrl: 'https://github.com/DEVIDAS-CHINNARATHOD/keylogger-detection-ml'
  }
];
