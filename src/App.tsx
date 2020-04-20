import React, { useEffect } from 'react';
import { Terminal } from 'xterm';
import { AttachAddon } from 'xterm-addon-attach';
import { SearchAddon } from 'xterm-addon-search';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';

import './App.css';
import 'xterm/css/xterm.css';

const getWebSocket = (): WebSocket => {
  let socketURL;
  let protocol;
  const location = window.location;
  protocol = location.protocol === 'https:' ? 'wss://' : 'ws://';
  socketURL =
    protocol +
    location.hostname +
    (location.port ? ':' + location.port : '') +
    '/terminals/';
  return new WebSocket(socketURL);
};

function App() {
  useEffect(() => {
    const term = new Terminal();
    const attachAddon = new AttachAddon(getWebSocket());
    const fitAddon = new FitAddon();
    const webLinksAddon = new WebLinksAddon();
    const searchAddon = new SearchAddon();

    term.loadAddon(attachAddon);
    term.loadAddon(fitAddon);
    term.loadAddon(webLinksAddon);
    term.loadAddon(searchAddon);
    // term.write(`\x1b[H`);
    term.open(document.getElementById('xterm-container') as HTMLElement);
    fitAddon.fit();
  }, []);

  return (
    <div className="App">
      <div className={'xterm-container'} id={'xterm-container'}></div>
    </div>
  );
}

export default App;
