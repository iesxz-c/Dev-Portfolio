"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalLine {
  type: "input" | "output" | "error";
  content: string;
}

const TerminalIcon = () => (
  <img
    src="/kl.svg"
    alt="Terminal Icon"
    className="w-6 h-6"
  />
);
const CloseIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const createBoxedOutput = (title: string, content: string) => {
    const width = 58;
    const titlePadding = " ".repeat(Math.floor((width - title.length) / 2));
    const top = `╔${"═".repeat(width + 2)}╗`;
    const titleLine = `║ ${titlePadding}${title}${" ".repeat(Math.ceil((width - title.length) / 2))} ║`;
    const bottom = `╚${"═".repeat(width + 2)}╝`;
    return `${top}\n${titleLine}\n${bottom}\n\n${content}`;
};



export const Terminal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentInput, setCurrentInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      type: "output",
      content: `
██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ 
██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ 
                                                                        
Welcome to my Interactive Portfolio Terminal v1.0.0
Type 'help' to see available commands.
`,
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const createProgressBar = (percentage: number, length = 30) => {
    const filledLength = Math.round((length * percentage) / 100);
    return `[${"█".repeat(filledLength)}${"-".repeat(length - filledLength)}] ${percentage}%`;
  };

  const commands = {
    help: () => `
  Available Commands:
  ─────────────────────────────────────────────────────────
    help          Show this help message
    about         Display my professional summary
    projects      View my featured projects
    skills        List my technical competencies
    contact       Show ways to get in touch
    clear         Clear the terminal screen
    exit          Close this terminal
  ─────────────────────────────────────────────────────────
  `,
    about: () => createBoxedOutput("ABOUT ME", 
`  Name: Akash
  Role: Curious Developer | AI Explorer
  Location: India
  Status: Open to new opportunities

  A passionate developer focused on creating performant and beautiful 
  digital experiences. I thrive at the intersection of robust backend 
  logic and fluid, user-centric frontend design.`
    ),
    projects: () => createBoxedOutput("PROJECTS",
`  [1] RAG Bot – AI Chatbot using Retrieval-Augmented Generation (RAG)
    → Built a chatbot using Next.js, React, TypeScript, Gemini API, and Astra DB, initially trained on Formula One websites but designed to adapt to any domain.
    → Implemented a web scraping pipeline with Puppeteer & LangChain to gather content, create vector embeddings with Gemini, and store/retrieve them from Astra DB for context-aware responses.
    → Designed full RAG workflow: embedding user queries → retrieving relevant content from Astra DB → generating AI-driven responses.
    → Tech: Next.js, React, TypeScript, Gemini API, Astra DB, Puppeteer, LangChain

[2] Stew – Collaborative Study Application
    → Developed collaborative learning platform using React/Chakra UI frontend and Flask backend with SQLAlchemy ORM, database migrations, relational schema, and secure JWT authentication.
    → Built real-time collaboration features with socket-io: interactive whiteboard, group messaging, and live file sharing capabilities.
    → Created comprehensive learning ecosystem with task management, flashcard system, and Three.js progress visualization showing task completion analytics.
    → Tech: React, Chakra UI, Flask, SQLAlchemy, Socket.io, Three.js

[3] Altera – PDF & Document Management Web Application
    → Developed an application to merge, convert, and manipulate PDFs and documents, including OCR text extraction using PyMuPDF, pytesseract, and LibreOffice in headless mode.
    → Frontend built with React, Vite, Chakra UI; backend with Flask, supporting CORS, blueprint routing, and multiple document processing pipelines.
    → Features include PDF merging, DOC/PPT conversion, image handling, and seamless document processing workflows.
    → Tech: React, Vite, Chakra UI, Flask, PyMuPDF, pytesseract, LibreOffice

[4] MILAN – Simple Real-Time Messaging App
    → Built a real-time messaging platform using Flask, SQLAlchemy, and socket-io with user authentication and WebSocket communication.
    → Implemented frontend with HTML, CSS, and Jinja templates for responsive user interface.
    → Tech: Flask, SQLAlchemy, Socket.io, HTML/CSS, WebSocket

[5] Developer Portfolio
    → Built a stylish, interactive portfolio to showcase skills, projects, and links.
    → Features include terminal-style interface, animations, and responsive design.
    → Tech: React, Next.js, Tailwind CSS, Node.js, Vercel, Git
`
    ),
    skills: () => createBoxedOutput("TECHNICAL SKILLS",
` Frontend:
  • React           ${createProgressBar(95)}
  • HTML            ${createProgressBar(98)}
  • Next.js         ${createProgressBar(92)}
  • TypeScript      ${createProgressBar(90)}
  • Tailwind CSS    ${createProgressBar(98)}
  • React Native    ${createProgressBar(95)}
  • JavaScript      ${createProgressBar(92)}

Backend:
  • Node.js         ${createProgressBar(88)}
  • Flask           ${createProgressBar(85)}
  • Python          ${createProgressBar(90)}
  • MySQL           ${createProgressBar(90)}
  • Firebase        ${createProgressBar(90)}
  • LangChain       ${createProgressBar(90)}
  • AppWrite        ${createProgressBar(90)}

Tools & Infrastructure:
  • Git             ${createProgressBar(96)}
  • GitHub          ${createProgressBar(98)}
  • Vercel          ${createProgressBar(95)}
  • Vite            ${createProgressBar(82)}
  • Linux           ${createProgressBar(82)}
  • Railway         ${createProgressBar(82)}
  • Docker          ${createProgressBar(82)}
  • Expo            ${createProgressBar(82)}
  • Postman         ${createProgressBar(85)}
`
    ),
    contact: () => createBoxedOutput("CONTACT", 
`  You can reach me via the following channels:

  📧 Email:  akashiyu18@gmail.com
  🐙 GitHub: github.com/iesxz-c

  I'm always open to discussing new projects and collaborations.`
    ),
    clear: () => "CLEAR_TERMINAL",
    exit: () => "CLOSE_TERMINAL",
  };

  const typewriterEffect = async (text: string, onUpdate: (newText: string) => void) => {
    setIsTyping(true);
    for (let i = 0; i < text.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 5));
      onUpdate(text.slice(0, i + 1));
    }
    setIsTyping(false);
  };

  const executeCommand = async (command: string) => {
    const trimmedCommand = command.trim().toLowerCase();
    setHistory((prev) => [...prev, { type: "input", content: `guest@akash:~$ ${command}` }]);
    if (command) {
        setCommandHistory((prev) => [command, ...prev]);
    }
    setHistoryIndex(-1);

    if (trimmedCommand === "clear") {
      setHistory([]);
      return;
    }
    if (trimmedCommand === "exit") {
      setIsOpen(false);
      return;
    }
    
    const commandFunc = commands[trimmedCommand as keyof typeof commands];
    if (commandFunc) {
      const output = commandFunc();
      const newOutputLine: TerminalLine = { type: 'output', content: '' };
      setHistory(prev => [...prev, newOutputLine]);
      await typewriterEffect(output, (text) => {
        setHistory(prev => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1].content = text;
          return newHistory;
        });
      });
    } else {
      setHistory((prev) => [
        ...prev,
        { type: "error", content: `Command not found: ${command}. Type 'help' for available commands.` },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isTyping) {
      executeCommand(currentInput);
      setCurrentInput("");
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex] || '');
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const newIndex = Math.max(historyIndex - 1, -1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex] || '');
    }
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    terminalBodyRef.current?.scrollTo({ top: terminalBodyRef.current.scrollHeight });
  }, [history]);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-lg"
      >
        <TerminalIcon />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-8"
          >
            <div className="w-full max-w-4xl h-[70vh] max-h-[600px] rounded-2xl bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl shadow-purple-500/10 flex flex-col"
          >
            <div className="flex-shrink-0 flex items-center justify-between p-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-3 text-white/50 font-mono text-sm">akash@portfolio</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
                <CloseIcon />
              </button>
            </div>

            <div
              ref={terminalBodyRef}
              className="flex-grow p-4 overflow-y-auto font-mono text-sm custom-scrollbar-on-modal"
            >
              {history.map((line, index) => (
                <div key={index} className="mb-2">
                  <pre
                    className={`whitespace-pre-wrap ${
                      line.type === "input" ? "text-purple" :
                      line.type === "error" ? "text-red-400" :
                      "text-white/80"
                    }`}
                  >
                    {line.content}
                  </pre>
                </div>
              ))}
              {isTyping && <div className="inline-block w-2 h-4 bg-purple-300 animate-pulse ml-1"></div>}
            </div>

            <div className="flex-shrink-0 p-3 border-t border-white/10">
              <div className="flex items-center gap-2 text-purple font-mono text-purple-300">
                <span className="text-green-500">guest@akash:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-purple-300 caret-purple-300"
                  placeholder="Type a command..."
                  disabled={isTyping}
                  autoComplete="off"
                />
              </div>
            </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};