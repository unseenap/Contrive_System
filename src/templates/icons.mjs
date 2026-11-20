import { readFileSync } from 'node:fs';

// Tabler Icons, MIT licensed. Sources and license are stored in assets/icons/.
const icons = new Map();

function icon(name) {
  if (!icons.has(name)) {
    const source = readFileSync(new URL('../../assets/icons/' + name + '.svg', import.meta.url), 'utf8');
    icons.set(name, source
      .replace(/<!--[\s\S]*?-->/g, '')
      .trim()
      .replace(/<svg\b/, '<svg class="icon" aria-hidden="true" focusable="false"'));
  }
  return icons.get(name);
}

function playbackIcons() {
  return '<span class="playback-icons"><span data-play hidden>' + icon('player-play') +
    '</span><span data-pause>' + icon('player-pause') + '</span></span>';
}

export { icon, playbackIcons };
