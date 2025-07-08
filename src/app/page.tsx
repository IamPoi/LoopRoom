'use client'

import { useEffect } from 'react'
import Head from 'next/head'

interface ModuleData {
  name: string;
  messages: string[];
  particles: string[];
  particleClass: string;
}

type ModuleType = 'rain' | 'birds' | 'cafe' | 'keyboard' | 'office' | 'library';

export default function Home() {
  useEffect(() => {
    const modules: Record<ModuleType, ModuleData> = {
      rain: {
        name: 'RAIN_AMBIENT',
        messages: [
          'Rain pattern analysis complete...',
          'Atmospheric pressure normalized.',
          'Droplet frequency: optimal for focus.',
          'White noise filtering active.',
          'Precipitation simulation running.',
          'Calming subroutine executing...',
          'Storm intensity: minimal.',
          'Background processing stable.'
        ],
        particles: ['|', ':', '.', "'", '`'],
        particleClass: 'rain-char'
      },
      birds: {
        name: 'FOREST_BIRDS',
        messages: [
          'Birdsong synthesis initialized.',
          'Forest simulation: ACTIVE.',
          'Species identification complete.',
          'Natural frequency modulation on.',
          'Chirp pattern recognition running.',
          'Dawn chorus simulation loaded.',
          'Wildlife.dll loaded successfully.',
          'Echo cancellation disabled.'
        ],
        particles: ['*', '+', 'o', '°', '∘'],
        particleClass: 'bird-char'
      },
      cafe: {
        name: 'CAFE_NOISE',
        messages: [
          'Coffee shop simulation loaded.',
          'Ambient chatter levels adjusted.',
          'Espresso machine cycles active.',
          'Background conversations muted.',
          'Ceramic clink frequency optimal.',
          'Social noise filtering enabled.',
          'Comfort zone parameters set.',
          'Cafe.exe running in background.'
        ],
        particles: ['~', '≈', '∿', '⌐', '¬'],
        particleClass: 'cafe-char'
      },
      keyboard: {
        name: 'MECH_KEYS',
        messages: [
          'Mechanical switch simulation active.',
          'Keystroke velocity calculated.',
          'Cherry MX profile loaded.',
          'Tactile feedback synthesized.',
          'Click frequency: maximum satisfaction.',
          'WPM calculation running.',
          'Code compilation sounds enabled.',
          'Productivity.exe optimized.'
        ],
        particles: ['#', '$', '%', '&', '@'],
        particleClass: 'keyboard-char'
      },
      office: {
        name: 'OFFICE_AMBIENT',
        messages: [
          'Corporate environment simulated.',
          'Fluorescent hum frequency set.',
          'Printer queue processing sounds.',
          'Meeting room audio filtered.',
          'HVAC system noise normalized.',
          'Productivity ambience active.',
          'Collaboration sounds enabled.',
          'Office.exe status: professional.'
        ],
        particles: ['■', '□', '▪', '▫', '▬'],
        particleClass: 'office-char'
      },
      library: {
        name: 'QUIET_STUDY',
        messages: [
          'Silent environment protocol active.',
          'Page turning frequency minimized.',
          'Whisper suppression enabled.',
          'Study mode optimization complete.',
          'Concentration levels: maximum.',
          'Library.exe running quietly.',
          'Knowledge absorption enhanced.',
          'Minimal distraction mode on.'
        ],
        particles: ['.', '·', '•', '°', '∘'],
        particleClass: 'library-char'
      }
    };

    const commands = [
      { type: 'command', text: 'ps aux | grep asmr' },
      { type: 'output', text: 'root     1337  0.1  2.3  45672  8234 ?        S    12:34   0:01 ./rain_ambient' },
      { type: 'command', text: 'tail -f /var/log/sound.log' },
      { type: 'info', text: '[INFO] Audio buffer initialized: 44.1kHz/16-bit' },
      { type: 'success', text: '[SUCCESS] Ambient sound module loaded' },
      { type: 'command', text: 'systemctl status ambient-sound.service' },
      { type: 'success', text: '● ambient-sound.service - ASMR Sound Generator' },
      { type: 'output', text: '   Loaded: loaded (/etc/systemd/system/ambient-sound.service)' },
      { type: 'command', text: 'htop' },
      { type: 'output', text: 'PID USER      PRI  NI  VIRT   RES   SHR S CPU% MEM%   TIME+  Command' },
      { type: 'output', text: '1337 dev        20   0  256M   32M   16M S  1.2  0.8   0:45.67 rain_ambient' },
      { type: 'command', text: 'free -h' },
      { type: 'output', text: '              total        used        free      shared' },
      { type: 'output', text: 'Mem:           16Gi       8.2Gi       5.1Gi       1.2Gi' },
      { type: 'command', text: 'docker ps' },
      { type: 'output', text: 'CONTAINER ID   IMAGE          COMMAND                  STATUS' },
      { type: 'output', text: 'a1b2c3d4e5f6   asmr:latest    "./sound-server"         Up 2 hours' },
      { type: 'command', text: 'git status' },
      { type: 'output', text: 'On branch main' },
      { type: 'output', text: 'nothing to commit, working tree clean' },
      { type: 'command', text: 'curl -s localhost:8080/api/sound/status' },
      { type: 'success', text: '{"status":"running","module":"rain_ambient","uptime":"00:42:15"}' }
    ];

    let state = {
      currentModule: 'rain' as ModuleType,
      isPlaying: false,
      isFullscreen: false,
      messageIndex: 0,
      isTyping: false,
      audioElement: null as HTMLAudioElement | null,
      commandIndex: 0,
      isTypingCommand: false
    };

    function updateTime() {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      
      const timeDisplay = document.getElementById('timeDisplay');
      if (timeDisplay) {
        timeDisplay.textContent = `${h}:${m}:${s}`;
      }
      
      const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 
                    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      
      const dayName = days[now.getDay()];
      const monthName = months[now.getMonth()];
      const date = String(now.getDate()).padStart(2, '0');
      const year = now.getFullYear();
      
      const dateDisplay = document.getElementById('dateDisplay');
      if (dateDisplay) {
        dateDisplay.textContent = `${dayName}, ${monthName} ${date}, ${year}`;
      }
    }

    function addTerminalLine(type: string, text: string) {
      const output = document.getElementById('terminalOutput');
      if (!output) return;
      
      const line = document.createElement('div');
      line.className = `terminal-line ${type}`;
      
      if (type === 'command') {
        line.innerHTML = `<span class="prompt">user@dev-machine:~$</span> <span class="command">${text}</span>`;
      } else {
        line.innerHTML = `<span class="${type}">${text}</span>`;
      }
      
      output.appendChild(line);
      output.scrollTop = output.scrollHeight;
      
      const lines = output.querySelectorAll('.terminal-line');
      if (lines.length > 12) {
        lines[0].remove();
      }
    }

    async function typeCommand(command: string) {
      if (state.isTypingCommand) return;
      state.isTypingCommand = true;
      
      const elem = document.getElementById('currentCommand');
      if (!elem) return;
      
      let text = '';
      
      for (let i = 0; i < command.length; i++) {
        text += command[i];
        elem.textContent = ' ' + text;
        await new Promise(r => setTimeout(r, Math.random() * 80 + 40));
      }
      
      await new Promise(r => setTimeout(r, 800));
      addTerminalLine('command', command);
      elem.textContent = '';
      state.isTypingCommand = false;
    }

    async function runTerminalSim() {
      if (state.commandIndex >= commands.length) {
        state.commandIndex = 0;
      }
      
      const cmd = commands[state.commandIndex];
      
      if (cmd.type === 'command') {
        await typeCommand(cmd.text);
        await new Promise(r => setTimeout(r, 300));
      } else {
        addTerminalLine(cmd.type, cmd.text);
        await new Promise(r => setTimeout(r, Math.random() * 800 + 400));
      }
      
      state.commandIndex++;
    }

    async function typeMessage(message: string) {
      if (state.isTyping) return;
      state.isTyping = true;
      
      const elem = document.getElementById('messageText');
      if (!elem) return;
      
      elem.innerHTML = '';
      
      for (let i = 0; i < message.length; i++) {
        elem.innerHTML = message.substring(0, i + 1) + '<span class="cursor"></span>';
        await new Promise(r => setTimeout(r, 30));
      }
      
      state.isTyping = false;
    }

    function updateMessage() {
      const mod = modules[state.currentModule];
      const msg = mod.messages[state.messageIndex];
      typeMessage(msg);
      state.messageIndex = (state.messageIndex + 1) % mod.messages.length;
    }

    function createParticles() {
      const mod = modules[state.currentModule];
      const p = document.createElement('div');
      p.className = `particle ${mod.particleClass}`;
      p.textContent = mod.particles[Math.floor(Math.random() * mod.particles.length)];
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = (Math.random() * 3 + 2) + 's';
      
      const particles = document.getElementById('particles');
      if (particles) {
        particles.appendChild(p);
        setTimeout(() => p.remove(), 5000);
      }
    }

    function switchModule(type: ModuleType) {
      if (state.currentModule === type) return;
      
      state.currentModule = type;
      state.messageIndex = 0;
      
      document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
      });
      const activeItem = document.querySelector(`[data-type="${type}"]`);
      if (activeItem) {
        activeItem.classList.add('active');
      }
      
      const statusLine = document.getElementById('statusLine');
      if (statusLine) {
        statusLine.textContent = 
          `STATUS: READY | MODULE: ${modules[type].name} | PID: ${Math.floor(Math.random() * 9999)}`;
      }
      
      updateMessage();
    }

    function toggleAudio() {
      if (!state.audioElement) {
        typeMessage('Audio module not found. Please load sound files.');
        return;
      }

      if (!state.isPlaying) {
        state.audioElement.play().then(() => {
          state.isPlaying = true;
          const playBtn = document.getElementById('playBtn');
          if (playBtn) {
            playBtn.textContent = 'STOP';
            playBtn.classList.add('active');
          }
        });
      } else {
        state.audioElement.pause();
        state.isPlaying = false;
        const playBtn = document.getElementById('playBtn');
        if (playBtn) {
          playBtn.textContent = 'RUN';
          playBtn.classList.remove('active');
        }
      }
    }

    function toggleFullscreen() {
      state.isFullscreen = !state.isFullscreen;
      const sidebar = document.getElementById('sidebar');
      const main = document.getElementById('mainTerminal');
      
      if (state.isFullscreen) {
        sidebar?.classList.add('hidden');
        main?.classList.add('fullscreen');
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        if (fullscreenBtn) {
          fullscreenBtn.textContent = 'RESTORE';
        }
      } else {
        sidebar?.classList.remove('hidden');
        main?.classList.remove('fullscreen');
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        if (fullscreenBtn) {
          fullscreenBtn.textContent = 'EXPAND';
        }
      }
    }

    function updateVolume() {
      const volumeSlider = document.getElementById('volumeSlider') as HTMLInputElement;
      const volumeValue = document.getElementById('volumeValue');
      
      if (volumeSlider && volumeValue) {
        const vol = volumeSlider.value;
        volumeValue.textContent = vol;
        if (state.audioElement) {
          state.audioElement.volume = Number(vol) / 100;
        }
      }
    }

    // Event listeners
    const playBtn = document.getElementById('playBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const volumeSlider = document.getElementById('volumeSlider');

    playBtn?.addEventListener('click', toggleAudio);
    fullscreenBtn?.addEventListener('click', toggleFullscreen);
    volumeSlider?.addEventListener('input', updateVolume);

    document.querySelectorAll('.menu-item').forEach(item => {
      item.addEventListener('click', () => {
        const type = item.getAttribute('data-type') as ModuleType;
        if (type && ['rain', 'birds', 'cafe', 'keyboard', 'office', 'library'].includes(type)) {
          switchModule(type);
        }
      });
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        toggleAudio();
      } else if (e.key === 'f' || e.key === 'F11') {
        e.preventDefault();
        if (e.key === 'F11') {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
          } else {
            document.exitFullscreen();
          }
        }
        toggleFullscreen();
      } else if (e.key >= '1' && e.key <= '6') {
        const mods: ModuleType[] = ['rain', 'birds', 'cafe', 'keyboard', 'office', 'library'];
        const selectedMod = mods[parseInt(e.key) - 1];
        if (selectedMod) {
          switchModule(selectedMod);
        }
      }
    };

    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        if (!state.isFullscreen) {
          toggleFullscreen();
        }
      } else {
        if (state.isFullscreen) {
          toggleFullscreen();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // Initialize
    updateTime();
    updateMessage();
    const timeInterval = setInterval(updateTime, 1000);
    const messageInterval = setInterval(updateMessage, 8000);
    const particlesInterval = setInterval(createParticles, 100);
    const terminalInterval = setInterval(runTerminalSim, 2500);

    return () => {
      clearInterval(timeInterval);
      clearInterval(messageInterval);
      clearInterval(particlesInterval);
      clearInterval(terminalInterval);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Micro+5+Charted&family=Noto+Sans+KR:wght@100..900&family=Sixtyfour&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Micro+5&display=swap" rel="stylesheet" />
      </Head>
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');

        .micro-5-regular {
          font-family: "Micro 5", sans-serif;
          font-weight: 400;
          font-style: normal;
        }
        
        @font-face {
          font-family: 'SevenSegment';
          src: url('https://fonts.gstatic.com/l/font?kit=1Ptug8zYS_SKggPNyC0ISg&skey=a1029226f80653a8&v=v1') format('woff2');
          font-display: swap;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          background: #0c0c0c;
          font-family: 'JetBrains Mono', 'Consolas', 'Courier New', monospace;
          color: #c5c5c5;
          overflow: hidden;
          height: 100vh;
          display: flex;
        }
        
        .particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }
        
        .particle {
          position: absolute;
          color: #00ff41;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          opacity: 0.3;
          animation: matrix-fall linear infinite;
        }
        
        @keyframes matrix-fall {
          0% { transform: translateY(-100vh); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        
        .sidebar {
          width: 280px;
          background: #1e1e1e;
          border-right: 1px solid #333;
          padding: 0;
          display: flex;
          flex-direction: column;
          z-index: 3;
          transition: transform 0.3s ease;
        }
        
        .sidebar.hidden {
          transform: translateX(-100%);
        }
        
        .sidebar-header {
          background: #2d2d30;
          color: #cccccc;
          padding: 12px 16px;
          font-size: 12px;
          font-weight: 500;
          border-bottom: 1px solid #3e3e42;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .menu-list {
          flex: 1;
          padding: 8px 0;
          overflow-y: auto;
        }
        
        .ads-container {
          background: #1a1a1a;
          border-top: 1px solid #333;
          padding: 16px;
          margin-top: auto;
          min-height: 250px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .ads-placeholder {
          width: 100%;
          height: 200px;
          background: #2d2d30;
          border: 1px dashed #555;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #888;
          font-size: 12px;
          text-align: center;
          font-family: 'JetBrains Mono', monospace;
          line-height: 1.4;
        }
        
        .ads-label {
          color: #666;
          font-size: 10px;
          font-family: 'JetBrains Mono', monospace;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }
        
        .menu-item {
          display: flex;
          align-items: center;
          padding: 8px 16px;
          font-size: 13px;
          color: #cccccc;
          cursor: pointer;
          transition: background-color 0.15s ease;
          border: none;
          background: none;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 400;
        }
        
        .menu-item:hover {
          background: #2a2d2e;
        }
        
        .menu-item.active {
          background: #094771;
          color: #ffffff;
        }
        
        .menu-item .icon {
          margin-right: 8px;
          font-size: 14px;
        }
        
        .main-terminal {
          flex: 1;
          background: #0c0c0c;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          transition: margin-left 0.3s ease;
        }
        
        .main-terminal.fullscreen {
          margin-left: -280px;
        }
        
        .terminal-window {
          width: 1100px;
          height: 750px;
          background: #0c0c0c;
          border: 1px solid #333;
          box-shadow: 0 4px 20px rgba(0,0,0,0.8);
          display: flex;
          flex-direction: column;
        }
        
        .terminal-titlebar {
          height: 30px;
          background: #2d2d30;
          border-bottom: 1px solid #3e3e42;
          display: flex;
          align-items: center;
          padding: 0 12px;
          font-size: 12px;
          color: #cccccc;
        }
        
        .window-controls {
          display: flex;
          gap: 8px;
          margin-left: auto;
        }
        
        .window-control {
          width: 12px;
          height: 12px;
          border-radius: 2px;
          background: #555;
        }
        
        .window-control.close { background: #ff5f57; }
        .window-control.minimize { background: #ffbd2e; }
        .window-control.maximize { background: #28ca42; }
        
        .terminal-content {
          flex: 1;
          padding: 20px;
          background: #0c0c0c;
          display: flex;
          flex-direction: column;
          font-family: 'JetBrains Mono', monospace;
          position: relative;
          overflow: hidden;
        }
        
        .terminal-output {
          flex: 1;
          overflow-y: auto;
          margin-bottom: 20px;
          font-size: 13px;
          line-height: 1.4;
          color: #c5c5c5;
        }
        
        .terminal-line {
          margin-bottom: 2px;
          word-wrap: break-word;
        }
        
        .prompt {
          color: #00ff41;
          font-weight: 500;
        }
        
        .command {
          color: #ffffff;
        }
        
        .output {
          color: #888;
          margin-left: 0;
        }
        
        .error {
          color: #ff6b6b;
        }
        
        .success {
          color: #51cf66;
        }
        
        .info {
          color: #74c0fc;
        }
        
        .current-line {
          display: flex;
          align-items: center;
        }
        
        .typing-cursor {
          background: #00ff41;
          width: 8px;
          height: 16px;
          margin-left: 2px;
          animation: blink 1s infinite;
        }
        
        .time-display {
          color: #ffdd00;
          font-size: 120px;
          font-weight: 400;
          text-align: center;
          margin: 20px auto;
          font-family: "Micro 5", "Micro 5 Charted", "Courier New", "Lucida Console", monospace;
          letter-spacing: 8px;
          display: block;
          width: fit-content;
        }
        
        .date-display {
          color: #cc9900;
          font-size: 18px;
          text-align: center;
          margin-bottom: 30px;
          font-weight: 400;
          font-family: "Micro 5", 'JetBrains Mono', monospace;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        
        .message-area {
          background: #111;
          border: 1px solid #333;
          padding: 16px;
          margin: 20px 0;
          min-height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .message-text {
          color: #00ff41;
          font-size: 16px;
          line-height: 1.5;
          text-align: center;
          font-weight: 400;
        }
        
        .cursor {
          display: inline-block;
          background: #00ff41;
          width: 8px;
          height: 18px;
          margin-left: 2px;
          animation: blink 1s infinite;
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        .controls-area {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-top: 20px;
          flex-wrap: wrap;
        }
        
        .cmd-button {
          background: #1e1e1e;
          color: #cccccc;
          border: 1px solid #444;
          padding: 8px 16px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.15s ease;
          font-weight: 400;
        }
        
        .cmd-button:hover {
          background: #2a2d2e;
          border-color: #666;
        }
        
        .cmd-button.active {
          background: #094771;
          border-color: #0e639c;
          color: #ffffff;
        }
        
        .volume-area {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #888;
          font-size: 13px;
        }
        
        .volume-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 80px;
          height: 4px;
          background: #333;
          outline: none;
          border: none;
        }
        
        .volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          background: #666;
          cursor: pointer;
        }
        
        .volume-slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          background: #666;
          cursor: pointer;
          border: none;
        }
        
        .status-line {
          position: absolute;
          bottom: 8px;
          left: 20px;
          color: #444;
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
        }
        
        .rain-char { color: #00aaff; }
        .bird-char { color: #ffaa00; }
        .cafe-char { color: #aa7700; }
        .keyboard-char { color: #00ff41; }
        .office-char { color: #888888; }
        .library-char { color: #aaaaaa; }
        
        @media (max-width: 768px) {
          body { flex-direction: column; }
          .sidebar { width: 100%; height: auto; border-right: none; border-bottom: 1px solid #333; }
          .sidebar.hidden { transform: translateY(-100%); }
          .main-terminal.fullscreen { margin-left: 0; margin-top: -200px; }
          .terminal-window { width: 95%; height: 600px; }
          .time-display { font-size: 48px; }
        }
      `}</style>

      <div className="particles" id="particles"></div>
      
      <div className="sidebar" id="sidebar">
        <div className="sidebar-header">SOUND MODULES</div>
        <div className="menu-list">
          <div className="menu-item active" data-type="rain">
            <span className="icon">🌧️</span>
            <span>rain_ambient.exe</span>
          </div>
          <div className="menu-item" data-type="birds">
            <span className="icon">🐦</span>
            <span>forest_birds.exe</span>
          </div>
          <div className="menu-item" data-type="cafe">
            <span className="icon">☕</span>
            <span>cafe_noise.exe</span>
          </div>
          <div className="menu-item" data-type="keyboard">
            <span className="icon">⌨️</span>
            <span>mech_keys.exe</span>
          </div>
          <div className="menu-item" data-type="office">
            <span className="icon">🏢</span>
            <span>office_ambient.exe</span>
          </div>
          <div className="menu-item" data-type="library">
            <span className="icon">📚</span>
            <span>quiet_study.exe</span>
          </div>
        </div>
        
        <div className="ads-container">
          <div className="ads-label">Advertisement</div>
          <div className="ads-placeholder" id="google-ads-container">
            <div>
              Google Ads<br/>
              240 x 200<br/>
              <br/>
              <span style={{fontSize: '10px', color: '#666'}}>
                Insert your Google AdSense<br/>
                code here
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="main-terminal" id="mainTerminal">
        <div className="terminal-window">
          <div className="terminal-titlebar">
            <span>C:\dev\asmr-terminal&gt;</span>
            <div className="window-controls">
              <div className="window-control minimize"></div>
              <div className="window-control maximize"></div>
              <div className="window-control close"></div>
            </div>
          </div>
          
          <div className="terminal-content">
            <div className="terminal-output" id="terminalOutput">
              <div className="terminal-line">
                <span className="prompt">user@dev-machine:~$</span>
                <span className="command"> ./asmr-terminal --init</span>
              </div>
              <div className="terminal-line output">Initializing ASMR Terminal v2.1.0...</div>
              <div className="terminal-line success">✓ Sound modules loaded</div>
              <div className="terminal-line success">✓ Audio drivers initialized</div>
            </div>
            
            <div className="current-line" id="currentLine">
              <span className="prompt">user@dev-machine:~$</span>
              <span className="command" id="currentCommand"></span>
              <span className="typing-cursor"></span>
            </div>
            
            <div style={{ marginTop: 'auto' }}>
              <div className="time-display" id="timeDisplay">00:00:00</div>
              <div className="date-display" id="dateDisplay">Loading...</div>
              
              <div className="message-area">
                <div className="message-text" id="messageText">
                  Initializing ambient sound module...
                  <span className="cursor"></span>
                </div>
              </div>
              
              <div className="controls-area">
                <button className="cmd-button" id="playBtn">RUN</button>
                <button className="cmd-button" id="fullscreenBtn">EXPAND</button>
                <div className="volume-area">
                  <span>VOL:</span>
                  <input type="range" className="volume-slider" id="volumeSlider" min="0" max="100" defaultValue="50" />
                  <span id="volumeValue">50</span>
                </div>
              </div>
            </div>
            
            <div className="status-line" id="statusLine">STATUS: READY | MODULE: RAIN_AMBIENT | PID: 1337</div>
          </div>
        </div>
      </div>
    </>
  );
}