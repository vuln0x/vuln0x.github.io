(function () {
  'use strict';

  function init() {
    const container = document.getElementById('interactive-terminal');
    if (!container) return;

    const output = container.querySelector('.terminal-output');
    const input = container.querySelector('.terminal-input');
    const prompt = container.dataset.prompt || 'user@cyber-ember:~$';
    const commands = JSON.parse(container.dataset.commands || '{}');
    const banner = container.dataset.banner || '';

    function print(text, className) {
      const line = document.createElement('div');
      line.className = className || 'mb-1 whitespace-pre-wrap';
      line.textContent = text;
      output.appendChild(line);
      output.scrollTop = output.scrollHeight;
    }

    function printCommand(cmd) {
      print(prompt + ' ' + cmd, 'text-ember-soft mb-1');
    }

    function handleCommand(cmd) {
      const trimmed = cmd.trim().toLowerCase();
      if (!trimmed) return;

      printCommand(cmd);

      const command = commands[trimmed];
      if (command) {
        if (command.action === 'clear') {
          output.innerHTML = '';
          return;
        }
        if (command.output) print(command.output);
      } else {
        print("Command not found: '" + trimmed + "'. Type 'help' for available commands.", 'text-red-400');
      }
    }

    if (banner) print(banner, 'text-text-muted mb-4');

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleCommand(input.value);
        input.value = '';
      }
    });

    container.querySelector('.terminal-body').addEventListener('click', () => input.focus());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
